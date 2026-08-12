import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString("utf8");

const expectedHeroes = [
  ["src/pages/about.astro", "/assets/images/about/about-hero.jpeg"],
  ["src/pages/programmes.astro", "/assets/images/programmes/programmes-hero.jpeg"],
];

test("T2 pages use the approved local hero assets", async () => {
  for (const [pagePath, assetPath] of expectedHeroes) {
    const page = await text(pagePath);
    assert.match(page, new RegExp(assetPath.replaceAll("/", "\\/")));

    const asset = await read(`public${assetPath}`);
    assert.deepEqual(
      [...asset.subarray(0, 3)],
      [0xff, 0xd8, 0xff],
      `${assetPath} must contain JPEG bytes`,
    );
  }
});

test("About governance uses the compact council layout", async () => {
  const about = await text("src/pages/about.astro");
  assert.match(about, /iifr-govern__card iifr-govern__card--council/);
  assert.match(about, /iifr-gov-grid iifr-gov-grid--council iifr-gov-grid--4/);
  assert.match(about, /iifr-gov-person[^\"]*iifr-gov-person--council/);
});

test("Strategic partner cards share a CTA baseline and use LatticEd spelling", async () => {
  const about = await text("src/pages/about.astro");
  assert.doesNotMatch(about, /LatticeEd/);
  assert.match(about, /\.iifr-partner-card\s*\{[^}]*display:\s*flex/s);
  assert.match(about, /\.iifr-partner-card__desc\s*\{[^}]*flex:\s*1/s);
});

test("In-repo design tokens match the canonical IIFR palette", async () => {
  const tokens = await text("src/styles/tokens.css");
  assert.match(tokens, /--color-maroon:\s*#6c131b/i);
  assert.match(tokens, /--color-navy:\s*#242f4c/i);
  assert.match(tokens, /--color-gold:\s*#c79906/i);
  assert.match(tokens, /--color-ivory:\s*#efebe5/i);
});

test("Repair handoff records locked runtime token discrepancies", async () => {
  const handoff = await text("docs/t2-repair-handoff-2026-08-04.md");
  assert.match(handoff, /#3f3a36/i);
  assert.match(handoff, /#4b4b4b/i);
  assert.match(handoff, /locked legacy stylesheet/i);
});
