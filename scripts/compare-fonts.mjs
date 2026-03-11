/**
 * Playwright script: compare font usage between local site and jdx.dev
 * Run: pnpm compare-fonts   (or: node scripts/compare-fonts.mjs)
 * Ensure dev server is running first: pnpm dev
 */

import { chromium } from "playwright";

async function collectFontInfo(page, label) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);

  const info = await page.evaluate(() => {
    const body = document.body;
    const bodyStyle = getComputedStyle(body);
    const bodyFont = bodyStyle.fontFamily;

    const h1 = document.querySelector("h1");
    const h1Font = h1 ? getComputedStyle(h1).fontFamily : null;

    const firstP = document.querySelector("main p, .intro p, p");
    const pFont = firstP ? getComputedStyle(firstP).fontFamily : null;

    const loadedFonts = [];
    document.fonts.forEach((f) => {
      loadedFonts.push({
        family: f.family,
        status: f.status,
        weight: f.weight,
        style: f.style,
      });
    });

    const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts"]'))
      .map((l) => l.href)
      .filter(Boolean);

    // Check if browser actually has DM Mono ready for use (resolved, not just requested)
    const dmMonoChecked = document.fonts.check("15px DM Mono");
    const dmSerifChecked = document.fonts.check("15px \"DM Serif Display\"");

    return {
      bodyFontFamily: bodyFont,
      h1FontFamily: h1Font,
      pFontFamily: pFont,
      loadedFonts,
      fontLinks,
      bodyFontsLength: document.fonts.size,
      dmMonoResolved: dmMonoChecked,
      dmSerifResolved: dmSerifChecked,
    };
  });

  return { label, ...info };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("\n=== Local (localhost:4321) ===\n");
    await page.goto("http://localhost:4321/", { waitUntil: "domcontentloaded", timeout: 10000 });
    const local = await collectFontInfo(page, "localhost:4321");
    printFontInfo(local);

    console.log("\n=== jdx.dev ===\n");
    await page.goto("https://jdx.dev/", { waitUntil: "domcontentloaded", timeout: 15000 });
    const jdx = await collectFontInfo(page, "jdx.dev");
    printFontInfo(jdx);

    console.log("\n=== Comparison ===\n");
    console.log("Body font - Local:", local.bodyFontFamily);
    console.log("Body font - jdx.dev:", jdx.bodyFontFamily);
    console.log("\nDM Mono resolved (actually used for layout):");
    console.log("  Local:", local.dmMonoResolved);
    console.log("  jdx.dev:", jdx.dmMonoResolved);
    console.log("\nDM Mono in loaded fonts (local):", local.loadedFonts.some((f) => f.family.includes("DM Mono")));
    console.log("DM Mono in loaded fonts (jdx):", jdx.loadedFonts.some((f) => f.family.includes("DM Mono")));
    console.log("\nFont link URLs (local):", local.fontLinks);
    console.log("Font link URLs (jdx):", jdx.fontLinks);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

function printFontInfo(info) {
  console.log("Body font-family:", info.bodyFontFamily);
  console.log("H1 font-family:", info.h1FontFamily);
  console.log("P font-family:", info.pFontFamily);
  console.log("DM Mono resolved (document.fonts.check):", info.dmMonoResolved ?? "N/A");
  console.log("DM Serif Display resolved:", info.dmSerifResolved ?? "N/A");
  console.log("Loaded fonts count:", info.bodyFontsLength);
  console.log(
    "Loaded font families:",
    [...new Set(info.loadedFonts.map((f) => f.family))].join(", ") || "(none)"
  );
  console.log("Font stylesheet URLs:", info.fontLinks.join("\n  ") || "(none)");
}

main();
