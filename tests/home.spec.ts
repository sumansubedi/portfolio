import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("introduces Suman and shows the passing status", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toContainText("Suman");
    await expect(page.getByText("all checks passing")).toBeVisible();
  });

  test("the interactive test runner reports all passing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /run tests/i }).click();
    // Wait for the suite to finish, then assert the green summary.
    await expect(page.getByText(/passing.*no failures/)).toBeVisible({
      timeout: 5000,
    });
  });

  test("links through to a blog post", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /why i own my tools/i }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /own my tools/i }),
    ).toBeVisible();
  });
});
