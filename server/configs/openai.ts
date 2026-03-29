import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL?.trim() || undefined;

const DEFAULT_AI_MODELS = ["gpt-4o-mini", "gpt-4o"];

export function getAIModels(): string[] {
    const configuredModels = [
        process.env.PRIMARY_AI_MODEL?.trim(),
        process.env.SECONDARY_AI_MODEL?.trim(),
        process.env.TERTIARY_AI_MODEL?.trim(),
    ].filter((model): model is string => Boolean(model));

    return configuredModels.length > 0
        ? [...new Set(configuredModels)]
        : DEFAULT_AI_MODELS;
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
});

export default openai;
