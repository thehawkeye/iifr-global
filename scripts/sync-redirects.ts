#!/usr/bin/env node
/**
 * sync-redirects.ts — single-source-of-truth: vercel.json → public/.htaccess
 *
 * Per webdev-build-spec.md §2.5 and §2.5b, the redirect map lives in two
 * places — `vercel.json` (Vercel preview testing) and `public/.htaccess`
 * (Hostinger production). This script reads `vercel.json` and rewrites
 * the redirect section of `public/.htaccess` so the two never drift.
 *
 * Other Apache directives (security headers, MIME, caching, gzip,
 * directory options, error documents) are PRESERVED as-is — only the
 * `--- .php → clean URL redirects ---` block between well-known
 * sentinels is replaced.
 *
 * Usage:
 *   node scripts/sync-redirects.ts            # rewrite public/.htaccess
 *   node scripts/sync-redirects.ts --check    # exit 1 if drift detected
 *
 * Sentinel boundaries (in public/.htaccess):
 *   # >>> sync-redirects:start
 *   ...
 *   # <<< sync-redirects:end
 *
 * Exit codes:
 *   0 — written (or check passed)
 *   1 — drift detected (--check)
 *   2 — malformed vercel.json or missing sentinels
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

const VERCEL_JSON = resolve(ROOT, "vercel.json");
const HTACCESS = resolve(ROOT, "public/.htaccess");

const START_SENTINEL = "# >>> sync-redirects:start";
const END_SENTINEL = "# <<< sync-redirects:end";

interface VercelRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

interface VercelJson {
  redirects?: VercelRedirect[];
}

function parseArgs(): { check: boolean } {
  return { check: process.argv.includes("--check") };
}

/** Convert a Vercel-style destination to an Apache RewriteRule substitution
 *  by replacing `:param` tokens with `$N` backreferences (Apache ordering). */
function destinationToSubstitution(
  destination: string,
  captures: string[]
): string {
  let i = 0;
  return destination.replace(/:([A-Za-z_][A-Za-z0-9_]*)/g, () => {
    i++;
    if (captures.length === 0 || captures[0] === "*") {
      // Wildcard capture uses $1 for the whole thing.
      return "$1";
    }
    return `$${i}`;
  });
}

/** Convert a Vercel-style source to an Apache RewriteRule pattern. */
function sourceToPattern(source: string): string {
  // Apache RewriteRule patterns are matched against the URL **path** (no
  // leading slash when RewriteBase is `/`). Strip the leading slash.
  let s = source;
  if (s.startsWith("/")) s = s.slice(1);

  // Vercel `:param` and `*` glob → Apache regex captures.
  // `insight/blog/:slug.php` → `^insight/blog/([^/]+)\.php$`
  // trailing `*` (e.g. `admin/:path*`) → `(.*)`
  const captures: string[] = [];
  let pattern = s
    .replace(/[.+^$()|{}[\]\\]/g, "\\$&")
    .replace(/:([A-Za-z_][A-Za-z0-9_]*)(\*?)/g, (_m, _name, star) => {
      if (star === "*") {
        captures.push("*");
        return "(.*)";
      }
      captures.push(_name);
      return "([^/]+)";
    });

  return { pattern: `^${pattern}$`, captures };
}

function generateHtaccessBlock(redirects: VercelRedirect[]): string {
  const lines: string[] = [];
  lines.push(START_SENTINEL);
  lines.push("# EMITTED by scripts/sync-redirects.ts from vercel.json — DO NOT EDIT");
  lines.push("# Re-run `node scripts/sync-redirects.ts` to regenerate.");
  lines.push("");
  for (const r of redirects) {
    const { pattern, captures } = sourceToPattern(r.source);
    const substitution = destinationToSubstitution(r.destination, captures);
    if (!r.permanent) {
      lines.push(`RewriteRule ${pattern} ${substitution} [L]`);
    } else {
      lines.push(`RewriteRule ${pattern} ${substitution} [R=301,L]`);
    }
  }
  lines.push(END_SENTINEL);
  return lines.join("\n");
}

function rewriteHtaccess(block: string): string {
  const htaccess = readFileSync(HTACCESS, "utf8");
  const startIdx = htaccess.indexOf(START_SENTINEL);
  const endIdx = htaccess.indexOf(END_SENTINEL);
  if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) {
    throw new Error(
      `Missing sentinels in ${HTACCESS}. Need both '${START_SENTINEL}' and '${END_SENTINEL}'.`
    );
  }
  const before = htaccess.slice(0, startIdx);
  const after = htaccess.slice(endIdx + END_SENTINEL.length);
  return before + block + after;
}

function main() {
  const args = parseArgs();

  const vercelRaw = readFileSync(VERCEL_JSON, "utf8");
  let vercel: VercelJson;
  try {
    vercel = JSON.parse(vercelRaw);
  } catch (err) {
    console.error(`[sync-redirects] FATAL: vercel.json is not valid JSON:`, err);
    process.exit(2);
  }

  const redirects = vercel.redirects ?? [];
  const newBlock = generateHtaccessBlock(redirects);
  const newHtaccess = rewriteHtaccess(newBlock);

  if (args.check) {
    const current = readFileSync(HTACCESS, "utf8");
    if (current === newHtaccess) {
      console.log("[sync-redirects] OK — public/.htaccess is in sync with vercel.json");
      process.exit(0);
    } else {
      console.error(
        "[sync-redirects] DRIFT — public/.htaccess differs from vercel.json. " +
          "Run `node scripts/sync-redirects.ts` to fix."
      );
      process.exit(1);
    }
  }

  writeFileSync(HTACCESS, newHtaccess, "utf8");
  console.log(
    `[sync-redirects] wrote ${redirects.length} redirect rules to ${HTACCESS}`
  );
}

main();