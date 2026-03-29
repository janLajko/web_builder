import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import openai, { getAIModels } from "../configs/openai.js";

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

// List of models to try in order — if the first fails (rate limit/timeout), try the next
const MODELS = getAIModels();

const TIMEOUT_MS = Number(process.env.AI_REQUEST_TIMEOUT_MS || 900000); // 15 minutes default
const MAX_RETRIES_PER_MODEL = Math.max(1, Number(process.env.AI_MAX_RETRIES_PER_MODEL || 3));
const RETRY_BASE_DELAY_MS = Math.max(250, Number(process.env.AI_RETRY_BASE_DELAY_MS || 1500));
const MAX_COMPLETION_TOKENS = Number(process.env.AI_MAX_COMPLETION_TOKENS || 32768);
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
                        max_completion_tokens: MAX_COMPLETION_TOKENS,
                    },
                    { signal: controller.signal as any }
                );
                        
                clearTimeout(timeout);

                const code = completion.choices?.[0]?.message?.content || "";
                if (!code.trim()) {
                    console.log(`[AI] Model ${model} returned empty response, trying next...`);
                    break;
                }

                console.log(`[AI] Success with model: ${model} (${code.length} chars)`);
                return code;
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

    // All models failed
    console.error(`[AI] All models failed. Last error:`, lastError);
    throw lastError || new Error("All AI models failed");
}

async function assertProjectOwnership(projectId: string, userId?: string) {
    if (!userId) return null;
    return prisma.websiteProject.findFirst({ where: { id: projectId, userId } });
}

async function streamAIWithFallback(
    messages: Array<{ role: string; content: string }>,
    res: Response,
    onSuccess: (code: string) => Promise<void>
) {
    let lastError: any = null;

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
            try {
                console.log(`[AI-Stream] Trying model: ${model} (attempt ${attempt}/${MAX_RETRIES_PER_MODEL})`);
                
                const stream = await openai.chat.completions.create({
                    model,
                    messages: messages as any,
                    temperature: 0.2,
                    top_p: 0.7,
                    max_completion_tokens: MAX_COMPLETION_TOKENS,
                    stream: true,
                }) as any;

                let fullCode = "";
                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
                res.setHeader('Connection', 'keep-alive');
                res.flushHeaders();

                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    if (content) {
                        fullCode += content;
                        res.write(`data: ${JSON.stringify({ content })}\n\n`);
                    }
                }

                res.write(`data: [DONE]\n\n`);
                res.end();

                await onSuccess(fullCode);
                return;
            } catch (error: any) {
                lastError = error;
                const networkCode = error?.cause?.code || error?.code;
                const networkMsg = error?.cause?.message;
                const isRetryable =
                    error.status === 429 ||
                    error.status >= 500 ||
                    RETRYABLE_NETWORK_CODES.has(networkCode);

                console.error(
                    `[AI-Stream] Model ${model} failed: ${error?.message || "Unknown error"}` +
                    (networkCode ? ` | ${networkCode}` : "") +
                    (networkMsg ? ` | ${networkMsg}` : "")
                );

                if (!isRetryable) {
                    throw error;
                }

                if (attempt < MAX_RETRIES_PER_MODEL) {
                    const delayMs = RETRY_BASE_DELAY_MS * attempt;
                    console.log(`[AI-Stream] Retrying model ${model} in ${delayMs}ms...`);
                    await sleep(delayMs);
                }
            }
        }
    }
    throw lastError || new Error("All AI models failed");
}

export const generateAIWebsite = async (req: Request, res: Response) => {
    // Keep internal generation for initial creation but support streaming for direct calls
    try {
        const { prompt, projectId } = req.body;
        // ... implementation for background gen if needed, but we focus on stream for revisions first
    } catch (e) {}
};

export const reviseWebsite = async (req: Request, res: Response) => {
    try {
        const { prompt, projectId, currentCode } = req.body;

        if (!prompt || !projectId) {
            return res.status(400).json({ message: "Prompt and projectId are required" });
        }

        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.credits < 1) return res.status(403).json({ message: "Not enough credits" });
        
        const project = await assertProjectOwnership(projectId, req.userId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        console.log(`[Revise-Stream] User ${req.userId} requesting revision for project ${projectId}`);

        await streamAIWithFallback(
            [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Current code:\n${currentCode}\n\nUser request: ${prompt}` }
            ],
            res,
            async (code) => {
                // Deduct credit
                await prisma.user.update({
                    where: { id: req.userId },
                    data: { credits: { decrement: 1 } }
                });

                const version = await prisma.version.create({
                    data: { projectId, code, prompt }
                });
                await prisma.websiteProject.update({
                    where: { id: projectId },
                    data: { currentCode: code, currentVersionIndex: version.id }
                });
            }
        );
    } catch (error: any) {
        console.error("[Revise-Stream] Error:", error?.message || error);
        if (!res.headersSent) {
            res.status(500).json({ message: error.message || "Revision failed" });
        }
    }
};

export const saveManualUpdate = async (req: Request, res: Response) => {
    try {
        const { projectId, code } = req.body;
        if (!projectId || typeof code !== "string") {
            return res.status(400).json({ message: "projectId and code are required" });
        }
        const project = await assertProjectOwnership(projectId, req.userId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const version = await prisma.version.create({
            data: { projectId, code, prompt: "Manual update" }
        });
        await prisma.websiteProject.update({
            where: { id: projectId },
            data: { currentCode: code, currentVersionIndex: version.id }
        });
        res.json({ version });
    } catch (error) {
        res.status(500).json({ message: "Save failed" });
    }
};

export const rollbackVersion = async (req: Request, res: Response) => {
    try {
        const { versionId } = req.params;
        const version = await prisma.version.findUnique({
            where: { id: versionId },
            include: { project: { select: { userId: true } } }
        });
        if (!version) return res.status(404).json({ message: "Version not found" });
        if (version.project.userId !== req.userId) return res.status(404).json({ message: "Version not found" });
        res.json({ id: version.id, projectId: version.projectId, code: version.code, prompt: version.prompt, createdAt: version.createdAt });
    } catch (error) {
        res.status(500).json({ message: "Rollback failed" });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await prisma.websiteProject.deleteMany({ where: { id, userId: req.userId } });
        if (result.count === 0) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed" });
    }
};

export const renameProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });
        const existing = await prisma.websiteProject.findFirst({ where: { id, userId: req.userId } });
        if (!existing) return res.status(404).json({ message: "Project not found" });
        const project = await prisma.websiteProject.update({
            where: { id },
            data: { name: name.trim() }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Rename failed" });
    }
};

export const getPublicProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.websiteProject.findMany({
            where: { isPublic: true },
            include: {
                user: { select: { name: true, image: true } },
                versions: { orderBy: { createdAt: 'desc' }, take: 1 }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Fetch failed" });
    }
};

export const getPreviewCode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.websiteProject.findFirst({
            where: { id, isPublic: true },
            include: { versions: { orderBy: { createdAt: 'desc' }, take: 1 } }
        });
        if (!project || project.versions.length === 0) return res.status(404).json({ message: "Preview not found" });

        // For raw HTML output
        res.send(project.versions[0].code);
    } catch (error) {
        res.status(500).json({ message: "Preview failed" });
    }
};
