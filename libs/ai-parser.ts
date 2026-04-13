import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// Using gemini-1.5-flash for cost-efficiency and faster performance on simple title parsing
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function parseGearTitle(title: string) {
  const prompt = `
    Analyze this marketplace listing title: "${title}"
    
    1. Determine if this is a musical instrument (Guitar, Bass, Amp, Pedal, etc.). 
       If it is an accessory (case, T-shirt, pick, strap, strings, part/screw) or unrelated, return {"isGear": false}.
    
    2. If it IS gear:
       - Extract the brand (e.g., Fender, Gibson).
       - Extract the specific model (e.g., Stratocaster, Les Paul Standard, Silver Sky).
       - Map condition to one of: NEW, EXCELLENT, GOOD, FAIR, POOR. (Default to GOOD).
    
    Return strictly JSON:
    {"isGear": boolean, "brand": string, "model": string, "condition": string}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown and parse
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    
    if (parsed.isGear === false) return null;
    
    return {
      brand: parsed.brand || "Unknown",
      model: parsed.model || "Unknown",
      condition: parsed.condition || "GOOD"
    };
  } catch (error) {
    console.error("AI Parsing Error:", error);
    // On error, we return a fallback rather than crashing, 
    // but the Pro model is highly stable.
    return { brand: "Unknown", model: "Unknown", condition: "GOOD" };
  }
}
