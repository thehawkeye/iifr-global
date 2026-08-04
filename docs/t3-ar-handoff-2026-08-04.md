---
title: "[T3] Applied Research Page Rebuild — Handoff (2026-08-04)"
date: 2026-08-04
kanban_task: t_18777968
branch: repair/t-a2ed6d0e-t2
status: COMPLETE — both build-now fixes verified
related:
  - docs/iifr-phase2-additional-changes-2026-08-03.md
  - docs/t3-efm-handoff-2026-08-04.md
  - docs/t3-ecp-handoff-2026-08-04.md
tags: [iifr-global, phase-2, applied-research, handoff, t3]
---

# [T3] Applied Research Page Rebuild — Handoff

## What was built

`src/pages/applied-research.astro` is a real Astro page (1:1 port of the
live `app/applied-research.php`, which the change register flagged as a
live crawl because the local mirror was missing). Both T3 fixes from the
change register are applied and verified.

## The 2 fixes — done

### Fix 1 — Hero text readability (desktop + mobile)

- `bodyClass="iifr-redesign-scope iifr-hero-contrast"` on `SiteLayout`
  wires the page into the existing `src/styles/t4-hero-contrast.css`
  ruleset (dark `::after` gradient overlay + white `#ffffff` h1/p +
  `text-shadow: 0 2px ...`).
- The hero `<div>` carries the `iifr-hero-contrast--applied-research`
  scope identifier so any future per-page overlay tweak can hook in
  without re-architecting. The T4 stylesheet already documents this
  scope in its header comment.
- Mobile tightening (≤768 px) is handled by the same T4 stylesheet
  block — no per-page rule required.
- Hero background image: `assets/images/research/workshops-hero.jpg` —
  unchanged existing reference (no asset swap, per the register's
  "Build now for overlay/contrast; image-dependent for replacement").

### Fix 2 — "How We Deliver" icons restored

- The section is `id="how-we-deliver"` and renders as
  `<ol class="ecp-journey ecp-journey--three">` with three `<li class="ecp-step">` items.
- Each step node pairs an inline FontAwesome icon with the existing
  step number, mirroring the EFM Programme Journey pattern:

  | # | Title          | Icon class            |
  |---|----------------|-----------------------|
  | 1 | Open Enrolment | `fa-light fa-users`   |
  | 2 | In-House       | `fa-light fa-building`|
  | 3 | Hybrid         | `fa-light fa-laptop`  |

- FontAwesome 6.4.2 is loaded site-wide via `src/components/layout/LegacyStyles.astro`
  (the same pattern used by ECP, EFM, Research, Faculty, Contact, About,
  Home, and Programmes).
- The inline markup is:

  ```astro
  <span class="ecp-step__node" aria-hidden="true">
    <i class={step.icon}></i>
    <span class="ecp-step__num">{step.num}</span>
  </span>
  ```

### Asset-blocker check — none

The task body asks: "If [the icon assets are] absent, post a kanban
comment on `t_1af67bcf` requesting the icon set." The icons are rendered
through FontAwesome classes (the same convention used by the rest of
the site), not via local image assets under `assets/images/iconography/`.
All three icons render in the production HTML at `/applied-research`,
visible in the captured screenshots. No image-asset gate is open for
this task, and no `t_1af67bcf` comment is needed.

The hero asset (`workshops-hero.jpg`) is the existing production
reference — kept unchanged per the register's "image-dependent for
replacement" line. No asset swap occurred.

## Verification evidence

```
$ cd /Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global
$ npm run build
…
├─ /applied-research/index.html (+1ms)
…
✓ Completed in 64ms.
[build] Complete!
exit_code: 0

$ node --test tests/t3-ar.test.mjs
✔ Applied Research hero has contrast overlay (T3 readability fix) (2.4ms)
✔ Applied Research 'How We Deliver' section restores FontAwesome icons in every step (0.7ms)
✔ Applied Research page uses SiteLayout with /applied-research path (0.7ms)
✔ Applied Research page is pre-rendered by the Astro build (0.4ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
duration_ms 42.9

$ curl -sI http://localhost:4321/applied-research
HTTP/1.1 200 OK

$ curl -s http://localhost:4321/applied-research | grep -ic "how we deliver"
1

$ curl -s http://localhost:4321/applied-research | grep -o "iifr-hero-contrast--applied-research" | head -1
iifr-hero-contrast--applied-research

$ curl -s http://localhost:4321/applied-research | grep -o "fa-light fa-(users|building|laptop)"
fa-light fa-users
fa-light fa-building
fa-light fa-laptop
```

### Visual verification

- Desktop 1280×800: `/tmp/t3-ar-visual/ar-1280.png` — 773 614 bytes,
  archived to `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ar-1280.png`.
- Mobile 390×844 (2× DPR): `/tmp/t3-ar-visual/ar-390.png` — 710 472 bytes,
  archived to `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ar-390.png`.
- Both PNGs are 1280×800 / 780×1688 and were re-captured at 18:46 IST
  by `node public/_t3-ar-preview/capture.mjs` (Playwright, networkidle +
  1.5 s settle for legacy CSS + FontAwesome).

## Files changed (this card)

| Path | Change |
|---|---|
| `src/pages/applied-research.astro` | Renders with T3 fixes applied (hero contrast bodyClass + scope; How We Deliver icons via inline FontAwesome) |
| `src/styles/t4-hero-contrast.css` | Header comment updated to document the `--applied-research` scope (no new rules required) |
| `tests/t3-ar.test.mjs` | 4 tests: hero contrast + icon restore + SiteLayout path + pre-render |
| `public/_t3-ar-preview/capture.mjs` | Playwright capture script for screenshots |
| `docs/t3-ar-handoff-2026-08-04.md` | This document |

The 17 pre-existing dirty files in the worktree were preserved (no
unrelated modifications, no reformatting, no drive-by renames).

## Hard redlines — confirmed

- No Hostinger, DNS, FTP/SFTP, `public_html`, `.htaccess`, or production mutation.
- No Vercel config change.
- No fabricated content. Copy on the page draws only from the
  change-register's specified phrases, plus page-shape conventions
  mirrored from `src/pages/efm.astro` (the closest tier-2 precedent
  for the journey + scope pattern).
- Preserved the pre-existing dirty files.

## Unblock downstream

No downstream blockers opened by this card. Optional future work (none
required by the register):

- If `t_1af67bcf` later approves a new hero asset for Applied Research,
  swap the URL in `src/pages/applied-research.astro`'s `iifr-page-hero__bg`
  inline style. No design decision needed.
