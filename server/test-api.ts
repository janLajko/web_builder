import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function testConnection() {
    try {
        console.log("Testing NVIDIA API key...");
        const completion = await openai.chat.completions.create({
            model: "deepseek-ai/deepseek-v3.2",
            messages: [
                { role: "user", content: "Say 'API Key is working!'" }
            ],
            temperature: 1,
            top_p: 0.95,
            max_tokens: 8192,
        });

        console.log("Success! Response from model:");
        console.log(completion.choices[0].message.content);
        console.log("\nAPI Key is valid and connected to backend properly.");
    } catch (error: any) {
        console.error("Failed to connect to NVIDIA API:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testConnection();
