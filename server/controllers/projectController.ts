import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import openai from "../configs/openai.js";

const SYSTEM_PROMPT = "You are an expert web developer AI. Output ONLY clean HTML with embedded Tailwind CSS and inline javascript if necessary. Do not wrap in markdown tags.";

export const generateAIWebsite = async (req: Request, res: Response) => {
    try {
        const { prompt, projectId } = req.body;

        // Check credits
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.credits < 1) return res.status(403).json({ message: "Not enough credits" });

        const completion = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ]
        });

        const code = completion.choices[0].message.content || "";

        // Deduct credit
        await prisma.user.update({
            where: { id: req.userId },
            data: { credits: { decrement: 1 } }
        });

        // Save version
        const version = await prisma.version.create({
            data: { projectId, code, prompt }
        });

        res.json({ version });
    } catch (error) {
        res.status(500).json({ message: "Generation failed" });
    }
};

export const reviseWebsite = async (req: Request, res: Response) => {
    try {
        const { prompt, projectId, currentCode } = req.body;

        // Check credits
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.credits < 1) return res.status(403).json({ message: "Not enough credits" });

        const completion = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Current code:\n${currentCode}\n\nUser request: ${prompt}` }
            ]
        });

        const code = completion.choices[0].message.content || "";

        // Deduct credit
        await prisma.user.update({
            where: { id: req.userId },
            data: { credits: { decrement: 1 } }
        });

        const version = await prisma.version.create({
            data: { projectId, code, prompt }
        });

        res.json({ version });
    } catch (error) {
        res.status(500).json({ message: "Revision failed" });
    }
};

export const saveManualUpdate = async (req: Request, res: Response) => {
    try {
        const { projectId, code } = req.body;
        const version = await prisma.version.create({
            data: { projectId, code, prompt: "Manual update" }
        });
        res.json({ version });
    } catch (error) {
        res.status(500).json({ message: "Save failed" });
    }
};

export const rollbackVersion = async (req: Request, res: Response) => {
    try {
        const { versionId } = req.params;
        const version = await prisma.version.findUnique({ where: { id: versionId } });
        if (!version) return res.status(404).json({ message: "Version not found" });
        res.json(version);
    } catch (error) {
        res.status(500).json({ message: "Rollback failed" });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.websiteProject.delete({ where: { id, userId: req.userId } });
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed" });
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
        const project = await prisma.websiteProject.findUnique({
            where: { id },
            include: { versions: { orderBy: { createdAt: 'desc' }, take: 1 } }
        });
        if (!project || project.versions.length === 0) return res.status(404).json({ message: "Preview not found" });

        // For raw HTML output
        res.send(project.versions[0].code);
    } catch (error) {
        res.status(500).json({ message: "Preview failed" });
    }
};
