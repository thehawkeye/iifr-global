// Production-side capture: same audit against https://iifr.global
// to filter out localhost-only artifacts like CORS for cross-origin fonts.

import { chromium } from "/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;

const ROUTES = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/programmes", key: "programmes" },
  { path: "/ecp", key: "ecp" },
  { path: "/efm", key: "efm" },
  { path: "/applied-research", key: "ar" },
];

const WIDTHS = [
  { w: 1280, h: 800, key: "1280" },
  { w: 1440, h: 900, key: "1440" },
];

const BASE = "https://iifr.global";

async function probeRoute(browser, route, viewport) {
  const ctx = await browser.newContext({ viewport: { width: viewport.w, height: viewport.h }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) => { failedRequests.push({ url: req.url(), failure: req.failure()?.errorText }); });
  page.on("response", (resp) => { if (resp.status() >= 400) failedRequests.push({ url: resp.url(), status: resp.status() }); });

  const url = `${BASE}${route.path}`;
  const start = Date.now();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);
  const ms = Date.now() - start;

  const report = await page.evaluate(() => {
    const hero = document.querySelector(".iifr-page-hero");
    const heroBg = document.querySelector(".iifr-page-hero__bg");
    const heroEyebrow = document.querySelector(".iifr-page-hero__eyebrow");
    const heroH1 = document.querySelector(".iifr-page-hero__inner h1");
    const heroP = document.querySelector(".iifr-page-hero__inner p");
    function pickColor(el) { if (!el) return null; const s = window.getComputedStyle(el); return { color: s.color, textShadow: s.textShadow, fontWeight: s.fontWeight, fontSize: s.fontSize }; }
    return {
      docTitle: document.title,
      heroClassList: hero ? hero.className : null,
      heroHasBg: !!heroBg,
      heroBgPos: heroBg ? window.getComputedStyle(heroBg).backgroundPosition : null,
      heroBgInline: heroBg ? heroBg.getAttribute("style") : null,
      heroEyebrowStyles: pickColor(heroEyebrow),
      heroH1Styles: pickColor(heroH1),
      heroPStyles: pickColor(heroP),
      // Capture the full screen, focused on hero
    };
  });

  const heroShot = await page.screenshot({ clip: { x: 0, y: 0, width: viewport.w, height: Math.min(viewport.h * 2, 1800) } });
  const fullShot = await page.screenshot({ fullPage: true });
  await ctx.close();
  return { url, ms, viewport, consoleErrors, failedRequests, ...report, heroScreenshotBytes: heroShot.length, fullScreenshotBytes: fullShot.length };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const r of ROUTES) {
    for (const v of WIDTHS) {
      const fileBase = `prod_${r.key}_${v.key}`;
      console.log(`=== PROD ${r.path} @ ${v.w}x${v.h}`);
      let report;
      try {
        report = await probeRoute(browser, r, v);
      } catch (err) {
        report = { error: err.message };
      }
      await writeFile(join(OUT_DIR, `${fileBase}.json`), JSON.stringify(report, null, 2));
    }
  }
  await browser.close();
  console.log("DONE");
}

main().catch((e) => { console.error(e); process.exit(1); });
