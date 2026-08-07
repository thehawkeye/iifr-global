---
title: "IIFR contemporary live-state reconciliation"
date: 2026-08-06
author: analyst
scope: read-only evidence reconciliation
repo_head: b184aa0dec50ac15688558c76635c745a2aec2ee
git_branch: contemporary-prototype
stable_alias: https://iifr-global-contemporary-test.vercel.app
known_hash_url: https://iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app
---

# IIFR contemporary live-state reconciliation

## Verdict

The three ECP corrections are implemented and rendered in the current local tree, but neither the stable Vercel alias nor the known hash deployment contains them. The broader Murali change set is mostly unimplemented. L2-L11 have not started, L1/L12/L13 are split between untouched Operations cards and blocked Admin rehomes, and the deployed site remains the earlier prototype with later hero photography on the stable alias.

The current local build artifact is useful but not deployment evidence. It was regenerated after the four source edits and contains the corrected ECP strings, while both live targets still contain the old ₹1,50,000 ECP fee and ISO-formatted dates.

## Evidence labels

- **[OBSERVED]** Directly read from Git, source, generated HTML, Kanban SQLite/card state, Vercel inspection, or protected live HTTP responses.
- **[DERIVED]** Follows directly from observed evidence.
- **[ASSUMED]** Plausible but not established. No matrix pass relies on an assumed fact.

## Evidence anchors

### Repository

- **[OBSERVED]** Branch `contemporary-prototype`, HEAD `b184aa0dec50ac15688558c76635c745a2aec2ee`.
- **[OBSERVED]** Four tracked files are modified and no other tracked source file is modified:
  - `src/contemporary/components/Hero.astro`
  - `src/contemporary/components/ProgrammeCard.astro`
  - `src/contemporary/lib/content.ts`
  - `src/pages/contemporary/programmes/[slug].astro`
- **[OBSERVED]** `docs/contemporary-prototype-verification.md` and `docs/todo-plan-2026-08-06.md` were already untracked before this reconciliation.
- **[OBSERVED]** The four-file diff is 109 insertions and 33 deletions. It combines the ECP master-content rewrite with the three later ECP corrections.

### Existing build artifact, not a new build

- **[OBSERVED]** `dist/` is not tracked by Git (`git ls-files dist` returned 0).
- **[OBSERVED]** Four source files were last modified between 07:09:45 and 07:10:19 IST. The key generated HTML files were last modified at 14:17:57 IST, after the source changes.
- **[OBSERVED]** Generated file digests:
  - `dist/client/contemporary/index.html`: `cde2b8facb89b4685361e4827de97bfd56b6a4193366a99587659a250c32f16b`
  - `dist/client/contemporary/programmes/index.html`: `f352dc51572682e741896e27aa295675e68f43315c0bbb87b8033566429fc3e8`
  - `dist/client/contemporary/programmes/ecp/index.html`: `df77338722c19cd710b6e47cecdafd314cf0d20ee0599311996369bfe1d9b1ff`
- **[OBSERVED]** The generated tree contains 27 contemporary `index.html` route artifacts.
- **[OBSERVED]** Exact marker counts in generated HTML:
  - Home: `Founding Batch Scholarship` 1; `21-Aug-2026` 2.
  - Programmes index: `Founding Batch Scholarship` 1; `21-Aug-2026` 1.
  - ECP detail: `Founding Batch Scholarship` 3; `10-Aug-2026` 1; `21-Aug-2026` 2; `31-Jan-2027` 1; ISO `2026-08-21` 1; ISO `2027-01-31` 1.
  - Old `Founding Cohort special pricing` and `₹1,50,000` markers: 0 across generated contemporary HTML.
- **[DERIVED]** The artifact was generated from a tree containing the local ECP corrections. It independently proves rendered-string presence, not that `npm run build` itself exited 0.
- **[OBSERVED]** Admin card comments claim a successful build. Those are same-profile executor/self-verifier claims, not independent process evidence.
- **[OBSERVED]** Generated canonicals still reference the known hash URL. The live known hash does not contain these local markers. Therefore the local `dist/` tree is not proof that those bytes were deployed to that URL.

### Live deployment identity

- **[OBSERVED]** Vercel alias listing maps the stable short alias [iifr-global-contemporary-test.vercel.app](https://iifr-global-contemporary-test.vercel.app) to deployment `iifr-global-contemporary-test-bcxpx2f1e-thehawkeyes-projects.vercel.app`, deployment ID `dpl_B7XrgrCguCvLQR2XKAXiQ8iBj8Lz`.
- **[OBSERVED]** The known hash URL [iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app](https://iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app) is deployment ID `dpl_8oPrss65q7LD2BkqdtCQtrjaTgjX`, state `READY`.
- **[OBSERVED]** Live content was fetched through Vercel's authenticated protection bypass. Marker checks below are based on page bodies, not only HTTP status.

## 1. Three ECP corrections that are local-only

| Murali change | Implemented locally? | Local build evidence? | Independently verified? | Stable alias | Known hash | Screenshot/pixel verified? | Owning card and next action |
|---|---|---|---|---|---|---|---|
| All user-facing ECP dates in `dd-mmm-yyyy` | **Yes [OBSERVED].** `formatDDMMMYYYY()` exists in `content.ts`; ECP-only display gates exist in `Hero.astro`, `ProgrammeCard.astro`, and `[slug].astro`. ISO data remains in `content.ts`. | **Yes, artifact-level [OBSERVED].** Home/programmes/ECP HTML contains `21-Aug-2026`; ECP contains `31-Jan-2027` and `10-Aug-2026`. JSON-LD retains ISO start/end. No fresh build was run by this diagnostic. | **Yes for source and generated HTML [OBSERVED].** Not independently re-built. | **No [OBSERVED].** ECP page contains raw `2026-08-21` and `2026-08-10`; no `21-Aug-2026` or `10-Aug-2026`. | **No [OBSERVED].** Same old ISO markers; formatted markers absent. | **No [OBSERVED].** No current local/live screenshots captured. | `t_126d38c8` and `t_93e50cc2`. Next: independent clean build or immutable build log, then deploy the exact reviewed commit and re-probe. |
| Rename special pricing to **Founding Batch Scholarship** | **Yes [OBSERVED].** Exact label is in ECP `cohort.fee`. Old wording is absent from the local source diff. | **Yes, artifact-level [OBSERVED].** Exact label appears 1x home, 1x programmes, 3x ECP detail. | **Yes for source and generated HTML [OBSERVED].** | **No [OBSERVED].** Exact label count 0; live ECP still shows `₹1,50,000`. | **No [OBSERVED].** Exact label count 0; old fee remains. | **No [OBSERVED].** Text presence only. | `t_126d38c8`. Next: same commit/deploy/re-probe gate as above. |
| Display application deadline **10-Aug-2026** | **Yes [OBSERVED].** ISO `2026-08-10` is retained in data and formatted at the ECP detail display site. | **Yes, artifact-level [OBSERVED].** Exact display marker appears once on generated ECP detail HTML. | **Yes for source and generated HTML [OBSERVED].** The staging ECP page does not publish this deadline; it is valid only because Murali supplied it directly. | **No [OBSERVED].** Exact display marker absent; raw ISO marker present. | **No [OBSERVED].** Exact display marker absent; raw ISO marker present. | **No [OBSERVED].** | `t_126d38c8`. Next: deploy only after independent build evidence and then verify exact marker on both alias and immutable deployment URL. |

### Correction-card reconciliation

- **[OBSERVED]** `t_126d38c8` is currently `blocked`, not done. It has a same-profile Admin ACCEPT comment, but its prior independent verifier path did not complete.
- **[OBSERVED]** `t_93e50cc2` is currently `running` after two recorded crashes. Its latest ACCEPT text was posted by Admin as fallback, not by a completed verifier run.
- **[DERIVED]** The implementation itself is independently observable in source and rendered HTML. The governance claim “independently accepted” is not yet true at card-lifecycle level.

## 2. Full requested-change evidence matrix

| Lane / requested change | Implemented locally? | Local build evidence? | Independent check | Stable alias | Known hash | Screenshot/pixel | Owner and next action |
|---|---|---|---|---|---|---|---|
| **L1 Home hero/header**: watercolor/gradient hero, IIFR icon + full name, remove autonomous-institute line, EFMD/IIFR | **No [OBSERVED].** Home uses `/assets/images/about/about-hero.jpeg`, a photographic asset. `SiteHeader.astro` still renders text wordmark `IIFR.` and the exact line `An autonomous academic institute of Bharatiya Vidya Bhavan`. `EFMD/IIFR` is absent. | **No for requested state [OBSERVED].** Generated home retains the line and photo. | **No requested-state pass [OBSERVED].** | **No [OBSERVED].** Stable has the photo marker and the removed-line marker; `EFMD/IIFR` count 0. | **No [OBSERVED].** Removed-line marker present; no requested hero-image marker and `EFMD/IIFR` count 0. | **No [OBSERVED].** Existing screenshots cover About, Research/Faculty, and Events heroes, not the requested Home hero/header. | Operations `t_e368eb71` is `todo`; Admin rehome `t_3a4c0ca7` is `blocked`. A pane prompt is claimed, but no file/build/visual handoff exists. Implement, build, and capture desktop/mobile evidence. |
| **L2 Home “Where to start” icons** | **Partial old prototype only [OBSERVED].** Four meaningful text cards exist, but `AudiencePathways.astro` has no icon field or icon markup. | **No for icons [OBSERVED].** Generated home contains four cards but no lane-specific icon marker. | **No [OBSERVED].** | **Partial old prototype [OBSERVED].** Four pathway cards exist; `cp-pathways__icon` count 0. | **Partial old prototype [OBSERVED].** Same. | **No [OBSERVED].** | `t_e591f194`, `todo`, `started_at=NULL`. Implement icon semantics, then visual-check all four cards. |
| **L3 Reduce whitespace between pathways and “What we offer”** | **No lane change [OBSERVED].** Current spacing remains the pre-lane CSS (`cp-section`, pathway header margin, programme header margin). | **No requested-state evidence [OBSERVED].** | **No pixel measurement [OBSERVED].** | **Unverified visually [OBSERVED].** Text markers cannot prove spacing. | **Unverified visually [OBSERVED].** | **No [OBSERVED].** This row requires before/after pixels. | `t_67fa9c5d`, `todo`, `started_at=NULL`. Note: DB assignee is `creative`, while routing comment maps execution to coder pane `w1E:p4`. Align owner, then record pixel measurements. |
| **L4 Home “What we offer” statuses**: EFM Coming soon; Research/Faculty Development By enquiry | **No [OBSERVED].** `content.ts` has EFM `status: "by-enquiry"` and faculty development `status: "open"`. | **No for requested state [OBSERVED].** Current generated cards inherit those states. | **No requested-state pass [OBSERVED].** | **No [OBSERVED].** Deployed prototype predates the lane. | **No [OBSERVED].** | **No [OBSERVED].** | `t_0dc2be15`, `todo`, `started_at=NULL`. Update the shared status model, then verify Home and Programmes together. |
| **L5 Programmes**: ECP Aug + EFM Coming soon primary; Faculty Development + Custom By enquiry | **No [OBSERVED].** ECP is open. EFM and Custom are by enquiry, but Faculty Development is open; EFM is not coming soon. No explicit two-primary-callout treatment exists. | **No for requested combination [OBSERVED].** | **No [OBSERVED].** | **No [OBSERVED].** | **No [OBSERVED].** | **No [OBSERVED].** | `t_cbcf9efd`, `todo`, `started_at=NULL`. Run after L4 and verify exact programme/status associations, not free-floating labels. |
| **L6 Research & Faculty split**: Academic Council + Faculty, each with detail pages | **No [OBSERVED].** Current hub has one combined “Faculty and academic council” section and three aggregate records (`academic-council`, `professors-of-practice`, `research-faculty`). Requested list routes do not exist in source. | **No [OBSERVED].** Generated tree has only aggregate profile routes. | **No [OBSERVED].** | **No [OBSERVED].** `/contemporary/research-and-faculty/academic-council` and `/faculty` both return 404. | **No [OBSERVED].** Same two 404s. | **No [OBSERVED].** | `t_79554b07`, `todo`, `started_at=NULL`. Build two real directories/routes from current live sources, then crawl every profile. |
| **L7 For Institutions equal-size boxes** | **Partial old prototype [OBSERVED].** Three cards already render in a 3-column grid at desktop, but no lane-specific equal-height/pixel fix has landed and the card content lengths differ. | **No pixel evidence [OBSERVED].** | **No [OBSERVED].** Source alone cannot certify equal rendered height. | **Old three-card surface present [OBSERVED].** | **Old three-card surface present [OBSERVED].** | **No [OBSERVED].** This row specifically requires 360px/1280px computed geometry. | `t_26135872`, `todo`, `started_at=NULL`. DB assignee is `creative`, routing comment maps coder pane. Reconcile owner and record bounding-box heights. |
| **L8 Events & Insights source/UI**: 3 webinars, 14-Aug-2026 briefing, LinkedIn recent writing | **No [OBSERVED].** No YouTube iframe or supplied video ID exists. Current briefing is `2026-08-05` and titled “pre-application briefing”. No requested LinkedIn activity URL is present. | **No [OBSERVED].** Exact requested markers are absent from generated HTML. | **No [OBSERVED].** [Staging ECP](https://staging-dev.iifr.global/ecp.php) independently confirms two supplied webinar IDs and a different third source-page ID; the Murali lane still specifies `S1RCyVIayfA`. | **No [OBSERVED].** All three supplied IDs, `14-Aug-2026`, `2026-08-14`, `ECP Cohort 1`, and the three specific LinkedIn activity URL markers count 0. | **No [OBSERVED].** Same. | **No [OBSERVED].** | Source-pack card `t_a68e4d3b`, `todo`, `started_at=NULL`; UI overlap also touches L13. First resolve third-video authority, then create sourced pack and UI handoff. |
| **L9 Site-wide “Pracademic” ownership/highlight** | **No requested treatment [OBSERVED].** Lowercase `pracademic` appears in copy and metadata, but no `iifr-pracademic` class/component exists. | **No highlight evidence [OBSERVED].** | **No [OBSERVED].** | **No [OBSERVED].** `iifr-pracademic` count 0. | **No [OBSERVED].** Count 0. | **No [OBSERVED].** | `t_283a57f4`, `todo`, `started_at=NULL`. Apply the agreed highlight-only scope and visual-check representative pages. |
| **L10 About**: highlight Executive Board; call out BVB, LatticeEd, EFMD | **No [OBSERVED].** Contemporary About contains generic Governance and Strategic partners prose. `Executive Board`, `BVB`, and `LatticeEd` are absent; EFMD appears only in a generic quality disclaimer. | **No [OBSERVED].** | **No requested-state pass [OBSERVED].** | **No [OBSERVED].** Exact counts: Executive Board 0, BVB 0, LatticeEd 0; EFMD 1 only in old disclaimer. | **No [OBSERVED].** Same. | **No [OBSERVED].** Existing About hero screenshots do not verify governance/partners. | `t_45995254`, `todo`, `started_at=NULL`. Re-read live About source, implement named sections, and capture visual evidence. |
| **L11 Admissions landing + Zoho embed + canonical Apply route** | **No [OBSERVED].** No contemporary admissions page exists. Apply links still target `/contemporary/start?...`; that page explicitly says the live form is not wired. | **No [OBSERVED].** No admissions artifact exists and no Zoho marker is in generated contemporary HTML. | **No [OBSERVED].** | **No [OBSERVED].** `/contemporary/admissions` returns 404; `forms.zohopublic.in`, `LandingPageLeadGen`, and `formperma` counts 0. | **No [OBSERVED].** Same. | **No [OBSERVED].** | `t_06f9052b`, `todo`, `started_at=NULL`. DB assignee is `creative`, routing comment maps coder pane. Re-read the live admissions page, settle the two conflicting formperma suffixes, implement, then inspect iframe rendering. |
| **L12 ECP master content + cross-page highlights** | **Partial [OBSERVED].** The local `content.ts` rewrite carries fee, start, duration/format, 4 audiences, 5 outcomes, 8 modules, 3 faculty, and certification. It does not implement the requested FAQ set, eligibility, scholarship categories, or webinar embeds. | **Partial [OBSERVED].** Generated ECP detail renders the implemented model, not the omitted FAQ/video/eligibility surfaces. | **Partial [OBSERVED].** Fresh extraction of [staging ECP](https://staging-dev.iifr.global/ecp.php) confirms the implemented core facts and also proves the omitted source sections exist. | **No [OBSERVED].** Stable still shows the old ₹1,50,000 prototype and ISO date display. | **No [OBSERVED].** Same old prototype state. | **No [OBSERVED].** | Operations `t_49e30117` is `todo`; Admin rehome `t_8fd1f67c` is `blocked`. Separate Admin cards `t_2d9b0727`/`t_126d38c8` produced partial local work, creating ownership ambiguity. Reconcile scope and card lineage before more edits. |
| **L13 Three YouTube embeds** | **No [OBSERVED].** No iframe and none of the three supplied IDs appears in contemporary source. | **No [OBSERVED].** | **No [OBSERVED].** | **No [OBSERVED].** All three supplied IDs count 0. | **No [OBSERVED].** Same. | **No [OBSERVED].** | Operations `t_fb99ce71` is `todo`; Admin rehome `t_f1b9dce2` is `blocked` with no pane-execution handoff. Resolve overlap with L8 and third-video authority, then implement once. |

## 3. Lane and synthesis state

### L2-L11 have not run

- **[OBSERVED]** There are **10** Operations cards from L2 through L11, not 8. Every card is `todo`, every `started_at` is `NULL`, and every workspace points to this repo.
- **[OBSERVED]** `docs/todo-plan-2026-08-06.md` repeatedly says “8 L2-L11 lanes”. That count is wrong.
- **[OBSERVED]** Live DB assignees also differ from the plan/routing prose:
  - L3 is assigned `creative`, but the plan says coder and the routing comment maps `w1E:p4`.
  - L7 is assigned `creative`, but the plan says coder and the routing comment maps `w1E:p4`.
  - L11 is assigned `creative`, but the plan says coder and the routing comment maps `w1E:p4`.
- **[DERIVED]** The rows are shaped as shared-directory tasks but are not executable until their actual lifecycle/assignee path is reconciled. No source result should be attributed to these cards yet.

### L1/L12/L13 rehome state

- **[OBSERVED]** Operations originals `t_e368eb71`, `t_49e30117`, and `t_fb99ce71` remain `todo`.
- **[OBSERVED]** Admin rehomes `t_3a4c0ca7`, `t_8fd1f67c`, and `t_f1b9dce2` are all `blocked` after gateway execution was stopped because visible Herdr execution was required.
- **[OBSERVED]** L1 and L12 Admin cards contain comments claiming pane prompts were sent, but neither has a changed-file/build/visual completion handoff. L13 has no such pane-execution comment.
- **[DERIVED]** The rehome effort changed routing state, not implementation state.

### Parent and synthesis graph

- **[OBSERVED]** Operations parent `t_ccaf4cb6` is `blocked/needs_input`. Its body describes L1-L11, while the DB/comment history reports 14 child links including L12, L13, and synthesis.
- **[OBSERVED]** Terminal synthesis `t_26e24e6a` is `todo`. Its body waits on 11 canonical parents L1-L11 and excludes L12/L13.
- **[OBSERVED]** D-routing says L1/L12/L13 remain independent Admin rehomes, but synthesis still depends on the untouched Operations L1 original.
- **[DERIVED]** Even if Admin L1 finishes, `t_26e24e6a` remains gated by Operations L1 unless the graph or completion lineage is reconciled. L12/L13 can also finish outside the synthesis without being represented in its parent list.
- **Next action:** repair the evidence graph before claiming a Home-to-Apply synthesis. Either make canonical Operations rows reflect accepted Admin outcomes, or explicitly change synthesis dependencies and document the substitution. Do not treat comments as dependency completion.

## 4. Old prototype functionality already deployed

The stable alias and known hash are not empty or broken deployments. They expose the earlier prototype:

- **[OBSERVED]** Both return 200 for Home, Programmes, ECP, Research & Faculty, For Institutions, Events & Insights, About, and Start.
- **[OBSERVED]** Both contain four text-based audience pathway cards, programme cards, three institutional solution surfaces, generic faculty profiles, three placeholder upcoming events, insights, header/footer navigation, metadata, and JSON-LD.
- **[OBSERVED]** The stable alias additionally contains later hero photography markers for Home, Programmes, Research & Faculty, Events & Insights, and About.
- **[OBSERVED]** The known hash does not contain those hero-image markers. It is older than the current stable alias.
- **[OBSERVED]** Both retain the old header subtitle, old ECP fee, raw ISO ECP dates, placeholder Start page, combined Research/Faculty structure, generic About partner prose, and no supplied webinar/admissions markers.
- **[DERIVED]** “Deployed” currently means the old prototype and later hero photography, not the Aug 6 Murali change set.

## 5. Screenshot and pixel evidence

- **[OBSERVED]** Six existing files are present under `docs/screenshots/contemporary-heroes/`: desktop/mobile screenshots for About, Research & Faculty, and Events & Insights.
- **[OBSERVED]** No screenshot set exists for the requested Home hero/header, icon cards, whitespace, programme-state hierarchy, equal-height institution boxes, new Research/Faculty list pages, webinar embeds, Pracademic highlighting, Executive Board/partners, or admissions page.
- **[DERIVED]** No newly requested change is screenshot/pixel verified. The equal-height and whitespace rows must remain open even if their eventual source diff appears plausible.

## 6. Required next actions, in evidence order

1. **Preserve the local ECP diff.** Record or commit the exact four-file state only through the authorized executor flow. Do not deploy a moving dirty tree.
2. **Run an independent clean build.** Capture exit status, route count, and exact marker assertions. Existing `dist/` is strong artifact evidence but not an immutable build receipt.
3. **Resolve L12 scope.** Decide whether FAQ, eligibility, scholarship categories, capstones, and videos remain mandatory. The source page contains them; the current local implementation omits several.
4. **Repair lane ownership and graph truth.** Fix the 10-versus-8 lane count, L3/L7/L11 assignee mismatch, L1 substitution problem, and L12/L13 exclusion from terminal synthesis.
5. **Execute L2-L11.** They have not run. Treat every requested state as open until a card produces changed files, build evidence, and independent verification.
6. **Capture visual evidence.** Desktop and mobile screenshots plus computed measurements are mandatory for L1, L2, L3, L7, L9, L10, and L11.
7. **Deploy an immutable reviewed commit to the isolated test project.** Then probe the new exact deployment URL first and stable alias second. A 200 is insufficient; assert every row's exact marker and required absence.
8. **Only then run `t_26e24e6a`.** Its output must distinguish old prototype features, local-only corrections, newly implemented lanes, and the immutable deployment carrying each one.

## Sources and records referred

- Local repository: `/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary`
- Local plan: `docs/todo-plan-2026-08-06.md`
- Prior verification: `docs/contemporary-prototype-verification.md`
- Admin cards: `t_126d38c8`, `t_93e50cc2`, `t_2d9b0727`, `t_3a4c0ca7`, `t_8fd1f67c`, `t_f1b9dce2`
- Operations cards: `t_ccaf4cb6`, `t_26e24e6a`, L1-L13 IDs listed in the plan and matrix
- [ECP staging source](https://staging-dev.iifr.global/ecp.php)
- [Stable isolated test alias](https://iifr-global-contemporary-test.vercel.app)
- [Known immutable hash deployment](https://iifr-global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app)

## Scope compliance

This diagnostic made one repository write: this document. It did not modify source, `dist/`, Kanban state outside its own completion/comment path, Vercel configuration, deployments, processes, Hostinger, DNS, GitHub, CRM, forms, tracking, or paid platforms. No build was run.
