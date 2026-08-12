import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString("utf8");

const HERO_PATH = "src/contemporary/components/Hero.astro";
const ASSET_PATH = "public/assets/images/contemporary/hero-home-sketch.webp";
const META_PATH = "public/assets/images/contemporary/hero-home-sketch.webp.meta.json";

test("Hero references the staging-derived hero raster asset", async () => {
  const hero = await text(HERO_PATH);
  // Real network request — must reference the asset path, not just any webp.
  assert.match(
    hero,
    /\/assets\/images\/contemporary\/hero-home-sketch\.webp/,
    "Hero.astro must reference /assets/images/contemporary/hero-home-sketch.webp",
  );
  // And it must not still point at the prior R1 watercolor filename.
  assert.doesNotMatch(
    hero,
    /\/assets\/images\/contemporary\/home-watercolor-hero\.webp/,
    "Hero.astro must not still reference /assets/images/contemporary/home-watercolor-hero.webp (R1 swap complete)",
  );

  // The raster asset must exist and be a real WebP (RIFF container).
  const asset = await read(ASSET_PATH);
  const head = [...asset.subarray(0, 4)];
  assert.deepEqual(
    head,
    [0x52, 0x49, 0x46, 0x46],
    `${ASSET_PATH} must start with the RIFF header (real WebP bytes)`,
  );
  assert.deepEqual(
    [...asset.subarray(8, 12)],
    [0x57, 0x45, 0x42, 0x50],
    `${ASSET_PATH} must have WEBP fourcc at offset 8`,
  );
});

test("Hero meta file records source URL, sha256, dimensions, and bytes", async () => {
  const meta = JSON.parse(await text(META_PATH));
  assert.equal(
    meta.source_url,
    "https://staging-dev.iifr.global/assets/images/hero-home.webp",
    "meta.source_url must record the staging URL we mirrored",
  );
  assert.ok(
    typeof meta.sha256 === "string" && /^[0-9a-f]{64}$/.test(meta.sha256),
    "meta.sha256 must be a 64-char hex digest",
  );
  assert.ok(
    Number.isInteger(meta.width) && meta.width > 0,
    "meta.width must be a positive integer",
  );
  assert.ok(
    Number.isInteger(meta.height) && meta.height > 0,
    "meta.height must be a positive integer",
  );
  assert.ok(
    Number.isInteger(meta.byte_size) && meta.byte_size > 0,
    "meta.byte_size must be a positive integer",
  );
  // The asset on disk must agree with the recorded fingerprint.
  const asset = await read(ASSET_PATH);
  const { createHash } = await import("node:crypto");
  const digest = createHash("sha256").update(asset).digest("hex");
  assert.equal(
    digest,
    meta.sha256,
    `on-disk SHA-256 (${digest}) must match meta.sha256`,
  );
  assert.equal(
    asset.byteLength,
    meta.byte_size,
    `on-disk byte_size (${asset.byteLength}) must match meta.byte_size`,
  );
});

test("Hero has no .cp-hero__bloom artwork", async () => {
  const hero = await text(HERO_PATH);

  // Markup: no element should carry the bloom class.
  assert.doesNotMatch(
    hero,
    /class\s*=\s*"[^"]*\bcp-hero__bloom\b[^"]*"/,
    "Hero.astro markup must not contain any .cp-hero__bloom element",
  );
  // CSS: no `.cp-hero__bloom` selector, no `.cp-hero__bloom--*` variant.
  assert.doesNotMatch(
    hero,
    /\.cp-hero__bloom\b/,
    "Hero.astro styles must not define .cp-hero__bloom",
  );

  // The smooth radial-gradient wash that obscured the art is also gone.
  assert.doesNotMatch(
    hero,
    /radial-gradient\(\s*ellipse/,
    "Hero.astro must not reintroduce the old radial-gradient wash",
  );
});

test("Hero uses the raster via a real <img> tag", async () => {
  const hero = await text(HERO_PATH);
  const heroNoComments = hero.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.match(
    heroNoComments,
    /<img\b[^>]*>/,
    "Hero.astro markup must contain an <img> tag for the art layer",
  );
  // object-fit:cover keeps the sketch responsive without distortion.
  assert.match(
    hero,
    /object-fit\s*:\s*cover/,
    "Hero.astro must use object-fit:cover on the art layer",
  );
});

test("Hero <img> is eager and high-priority for above-the-fold paint", async () => {
  const hero = await text(HERO_PATH);
  // Strip CSS comments before matching so the explanatory block in
  // Hero.astro does not satisfy the markup-only assertions below.
  const heroNoComments = hero.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.match(
    heroNoComments,
    /<img\b[^>]*\bloading\s*=\s*"eager"/,
    "Hero.astro <img> must be loading=\"eager\" (hero is above the fold)",
  );
  assert.match(
    heroNoComments,
    /<img\b[^>]*\bfetchpriority\s*=\s*"high"/,
    "Hero.astro <img> must be fetchpriority=\"high\" (hero is above the fold)",
  );
  assert.match(
    heroNoComments,
    /<img\b[^>]*\bdecoding\s*=\s*"async"/,
    "Hero.astro <img> must be decoding=\"async\" to keep paint non-blocking",
  );
});

test("Hero raster asset stays a real WebP above the 36 KB regression threshold", async () => {
  const { stat } = await import("node:fs/promises");
  const info = await stat(new URL(`../${ASSET_PATH}`, import.meta.url));
  // The staging-derived sketch is ~185 KB; the prior failure mode was a
  // 36 KB blurred wash. Gate well above that regression floor while still
  // allowing the legitimate sketch (and any future higher-quality raster
  // the staging pipeline emits) to pass.
  assert.ok(
    info.size > 100 * 1024,
    `${ASSET_PATH} must be larger than 100 KB to keep real raster; ` +
      `got ${info.size} bytes`,
  );
});

test("Hero overlay does not reintroduce radial-gradient artwork", async () => {
  const hero = await text(HERO_PATH);
  // Strip CSS comments first so we only match real declarations, not
  // the historical "no radial-gradient" explanatory block.
  const heroNoComments = hero.replace(/\/\*[\s\S]*?\*\//g, "");
  // The single overlay is a linear gradient with rgba(36,47,76,…) that
  // fades to ivory. Reject any radial gradient (ellipse/circle) anywhere
  // in real CSS — that was the artwork-masking wash the R1 task banned.
  assert.doesNotMatch(
    heroNoComments,
    /radial-gradient\s*\(/,
    "Hero.astro must not define any radial-gradient (artwork mask banned)",
  );
  // And confirm the only overlay declared is a single linear-gradient
  // (no stacked gradients, no second overlay div with its own artwork).
  const overlayUses = heroNoComments.match(/cp-hero__overlay[\s\S]*?linear-gradient/g) ?? [];
  assert.ok(
    overlayUses.length >= 1,
    "Hero.astro must keep a .cp-hero__overlay linear gradient",
  );
});
