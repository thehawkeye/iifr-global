/**
 * assetUrl — single helper for every image / CSS / JS path the site needs.
 *
 * Per M5 (locked in webdev-build-spec.md §2.4 and webdev-phase2-build-plan.md
 * §0): all static assets stay on Hostinger's `iifr.global` docroot. We do NOT
 * recompile the 91 MB `assets/` tree into the Astro repo — instead every
 * reference points at `https://iifr.global/assets/{path}` (or
 * `https://iifr.global/{path}` for files outside `assets/`).
 *
 * Usage:
 *   <img src={assetUrl("images/hero-home.webp")} />
 *   <a href={assetUrl("css/iifr-redesign.css")} />
 *
 * Pass-through: if `path` is already an absolute http(s) URL or a data URL,
 * it is returned unchanged. That keeps the helper safe to use inside
 * conditional / dynamic content (e.g. legacy absolute URLs) without callers
 * having to think about it.
 */

const DEFAULT_ASSET_ORIGIN = "https://iifr.global";

/**
 * Resolve a relative asset path to its public URL.
 *
 * @param path  asset path relative to the site root (e.g. "images/hero-home.webp",
 *              "css/iifr-redesign.css", "logo.webp"). Leading slashes are
 *              tolerated; URLs are returned unchanged.
 * @returns absolute URL to the asset.
 */
export function assetUrl(path: string): string {
  if (!path) return DEFAULT_ASSET_ORIGIN + "/";

  // Pass through fully-qualified URLs and data: URIs.
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  const trimmed = path.replace(/^\/+/, "");
  return `${DEFAULT_ASSET_ORIGIN}/${trimmed}`;
}

/**
 * Convenience for inline preloads where Astro wants a fully-qualified URL on
 * the `<link rel="preload" href=...>` attribute. Equivalent to assetUrl(); the
 * separate name is just a readability hint at call sites.
 */
export const absoluteAsset = assetUrl;
