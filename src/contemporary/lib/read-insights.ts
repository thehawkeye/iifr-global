/**
 * Reader module for insights migrated to Git-backed Markdown content.
 *
 * Slice A — Variant A smallest E2E slice.
 *
 * The three insights migrated in this slice
 * (`academia-industry-bridge`, `faculty-development-rethink`,
 * `applied-research-future`) are loaded from
 * `src/content/posts/${slug}/index.md`. Everything else falls back to
 * `content.ts`. The slug allow-list is explicit and hard-coded to
 * prevent accidental migration of unrelated records.
 *
 * Parse strategy: a ~30-line YAML frontmatter parser scoped to the 12
 * known string fields. No new dependency is added; `gray-matter` is not
 * installed in this project (verified in package.json).
 *
 * Constraints:
 *   - Do NOT change the shape of the `Insight` interface.
 *   - Do NOT modify `content.ts`; do NOT add a dependency.
 *   - The reader is the smallest possible bridge that proves Git-backed
 *     content can drive the existing route (S3).
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { insights as contentInsights, type Insight, type Owner } from "./content";

/**
 * Slugs whose content lives in `src/content/posts/${slug}/index.md`.
 * Hard-coded allow-list — adding a slug here is the explicit migration
 * step for Slice B onward.
 */
const CONTENT_SLUGS: ReadonlySet<string> = new Set([
  "academia-industry-bridge",
  "faculty-development-rethink",
  "applied-research-future",
]);

/**
 * Resolve content root from process.cwd().
 *
 * Astro runs `astro build` / `astro dev` from the project root, so
 * process.cwd() is the canonical source of truth for project-relative
 * paths. The previous implementation resolved relative to this module's
 * file URL, which broke at build time: the compiled module URL no longer
 * matches the source layout, and the resolved path silently pointed at
 * a non-existent directory. Result: every content-backed slug silently
 * fell through to the content.ts fallback, and the MD branch never
 * executed at build time. Switching to cwd()-relative makes the path
 * independent of the module's compiled location.
 */
const CONTENT_ROOT = join(process.cwd(), "src/content/posts");

/**
 * Default owner attached to insights loaded from Markdown when the YAML
 * does not carry an owner block. Matches `content.ts`'s standardOwner
 * so the reader's output is shape-conformant with the `Insight` type.
 * The interface is unchanged; this is a runtime default.
 */
const DEFAULT_OWNER: Owner = {
  name: "IIFR Admissions",
  role: "Owner: IIFR admissions office",
  lastReviewedAt: "2026-08-09",
};

/**
 * Minimal YAML frontmatter parser.
 *
 * Handles the slice's flat string-only frontmatter:
 *   key: "value with spaces and : colons"
 *   key: bare-value
 *   key: 'single quoted'
 * Lines beginning with `#` are treated as comments and ignored.
 * Anything else is a parse error — fail loudly rather than guess.
 *
 * Returns the frontmatter key/value map and the post-frontmatter body
 * (the Markdown body that follows the closing `---`).
 */
function parseFrontmatter(source: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) {
    throw new Error("read-insights: file does not begin with a `---` frontmatter block");
  }
  const [, fm, body] = match;
  const data: Record<string, string> = {};
  for (const rawLine of fm.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const sep = line.indexOf(":");
    if (sep < 0) {
      throw new Error(`read-insights: malformed frontmatter line: ${rawLine}`);
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

/**
 * Build the absolute path to the Markdown file for a content-backed slug.
 */
function postPath(slug: string): string {
  return join(CONTENT_ROOT, slug, "index.md");
}

/**
 * Read a single insight by slug.
 *
 * If the slug is in the CONTENT_SLUGS allow-list AND a Markdown file
 * exists at `src/content/posts/${slug}/index.md`, returns the parsed
 * insight. Otherwise (missing file OR slug not migrated) falls back to
 * `content.ts`'s `insights` array.
 */
export function readInsight(slug: string): Insight {
  if (CONTENT_SLUGS.has(slug)) {
    const filePath = postPath(slug);
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, "utf8");
      const { data, body } = parseFrontmatter(raw);
      // Markdown body wins; fall back to YAML `body:` field if present.
      const resolvedBody = body.length > 0 ? body : data.body ?? "";
      return {
        slug: data.slug ?? slug,
        title: data.title ?? "",
        format: (data.format as Insight["format"]) ?? "practitioner-essay",
        dek: data.dek ?? "",
        authorName: data.authorName ?? "",
        authorProfile: data.authorProfile ?? null,
        publishDate: data.publishDate ?? "",
        updateDate: data.updateDate ?? "",
        readingTime: data.readingTime ?? "",
        topic: data.topic ?? "",
        audience: data.audience ?? "",
        body: resolvedBody,
        relatedProgramme: data.relatedProgramme ?? null,
        source: data.source ?? "",
        owner: DEFAULT_OWNER,
      };
    }
  }
  // Fallback: source-of-truth array in content.ts.
  const fromSource = contentInsights.find((i) => i.slug === slug);
  if (!fromSource) {
    throw new Error(`read-insights: slug "${slug}" not found in content.ts fallback`);
  }
  return fromSource;
}

/**
 * Return all insights. Slice A scope: identical to `insights` from
 * content.ts so the route sees no behavioural change. The migrated
 * slug is byte-equal in source (per S1) so this remains true.
 */
export function readAllInsights(): Insight[] {
  return contentInsights;
}