import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import openai from "../configs/openai.js";
import { deepseekClient } from "../configs/openai.js";

const SYSTEM_PROMPT = "You are an expert web developer AI. Output ONLY clean HTML with embedded Tailwind CSS and inline javascript if necessary. Do not wrap in markdown tags.";

// List of models to try in order — if the first fails (rate limit/timeout), try thenext
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

            const code = completion.choices?.[0]?.message?.content || "";
            if (!code.trim()) {
                console.log(`[AI] Model ${model} returned empty response, trying next...`);
                continue;
            }

            console.log(`[AI] Success with model: ${model} (${code.length} chars)`);
            return code;
        } catch (error: any) {
            lastError = error;
            const status = error?.status || error?.response?.status;
            const msg = error?.message || "Unknown error";
            console.error(`[AI] Model ${model} failed: ${status || "N/A"} - ${msg}`);

            // If aborted due to timeout
            if (error.name === "AbortError" || msg.includes("aborted")) {
                console.error(`[AI] Model ${model} timed out after ${TIMEOUT_MS / 1000}s`);
            }

            // Rate limit (429) or server error (5xx) — try next model
            if (status === 429 || status >= 500 || error.name === "AbortError") {
                continue;
            }

            // For other errors (auth, bad request), don't retry
            throw error;
        }
    }

    // All models failed
    throw lastError || new Error("All AI models failed");
}

async function assertProjectOwnership(projectId: string, userId?: string) {
    if (!userId) return null;
    return prisma.websiteProject.findFirst({ where: { id: projectId, userId } });
}

export const generateAIWebsite = async (req: Request, res: Response) => {
    try {
        const { prompt, projectId } = req.body;

        if (!prompt || !projectId) {
            return res.status(400).json({ message: "Prompt and projectId are required" });
        }

        // Check credits
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.credits < 1) return res.status(403).json({ message: "Not enough credits" });
        const project = await assertProjectOwnership(projectId, req.userId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        console.log(`[Generate] User ${req.userId} requesting generation for project ${projectId}`);

        const code = await callAIWithFallback([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt }
        ]);

        // Deduct credit
        await prisma.user.update({
            where: { id: req.userId },
            data: { credits: { decrement: 1 } }
        });

        // Save version
        const version = await prisma.version.create({
            data: { projectId, code, prompt }
        });
        await prisma.websiteProject.update({
            where: { id: projectId },
            data: { currentCode: code, currentVersionIndex: version.id }
        });

        res.json({ version });
    } catch (error: any) {
        console.error("[Generate] Error:", error?.message || error);
        const status = error?.status || 500;
        const message = status === 429
            ? "AI is currently rate-limited. Please wait a moment and try again."
            : error?.message || "Generation failed";
        res.status(status >= 400 && status < 600 ? status : 500).json({ message });
    }
};

export const reviseWebsite = async (req: Request, res: Response) => {
    try {
        const { prompt, projectId, currentCode } = req.body;

        if (!prompt || !projectId) {
            return res.status(400).json({ message: "Prompt and projectId are required" });
        }

        // Check credits
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.credits < 1) return res.status(403).json({ message: "Not enough credits" });
        const project = await assertProjectOwnership(projectId, req.userId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        console.log(`[Revise] User ${req.userId} requesting revision for project ${projectId}`);

        const code = await callAIWithFallback([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Current code:\n${currentCode}\n\nUser request: ${prompt}` }
        ]);

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

        res.json({ version });
    } catch (error: any) {
        console.error("[Revise] Error:", error?.message || error);
        const status = error?.status || 500;
        const message = status === 429
            ? "AI is currently rate-limited. Please wait a moment and try again."
            : error?.message || "Revision failed";
        res.status(status >= 400 && status < 600 ? status : 500).json({ message });
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
