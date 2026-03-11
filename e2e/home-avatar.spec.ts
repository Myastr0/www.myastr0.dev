import { test, expect } from "@playwright/test";

test.describe("Home page avatar", () => {
  test("avatar has clean height and is visible", async ({ page }) => {
    await page.goto("/");

    const avatar = page.locator("[data-layout=index] section").first().locator("img");
    await expect(avatar).toBeVisible();

    const box = await avatar.boundingBox();
    expect(box).toBeTruthy();
    // Avatar should be square and have a clean size (min 100px, max 160px)
    expect(box!.width).toBeGreaterThanOrEqual(100);
    expect(box!.width).toBeLessThanOrEqual(160);
    expect(box!.height).toBeGreaterThanOrEqual(100);
    expect(box!.height).toBeLessThanOrEqual(160);
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(2);
  });

  test("intro section aligns avatar and content", async ({ page }) => {
    await page.goto("/");

    const main = page.locator("[data-layout='index']");
    await expect(main).toBeVisible();

    const section = main.locator("section").first();
    await expect(section).toHaveClass(/flex/);
    await expect(section).toHaveClass(/sm:flex-row/);
  });
});
