import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import openai from "../configs/openai.js";

dotenv.config();

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
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (user && user.credits < 5) {
            return res.status(403).json({ message: "Add credit to create more projects" });
        }

        const project = await prisma.websiteProject.create({
            data: {
                name: initialPrompt.length > 50 ? initialPrompt.substring(0, 47) + "..." : initialPrompt,
                initialPrompt: initialPrompt,
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
            data: { role: "user", content: initialPrompt, projectId: project.id }
        });

        res.json({ projectId: project.id });

        // Enhance user prompt
        const promptEnhancedResponse = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
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
                    content: initialPrompt
                }
            ]
        });

        const enhancedPrompt = promptEnhancedResponse.choices[0].message.content;

        // Generates the actual website code
        const codeGenerationResponse = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                {
                    role: "system",
                    content: `You are an expert react/tailwind developer. Generate raw HTML with tailwind classes for the next request. Only output html code. Use inline styles sparingly.`
                },
                {
                    role: "user",
                    content: enhancedPrompt || ""
                }
            ]
        });

        const code = codeGenerationResponse.choices[0].message.content || "";

        if (!code) {
            await prisma.conversation.create({ data: { role: "assistant", content: "Unable to generate code. Please try again.", projectId: project.id } });
            await prisma.user.update({ where: { id: userId }, data: { credits: { increment: 5 } } });
            return;
        }

        const version = await prisma.version.create({
            data: {
                code: code.replace(/```html/gi, "").replace(/```/g, "").trim(),
                projectId: project.id
            }
        });

        await prisma.websiteProject.update({
            where: { id: project.id },
            data: { currentCode: code, currentVersionIndex: version.id }
        });

    } catch (error: any) {
        // Refund credits on failure
        await prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: 5 } }
        });
        res.status(500).json({ message: error.message });
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
        const project = await prisma.websiteProject.findUnique({
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
        const project = await prisma.websiteProject.findUnique({ where: { id, userId: req.userId } });
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
