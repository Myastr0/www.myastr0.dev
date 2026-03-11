#!/usr/bin/env node
/**
 * Captures the homepage as the default OG image using Playwright.
 * Saves to public/default-og.jpg (1200×630, OG recommended size).
 *
 * Usage:
 *   node scripts/capture-og-image.mjs [url] [theme]
 *
 *   theme: "dark" (default) | "light" — forces the site’s theme before capture.
 *
 * If no URL is given, uses production so no local server is needed.
 * To capture your local build:
 *   pnpm run build && pnpm run preview
 *   node scripts/capture-og-image.mjs http://localhost:4173 dark
 */

import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "public", "default-og.jpg");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const url = process.argv[2] ?? "https://www.myastr0.dev/";
const theme = (process.argv[3] ?? "dark").toLowerCase() === "light" ? "light" : "dark";

async function applyTheme(page, themeValue) {
  await page.evaluate((t) => {
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }, themeValue);
  await page.waitForTimeout(150);
}

async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: OG_WIDTH, height: OG_HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await applyTheme(page, theme);
    await page.screenshot({
      path: OUT_PATH,
      type: "jpeg",
      quality: 90,
    });
    console.log(`OG image (${theme}) saved to ${OUT_PATH}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
