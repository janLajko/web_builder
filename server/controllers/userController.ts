import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import openai, { getAIModels } from "../configs/openai.js";

dotenv.config();

// List of models to try in order — if the first fails (rate limit/timeout), try the next
const MODELS = getAIModels();

const TIMEOUT_MS = Number(process.env.AI_REQUEST_TIMEOUT_MS || 900000); // 15 minutes default
const MAX_RETRIES_PER_MODEL = Math.max(1, Number(process.env.AI_MAX_RETRIES_PER_MODEL || 3));
const RETRY_BASE_DELAY_MS = Math.max(250, Number(process.env.AI_RETRY_BASE_DELAY_MS || 1500));
const RETRYABLE_NETWORK_CODES = new Set(["ENOTFOUND", "ECONNRESET", "ETIMEDOUT", "ECONNREFUSED", "EAI_AGAIN"]);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callAIWithFallback(messages: Array<{ role: string; content: string }>): Promise<string> {
    let lastError: any = null;

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
            try {
                console.log(`[AI] Trying model: ${model} (attempt ${attempt}/${MAX_RETRIES_PER_MODEL})`);

                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

                const completion = await openai.chat.completions.create(
                    {
                        model,
                        messages: messages as any,
                        temperature: 0.2,
                        top_p: 0.7,
                        max_tokens: 200000,
                    },
                    { signal: controller.signal as any }
                );

                clearTimeout(timeout);

                const content = completion.choices?.[0]?.message?.content || "";
                if (!content.trim()) {
                    console.log(`[AI] Model ${model} returned empty response, trying next...`);
                    break;
                }

                console.log(`[AI] Success with model: ${model} (${content.length} chars)`);
                return content;
            } catch (error: any) {
                lastError = error;
                const status = error?.status || error?.response?.status;
                const msg = error?.message || "Unknown error";
                const networkCode = error?.cause?.code || error?.code;
                const networkMsg = error?.cause?.message;
                const isRetryable =
                    status === 429 ||
                    status >= 500 ||
                    error.name === "AbortError" ||
                    RETRYABLE_NETWORK_CODES.has(networkCode);

                console.error(
                    `[AI] Model ${model} failed: ${status || "N/A"} - ${msg}` +
                    (networkCode ? ` | ${networkCode}` : "") +
                    (networkMsg ? ` | ${networkMsg}` : "")
                );

                if (error.name === "AbortError" || msg.includes("aborted")) {
                    console.error(`[AI] Model ${model} timed out after ${TIMEOUT_MS / 1000}s`);
                }

                if (!isRetryable) {
                    throw error;
                }

                if (attempt < MAX_RETRIES_PER_MODEL) {
                    const delayMs = RETRY_BASE_DELAY_MS * attempt;
                    console.log(`[AI] Retrying model ${model} in ${delayMs}ms...`);
                    await sleep(delayMs);
                }
            }
        }
    }

    throw lastError || new Error("All AI models failed");
}

export const getUserCredits = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ credits: user.credits });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createProject = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    try {
        const { initialPrompt } = req.body;
        if (typeof initialPrompt !== "string" || !initialPrompt.trim()) {
            return res.status(400).json({ message: "initialPrompt is required" });
        }

        const normalizedPrompt = initialPrompt.trim();
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.credits < 5) {
            return res.status(403).json({ message: "Add credits to create more projects" });
        }

        const project = await prisma.websiteProject.create({
            data: {
                name: normalizedPrompt.length > 50 ? normalizedPrompt.substring(0, 47) + "..." : normalizedPrompt,
                initialPrompt: normalizedPrompt,
                userId: userId
            }
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                totalCreations: { increment: 1 },
                credits: { decrement: 5 }
            }
        });

        await prisma.conversation.create({
            data: { role: "user", content: normalizedPrompt, projectId: project.id }
        });

        // Send response immediately so client can start polling
        res.json({ projectId: project.id });

        console.log(`[CreateProject] Starting generation for project ${project.id} (user: ${userId})`);

        // Step 1: Enhance the prompt (with fallback)
        let enhancedPrompt: string;
        try {
            enhancedPrompt = await callAIWithFallback([
                {
                    role: "system",
                    content: `You are a prompt enhancement specialist. Take the user's website request and expand it into a detailed, comprehensive prompt that will help create the best possible website.
                    Enhance this prompt by:
                    1. Adding specific design details (layout, color scheme, typography)
                    2. Specifying key sections and features
                    3. Describing the user experience and interactions
                    4. Including modern web design best practices
                    5. Mentioning responsive design requirements
                    6. Adding any missing but important elements

                    Return ONLY the enhanced prompt, nothing else. Make it detailed but concise (2-3 paragraphs max).`
                },
                {
                    role: "user",
                    content: normalizedPrompt
                }
            ]);
            console.log(`[CreateProject] Prompt enhanced successfully (${enhancedPrompt.length} chars)`);
        } catch (error: any) {
            console.error("[CreateProject] Prompt enhancement failed, using original:", error?.message);
            enhancedPrompt = normalizedPrompt; // Fall back to original prompt
        }

const SYSTEM_PROMPT = `You are an elite web developer. Generate a PRODUCTION-READY static website with a STUNNING design.

RULES:
1. Output ONLY these files: index.html, script.js.
2. DO NOT generate style.css, package.json, or any other files.
3. Use Tailwind CSS for ALL styling. You MUST include <script src="https://cdn.tailwindcss.com"></script> in the <head>.
4. CRITICAL: NEVER include <link rel="stylesheet" href="style.css">.
5. MODERN DESIGN: Use gradients, beautiful typography (Inter/Poppins), and spacious layouts.
6. IMAGES: Use high-quality Unsplash images. Pattern: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=1200
7. LAYOUT: Ensure <html class="h-full"> and <body class="h-full m-0 p-0 text-gray-900 bg-white">.
8. BE CONCISE. Ensure every <file> tag is closed. NO conversational text.`;

        // Step 2: Generate the actual website code (with fallback)
        const code = await callAIWithFallback([
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: enhancedPrompt
            }
        ]);

        if (!code) {
            await prisma.conversation.create({ data: { role: "assistant", content: "Unable to generate code. Please try again.", projectId: project.id } });
            await prisma.user.update({ where: { id: userId }, data: { credits: { increment: 5 } } });
            return;
        }

        const cleanedCode = code.replace(/```html/gi, "").replace(/```/g, "").trim();

        const version = await prisma.version.create({
            data: {
                code: cleanedCode,
                projectId: project.id
            }
        });

        await prisma.websiteProject.update({
            where: { id: project.id },
            data: { currentCode: cleanedCode, currentVersionIndex: version.id }
        });

        console.log(`[CreateProject] Generation complete for project ${project.id}`);

    } catch (error: any) {
        console.error("[CreateProject] Error:", error?.message || error);
        // Refund credits on failure
        try {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 5 } }
            });
        } catch (refundError) {
            console.error("[CreateProject] Failed to refund credits:", refundError);
        }
        // Only send error response if headers haven't been sent yet
        if (!res.headersSent) {
            res.status(500).json({ message: error.message || "Generation failed" });
        }
    }
};

export const getUserProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.websiteProject.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getSingleProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.websiteProject.findFirst({
            where: { id, userId: req.userId },
            include: {
                versions: { orderBy: { createdAt: 'desc' } },
                conversations: { orderBy: { createdAt: 'asc' } }
            }
        });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const togglePublish = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.websiteProject.findFirst({ where: { id, userId: req.userId } });
        if (!project) return res.status(404).json({ message: "Project not found" });

        const updated = await prisma.websiteProject.update({
            where: { id },
            data: { isPublic: !project.isPublic }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
};
