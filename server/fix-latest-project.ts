import { PrismaClient } from '@prisma/client';
import openai, { getAIModels } from './configs/openai.js';

const prisma = new PrismaClient();
const SYSTEM_PROMPT = `You are an expert web developer AI. Output ONLY valid, clean HTML5. 
You MUST include the Tailwind CSS CDN (<script src="https://cdn.tailwindcss.com"></script>) in the <head> for styling.
Include necessary inline JavaScript at the bottom of the <body>.
Import and use modern Google Fonts (e.g., Inter, Poppins).
Implement beautiful, modern UI with glassmorphism, soft gradients, smooth animations, and proper whitespace.
Do NOT wrap your response in markdown tags (e.g., \`\`\`html) - output only the raw HTML code.`;

async function regenerate() {
    const project = await prisma.websiteProject.findFirst({
        orderBy: { updatedAt: 'desc' }
    });

    if (!project) return;
    console.log(`Regenerating project: ${project.id}`);

    const model = getAIModels()[0];

    const completion = await openai.chat.completions.create({
        model,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: project.initialPrompt || "Make a modern website" }
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 8192,
    });

    let code = completion.choices?.[0]?.message?.content || "";
    code = code.replace(/^```html\s*\n?/i, '');
    code = code.replace(/^```\s*\n?/i, '');
    code = code.replace(/\n?```\s*$/i, '');

    await prisma.websiteProject.update({
        where: { id: project.id },
        data: { currentCode: code }
    });

    // update latest version
    const version = await prisma.version.findFirst({
        where: { projectId: project.id },
        orderBy: { createdAt: 'desc' }
    });
    if (version) {
        await prisma.version.update({
            where: { id: version.id },
            data: { code }
        });
    }

    console.log("Done");
}

regenerate().catch(console.error).finally(() => prisma.$disconnect());
