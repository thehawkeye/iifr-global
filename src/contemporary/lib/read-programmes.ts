/**
 * Reader module for programme fees migrated to Git-backed content.
 *
 * "Programmes/fees" first slice — mirrors the read-insights.ts bridge
 * pattern (Slice A). Only the `fee` field of the first cohort is
 * overridden from a Keystatic-managed content file; every other
 * Programme field still comes from `content.ts`. The slug allow-list
 * is explicit and hard-coded to prevent accidental migration of
 * unrelated records.
 *
 * Parse strategy: reuses the same ~30-line YAML frontmatter parser
 * scoped to flat string fields (see read-insights.ts). No new
 * dependency is added.
 *
 * Constraints:
 *   - Do NOT change the shape of the `Programme` interface.
 *   - Do NOT modify `content.ts`.
 *   - Only the `fee` field is sourced from Keystatic in this slice.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { programmes as contentProgrammes, type Programme } from "./content";

/**
 * Slugs whose fee lives in `src/content/programmes/${slug}.mdoc`
 * (the path Keystatic's `programmes` collection actually writes to).
 * Hard-coded allow-list — adding a slug here is the explicit
 * migration step for the next slice.
 */
const CONTENT_SLUGS: ReadonlySet<string> = new Set(["ecp"]);

/** Resolve content root from process.cwd() — see read-insights.ts for why. */
const CONTENT_ROOT = join(process.cwd(), "src/content/programmes");

/**
 * Minimal YAML frontmatter parser. Handles the slice's flat
 * string-only frontmatter, plus tolerance for other fields (e.g.
 * `tagline`) that Keystatic wraps in a multi-line YAML folded-scalar
 * block (`>-`) once they get long — this reader only consumes `fee`,
 * so those continuation lines are skipped rather than parsed.
 */
function parseFrontmatter(source: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) {
    throw new Error("read-programmes: file does not begin with a `---` frontmatter block");
  }
  const [, fm, body] = match;
  const data: Record<string, string> = {};
  for (const rawLine of fm.split(/\r?\n/)) {
    // A line indented relative to top-level keys is a continuation of a
    // multi-line YAML block scalar (e.g. `>-` folded tagline) — skip it.
    if (/^\s+\S/.test(rawLine)) continue;
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const sep = line.indexOf(":");
    if (sep < 0) {
      throw new Error(`read-programmes: malformed frontmatter line: ${rawLine}`);
    }
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: body.trim() };
}

function programmePath(slug: string): string {
  return join(CONTENT_ROOT, `${slug}.mdoc`);
}

/**
 * Read a single programme by slug. If the slug is in the
 * CONTENT_SLUGS allow-list, a Keystatic-managed file exists for it,
 * and that file's `fee` frontmatter value is non-empty, the first
 * cohort's fee is overridden with that value. Otherwise the
 * `content.ts` record is returned unchanged.
 */
export function readProgramme(slug: string): Programme {
  const base = contentProgrammes.find((p) => p.slug === slug);
  if (!base) {
    throw new Error(`read-programmes: slug "${slug}" not found in content.ts`);
  }
  if (CONTENT_SLUGS.has(slug)) {
    const filePath = programmePath(slug);
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, "utf8");
      const { data } = parseFrontmatter(raw);
      const fee = data.fee?.trim();
      if (fee) {
        return {
          ...base,
          cohorts: base.cohorts.map((c, i) => (i === 0 ? { ...c, fee } : c)),
        };
      }
    }
  }
  return base;
}

/** Return all programmes with the fee override applied where present. */
export function readAllProgrammes(): Programme[] {
  return contentProgrammes.map((p) => readProgramme(p.slug));
}
