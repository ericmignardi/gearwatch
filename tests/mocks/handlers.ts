import { http, HttpResponse } from "msw";

export const handlers = [
  // Example handler for a search API
  http.get("/api/search", () => {
    return HttpResponse.json([
      { id: "1", title: "Mock Fender Stratocaster", price: 1200 },
    ]);
  }),

  // Add more handlers as needed for Gemini AI or internal routes
];
