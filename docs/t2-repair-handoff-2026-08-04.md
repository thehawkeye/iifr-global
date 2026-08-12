# T2 existing-build repair handoff — 2026-08-04

## Scope

This repair is limited to the existing Phase 2 T2 routes: `/`, `/about`, and `/programmes`. It applies the T2 rows from `docs/iifr-phase2-additional-changes-2026-08-03.md` and the approved mappings from `docs/iifr-page-image-map-normalized-review-2026-08-04.md`. It does not implement T3–T5 pages, change Vercel configuration, deploy, or write to Hostinger.

## Fixed

- `/about` now uses the approved BVB-building hero at `public/assets/images/about/about-hero.jpeg` (source oid `kix.duhkwvhnhae1`) with a right-focal `70% center` position.
- `/programmes` now uses the approved lecture-hall hero at `public/assets/images/programmes/programmes-hero.jpeg` (source oid `kix.jxxv351f2la4`) instead of the external `academy/5.jpeg` image.
- The Academic Council now opts into the compact council card, grid, and profile-card classes already present in the locked legacy stylesheet. This removes the oversized square-card layout that created the excess Governance whitespace.
- Strategic Partner cards use equal-height flex content so all three `Learn More` CTAs share a baseline.
- All visible, fallback, and alternative text instances of `LatticeEd` are corrected to `LatticEd`.
- `src/styles/tokens.css` now carries the canonical palette, typography, spacing, radii, shadows, and transition values from `/Users/lyraai/Documents/Mac Mini Sync/IIFR design.md`.

## Asset provenance

The selected-image export `docs/.iifr-image-map-raw.docx` contains one retained image per mapped page. Its document relationships map About to `word/media/image3.png` (1916×821) and Programmes to `word/media/image4.png` (1672×941). Those PNG bytes were transcoded to real JPEG files at the canonical target paths above; no Hostinger image was downloaded or substituted.

## Intentional design-token discrepancies

The Astro layout still loads `https://iifr.global/assets/css/iifr-redesign.css` after the in-repo bundle under the locked Phase 2 M5 migration rule. The locked legacy stylesheet therefore remains the runtime authority for existing `--iifr-*` aliases. Changing it would be a site-wide redesign and a Hostinger-surface mutation, both outside this repair.

| Surface | Canonical source | Locked runtime value | Decision |
|---|---:|---:|---|
| Maroon | `#6c131b` | `#3f3a36` through `--iifr-warm-charcoal` | Canonical value added in-repo; locked legacy stylesheet intentionally left unchanged. |
| Navy | `#242f4c` | `#4b4b4b` | Canonical value added in-repo; locked legacy stylesheet intentionally left unchanged. |
| Gold | `#c79906` | `#c79906` | Reconciled; no discrepancy. |
| Ivory | `#efebe5` | `#efebe5` | Reconciled; no discrepancy. |
| Title / H1 | 50px / 40px | Display 40px | H1 already matches; 50px title token added without changing existing page scale. |
| H2 / H3 / body | 35px / 30px / 18px | 32px / 21px / 16.5px | Canonical tokens added; locked page scale preserved to avoid redesigning every migrated route. |
| Card padding | 32px standard | Partner cards 36px × 28px | Canonical token added; existing component dimensions preserved for migration stability. |
| Grid gap | 32px | Partner/governance grids 24px/28px | Canonical token added; existing component geometry preserved except for the verified T2 alignment fixes above. |

## Remaining blockers and decisions

- Global favicon: no approved IIFR favicon is present in either image-mapping source. Existing `public/favicon.svg` is not asserted as the approved brand asset, so it remains unchanged.
- Home hero: neither image-mapping source approves a home hero. The route still references `assets/images/hero-home.webp` through the locked read-only external asset path; no Programmes-image reuse was inferred.
- ECP Webinars & Masterclass: approved YouTube URL(s), titles, and embed/privacy policy are still required before T3 implementation.
- EFM start date: retain February 2027 until Murali explicitly confirms or replaces it in the T3 lane.

## Safety

No Hostinger, DNS, FTP/SFTP, `public_html`, forms, CRM, Vercel configuration, preview deployment, or production deployment action was performed by this repair.
