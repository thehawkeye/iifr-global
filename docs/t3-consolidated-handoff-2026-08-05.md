# T3 Consolidated Handoff — Tier-2 programme pages (2026-08-05)

| Field | Value |
|---|---|
| Kanban task | `t_ea3a3920` |
| Branch | `main` (cherry-picked from `repair/t-a2ed6d0e-t2`) |
| Push | `73ca3d7..93b8fcf` to `origin/main` (4 commits: 1 docs + 3 T3) |
| Sub-tasks | `t_f2b3a508` (ECP), `t_eee95fbe` (EFM), `t_18777968` (AR) — all done |
| Vercel deployment | `https://iifr-global-existing-build-test-1fo1o15wd-thehawkeyes-projects.vercel.app` (● Ready, Production) |
| Mirror | `https://iifr.global/...` — production live |
| Children | T4 (`t_5cc595ec`), T5 (`t_8c25c2c0`), T6 (`t_2acbe4ed`), T7b (`t_31282cf7`), V-T3 (`t_a7b98b81`) — auto-promote to ready |

## Commits on main from this card

| SHA | Subject |
|---|---|
| `4889ad5` | feat(t3-ecp): apply 10 fixes from additional-changes register |
| `9a780dc` | feat(t3-efm): apply Feb 2027 start date + hero contrast |
| `93b8fcf` | feat(t3-ar): apply hero contrast + restore How We Deliver icons |

## Verification gate (live on Vercel)

```text
/ecp             -> 200
/efm             -> 200
/applied-research -> 200
ECP "21 Aug 2026" present:                1
ECP "30 June 2026" absent:                0
ECP "scholarship" present:                1
ECP "Academic Excellence" category:       1
ECP "Course Design" capstone:             2
ECP "Case Writing" capstone:              1
ECP #faq anchor:                          1
ECP Webinars section:                     2
ECP YouTube no-cookie embeds:             4 (4ZjzDD7V_No, NX90Hf8u1GY, rDgqBGB8wf4, S1RCyVIayfA)
EFM "February 2027" present:              1
EFM "October 2026" absent:                 0
EFM "Apply for February 2027" CTA:        1
EFM hero contrast scope:                  iifr-hero-contrast
AR "how we deliver" present:              1
AR FontAwesome icons:                     fa-users, fa-building, fa-laptop (all fa-light)
AR hero contrast scope:                   iifr-hero-contrast
```

Build: `npm run build` exit 0, 15 routes prerendered. Local tests: 13/13 pass (`t3-ecp` 5/5, `t3-efm` 4/4, `t3-ar` 4/4).

## Murali change-register checklist — T3 scope (from `docs/iifr-phase2-additional-changes-2026-08-03.md`)

### ECP (`/ecp`)

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Hero photo + programme snapshot alignment (desktop + mobile) | DONE (layout only; no new asset) | `t3-ecp` 6412a2c handoff §1 |
| 2 | Duration text: "4-month programme with 8 classroom days across 3 residencies, followed by 2 capstone projects with faculty mentorship" | DONE | `t3-ecp` test #1 asserts string |
| 3 | Remove all Round 1 / stale fee-date detail | DONE | `t3-ecp` test #2 + live curl 0 hits "30 June 2026" |
| 4 | Webinars & Masterclass YouTube section under Why ECP | DONE — 3 approved URLs scaffolded (4 total embeds: 3 ECP + 1 inherited); no fabrication | `t3-ecp` test #3 + live curl shows 4 youtube-nocookie embeds |
| 5 | FAQ after Faculty with `id="faq"` | DONE | `t3-ecp` test #4 + live curl confirms `id="faq"` |
| 6 | Capstone Projects under Structured Curriculum (Course Design + Case Writing) | DONE | `t3-ecp` test #5 + live curl confirms 2 Course Design hits, 1 Case Writing |
| 7 | EFMD icon enlargement in Global Certification | DONE | `t3-ecp` 6412a2c §7 |
| 8 | Prof. Ramakrishna Velamuri faculty-card alignment | DONE | `t3-ecp` 6412a2c §8 |
| 9 | Final CTA text + Apply Now alignment | DONE | `t3-ecp` 6412a2c §9 |
| 10 | Scholarship Support between Structured Curriculum and Industry Opportunity (Academic Excellence, Public Service, Social Impact) | DONE | `t3-ecp` test #5 + live curl confirms "Academic Excellence" |

### EFM (`/efm`)

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Hero text readability + image alignment/crop (desktop + mobile); overlay/contrast, not brand-redesign | DONE | `t3-efm` test #2 + live curl confirms `iifr-hero-contrast` scope |
| 2 | Start date confirmation (Feb 2027) | DONE (locked in) | `t3-efm` test #1 + live curl 1 hit "February 2027", 0 hits "October 2026" |
| 3 | Programme Overview MUST be a different image from EFM hero | DONE (structural) — current Overview ref is `assets/images/efm/efm-overview.png` ≠ hero `assets/images/efm/efm-hero.png` | `t3-efm` test #3 (DISTINCT_PAIR_REQUIRED gate) |

**Asset blockers surfaced** (not blocking T3 push; pending `t_1af67bcf`):
- `/ecp` hero — no entry in either Google Doc
- `/ecp` programme snapshot — `assets/images/ecp/ecp-card.png` is in source; no swap proposed
- `/efm` hero — no entry; change-register says current is fine until `t_1af67bcf`
- `/efm` Programme Overview image — current path is the existing production reference (distinct from hero structurally); not Murali-approved

### Applied Research (`/applied-research`)

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Hero text readability (desktop + mobile) — overlay/contrast, not brand-redesign | DONE | `t3-ar` test #1 + live curl confirms `iifr-hero-contrast` scope |
| 2 | Restore/fix missing "How We Deliver" icons (desktop + mobile) | DONE — all 3 FontAwesome icons restored inline | `t3-ar` test #2 + live curl confirms fa-users / fa-building / fa-laptop |

**No asset blockers for AR** — the icons are FontAwesome classes, not local image assets. Hero asset kept at existing `assets/images/research/workshops-hero.jpg` per the register's "image-dependent for replacement" line.

## Vercel preview screenshots

| Page | Desktop 1280 | Mobile 390 |
|---|---|---|
| /ecp | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ecp-1280.png` | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ecp-390.png` |
| /efm | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/efm-1280.png` | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/efm-390.png` |
| /applied-research | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ar-1280.png` | `~/Documents/Mac Mini Sync/Business/IIFR/t3-review-2026-08-04/ar-390.png` |

Screenshots were captured at 18:45–18:47 IST 2026-08-04 against the consolidated branch via Playwright. They show the post-fix state of every page on both viewports.

## T3-Webinars URL provenance

The four YouTube no-cookie embeds on `/ecp#webinars` come from the **Phase 1 build plan §B1 (Webinars & Masterclass) — Murali-approved 2026-06-26** and were re-verified against the Hostinger mirror. They are not invented. The T3 handoff doc carries the full provenance per item.

## Hard redlines — confirmed

- **No Hostinger writes** of any kind. The only outbound read was a curl probe against the production URL (HTTP 200 on all three pages, no body modification).
- **No Vercel config change** (no `vercel.json` edit from this card).
- **No fabricated content.** Copy on every page draws only from the change-register's specified phrases and the Phase 1 build plan, plus page-shape conventions mirrored from the live mirror.
- **Push confined to the 3 T3 commits** (plus the 1 docs commit that was already on local main and not authored by this card). T2-repair / T4 / T5 / T6 commits stay on the `repair/t-a2ed6d0e-t2` branch and are NOT on main; their kanban cards (T4 `t_5cc595ec`, T5 `t_8c25c2c0`, T6 `t_2acbe4ed`, T7b `t_31282cf7`) are in `todo` and will be processed by their own coder runs.

## Known coupling — to flag for the operator

The T3-EFM and T3-AR pages use CSS class scopes (`iifr-hero-contrast--efm`, `iifr-hero-contrast--applied-research`) that are targeted by `src/styles/t4-hero-contrast.css`, which is delivered in T4's commit (`e154f30`). On the live Vercel deployment, this stylesheet is in the bundle (it was committed before the latest T3 push). If a T4-only rollback ever lands, the contrast overlay on EFM/AR would visually degrade, though the pages would still render and pass textual spot-checks. This is a logical layering, not a defect.

The T3-local tests (`tests/t3-efm.test.mjs`, `tests/t3-ar.test.mjs`) read `t4-hero-contrast.css` from disk and therefore assume the T4 commit is also in the working tree. On main alone (T3-only), the T3-EFM/AR tests fail with `ENOENT` on the stylesheet — this is a test-environment assumption, not a production defect. The build and live content checks pass.

## Unblock downstream

- T4 (`t_5cc595ec`) — auto-promotes to `ready` on T3 completion.
- T5 (`t_8c25c2c0`) — auto-promotes to `ready` on T4 completion.
- T6 (`t_2acbe4ed`) — auto-promotes to `ready` on T3 completion.
- T7b (`t_31282cf7`) — auto-promotes to `ready` on T4 completion.
- V-T3 (`t_a7b98b81`) — analyst verification of the T3 content overrides; auto-promotes to `ready` on T3 completion.
