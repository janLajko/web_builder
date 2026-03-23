const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from the current directory (server)
dotenv.config();

async function testQwen() {
  // Use the specific Qwen model from the user's snippet
  const model = "qwen/qwen2.5-coder-32b-instruct";
  const apiKey = process.env.AI_API_KEY; // This should be the new key
  
  console.log("Testing Qwen API with model:", model);
  console.log("Using API Key:", apiKey ? (apiKey.substring(0, 10) + "...") : "MISSING");

  if (!apiKey) {
    console.error("Error: AI_API_KEY is not set in .env");
    process.exit(1);
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });

  try {
    const completion = await client.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: "Say 'Qwen is working!'" }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 100
    });

    console.log("\n--- Response ---");
    console.log(completion.choices[0].message.content);
    console.log("----------------\n");
    console.log("Test successful!");
  } catch (error) {
    console.error("\n--- Error ---");
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);
    if (error?.response?.data) {
        console.error("Details:", JSON.stringify(error.response.data, null, 2));
    }
    console.error("-------------\n");
    process.exit(1);
  }
}

testQwen();
