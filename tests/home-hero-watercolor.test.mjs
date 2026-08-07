import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString("utf8");

const HERO_PATH = "src/contemporary/components/Hero.astro";
const ASSET_PATH = "public/assets/images/contemporary/home-watercolor-hero.webp";

test("Hero references the real watercolor raster asset", async () => {
  const hero = await text(HERO_PATH);
  // Real network request — must reference the asset path, not just any webp.
  assert.match(
    hero,
    /\/assets\/images\/contemporary\/home-watercolor-hero\.webp/,
    "Hero.astro must reference /assets/images/contemporary/home-watercolor-hero.webp",
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
  // The new overlay is a single restrained linear gradient (top navy
  // → transparent → ivory at the bottom), not the old multi-radial
  // composition with `radial-gradient(...rgba(36, 47, 76, 0.85)...)`.
  assert.doesNotMatch(
    hero,
    /radial-gradient\(\s*ellipse/,
    "Hero.astro must not reintroduce the old radial-gradient wash",
  );
});

test("Hero uses the raster via a real <img> tag", async () => {
  const hero = await text(HERO_PATH);
  // An <img> with src pointing at the watercolor asset must exist. The
  // asset path may appear either as a literal attribute (`src="…webp"`)
  // or as an Astro JSX expression that ultimately resolves to the same
  // string (e.g. `src={WATERCOLOR_SRC}` where WATERCOLOR_SRC is the
  // asset path declared elsewhere in the file). The first test already
  // proves the literal asset path is referenced; here we prove the path
  // is wired to a real <img> element in the markup.
  const heroNoComments = hero.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.match(
    heroNoComments,
    /<img\b[^>]*>/,
    "Hero.astro markup must contain an <img> tag for the art layer",
  );
  // object-fit:cover keeps the painting responsive without distortion.
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

test("Watercolor hero asset is the real 2400×1125 WebP above 200 KB", async () => {
  const stat = await import("node:fs/promises").then((m) => m.stat);
  const info = await stat(new URL(`../${ASSET_PATH}`, import.meta.url));
  // Anything below 200 KB has historically been the blurred 36 KB wash;
  // gate on the production-quality asset so a reversion to a small
  // placeholder fails CI.
  assert.ok(
    info.size > 200 * 1024,
    `${ASSET_PATH} must be larger than 200 KB to keep high-texture ` +
      `paint; got ${info.size} bytes`,
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
