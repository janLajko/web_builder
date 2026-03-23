import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function testConnection() {
    try {
        const model = process.env.PRIMARY_AI_MODEL || "qwen/qwen2.5-coder-32b-instruct";
        console.log(`Testing NVIDIA API key with model: ${model}...`);
        
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: "user", content: "Say 'Qwen API is working!'" }
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 100,
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
