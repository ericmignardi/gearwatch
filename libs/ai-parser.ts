import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function parseGearTitle(title: string) {
  const prompt = `
    Extract the brand and specific model from this musical instrument listing title: "${title}".
    Return the result strictly as a JSON object with "brand" and "model" keys.
    If the brand or model is not clear, use "Unknown". 
    Example: "Fender Player Stratocaster" -> {"brand": "Fender", "model": "Player Stratocaster"}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Remove potential markdown formatting from the response
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return { brand: "Unknown", model: "Unknown" };
  }
}
