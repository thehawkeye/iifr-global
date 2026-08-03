/**
 * nav — small helpers for the top navigation.
 *
 * Port of the active-state logic from
 * `partials/header/transparent-header.php`:
 *
 *   $iifr_basename = basename($iifr_path, '.php');
 *   $iifr_nav_active = in_array($iifr_basename,
 *     ['ecp', 'efm', 'applied-research', 'programmes'], true)
 *     ? 'programmes' : $iifr_basename;
 *   $iifr_nav_active = in_array($iifr_basename, ['faculty'], true)
 *     ? 'research' : $iifr_nav_active;
 *
 * On the Astro side, page paths are clean (`/ecp`, `/efm`, `/programmes`,
 * `/blog/faculty-development`, etc.), so we operate on the last path segment
 * instead of a basename. The grouping rules are unchanged.
 */

const PROGRAMME_SLUGS = new Set([
  "ecp",
  "efm",
  "applied-research",
  "programmes",
]);

const RESEARCH_GROUP_SLUGS = new Set(["faculty"]);

/** Canonical nav group keys the Header component renders. */
export type NavGroup =
  | "home"
  | "about"
  | "programmes"
  | "research"
  | "faculty"
  | "insights"
  | "apply"
  | "contact";

/** Map a request path to its top-level nav group. */
export function activeNav(path: string): NavGroup {
  if (!path) return "home";
  let p = path.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p === "" || p === "/" || p === "/index") return "home";

  const segments = p.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "home";

  if (RESEARCH_GROUP_SLUGS.has(last)) return "research";
  if (PROGRAMME_SLUGS.has(last)) return "programmes";
  if (
    last === "home" ||
    last === "about" ||
    last === "research" ||
    last === "insights" ||
    last === "apply" ||
    last === "contact"
  ) {
    return last as NavGroup;
  }
  // Unknown — fall back to a safe default.
  return "home";
}

/** Returns " active" if `group` matches the resolved active group, else "". */
export function isActive(path: string, group: NavGroup): string {
  return activeNav(path) === group ? " active" : "";
}
