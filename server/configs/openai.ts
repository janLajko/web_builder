import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

// Primary client (for Llama models) using AI_API_KEY
const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Secondary client (for DeepSeek models) using DEEPSEEK_API_KEY
export const deepseekClient = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

export default openai;
