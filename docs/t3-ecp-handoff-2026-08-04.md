# T3 ECP handoff — 2026-08-04

Implemented the ten Build-now ECP changes in `src/pages/ecp.astro` and the isolated `src/components/sections/WebinarsAndMasterclass.astro` component.

1. Hero and programme snapshot use the existing ECP asset with explicit centered crop and aligned fact-card wrapper; mobile rules remove negative overlap.
2. Added the exact approved four-month / eight-classroom-days / three-residencies / two-capstones duration statement.
3. Removed Round 1 and stale early-bird fee/date copy; retained the full programme fee only.
4. Added three approved YouTube no-cookie embeds directly after the Why ECP section, with lazy loading, titles, `rel=0`, and no autoplay.
5. Added a native `<details>` FAQ section after Faculty with the `/ecp#faq` anchor.
6. Added both specified Capstone Projects blocks below Structured Curriculum.
7. Enlarged the EFMD logo without changing its aspect ratio.
8. Applied equal-height/flex faculty card bodies so the Ramakrishna Velamuri card aligns with its peers.
9. Aligned the final CTA copy and Apply Now button with responsive mobile stacking.
10. Added Scholarship Support between Structured Curriculum and Industry Opportunity with Academic Excellence, Public Service, and Social Impact.

Deliberate non-fixes: no asset replacement, production/Hostinger changes, Vercel changes, forms/integrations, or new fee/date/faculty claims. The source mirror did not provide an ECP FAQ, so FAQ answers are neutral programme-navigation copy only.

Focused checks: `node --test tests/t3-ecp.test.mjs` and `npm run build`.
