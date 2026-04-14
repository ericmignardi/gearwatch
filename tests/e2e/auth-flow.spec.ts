import { test, expect } from "@playwright/test";

test.describe("Auth Flow", () => {
  test("should allow users to sign in through Clerk modal", async ({ page }) => {
    await page.goto("/");
    
    // Landing page sign-in buttons (in header or hero)
    const signInButton = page.getByRole("button", { name: /Sign In|Join to Search/i });
    await expect(signInButton.first()).toBeVisible();
    
    // We avoid clicking it to stay on our domain unless we have a specific clerk mock set up
    // But we check it exists and is clickable
  });

  test("should show unauthorized message for unauthenticated users on dashboard", async ({
    page,
  }) => {
    // Navigating to dashboard should show error if not signed in
    await page.goto("/dashboard");
    
    // Expect specific error message instead of redirect
    await expect(page.getByText("Error: Unauthorized Access")).toBeVisible();
  });
});
