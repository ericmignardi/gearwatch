import { describe, it, expect, vi } from "vitest";
import { parseGearTitle } from "@/libs/ai-parser";

// Mock the Google Generative AI
vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          generateContent: async (prompt: string) => {
            if (prompt.includes("Fender Strat")) {
              return {
                response: {
                  text: () => JSON.stringify({ brand: "Fender", model: "Stratocaster", condition: "EXCELLENT" }),
                },
              };
            }
            if (prompt.includes("Failme")) {
              throw new Error("API Error");
            }
            return {
              response: {
                text: () => "Invalid JSON",
              },
            };
          },
        };
      }
    },
  };
});

describe("parseGearTitle", () => {
  it("should parse a valid title into brand, model and condition", async () => {
    const result = await parseGearTitle("Fender Strat");
    expect(result).toEqual({ brand: "Fender", model: "Stratocaster", condition: "EXCELLENT" });
  });

  it("should return Unknown if title cannot be parsed into JSON", async () => {
    const result = await parseGearTitle("Invalid Title");
    expect(result).toEqual({ brand: "Unknown", model: "Unknown", condition: "GOOD" });
  });

  it("should handle Gemini API errors gracefully", async () => {
    const result = await parseGearTitle("Failme");
    expect(result).toEqual({ brand: "Unknown", model: "Unknown", condition: "GOOD" });
  });
});
