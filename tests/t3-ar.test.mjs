/**
 * T3-AR (Applied Research) test suite.
 *
 * Two tests for the T3 fixes captured in the additional-changes register
 * (docs/iifr-phase2-additional-changes-2026-08-03.md) for /applied-research:
 *
 *   1. Hero text readability — the page must apply the T4 contrast overlay
 *      pattern (dark ::after gradient + white text + text-shadow).
 *   2. Restore "How We Deliver" icons — the journey section must reference
 *      FontAwesome icons inside each step node (mirroring the EFM
 *      Programme Journey pattern), not bare numeric nodes.
 *
 * Plus one sanity check: the page uses SiteLayout with path="/applied-research"
 * so the header active-state, SEO context, and ItemList schema in
 * `src/lib/seo.ts` all wire correctly.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString("utf8");

test("Applied Research hero has contrast overlay (T3 readability fix)", async () => {
  const ar = await text("src/pages/applied-research.astro");
  // bodyClass wires the page into the T4 contrast stylesheet.
  assert.match(
    ar,
    /bodyClass="iifr-redesign-scope iifr-hero-contrast"/,
    "applied-research.astro must add the iifr-hero-contrast bodyClass",
  );
  // Page-side hero scope identifier so future per-page overrides can hook in.
  assert.match(
    ar,
    /iifr-hero-contrast--applied-research/,
    "hero div must carry the --applied-research scope",
  );
  // The contrast CSS bundle supplies the dark ::after overlay, the white
  // copy, and the text-shadow on h1/h2 — all of those are required by the
  // T4 register row.
  const contrast = await text("src/styles/t4-hero-contrast.css");
  assert.match(contrast, /::after/);
  assert.match(contrast, /text-shadow:\s*0\s*2px/);
  assert.match(contrast, /color:\s*#ffffff/);
  assert.match(contrast, /linear-gradient\(/);
  // Hero bg should still reference a background image (not a fabricated
  // asset) — the workshops-hero.jpg is already live on Hostinger.
  assert.match(ar, /assets\/images\/research\/workshops-hero\.jpg/);
});

test("Applied Research 'How We Deliver' section restores FontAwesome icons in every step", async () => {
  const ar = await text("src/pages/applied-research.astro");
  // Section title (case-insensitive)
  assert.match(ar, /How We Deliver/i);
  // Journey wrapper
  assert.match(ar, /ecp-journey ecp-journey--three/);
  // The EFM Programme Journey pattern pairs an <i class="fa-light fa-...">
  // with the step number. We require that the data array declares one
  // fa-light icon per step and the markup renders an <i class={step.icon}>
  // element inside the step node.
  assert.match(
    ar,
    /icon:\s+"fa-light fa-[a-z0-9-]+"/g,
    "each delivery step must declare a fa-light icon class",
  );
  // Exactly three steps — Open Enrolment, In-House, Hybrid — per the live PHP.
  const stepTitles = ar.match(/title:\s+"(Open Enrolment|In-House|Hybrid)"/g) ?? [];
  assert.equal(
    stepTitles.length,
    3,
    `expected exactly 3 delivery steps (Open Enrolment, In-House, Hybrid), found ${stepTitles.length}`,
  );
  // Markup must render the icon <i> tag paired with the step number
  // (mirrors the EFM live source structure).
  assert.match(ar, /<i class=\{step\.icon\}>\s*<\/i>/);
  assert.match(ar, /<span class="ecp-step__num">\{step\.num\}<\/span>/);
});

test("Applied Research page uses SiteLayout with /applied-research path", async () => {
  const ar = await text("src/pages/applied-research.astro");
  assert.match(ar, /import SiteLayout from "\.\.\/layouts\/SiteLayout\.astro"/);
  assert.match(
    ar,
    /path="\/applied-research"/,
    "page must declare path=\"/applied-research\" so SEO + nav active state wire correctly",
  );
});

test("Applied Research page is pre-rendered by the Astro build", async () => {
  const { stat } = await import("node:fs/promises");
  const candidates = [".vercel/output/static", "dist"];
  for (const dir of candidates) {
    try {
      await stat(dir);
      await stat(`${dir}/applied-research/index.html`);
      return;
    } catch {
      // try next
    }
  }
  assert.fail("no .vercel/output/static or dist/ found — run `npm run build` first");
});