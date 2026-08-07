---
title: "Independent verification: IIFR contemporary prototype and isolated test deployment"
date: 2026-08-04
verifier: verifier
prototype_branch: contemporary-prototype
prototype_commit: 3e0dc4976fcef75da9400bf8f6374443c8361476
deployment_id: dpl_8oPrss65q7LD2BkqdtCQtrjaTgjX
deployment_url: https://iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app
verdict: FAIL
---

# Independent verification: contemporary prototype and isolated test deployment

## Verdict

**FAIL / BLOCKED FOR APPROVAL.** The prototype builds, the contemporary route family exists locally, the implementation is isolated in its own Git worktree and Vercel project, the canonical palette and no-gradient rule are present, and the main content journeys are represented. Approval is blocked because the supplied Vercel deployment is inaccessible to a reviewer without Vercel login, and the source/runtime review found additional testable defects in typography delivery, CTA routing/state, programme facts, and structured-data URLs.

A non-Vercel-login reviewer **cannot open the deployment**. Anonymous HEAD requests to `/`, `/contemporary`, `/contemporary/programmes`, `/contemporary/programmes/ecp`, and `/contemporary/for-institutions/academic-industry-partnerships` all return `HTTP/2 302` to `https://vercel.com/sso-api?...` with a `_vercel_sso_nonce` cookie. This is not an externally reviewable deployment.

## Scope and evidence labels

- **Observed** means directly inspected in Git, source, generated/runtime HTML, local HTTP responses, Vercel CLI output, or anonymous deployment responses during this verification.
- **Derived** means the conclusion follows directly from observed evidence.
- **Unverified** means the available evidence cannot establish a historical or external-state claim without additional records or authority.

## 1. Source isolation and existing-build safety

### Observed

- `git worktree list --porcelain` shows two separate worktrees:
  - `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global` on `repair/t-a2ed6d0e-t2`.
  - `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary` on `contemporary-prototype`.
- Contemporary HEAD is exactly `3e0dc4976fcef75da9400bf8f6374443c8361476`.
- `git diff --name-status efe6122..3e0dc49` contains 33 additions only: `src/contemporary/**`, `src/pages/contemporary/**`, and `docs/contemporary-prototype-readme.md`. No existing-build file was modified by this commit.
- Vercel CLI lists a distinct project, `iifr-global-contemporary-test`, alongside the pre-existing `iifr-global` project.
- Deployment inspection reports ID `dpl_8oPrss65q7LD2BkqdtCQtrjaTgjX`, name `iifr-global-contemporary-test`, READY state, and aliases confined to `*.vercel.app`; no `iifr.global` alias is present.
- The existing-build worktree was dirty at verification time due concurrent Phase 2 work. That live state is not evidence that the prototype/deploy worker caused those changes.

### Derived

- The prototype source commit is isolated from the existing build at the Git-path and worktree levels.
- The final Vercel project is separately named and has no production `iifr.global` domain alias.
- The final deployment is operationally isolated from the public IIFR domain, although Vercel inspection reports `target: "production"` inside the test project rather than a preview target.

### Unverified

- Historical absence of every external mutation to Hostinger, DNS, FTP/SFTP, production Vercel settings, forms, CRM, tracking, or paid platforms cannot be proven from the contemporary Git commit or current Vercel read-only state alone.
- The deployment handoff reports an intermediate misnamed Vercel project/deployment that was created and removed. Its deletion is consistent with the current project list, but this verifier did not inspect immutable Vercel audit logs.
- The current existing-build worktree is not clean, so a clean-at-handoff assertion cannot be re-derived from present state. Attribution would require timestamps/audit logs.

**Result: PASS for source/worktree isolation; PASS for final project/domain isolation; UNVERIFIED for complete historical external-mutation claims.**

## 2. Brand system and runtime styling

### Observed

- `src/contemporary/styles/tokens.css:18-25` contains canonical black, maroon `#6c131b`, navy `#242f4c`, gold `#c79906`, ivory `#efebe5`, and white values.
- `src/contemporary/styles/tokens.css:33-35` declares Roboto Slab for headings and Roboto for body text.
- `src/contemporary/styles/base.css:24-30` applies the body token; lines 55-64 apply the heading token.
- A search across added contemporary CSS/Astro/TS found no `linear-gradient(`, `radial-gradient(`, or `conic-gradient(` runtime declaration. Browser CSS inspection also reported zero gradient rules.
- The contemporary layout imports only `src/contemporary/styles/base.css`; it does not import the legacy stylesheet.
- Runtime HTML contains no font stylesheet link, and the contemporary source contains no `@font-face`. Browser inspection found `document.fonts` contained zero font faces. The computed family names reference Roboto/Roboto Slab, but clients without locally installed copies fall back to system fonts.
- Canonical `IIFR design.md:55-56` assigns H3/H4 to Roboto, while `src/contemporary/styles/base.css:55-64` assigns H1-H4 to Roboto Slab. This discrepancy is not listed in the implementation readme's intentional discrepancies.

### Derived

- Canonical colours and the no-gradient rule are realized in runtime CSS.
- Roboto Slab/Roboto are not reliably delivered as runtime assets. Token names alone do not ensure the intended typography renders for reviewers.
- The implemented H3/H4 family conflicts with the canonical type scale.

**Result: FAIL.**

### Remediation

1. Self-host or otherwise load approved Roboto Slab and Roboto assets with an explicit `font-display` policy; verify loaded font faces in a clean browser profile.
2. Align H3/H4 with the canonical system or document and approve the discrepancy explicitly.
3. Re-run a runtime computed-style/font-face check after the change.

## 3. Required journeys and content model

### Observed

- `npm run build` exited 0 and prerendered the full contemporary route family.
- An independent local crawl returned HTTP 200 for 37 unique contemporary URLs, including home, programme discovery, ECP/EFM details, compare, institutional landing and detail, research/faculty, events/insights, and CTA placeholder variants.
- Home audience pathways are explicit in `AudiencePathways.astro`: Individuals, Faculty, Institutions, and Researchers.
- Programme, cohort, faculty, event, insight, and institutional-solution interfaces and records exist in `src/contemporary/lib/content.ts`.
- Programme detail pages expose audience, outcomes, curriculum, faculty mix, cohort facts, certification, and next-step links.
- Institutional pages expose three capability/partnership solution patterns and a three-step process.
- Research/faculty and events/insights landing/detail routes are generated from the typed model.
- Institutional CTAs use `solution.ctaTarget`, and event registration CTAs use `event.registrationUrl`. Those values are `/start?...`, not `/contemporary/start?...`; local probes return HTTP 404 for `/start?intent=partner&topic=faculty-capability`, `/start?intent=partner&topic=research`, and `/start?intent=enquire&programme=ecp`.
- `/contemporary/start` is prerendered while reading `Astro.request.url`. Four distinct query variants produced byte-identical HTML (same SHA-256 `4b797df6147386aaff44f4af8c37d7e92cc60dba6e6c17fcb0c1779a46c913c1`). The runtime therefore does not preserve or echo programme/topic intent as claimed.
- `content.ts:297-303` publishes an EFM January 2027 intake with exact start/end/deadline dates. Murali-confirmed source evidence in the existing build and business documents says **February 2027**, not January 2027.
- Three event records assert exact dates and `source: "IIFR events calendar — verified 2026-08-04"`. No matching event titles/dates were found in the supplied business-plan sources, and no calendar evidence was attached to the handoff.

### Derived

- The required information architecture and content-model breadth exist.
- The institutional and event conversion journeys break at their CTA destination.
- The promised query-contract behaviour on the lead-capture placeholder is not functional in static output.
- The EFM cohort fact violates the no-invented/stale-dates constraint.
- Exact event facts remain unsupported until their claimed source is supplied.

**Result: FAIL.**

### Remediation

1. Prefix institutional and event CTA destinations with `/contemporary` (or centralize route construction) and prove each CTA target returns 200.
2. Replace the prerender-time query-dependent start page with a static-safe client/runtime strategy or path-based routes; prove distinct apply/enquire/brochure/partner variants render distinct, correct state.
3. Replace the EFM January 2027 dates with the approved February 2027 wording unless Murali supplies a newer authoritative exact date.
4. Supply source evidence for every event date/speaker/registration claim or label/remove the records as non-public placeholders.
5. Add automated link and fact-regression tests for the above.

## 4. SEO/GEO inspectability

### Observed

- Sampled local routes render one H1, one main landmark, header/footer navigation, skip link, breadcrumbs, canonical link, description, OG/Twitter metadata, and JSON-LD.
- Canonicals correctly use `https://iifr.global/contemporary/...` for sampled page routes.
- Programme detail JSON-LD emits `Course`, `CourseInstance`, `Offer`, and `BreadcrumbList`; event/person/list generators exist.
- Internal cross-links are extensive, and a local contemporary crawl reached 37 HTTP-200 URLs.
- Structured-data helpers contain incorrect non-contemporary URLs:
  - `seo.ts:121` uses `https://iifr.global/programmes` in programme breadcrumbs.
  - `seo.ts:175-177` uses `https://iifr.global/events` in event breadcrumbs.
  - `seo.ts:208-209` uses `https://iifr.global/research-and-faculty` in faculty breadcrumbs.
  - `seo.ts:224-230` identifies the programme list and items under `/programmes...`, not `/contemporary/programmes...`.
- The start-page canonical cannot encode programme/topic state because the static page ignores query parameters.

### Derived

- Semantic structure, metadata handling, canonical patterns, JSON-LD generators, and internal-link strategy are inspectable and substantially implemented.
- Structured-data graph URLs do not consistently describe the actual contemporary route family, weakening schema integrity and entity/path consistency.

**Result: FAIL.**

### Remediation

1. Make every JSON-LD breadcrumb, ItemList ID, and item URL use the actual `/contemporary/...` canonical route family.
2. Validate generated JSON-LD for programme, event, faculty, and list routes with automated assertions against each page canonical.
3. Remove query-dependent canonicals or implement a runtime/path strategy that produces stable canonical state.

## 5. Deployment access and route results

### Observed

- Vercel project: `iifr-global-contemporary-test`.
- Vercel deployment: `dpl_8oPrss65q7LD2BkqdtCQtrjaTgjX`, READY.
- Exact deployment URL: `https://iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app`.
- Anonymous probes returned 302 → Vercel SSO for:
  - `/`
  - `/contemporary`
  - `/contemporary/programmes`
  - `/contemporary/programmes/ecp`
  - `/contemporary/for-institutions/academic-industry-partnerships`
- Each response included `cache-control: no-store`, a route-specific SSO URL/nonce, `_vercel_sso_nonce`, and `x-robots-tag: noindex`.
- Control `https://iifr-hostinger.vercel.app` returned HTTP 200 anonymously.
- Vercel inspection reports the test deployment's target as `production` and aliases only under the isolated test project's Vercel domains.

### Derived

- Route requests reach Vercel protection, but the underlying pages cannot be independently reviewed through the supplied deployment URL without Vercel authentication.
- A non-Vercel-login reviewer cannot open the deployment.
- The anonymous deployment-access acceptance criterion is not met.

**Result: FAIL / BLOCKED on external access.**

### Required Murali decision

Choose and authorize one of these before re-verification:

1. Disable Standard Protection **only on `iifr-global-contemporary-test`** for the review window, then restore/delete the test project after sign-off; or
2. Invite the named reviewer to the Vercel team with the least privilege necessary and provide the reviewer identity/email through an approved channel.

No protection setting was changed by this verifier.

## 6. Redline review

### Observed

- The prototype commit contains no integration code for Hostinger, DNS, FTP/SFTP, live forms, CRM, analytics, or paid platforms.
- `/contemporary/start` explicitly states that it collects no personal data and fires no CRM/analytics event.
- No gradients were found in added runtime code.
- The final Vercel aliases contain no `iifr.global` domain.
- This verifier performed read-only Git/Vercel/HTTP/browser checks plus the required local build and wrote only this report.

### Derived

- Source-level and final-state evidence is consistent with no live form, CRM, tracking, or public-domain wiring in the prototype.

### Unverified

- Absolute historical proof of no Hostinger/DNS/production-Vercel/control-plane action requires immutable provider audit logs. The current evidence and handoff assertions are consistent with the redlines but do not independently prove every negative historical event.

## Verification commands and evidence summary

- `git worktree list --porcelain`
- `git rev-parse HEAD`; `git status --short`
- `git diff --name-status efe6122..3e0dc49`
- `npm run build` → exit 0; 29 contemporary/legacy static routes shown in build output
- Independent local HTTP crawl → 37 contemporary URL variants returned 200
- Local probes of `/start?...` destinations → 404
- SHA-256 comparison of four `/contemporary/start?...` variants → identical response hash
- Runtime HTML parser checks → one H1/main, canonical, internal links, and JSON-LD types on sampled routes
- Browser console → no JavaScript errors; zero loaded font faces; zero gradient CSS rules
- `vercel project ls --scope thehawkeyes-projects`
- `vercel inspect ... --format=json` → deployment READY, isolated aliases, `target: "production"`
- Anonymous `curl -I` route probes → 302 to Vercel SSO; public control → 200

## Approval condition

Re-verification may pass only after:

1. Murali resolves reviewer access to the isolated test project.
2. The same corrected commit is deployed and anonymously/reviewer-accessibly opens the required routes.
3. Roboto Slab/Roboto are actually delivered or an approved alternative is documented.
4. Broken `/start` CTAs and static query-state handling are corrected and tested.
5. EFM and event facts are reconciled with authoritative evidence.
6. Structured-data URLs match the `/contemporary/...` canonical route family.
