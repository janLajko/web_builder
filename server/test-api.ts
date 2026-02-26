import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.TRUSTED_ORIGINS || "http://localhost:5173",
        "X-Title": "DivStack AI",
    },
});

async function testConnection() {
    try {
        console.log("Testing OpenRouter API key...");
        const completion = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                { role: "user", content: "Say 'API Key is working!'" }
            ]
        });

        console.log("Success! Response from model:");
        console.log(completion.choices[0].message.content);
        console.log("\nAPI Key is valid and connected to backend properly.");
    } catch (error: any) {
        console.error("Failed to connect to OpenRouter API:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testConnection();
