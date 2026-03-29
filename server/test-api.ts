import openai, { getAIModels } from "./configs/openai.js";

async function testConnection() {
    try {
        const model = getAIModels()[0];
        console.log(`Testing OpenAI API key with model: ${model}...`);
        
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: "user", content: "Say 'OpenAI API is working!'" }
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 100,
        });

        console.log("Success! Response from model:");
        console.log(completion.choices[0].message.content);
        console.log("\nAPI Key is valid and connected to backend properly.");
    } catch (error: any) {
        console.error("Failed to connect to OpenAI API:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
            if (error?.cause?.code) console.error("Cause code:", error.cause.code);
            if (error?.cause?.message) console.error("Cause message:", error.cause.message);
        }
    }
}

testConnection();
