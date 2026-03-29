import openai, { getAIModels } from './configs/openai.js';

const SYSTEM_PROMPT = `You are an expert web developer AI. Output ONLY valid, clean HTML5. 
You MUST include the Tailwind CSS CDN (<script src="https://cdn.tailwindcss.com"></script>) in the <head> for styling.
Include necessary inline JavaScript at the bottom of the <body>.
Import and use modern Google Fonts (e.g., Inter, Poppins).
Implement beautiful, modern UI with glassmorphism, soft gradients, smooth animations, and proper whitespace.
Do NOT wrap your response in markdown tags (e.g., \`\`\`html) - output only the raw HTML code.`;

async function testAI() {
    const model = getAIModels()[0];

    console.log(`Testing with model: ${model}`);

    try {
        const completion = await openai.chat.completions.create({
            model,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: "Create a modern simple button" }
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 8192,
        });

        const code = completion.choices?.[0]?.message?.content || "";
        console.log("--- START OF RESPONSE ---");
        console.log(code.substring(0, 1000));
        console.log("--- END OF RESPONSE ---");
    } catch (e) {
        console.error(e);
    }
}

testAI().catch(console.error);
