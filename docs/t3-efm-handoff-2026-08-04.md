---
title: "[T3] EFM Page Rebuild — Handoff & Asset Blocker (2026-08-04)"
date: 2026-08-04
kanban_task: t_eee95fbe
branch: repair/t-a2ed6d0e-t2
commits: [tbd — see git log on branch repair/t-a2ed6d0e-t2]
status: COMPLETE — Build-now items done; one asset blocker remains
related:
  - docs/iifr-phase2-additional-changes-2026-08-03.md
  - docs/iifr-page-image-map-normalized-review-2026-08-04.md
  - docs/iifr-page-image-map-2026-08-03.md
tags: [iifr-global, phase-2, efm, handoff, asset-blocker, t3]
---

# [T3] EFM Page Rebuild — Handoff & Asset Blocker

## What was built

`src/pages/efm.astro` is now a real Astro page (it was missing before this card; the build was previously emitting a 404 for `/efm` despite SEO entries pointing at it).

Sections, in order:

1. **Hero** — `iifr-page-hero` with `iifr-hero-contrast--efm` scope. Background image: existing production reference `assets/images/efm/efm-hero.png` (unchanged until `t_1af67bcf` delivers an approved hero asset). CTA: **"Apply for February 2027 Cohort"**.
2. **Quick Facts Bar** — `ecp-facts` (Pathway / Format / Cohort Start / Audience). The Cohort Start cell shows `February 2027` with a `Confirmed 2026-08-04` sub-label.
3. **Programme Overview** — `ecp-overview` two-column. Image reference: `assets/images/efm/efm-overview.png`. **Asset blocker flagged inline** (see below).
4. **Programme Journey** — `ecp-journey ecp-journey--four` with FontAwesome icons paired with step numbers (mirrors the T3-AR pattern). Four steps: Foundation → Applied Research → Teaching Practice → Scholarship & Output.
5. **Who It's For** — `ecp-audience` four cards: Senior Industry Leaders / Functional Leaders / Practice-Academic Bridge / Global South Voices.
6. **Outcomes** — `ecp-learn-band` six cards: Doctoral-Equivalent Credential / Publishable Research / Faculty Mentorship / Teaching Capability / Peer Network / Thought Leadership.
7. **Final CTA** — repeats **"Apply for February 2027 Cohort"** + "Speak with Faculty".

## Build-now fixes (1 and 2) — done

### Fix 1 — Hero text visibility (overlay + contrast + layout)

- `bodyClass="iifr-redesign-scope iifr-hero-contrast"` on `SiteLayout` so the existing `src/styles/t4-hero-contrast.css` rules apply (dark `::after` gradient overlay, white `#ffffff` heading + sub text, soft text-shadow).
- The `--efm` scope identifier is reserved on the hero div for any future per-page overlay tweak without re-architecting.
- Mobile tightening for `<768 px` is provided by the same T4 stylesheet (no per-page rule required).
- CSS comment in `src/styles/t4-hero-contrast.css` updated to document the new `--efm` scope and explain why no per-page override is needed yet.

### Fix 2 — Start date = February 2027

- Hero CTA: `Apply for February 2027 Cohort`.
- Quick Facts: `February 2027` + `Confirmed 2026-08-04` sub-label.
- Final CTA: `Apply for February 2027 Cohort`.
- No stale 2026 cohort copy on the page (asserted by `tests/t3-efm.test.mjs`).
- `apply.astro` EFM cohort text is **already on the canonical February 2027 form** — verified by the existing `tests/t4-tier3.test.mjs` "Apply page references 21 August 2026 (ECP) and February 2027 (EFM)" test, which was green before this card ran. No additional edit to `apply.astro` was required.

## Asset blocker — fix 3 is image-dependent (DISTINCT_PAIR_REQUIRED)

Per the change register and the normalised image map
(`docs/iifr-page-image-map-normalized-review-2026-08-04.md` row for
`/efm`), the Programme Overview section is `DISTINCT_PAIR_REQUIRED`:
two distinct approved assets are required (hero + Programme Overview)
and **neither is present** in either source image document.

What this card did:

- References `assets/images/efm/efm-overview.png` (the existing production reference) for the Programme Overview slot — this is **not** the hero path, satisfying the structural "do not reuse the hero" requirement at the source level.
- Inline comment in `src/pages/efm.astro` flags the two-asset gate for downstream workers.
- The hero path itself (`assets/images/efm/efm-hero.png`) is **also unapproved** at the source-doc level — kept unchanged for now because the change register explicitly permits the existing reference to stay until `t_1af67bcf` clears an approved hero.
- **Kanban comment posted on `t_1af67bcf`** requesting an EFM-specific Programme Overview asset (and re-surfacing that the hero itself is also awaiting approval).

What this card did **not** do (by design):

- Did **not** select, generate, or substitute a Hostinger image.
- Did **not** use an unselected option from another page.
- Did **not** reuse the Programmes hero or the Applied Research hero.

## Verification evidence

```
$ cd /Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global
$ npm run build
…
├─ /efm/index.html (+5ms)
…
✓ Completed in 97ms.
[build] Complete!
exit_code: 0

$ node --test tests/t3-efm.test.mjs
…
✔ EFM hero CTA uses the confirmed February 2027 start date and no stale cohort copy
✔ EFM hero has the contrast overlay (T4 readability fix) and --efm scope
✔ EFM Programme Overview section does NOT reuse the hero image (DISTINCT_PAIR_REQUIRED gate)
✔ EFM page uses SiteLayout with /efm path and is pre-rendered by the Astro build
```

Astro dev server (when launched) returns 200 at `/efm` and the rendered
HTML contains the `February 2027` hero CTA + Quick Facts cohort cell.
Visual verification: screenshots at `/tmp/t3-efm-visual/{efm-1280.png, efm-390.png}`,
copied to `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/`.

## Files changed (this card)

| Path | Change |
|---|---|
| `src/pages/efm.astro` | **NEW** — full page port with T3 fixes applied |
| `src/styles/t4-hero-contrast.css` | Comment updated to document `--efm` scope; no new rules required |
| `tests/t3-efm.test.mjs` | **NEW** — 4 tests covering CTA, contrast, asset gate, and pre-render |
| `docs/t3-efm-handoff-2026-08-04.md` | **NEW** — this document |

The 17 pre-existing dirty files in the worktree were preserved (no
unrelated modifications, no reformatting, no drive-by renames).

## Hard redlines — confirmed

- No Hostinger, DNS, FTP/SFTP, `public_html`, `.htaccess`, or production mutation.
- No Vercel config change.
- No fabricated content. Copy on the page draws only from the register's
  specified dates and phrases, plus page-shape conventions mirrored from
  `src/pages/applied-research.astro` (the closest tier-2 precedent).
- Preserved the pre-existing dirty files.

## Unblock downstream

When `t_1af67bcf` clears an approved EFM hero asset:

1. Update the inline `background-image:url(...)` in `src/pages/efm.astro`'s
   `iifr-page-hero__bg` div to point at the new hero path.
2. Update `src/lib/seo.ts`'s `/efm` image entry if the approved asset has
   a different path than `assets/images/efm/efm-hero.png`.

When `t_1af67bcf` clears an approved distinct EFM Programme Overview asset:

1. Update the `<img src={assetUrl(...)}>` in `src/pages/efm.astro`'s
   `Programme Overview` section to the new distinct path.
2. Remove the `ASSET-BLOCKER (DISTINCT_PAIR_REQUIRED)` comment block.
3. Update `docs/t3-efm-handoff-2026-08-04.md` to record the asset swap.

Both swaps are mechanical — no design decisions needed on this side once
the asset map clears the pair.
