import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.TRUSTED_ORIGINS || "http://localhost:5173", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "DivStack AI", // Optional. Site title for rankings on openrouter.ai.
    },
});

export default openai;
