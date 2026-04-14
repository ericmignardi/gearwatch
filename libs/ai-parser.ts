import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function parseGearTitle(title: string) {
  const prompt = `
    Analyze this marketplace listing title: "${title}"
    
    1. Determine if this is a musical instrument or pro audio gear (Guitar, Bass, Amp, Pedal, Synth, etc.). 
       If it is an accessory (case, T-shirt, pick, strap, strings, part/screw, cable) or unrelated, return {"isGear": false}.
    
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
    
    // Improved cleaning: Remove markdown code blocks and find the first { and last }
    let cleanJson = text.trim();
    if (cleanJson.includes("{")) {
        cleanJson = cleanJson.substring(cleanJson.indexOf("{"), cleanJson.lastIndexOf("}") + 1);
    }
    
    const parsed = JSON.parse(cleanJson);
    
    if (parsed.isGear === false) return null;
    
    return {
      brand: (parsed.brand && parsed.brand !== "string") ? parsed.brand : "Unknown",
      model: (parsed.model && parsed.model !== "string") ? parsed.model : "Unknown",
      condition: ["NEW", "EXCELLENT", "GOOD", "FAIR", "POOR"].includes(parsed.condition) ? parsed.condition : "GOOD"
    };
  } catch (error) {
    console.warn("AI Parsing Warning (using fallback):", error instanceof Error ? error.message : error);
    
    // Robust fallback: try simple regex if AI fails
    const commonBrands = ["Fender", "Gibson", "PRS", "Ibanez", "Martin", "Taylor", "Epiphone", "Squier"];
    const foundBrand = commonBrands.find(b => title.toLowerCase().includes(b.toLowerCase()));
    
    return { 
      brand: foundBrand || "Unknown", 
      model: "Unknown", 
      condition: "GOOD" 
    };
  }
}
