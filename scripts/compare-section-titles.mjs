/**
 * Playwright: compare "Projects" and "Blog" section title typography
 * between local site and jdx.dev. Takes screenshots and prints computed styles.
 *
 * Run: node scripts/compare-section-titles.mjs
 * Ensure dev server is running first: pnpm dev
 */

import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "scripts", "screenshots-compare");
const viewport = { width: 1280, height: 900 };

async function getSectionTitleStyles(page, label) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);

  const data = await page.evaluate(() => {
    const result = { projects: null, blog: null };
    const headings = document.querySelectorAll("main h2, h2");
    for (const h of headings) {
      const text = (h.textContent || "").trim();
      if (!text) continue;
      const s = getComputedStyle(h);
      const info = {
        text,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        textTransform: s.textTransform,
        color: s.color,
        lineHeight: s.lineHeight,
        className: h.className,
      };
      if (/projects/i.test(text)) result.projects = info;
      if (/blog/i.test(text)) result.blog = info;
    }
    return result;
  });

  return { label, ...data };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport });

  try {
    const localUrl = "http://localhost:4321/en";
    const jdxUrl = "https://jdx.dev/";

    console.log("\n=== Fetching jdx.dev ===\n");
    const jdxPage = await context.newPage();
    await jdxPage.goto(jdxUrl, { waitUntil: "networkidle", timeout: 20000 });
    const jdxStyles = await getSectionTitleStyles(jdxPage, "jdx.dev");
    await jdxPage.screenshot({
      path: join(OUT_DIR, "jdx-dev-full.png"),
      fullPage: true,
    });
    await jdxPage.close();

    console.log("\n=== Fetching local (localhost:4321/en) ===\n");
    const localPage = await context.newPage();
    await localPage.goto(localUrl, { waitUntil: "networkidle", timeout: 15000 });
    const localStyles = await getSectionTitleStyles(localPage, "local");
    await localPage.screenshot({
      path: join(OUT_DIR, "local-en-full.png"),
      fullPage: true,
    });
    await localPage.close();

    console.log("--- jdx.dev section title styles ---");
    console.log("Projects:", JSON.stringify(jdxStyles.projects, null, 2));
    console.log("Blog:", JSON.stringify(jdxStyles.blog, null, 2));

    console.log("\n--- local (localhost:4321/en) section title styles ---");
    console.log("Projects:", JSON.stringify(localStyles.projects, null, 2));
    console.log("Blog:", JSON.stringify(localStyles.blog, null, 2));

    writeFileSync(
      join(OUT_DIR, "styles.json"),
      JSON.stringify({ jdx: jdxStyles, local: localStyles }, null, 2)
    );
    console.log("\nScreenshots and styles saved to", OUT_DIR);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main();
