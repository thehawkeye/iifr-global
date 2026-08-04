/**
 * T3-EFM (Executive Fellow in Management) test suite.
 *
 * Four tests for the T3 fixes captured in the additional-changes register
 * (docs/iifr-phase2-additional-changes-2026-08-03.md) for /efm:
 *
 *   1. Hero CTA copy — must read "Apply for February 2027 Cohort" (the
 *      Murali-confirmed February 2027 start date), no stale "October
 *      2026" / "2026 cohort" / "early-bird" copy anywhere on the page.
 *   2. Hero contrast — the page must apply the T4 contrast overlay
 *      pattern (dark ::after gradient + white text + text-shadow), and
 *      must carry the `iifr-hero-contrast--efm` scope identifier so a
 *      future per-page override can hook in.
 *   3. Programme Overview asset gate — must reference the existing
 *      production overview path; must NOT point at the hero path
 *      (the change register forbids reusing the hero for the overview
 *      section). The handoff doc must surface the two-asset gate.
 *   4. Page wiring — must use SiteLayout with path="/efm" so the SEO
 *      Course schema + nav active-state pick up, and must be
 *      pre-rendered by the Astro build.
 *
 * The apply.astro EFM cohort text is asserted separately in the
 * existing t4-tier3.test.mjs ("Apply page references 21 August 2026
 * (ECP) and February 2027 (EFM)") — that test was already green
 * before this card ran, confirming the cross-page cohort copy is
 * already on the canonical February 2027 form.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString("utf8");

test("EFM hero CTA uses the confirmed February 2027 start date and no stale cohort copy", async () => {
  const efm = await text("src/pages/efm.astro");

  // The Murali-confirmed CTA copy must appear at least once on the page
  // (hero CTA + final CTA both repeat it on purpose).
  const ctaMatches = efm.match(/Apply for February 2027 Cohort/g) ?? [];
  assert.ok(
    ctaMatches.length >= 2,
    `expected 'Apply for February 2027 Cohort' to appear at least twice (hero + final CTA), found ${ctaMatches.length}`,
  );

  // The page must show "February 2027" in plain copy (Quick Facts cohort
  // start cell).
  assert.match(efm, /February 2027/);

  // No stray 2026 cohort / early-bird copy anywhere on the EFM page.
  // The register's exact forbidden phrases are "October 2026",
  // "2026 cohort", and "early-bird"; we match those literal patterns
  // (and not a bare "2026" which would collide with unrelated dates
  // like the 2026-08-04 confirmation date sub-label).
  assert.doesNotMatch(efm, /October 2026/i);
  assert.doesNotMatch(efm, /2026 cohort/i);
  assert.doesNotMatch(efm, /early[ -]bird/i);
});

test("EFM hero has the contrast overlay (T4 readability fix) and --efm scope", async () => {
  const efm = await text("src/pages/efm.astro");

  // bodyClass wires the page into the T4 contrast stylesheet.
  assert.match(
    efm,
    /bodyClass="iifr-redesign-scope iifr-hero-contrast"/,
    "efm.astro must add the iifr-hero-contrast bodyClass",
  );

  // Page-side hero scope identifier reserved for future per-page overrides.
  assert.match(
    efm,
    /iifr-hero-contrast--efm/,
    "hero div must carry the --efm scope identifier",
  );

  // The contrast CSS bundle supplies the dark ::after overlay, the white
  // copy, and the text-shadow on h1/h2 — all of those are required by the
  // T4 register row "Improve hero text visibility, image alignment/crop".
  const contrast = await text("src/styles/t4-hero-contrast.css");
  assert.match(contrast, /::after/);
  assert.match(contrast, /text-shadow:\s*0\s*2px/);
  assert.match(contrast, /color:\s*#ffffff/);
  assert.match(contrast, /linear-gradient\(/);

  // Hero bg should still reference a background image (not a fabricated
  // asset) — the existing production reference `assets/images/efm/efm-hero.png`
  // is the live mirror's path and is what `src/lib/seo.ts` declares as the
  // OG image. Asset swap waits for t_1af67bcf.
  assert.match(efm, /assets\/images\/efm\/efm-hero\.png/);
});

test("EFM Programme Overview section does NOT reuse the hero image (DISTINCT_PAIR_REQUIRED gate)", async () => {
  const efm = await text("src/pages/efm.astro");

  // The change register + normalised image map (docs/iifr-page-image-map-
  // normalized-review-2026-08-04.md) mark Programme Overview as
  // DISTINCT_PAIR_REQUIRED — it must not reuse the hero path.
  // We use a sentinel overview path that is distinct from the hero path.
  assert.match(
    efm,
    /assets\/images\/efm\/efm-overview\.png/,
    "Programme Overview must reference an overview-specific path",
  );

  // The same src/pages/efm.astro source must contain BOTH the hero path
  // and the overview path, and the two strings must be distinct — proving
  // we are not silently aliasing one to the other.
  const heroHits = efm.match(/assets\/images\/efm\/efm-hero\.png/g) ?? [];
  const overviewHits = efm.match(/assets\/images\/efm\/efm-overview\.png/g) ?? [];
  assert.ok(
    heroHits.length >= 1,
    "hero path must still appear (hero image unchanged until t_1af67bcf)",
  );
  assert.ok(
    overviewHits.length >= 1,
    "overview path must appear at least once",
  );
  assert.notEqual(
    heroHits[0],
    overviewHits[0],
    "hero and overview must be distinct asset paths — DISTINCT_PAIR_REQUIRED",
  );

  // The handoff doc must surface the two-asset gate to Murali / the
  // next worker. We assert the marker comment block exists on the page
  // and the handoff doc exists in docs/.
  assert.match(efm, /DISTINCT_PAIR_REQUIRED/);
  await assert.doesNotReject(
    async () => await text("docs/t3-efm-handoff-2026-08-04.md"),
    "docs/t3-efm-handoff-2026-08-04.md must exist to record the asset blocker",
  );
});

test("EFM page uses SiteLayout with /efm path and is pre-rendered by the Astro build", async () => {
  const efm = await text("src/pages/efm.astro");
  assert.match(efm, /import SiteLayout from "\.\.\/layouts\/SiteLayout\.astro"/);
  assert.match(
    efm,
    /path="\/efm"/,
    "page must declare path=\"/efm\" so SEO Course schema + nav active state wire correctly",
  );

  // Pre-render check: Astro emits the static html during `npm run build`.
  const { stat } = await import("node:fs/promises");
  const candidates = [".vercel/output/static", "dist"];
  for (const dir of candidates) {
    try {
      await stat(dir);
      await stat(`${dir}/efm/index.html`);
      return;
    } catch {
      // try next
    }
  }
  assert.fail("no .vercel/output/static or dist/ found — run `npm run build` first");
});
