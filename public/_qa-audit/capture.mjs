#!/usr/bin/env node
/**
 * Desktop UI audit capture for IIFR Global.
 *
 * For each primary route at 1280x800 and 1440x900:
 *   - Waits for networkidle + 1.5s settle (legacy CSS + FA6 + Bootstrap load time)
 *   - Captures screenshot
 *   - Reports console errors / warnings
 *   - Reports 404 requests
 *   - Reports scrollHeight vs viewportHeight (overflow detection)
 *   - Reports hero readability: rgba of eyebrow/h1/p text-shadow / contrast estimate
 *   - Reports whether hero has a background-image and what background-position
 *   - Reports whether nav home/programs/ecp/efm/applied-research links exist
 *   - Reports FAQ anchor on /ecp
 *   - Reports font-awesome icon presence
 *   - Reports YouTube no-cookie embed count
 *
 * Per-route JSON report is emitted under public/_qa-audit/<route>_<width>.json
 * Screenshots are written to public/_qa-audit/<route>_<width>.png
 *
 * Run: node public/_qa-audit/capture.mjs
 */

// Resolve playwright from the source repo's node_modules so this worktree
// (which has no node_modules of its own) can still drive the browser.
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

const BASE = "http://localhost:4323";

async function probeRoute(browser, route, viewport, fileBase) {
  const ctx = await browser.newContext({ viewport: { width: viewport.w, height: viewport.h } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const failedRequests = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on("response", (resp) => {
    if (resp.status() >= 400) {
      failedRequests.push({ url: resp.url(), status: resp.status() });
    }
  });

  const url = `${BASE}${route.path}`;
  const start = Date.now();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const ms = Date.now() - start;

  const report = await page.evaluate(() => {
    function pickBg(el) {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        backgroundImage: style.backgroundImage,
        backgroundPosition: style.backgroundPosition,
        backgroundSize: style.backgroundSize,
      };
    }
    function getSelRect(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        exists: true,
        rect: { x: r.x, y: r.y, width: r.width, height: r.height },
        color: style.color,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        textShadow: style.textShadow,
        text: (el.innerText || el.textContent || "").slice(0, 120),
      };
    }
    const hero = document.querySelector(".iifr-page-hero");
    const heroBg = document.querySelector(".iifr-page-hero__bg");
    const heroEyebrow = document.querySelector(".iifr-page-hero__eyebrow");
    const heroH1 = document.querySelector(".iifr-page-hero__inner h1");
    const heroP = document.querySelector(".iifr-page-hero__inner h1 + p") || document.querySelector(".iifr-page-hero__inner p");
    const heroCtas = document.querySelectorAll(".iifr-page-hero__cta a");
    const navLinks = Array.from(document.querySelectorAll(".iifr-nav-links a, .iifr-nav-submenu a")).map((a) => a.getAttribute("href"));
    const subLinks = Array.from(document.querySelectorAll(".iifr-nav-submenu a")).map((a) => a.getAttribute("href"));
    const faIcons = document.querySelectorAll('i[class*="fa-"]').length;
    const ytEmbeds = Array.from(document.querySelectorAll("iframe")).filter((i) =>
      (i.getAttribute("src") || "").includes("youtube-nocookie.com")
    ).length;
    const docTitle = document.title;
    const scrollH = document.documentElement.scrollHeight;
    const viewportH = window.innerHeight;
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;
    const heroContrastScope =
      document.querySelector(".iifr-hero-contrast--efm") ||
      document.querySelector(".iifr-hero-contrast--applied-research") ||
      document.querySelector(".iifr-page-hero.iifr-hero-contrast");
    // FAQ anchor (ECP only)
    const faqAnchor = document.querySelector("#faq");
    // journey / how-we-deliver
    const ecpJourneySteps = document.querySelectorAll(".ecp-journey .ecp-step").length;
    return {
      docTitle,
      scrollH,
      viewportH,
      horizontalOverflow,
      heroExists: !!hero,
      heroClassList: hero ? hero.className : null,
      heroHasBg: !!heroBg,
      heroBgInfo: heroBg ? pickBg(heroBg) : null,
      heroEyebrow: getSelRect(".iifr-page-hero__eyebrow"),
      heroH1: getSelRect(".iifr-page-hero__inner h1"),
      heroP: getSelRect(".iifr-page-hero__inner p"),
      heroCtaCount: heroCtas.length,
      heroCtaLabels: Array.from(heroCtas).map((a) => a.textContent.trim().slice(0, 50)),
      navLinks,
      subLinks,
      faIcons,
      ytEmbeds,
      heroContrastScope: !!heroContrastScope,
      faqAnchor: !!faqAnchor,
      ecpJourneySteps,
      modalPresent: !!document.querySelector("#iifrApplyModal"),
      floatCtaPresent: !!document.querySelector(".iifr-float-cta"),
      footerPresent: !!document.querySelector("footer"),
      bodyClass: document.body.className,
    };
  });

  const heroOnly = await page.screenshot({ clip: { x: 0, y: 0, width: viewport.w, height: Math.min(viewport.h, 900) } });
  await writeFile(join(OUT_DIR, `${fileBase}_hero.png`), heroOnly);
  const png = await page.screenshot({ fullPage: true });
  await writeFile(join(OUT_DIR, `${fileBase}_full.png`), png);
  await ctx.close();
  return { url, ms, viewport, consoleErrors, consoleWarnings, failedRequests, ...report, screenshotBytes: png.length, heroScreenshotBytes: heroOnly.length };
}


async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const summary = [];
  for (const r of ROUTES) {
    for (const v of WIDTHS) {
      const fileBase = `${r.key}_${v.key}`;
      console.log(`=== ${r.path} @ ${v.w}x${v.h}`);
      let report;
      try {
        report = await probeRoute(browser, r, v, fileBase);
      } catch (err) {
        report = { error: err.message, stack: err.stack };
      }
      await writeFile(join(OUT_DIR, `${fileBase}.json`), JSON.stringify(report, null, 2));
      summary.push({ route: r.path, width: v.w, ok: !report.error, heroHasBg: report.heroHasBg, scrollH: report.scrollH, viewportH: report.viewportH, horizontalOverflow: report.horizontalOverflow, faIcons: report.faIcons, ytEmbeds: report.ytEmbeds, heroContrastScope: report.heroContrastScope, faqAnchor: report.faqAnchor, ecpJourneySteps: report.ecpJourneySteps, consoleErrors: report.consoleErrors?.length || 0, failedRequests: report.failedRequests?.length || 0 });
      console.log(JSON.stringify(summary.at(-1)));
    }
  }
  await writeFile(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));
  await browser.close();
  console.log("=== DONE ===");
}

main().catch((err) => {
  console.error("FATAL", err);
  process.exit(1);
});
