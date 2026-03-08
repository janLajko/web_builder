import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import openai from "../configs/openai.js";
import { deepseekClient } from "../configs/openai.js";

dotenv.config();

// List of models to try in order — if the first fails (rate limit/timeout), try the next
const MODELS = [
    "meta/llama-3.1-70b-instruct",
    "deepseek-ai/deepseek-v3.2",
    "meta/llama-3.1-405b-instruct"
];

const TIMEOUT_MS = 600000; // 10 minutes timeout

async function callAIWithFallback(messages: Array<{ role: string; content: string }>): Promise<string> {
    let lastError: any = null;

    for (const model of MODELS) {
        try {
            console.log(`[AI] Trying model: ${model}`);

            // Pick the right client based on model
            const client = model.includes('deepseek') ? deepseekClient : openai;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

            const completion = await client.chat.completions.create(
                {
                    model,
                    messages: messages as any,
                    temperature: 0.2,
                    top_p: 0.7,
                    max_tokens: 8192,
                },
                { signal: controller.signal as any }
            );

            clearTimeout(timeout);

            const content = completion.choices?.[0]?.message?.content || "";
            if (!content.trim()) {
                console.log(`[AI] Model ${model} returned empty response, trying next...`);
                continue;
            }

            console.log(`[AI] Success with model: ${model} (${content.length} chars)`);
            return content;
        } catch (error: any) {
            lastError = error;
            const status = error?.status || error?.response?.status;
            const msg = error?.message || "Unknown error";
            console.error(`[AI] Model ${model} failed: ${status || "N/A"} - ${msg}`);

            if (error.name === "AbortError" || msg.includes("aborted")) {
                console.error(`[AI] Model ${model} timed out after ${TIMEOUT_MS / 1000}s`);
            }

            // Rate limit (429) or server error (5xx) or timeout — try next model
            if (status === 429 || status >= 500 || error.name === "AbortError") {
                continue;
            }

            // For other errors (auth, bad request), don't retry
            throw error;
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

        // Step 2: Generate the actual website code (with fallback)
        const code = await callAIWithFallback([
            {
                role: "system",
                content: `You are an expert react/tailwind developer. Generate raw HTML with tailwind classes for the next request. Only output html code. Use inline styles sparingly.`
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
            include: { versions: { orderBy: { createdAt: 'desc' } } }
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
