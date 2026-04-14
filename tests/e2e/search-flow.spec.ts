import { test, expect } from "@playwright/test";

test.describe("Search Flow", () => {
  test("should allow searching for an instrument from the home page", async ({
    page,
  }) => {
    await page.goto("/");
    
    // Check if the landing page hero is visible
    await expect(page.locator("h1")).toContainText("Buy better.");
    
    // Since we are signed out in E2E by default, we should see "Join to Search"
    const joinButton = page.getByText("Join to Search");
    await expect(joinButton).toBeVisible();
  });

  test("should display search results correctly", async ({
    page,
  }) => {
    // Navigate directly to search page with a query
    await page.goto("/search?q=fender");
    
    // Check if the search results page header is correct
    await expect(page.locator("h1")).toContainText('Results for: "fender"');
    
    // Check if the market scan indicator is present
    await expect(page.getByText("LIVE MARKET SCAN")).toBeVisible();
  });

  test("should handle empty search results gracefully", async ({
    page,
  }) => {
    await page.goto("/search?q=nonexistentgear12345");
    
    await expect(page.locator("h1")).toContainText('Results for: "nonexistentgear12345"');
    // We expect some empty state message or just the header with no cards
  });
});
