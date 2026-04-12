import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListingCard } from "@/components/listings/listing-card";

describe("ListingCard Component", () => {
  const mockListing = {
    id: "123",
    title: "Gibson Les Paul Standard",
    price: 2500,
    source: "REVERB",
  };

  it("renders the title and price correctly", () => {
    render(<ListingCard item={mockListing} />);
    
    expect(screen.getByText("Gibson Les Paul Standard")).toBeDefined();
    expect(screen.getByText("$2,500")).toBeDefined();
    expect(screen.getByText("REVERB")).toBeDefined();
  });

  it("contains a link to the gear detail page", () => {
    render(<ListingCard item={mockListing} />);
    
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/gear/123");
  });
});
