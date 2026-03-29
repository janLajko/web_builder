const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

async function testOpenAI() {
  const model = process.env.PRIMARY_AI_MODEL || 'gpt-4o-mini';
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
  
  console.log("Testing OpenAI API with model:", model);
  console.log("Using API Key:", apiKey ? (apiKey.substring(0, 10) + "...") : "MISSING");

  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY or AI_API_KEY is not set in .env");
    process.exit(1);
  }

  const client = new OpenAI({
    apiKey,
  });

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: "Say 'OpenAI is working!'" }],
      temperature: 0.2,
      top_p: 0.7,
      max_completion_tokens: 100
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

testOpenAI();
