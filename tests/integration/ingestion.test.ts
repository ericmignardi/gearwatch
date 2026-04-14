import { describe, it, expect, vi, beforeEach } from "vitest";
import { ingestListings } from "@/libs/ingestion";
import { prisma } from "@/libs/prisma";
import { parseGearTitle } from "@/libs/ai-parser";
import { Source, Condition } from "@prisma/client";

// Mock dependencies
vi.mock("@/libs/prisma", () => ({
  prisma: {
    listing: {
      findFirst: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    priceSnapshot: {
      create: vi.fn(),
    },
    $transaction: vi.fn((promises) => Promise.all(promises)),
  },
}));

vi.mock("@/libs/ai-parser", () => ({
  parseGearTitle: vi.fn(),
}));

describe("ingestListings integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create new listings and snapshots", async () => {
    const scrapedData = [
      {
        title: "Fender Stratocaster",
        price: 1200,
        url: "https://example.com/strat",
        imageUrl: "https://example.com/strat.jpg",
      },
    ];

    (prisma.listing.findFirst as any).mockResolvedValue(null);
    (parseGearTitle as any).mockResolvedValue({
      brand: "Fender",
      model: "Stratocaster",
      condition: "EXCELLENT",
    });

    const result = await ingestListings(scrapedData, Source.KIJIJI);

    expect(prisma.listing.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: "Fender Stratocaster",
        brand: "Fender",
        model: "Stratocaster",
        price: 1200,
        source: Source.KIJIJI,
      }),
    });
    expect(result.created).toBe(1);
  });

  it("should update existing listings and record new price snapshots", async () => {
    const scrapedData = [
      {
        title: "Fender Stratocaster",
        price: 1100, // Price changed
        url: "https://example.com/strat",
      },
    ];

    const existingListing = {
      id: "existing-id",
      url: "https://example.com/strat",
      price: 1200,
    };

    (prisma.listing.findFirst as any).mockResolvedValue(existingListing);

    const result = await ingestListings(scrapedData, Source.KIJIJI);

    expect(prisma.listing.update).toHaveBeenCalled();
    expect(prisma.priceSnapshot.create).toHaveBeenCalledWith({
      data: {
        listingId: "existing-id",
        price: 1100,
      },
    });
    expect(result.updated).toBe(1);
  });

  it("should handle invalid scraped data correctly", async () => {
    const scrapedData = [
      {
        title: "Not a guitar",
        price: 10,
        url: "https://example.com/not-gear",
      },
    ];

    (prisma.listing.findFirst as any).mockResolvedValue(null);
    (parseGearTitle as any).mockResolvedValue(null); // AI says not gear

    const result = await ingestListings(scrapedData, Source.KIJIJI);

    expect(prisma.listing.create).not.toHaveBeenCalled();
    expect(result.skipped).toBe(1);
  });
});
