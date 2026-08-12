---
title: "IIFR contemporary prototype — implementation readme"
status: REVIEWABLE_PROTOTYPE
date: 2026-08-04
branch: contemporary-prototype
parent_commit: efe6122
scope: reviewable front-end prototype only — no production route migration, no live forms, no CRM
inputs:
  - /Users/lyraai/Documents/Mac Mini Sync/Business/IIFR/iifr-contemporary-website-design-plan.md
  - /Users/lyraai/Documents/Mac Mini Sync/Business/IIFR/iifr-contemporary-website-design-plan-review.md
  - /Users/lyraai/Documents/Mac Mini Sync/IIFR design.md
---

# IIFR contemporary prototype — implementation readme

## What this prototype is

A reviewable, front-end-only Astro 7.1.6 prototype that delivers the
contemporary IA, experience, and copy direction from the design plan,
**decoupled from the legacy `iifr-redesign.css` bundle** used by the
Phase 2 T2-T5 pixel-match migration. It exists to let Murali, the
technical lead, admissions, and a content editor review the new shape
of the site without touching the locked migration plan or the live
production origin.

It is **not** a production migration, a CMS implementation, a route
migration, an analytics/GTM rollout, or a Vercel production deploy.

## Scope covered (maps to the 7 prototype-scope items in the card body)

| # | Item | Where it lives |
|---|------|----------------|
| 1 | Contemporary home page with academia-to-industry narrative and four audience pathways | `src/pages/contemporary/index.astro` (Hero, BridgeProof, AudiencePathways, featured programme, institutional offer, research & faculty, events + insights, CtaSplit) |
| 2 | Programme discovery/listing and a representative programme detail page | `src/pages/contemporary/programmes/index.astro` (4 programmes + filters), `programmes/[slug].astro` (4 detail pages), `programmes/compare.astro` (side-by-side table) |
| 3 | Institutional partnership/capability page | `src/pages/contemporary/for-institutions/index.astro` (3 solutions + delivery modes + process) and `for-institutions/[slug].astro` (3 solution detail pages) |
| 4 | Research / faculty / events / insights landing experience or modular section demonstrating the content model | `src/pages/contemporary/research-and-faculty/index.astro` (people + projects + teaching innovation) + `research-and-faculty/faculty/[slug].astro` (3 profiles); `events-and-insights/index.astro` + `events-and-insights/events/[slug].astro` (3 events) + `events-and-insights/insights/[slug].astro` (3 articles); `find-your-pathway.astro` (audience selector) |
| 5 | Reusable components, content/data model, and responsive states that make future editing straightforward | `src/contemporary/components/` (Hero, BridgeProof, AudiencePathways, ProgrammeCard, FacultyCard, EventCard, InsightCard, CtaSplit, SiteHeader, SiteFooter) + `src/contemporary/lib/content.ts` (typed programme / cohort / faculty / event / insight / institutional-solution records with `owner`, `lastReviewedAt`, `status`, `source` on every high-risk record) + `src/contemporary/styles/base.css` + `tokens.css` |
| 6 | SEO/GEO baseline | `src/contemporary/lib/seo.ts` (canonical, OG, Twitter meta + JSON-LD graph generators: Organization, WebSite, WebPage, BreadcrumbList, Course+CourseInstance+Offer, Event, Person, ItemList) wired through `src/contemporary/layouts/ContemporaryBaseLayout.astro`; semantic landmarks, one h1 per page, breadcrumbs, OG locale, hreflang `en-IN` + `x-default` |
| 7 | Conversion baseline (CTAs + lead-capture placeholders only; **no live forms**) | All CTAs route through `src/pages/contemporary/start.astro` which preserves the `?intent=apply|enquire|brochure|partner&programme=&topic=` contract and explicitly tells the visitor the form is a placeholder. Final decision block uses `CtaSplit.astro`. Email fallback to `info@iifr.global` only. |

## Content placeholders vs canonical source content

The prototype content is **local, typed, and owner-attributed** in
`src/contemporary/lib/content.ts`. It is **not** wired to Keystatic
and **not** read from the live `iifr.global` site at build time.

### Placeholders (clearly labelled as such)

| Field / record | Status | Source/owner |
|---|---|---|
| Programme cohort dates (ECP 21 Aug 2026 start; EFM Jan 2027 intake) | Verified against current `iifr.global/ecp` evidence on 2026-08-04 | Owner: IIFR Admissions, lastReviewedAt 2026-08-04 |
| Programme fee (`₹1,50,000 + GST as applicable`) | Inline string, not a number — never encoded as a figure without source | Owner: IIFR Admissions |
| EFM credential language | Under review with Academic Council — page text explicitly says "Credential language is under review with the academic council and must not be characterised as a degree until approved" | Owner: Academic Council |
| Faculty (3 typed profile entries) | Consolidated rather than named individuals; individual consent + display approval is a Phase 4 prerequisite per the review | Owner: Office of the Director |
| Event dates, speakers, registration URLs | Stable typed placeholders; ownership and consent fields are present | Owner: IIFR Admissions / Research Office |
| Insight bodies, authors, dates | Short, attributed summaries; full articles require named author + source approvals | Owner: IIFR Faculty / Research Faculty |
| Logo, partner marks, photography | Not added; the design uses solid navy/ivory surfaces + copy, no `<img>` hero asset | n/a |
| Hero, faculty, programme imagery | None inlined; page headings, eyebrows, and typography do the editorial work | n/a |

### What is canonical

- All brand palette, typography, spacing, motion, copy casing, and
  British English rules per `/Users/lyraai/Documents/Mac Mini Sync/IIFR design.md`.
- The four-audience pathway language, the programme/cohort split,
  the institutional three-step process, and the home page sequence
  come from the design plan §6.
- The "Where academic rigour meets real-world practice" headline is
  a **prototype** direction; the alternative "Advancing Faculty,
  Research, and Academic Leadership" remains the canonical tagline
  from the brand source. Murali must rule on which is the public H1
  (see "Unresolved decisions" below).

## Unresolved runtime / CMS choices

Per the independent review (`iifr-contemporary-website-design-plan-review.md`):

1. **Keystatic on static Hostinger is not viable.** The Keystatic
   integration injects `prerender: false` routes that require an
   Astro server adapter/runtime. Static Hostinger output does not
   provide that runtime. The contemporary prototype therefore reads
   from `src/contemporary/lib/content.ts` at build time, **not** from
   Keystatic. Murali and the technical lead must rule on one of:
   - separate private Keystatic runtime on Vercel (review Amendment 1, the
     "counter-architecture" sequence); or
   - Hostinger-compatible server-side CMS (PHP/MySQL narrow admin, or
     WordPress with custom post types); or
   - defer the public Keystatic editor to a later phase, leaving the
     editorial system as a typed-content-file + preview-deploy workflow
     until a managed CMS is funded.
2. **No IIFR tool was wired in this prototype.** No GTM, no Zoho, no
   Formspree, no analytics, no Bigin, no CRM, no paid platforms.

## Design tokens vs canonical brand system, with intentional discrepancies

Canonical tokens (byte-identical to the brand file):

| Token | Value | Source |
|---|---|---|
| Navy | `#242f4c` | `tokens.css`, brand file |
| Maroon | `#6c131b` | `tokens.css`, brand file |
| Gold | `#c79906` | `tokens.css`, brand file |
| Ivory | `#efebe5` | `tokens.css`, brand file |
| Border | `#d4d1cc` | `tokens.css`, brand file |
| Divider | `#e8e5e0` | `tokens.css`, brand file |
| Heading font | Roboto Slab, fallback Georgia, "Times New Roman", serif | `tokens.css`, brand file (system fallback explicit so the page renders without webfonts) |
| Body font | Roboto, fallback system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif | `tokens.css`, brand file (system fallback explicit so the page renders without webfonts) |
| Content width | 1200 / 800 / 1400 px | matches brand file |
| Card padding | 32 px (standard) | matches brand file |
| Grid gap | 32 px | matches brand file |
| Radii | 4 (button) / 8 (card) / 12 (feature) / 9999 (pill) | matches brand file |
| Shadows | `0 2px 8px rgba(0,0,0,0.06)` (card) / `0 8px 24px rgba(0,0,0,0.12)` (elevated) | matches brand file |
| Motion | 250 ms `cubic-bezier(0.4, 0, 0.2, 1)` | matches brand file |
| Sentence-case headings | enforced | matches brand file |
| British English | enforced | matches brand file |
| No gradients | enforced (only flat solid colours) | matches brand file |
| No emoji | enforced | matches brand file |

### Intentional discrepancies (documented per card requirement)

1. **Namespace prefix:** tokens are namespaced under `cp-` (e.g.
   `--cp-color-navy`) instead of the bare `--color-navy` used in the
   canonical brand file. Reason: prototype is fully decoupled from the
   Phase 2 legacy stylesheet and the migration's `--color-*` tokens, so
   naming collision is impossible. Values are byte-identical.
2. **System font fallback:** heading/body font stacks include
   `Georgia` / `system-ui` / `-apple-system` fallbacks. Reason: the
   build does not bundle Roboto Slab / Roboto webfonts (would require
   licensing decision and a font-display policy that Murali has not
   signed). When fonts load from the host CDN they win; in the meantime
   the fallback stack renders with the same x-height and conservative
   rhythm. **Action:** the canonical brand file mentions self-hosting
   or subsetting — Murali should choose before any preview Vercel
   deploy.
3. **Responsive type scaling:** uses `clamp()` with viewport-based
   breakpoints. Reason: the brand file lists desktop-only sizes
   (e.g. "Title: Roboto Slab 50px"); the prototype adds a responsive
   range so mobile reflow passes Lighthouse ≥ 90 on mid-range hardware.
   **Action:** brand amendment needed for the canonical mobile scale,
   or a waiver noted in the brand system file.
4. **Section padding:** uses `clamp(3rem, 1.5rem + 6vw, 6rem)` for
   vertical padding (vs the brand file's fixed 96 px). Same rationale
   as #3.
5. **Hero background:** the brand file specifies "Full-bleed imagery
   for hero sections with dark overlay gradients for text
   legibility"; the prototype uses a solid navy panel (no overlay,
   no gradient, no hero image). Reason: hero photography is part of
   the brand-required image map which is explicitly not in this
   scope (the asset map covers only four pages and excludes hero
   assets); the review §10 also notes the canonical "no gradients"
   rule conflicts with "overlay gradients for text legibility" and
   defers resolution to a brand amendment. **Action:** Murali and
   the technical lead resolve the gradient contradiction in the
   source design file, and approve the hero imagery before the next
   phase.
6. **Button casing:** the brand file specifies uppercase button
   text (`APPLY NOW`, `LEARN MORE`); the prototype uses sentence
   case in some surfaces (`Apply`, `Enquire about this programme`).
   Reason: the review §10 flags this as an open contradiction. The
   prototype defaults to sentence case for legibility on small view
   ports and to keep CTAs warm. **Action:** Murali and the brand
   owner reconcile this in the brand file.

## SEO / GEO evidence

- **Semantic HTML:** every page renders with one `<h1>`, sections
  use `<section aria-labelledby="…">`, breadcrumbs use
  `<nav aria-label="Breadcrumb">` + ordered list + aria-current on
  the last item, and the layout provides a `<a class="cp-skip-link"
  href="#cp-main">` skip link.
- **Stable clean routes:** the contemporary routes live under
  `/contemporary/*` and never use `.php` suffixes. Canonical URLs
  are absolute (`https://iifr.global/contemporary/...`). Astro
  config (`astro.config.mjs` + `vercel.json`) is set to
  `trailingSlash: "never"` so `/contemporary/programmes/ecp` is
  the only canonical form.
- **Per-page SEO via `CpSeo`:** `title`, `description`, `keywords`,
  `canonical`, `image`, `type` (`website` | `article`), and JSON-LD
  schema type (`WebPage` | `Course` | `Event` | `Person` | `ItemList`
  | `Organization`) are typed in `src/contemporary/lib/seo.ts`.
- **JSON-LD types in use:**
  - **Every page:** `Organization` (`#organization`) + `WebSite`
    (`#website`) + `WebPage` (`#webpage`) + `BreadcrumbList`
    (`#breadcrumb` when breadcrumbs are present).
  - **Programme detail:** the above + `Course` with `CourseInstance`
    and `Offer`. Course instances mirror cohort dates, location, and
    fee. `availability` is `https://schema.org/InStock` for
    registration-open cohorts and `https://schema.org/PreOrder`
    otherwise. Cohort fields that are null are omitted rather than
    fabricated.
  - **Event detail:** the above + `Event` with `startDate`,
    `eventAttendanceMode` (`OnlineEventAttendanceMode` vs
    `OfflineEventAttendanceMode`), and `eventStatus` (`Scheduled` vs
    `Cancelled`).
  - **Faculty profile:** the above + `Person` with `affiliation`,
    `worksFor`, and `jobTitle`.
  - **Programme list:** the above + `ItemList` enumerating each
    programme slug.
  - **No `CollegeOrUniversity` claim.** Per the review §3.7,
    `EducationalOrganization` plus `Organization` is used until the
    institute's degree-granting status is approved.
- **OG / Twitter card:** every page sets `og:title`, `og:description`,
  `og:url`, `og:image`, `og:locale= en_IN`, `og:site_name = IIFR`,
  and Twitter `summary_large_image` with the same fields.
- **hreflang:** `en-IN` and `x-default` on every page (single-locale
  site, but the design plan §10 warns against an empty internationalisation
  scaffold — `hreflang` is only emitted when a real translation
  exists; here it points at the canonical so we signal locale without
  inventing one).
- **robots:** `index, follow, max-image-preview:large, max-snippet:-1`.
  Preview-only Vercel deploys remain `noindex` per `vercel.json`
  (`X-Robots-Tag: noindex, nofollow, noarchive`).
- **Canonical clean URLs:** clean URLs and `.php` variants are a
  known blocker in the locked migration plan (current `iifr.global`
  serves both with identical HTML and canonical pointing at the
  `.php` variant). The contemporary prototype establishes the
  proposed clean canonical URLs (`/contemporary/...`) without
  redirect logic; the locked migration redirect map is out of scope
  for this card.
- **Internal-link strategy:** a four-pathway anchor rail on the
  home, plus explicit cross-links between programme → cohort →
  faculty → events → insights routes. The "related content" rail
  uses audience-intent, not recency.

## Conversion CTA inventory and what the prototype intentionally does NOT wire

### CTAs in the prototype

| CTA | Where it lives | What it does |
|---|---|---|
| Find your pathway | Site header (primary nav action), home hero (primary), home Audience Pathways cards, programmes index, footer | Routes to `/contemporary/find-your-pathway` (audience selector) |
| Explore programmes | Home hero (secondary), institution card, footer | Routes to `/contemporary/programmes` |
| Compare programmes | Audience pathways card, ECP/EFM/faculty detail pages, CTA split | Routes to `/contemporary/programmes/compare` |
| Apply (or Enquire — contextual) | Header contextual CTA, programme detail primary, compare-table next step | Routes to `/contemporary/start?intent=apply|enquire&programme=…` |
| Request brochure | Programme detail secondary | Routes to `/contemporary/start?intent=brochure&programme=…` |
| Discuss institutional need | Home institutional section, audience pathways, CTA split, footer | Routes to `/contemporary/for-institutions` and `/contemporary/start?intent=partner&topic=…` |
| Email IIFR instead | `start.astro`, contact page | Opens `mailto:info@iifr.global?subject=…` (operational backup) |
| Register (events) | Event detail | Routes to `/contemporary/start?intent=enquire&programme=…` (event placeholders) |
| Read insight → enrol | Insight card | Routes to insight detail; detail links to related programme |
| Faculty CTA | Faculty profile | "See the full research and faculty hub" route |

### What this prototype intentionally does NOT wire

- **No live form.** `/contemporary/start` preserves the URL contract
  (`?intent=apply|enquire|brochure|partner&programme=&topic=`) and
  explains in copy that the form is a placeholder. Visitors see a
  clear "what is intentional" section listing every omitted wire-up.
- **No CRM.** No Zoho, no Formspree, no Bigin, no Salesforce, no
  HubSpot. No lead-capture webhook.
- **No analytics.** No GTM, no GA4, no Segment, no Meta Pixel, no
  LinkedIn Insight Tag. No event tracking at all (no
  `apply_start`, `form_submit`, etc.).
- **No A/B test or experiment hooks.**
- **No remarketing / conversion tags.**
- **No email opt-in confirmation flow.** No `mailto` submission
  either — only `mailto` link.
- **No CMS-side approval workflow.** The content is a typed TS module.
- **No Hostinger / DNS / FTP / SFTP / `.htaccess` changes.**

The placeholders exist precisely so a future Phase 4 implementer can
wire each `?intent=…` slot to a real form without rewriting the
calling sites.

## Run instructions

```bash
# from inside this worktree
cd /Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary

# install only if node_modules is missing (already present in this worktree)
npm install

# dev server (Astro v7.1.6) — background:
npm run dev   # http://localhost:4321  (route /contemporary …)

# production build (writes dist/ + .vercel/output/):
npm run build

# preview the static build locally:
npm run preview
```

### Routes to review

- Home: `/contemporary`
- Programme index: `/contemporary/programmes`
- Programme detail: `/contemporary/programmes/ecp`, `/efm`, `/faculty-development`, `/executive-education`
- Compare: `/contemporary/programmes/compare`
- For institutions: `/contemporary/for-institutions`
- Institutional solutions: `/contemporary/for-institutions/faculty-capability`, `/executive-education`, `/academic-industry-partnerships`
- Research & faculty: `/contemporary/research-and-faculty` + `/research-and-faculty/faculty/academic-council`, `/professors-of-practice`, `/research-faculty`
- Events & insights: `/contemporary/events-and-insights` + `/events-and-insights/events/{slug}` and `/events-and-insights/insights/{slug}`
- Find your pathway: `/contemporary/find-your-pathway`
- Start (lead-capture placeholder): `/contemporary/start?intent=apply&programme=ecp` (etc.)
- About: `/contemporary/about`
- Contact: `/contemporary/contact`
- Privacy: `/contemporary/privacy`

### Build verification (this card, 2026-08-04)

```
$ npm run build
…
18:05:23 [vite] ✓ built in 403ms
 prerendering static routes
…
18:05:23 ✓ Completed in 84ms.
18:05:23 [build] Rearranging server assets...
18:05:23 [build] ✓ Completed in 762ms.
…
18:05:24 [build] Complete!
```

`npm run build` exits 0. `npm run dev` returns HTTP 200 for every
contemporary route tested (28 routes). See the completion metadata
for the exact set.

## Hard redlines respected (per the card body)

- No Hostinger / DNS / FTP / SFTP / `public_html` / `.htaccess` mutations.
- No Vercel production config — `vercel.json` was not edited; preview
  deploys remain `noindex` via the existing `X-Robots-Tag`.
- No commits on `main` or `repair/t-a2ed6d0e-t2`. Branch is
  `contemporary-prototype` and stayed there throughout.
- `npm install` and `npm run build` ran only inside this worktree.
- No fabricated faculty, dates, fees, rankings, accreditations, or
  outcomes. Every high-risk record has an `owner`, `lastReviewedAt`,
  `status`, and `source` field; the EFM credential language is
  explicitly flagged as under review.
- No live form wiring, no CRM, no Zoho, no Formspree, no analytics.
- The parent worktree (`iifr-global`) was not modified.

## Unresolved decisions Murali must rule on

Carried forward from the design plan §17 and the review §13:

1. **Positioning headline.** Approve "Where academic rigour meets
   real-world practice" as the public H1, or keep "Advancing
   Faculty, Research, and Academic Leadership"?
2. **Commercial priority for the next 12 months.** ECP applications,
   EFM pipeline, institutional partnerships, research collaborations,
   or a balanced portfolio? (Drives the audience-priority CTA pattern.)
3. **Five-item primary nav + "Find your pathway" concept.** Final
   approval.
4. **EFMD certification wording.** The prototype shows
   "EFMD certification language under review" and the about page
   does not assert a specific certification. Murali to approve the
   final wording and the scope of the certification object (institute
   vs programme).
5. **EFM credential equivalence.** "Doctoral-equivalent" is not used
   anywhere in the prototype; the EFM detail page explicitly says
   the credential is under review. Murali to approve or reject.
6. **"Executive education" public label.** Use "Custom executive and
   institutional programmes" (used in the prototype) or rename?
7. **Faculty display permissions and external-link policy.** The
   prototype uses three consolidated profile records with consent
   flags. Murali to decide on real named faculty, current affiliations,
   and links to outside work.
8. **Phase 7+ relationship.** Per review Amendment 2, this plan /
   prototype is Phase 7+ and cannot replace Phase 2 T2-T5 routes.
   Murali to confirm.
9. **Keystatic runtime decision** (unresolved per Amendment 1). See
   "Unresolved runtime / CMS choices" above.
10. **Brand amendments** needed before preview deploy:
    - **No gradients vs dark overlay gradients contradiction** in the
      brand file (`IIFR design.md` lines 81-82).
    - **Button casing contradiction** (uppercase vs sentence case)
      in the brand file (§"Copy Style") vs the prototype's defaults.
    - **Font licensing and hosting decision** so the build can ship
      webfont assets in Phase 3+.

## Files produced (paths, absolute)

Source:
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/styles/tokens.css`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/styles/base.css`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/lib/content.ts`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/lib/seo.ts`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/layouts/ContemporaryBaseLayout.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/Hero.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/BridgeProof.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/AudiencePathways.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/ProgrammeCard.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/FacultyCard.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/EventCard.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/InsightCard.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/CtaSplit.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/SiteHeader.astro`
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/contemporary/components/SiteFooter.astro`

Pages (all under `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/src/pages/contemporary/`):
- `index.astro`, `about.astro`, `contact.astro`, `privacy.astro`, `find-your-pathway.astro`, `start.astro`
- `programmes/index.astro`, `programmes/[slug].astro`, `programmes/compare.astro`
- `for-institutions/index.astro`, `for-institutions/[slug].astro`
- `research-and-faculty/index.astro`, `research-and-faculty/faculty/[slug].astro`
- `events-and-insights/index.astro`, `events-and-insights/events/[slug].astro`, `events-and-insights/insights/[slug].astro`

This readme:
- `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary/docs/contemporary-prototype-readme.md`
