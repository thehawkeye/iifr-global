---
title: "IIFR contemporary verification and isolated Vercel recovery plan"
requested_by: "kanban:t_d0db5be1"
date: 2026-08-06
status: READY_FOR_EXECUTION
execution_authorization: "HOLD — requires verifier t_ffc06750 APPROVED before any execution card is authorized"
repo: "/Users/lyraai/Documents/hawkeye/pages/webdev/iifr-global-contemporary"
isolated_vercel_project: "iifr-global-contemporary-test (prj_mlGerIj4TS1vfMqHFmmQ1chA26st)"
stable_review_alias: "https://iifr-global-contemporary-test.vercel.app"
---

# IIFR contemporary verification and isolated Vercel recovery plan

## Decision summary

Murali selected the **full-rewrite-first** recovery path. The current ECP baseline is a four-file tracked diff of **109 insertions / 33 deletions**; it contains the three Murali-provided requirements plus their supporting display/content changes. Preserve and independently verify that local ECP scope as an input, but do **not** commit or deploy it as an ECP-only Track A release. The execution target is one integrated, accepted full-site L1-L13 rewrite, followed by a local-only commit, a new immutable deployment in the isolated Vercel test project, stable-alias proof, and full-site Gate 7B visual verification.

Execution is not authorized by this document. Independent plan verifier `t_ffc06750` must return `APPROVED` first. Production Vercel project `iifr-global`, Hostinger, DNS, GitHub, CRM, forms, tracking, and paid platforms remain hard redlines.

## Knowledge context

GBrain was queried first for prior notes and reusable language on this exact recovery topic and returned no relevant results. The grounded sources are therefore the two completed diagnostic parents, the live-state reconciliation, the canonical TODO plan, repository configuration, and the prior prototype verifier report.

- **What Murali already knows:** the local ECP work is a four-file tracked diff of 109 insertions / 33 deletions containing the three stated requirements plus supporting display/content changes; the stable test alias does not show that work; and the remaining full-site L1-L13 rewrite is not implemented or accepted.
- **What is missing:** accepted implementation evidence for the remaining L1-L13 scope, a fresh integrated clean-build receipt, a reliable independent verifier pass, an immutable deployment created from the reviewed full-site commit, runtime alias rollback capture, alias-to-deployment proof, and current full-site visual evidence.
- **Action that follows:** after `t_ffc06750` approves this revision, complete and accept the full-site L1-L13 rewrite before running the integrated Gates 1-7 sequence; stop at the first failed gate.

## Objective

Recover a trustworthy full-site review path without a GitHub push and without touching production. Preserve the already-local ECP baseline as a four-file 109-insertion / 33-deletion input, keep it distinct from the remaining L1-L13 rewrite scope during accounting and verification, and authorize no deployment until both scopes are integrated and accepted. The recovery must prove source, build, independent verification, local commit, isolated project identity, immutable deployment identity, runtime alias rollback capture, stable-alias mapping, feature-marker parity, and Gate 7B visual correctness.

## Scope boundary

### Local ECP baseline — preserve and verify; no standalone deployment

The current local ECP change is a four-file tracked diff of **109 insertions / 33 deletions**. It contains these three Murali-provided requirements plus their supporting display/content changes:

1. user-facing ECP dates displayed as `dd-mmm-yyyy`;
2. pricing language renamed to `Founding Batch Scholarship`;
3. application deadline displayed as `10-Aug-2026`.

Allowlisted source files:

- `src/contemporary/components/Hero.astro`
- `src/contemporary/components/ProgrammeCard.astro`
- `src/contemporary/lib/content.ts`
- `src/pages/contemporary/programmes/[slug].astro`

Historical owning cards: implementation `t_126d38c8`; wedged verifier/fallback closure `t_93e50cc2`. Those cards are evidence sources, not authorization to skip this plan's gates.

This baseline is not the whole full-site rewrite and is not an independently deployable Track A under Murali's selected scope. It must be preserved, independently verified, and then integrated with the accepted remaining L1-L13 work before Gate 3 commit or any Vercel mutation.

### Remaining full-site L1-L13 rewrite — required execution scope

The requested L1-L11 change programme has not run. L2-L11 is **ten** lanes, not eight; L1 makes the L1-L11 total eleven.

| Lane | Existing card | Current evidence state | Intended owner |
|---|---|---|---|
| L1 Home hero/header | `t_e368eb71` | todo; Admin rehome `t_3a4c0ca7` blocked; no implementation handoff | creative |
| L2 pathway icons | `t_e591f194` | todo, never started | creative |
| L3 whitespace | `t_67fa9c5d` | todo, never started; owner mismatch in live routing evidence | coder after owner reconciliation |
| L4 offer statuses | `t_0dc2be15` | todo, never started | creative |
| L5 Programmes hierarchy/status | `t_cbcf9efd` | todo, never started | creative; depends on L4 semantics |
| L6 Academic Council + Faculty split | `t_79554b07` | todo, never started | creative/coder as routed after reconciliation |
| L7 equal-size institution boxes | `t_26135872` | todo, never started; owner mismatch | coder after owner reconciliation |
| L8 Events/Insights source pack | `t_a68e4d3b` | todo, never started | analyst |
| L9 Pracademic prominence | `t_283a57f4` | todo, never started | creative |
| L10 About governance/partners | `t_45995254` | todo, never started | creative |
| L11 admissions page/Zoho embed | `t_06f9052b` | todo, never started; owner mismatch | coder after owner reconciliation |

Additional independent lanes remain unresolved: L12 `t_49e30117` / Admin rehome `t_8fd1f67c` is partial and blocked; L13 `t_fb99ce71` / Admin rehome `t_f1b9dce2` is unimplemented and blocked. Terminal synthesis `t_26e24e6a` omits L12/L13 and still depends on the untouched Operations L1 card. This remaining scope requires graph and ownership reconciliation, implementation, and acceptance before the integrated deployment gates may run.

## Facts and confidence labels

### Observed

- The two diagnostic parents completed shortly before this plan: Admin `t_6560bfdb` and Analyst `t_bbc70ac1`.
- Verifier runs 2401/2402 failed during Hermes startup in `_startup_fast.py::_realpath_no_eintr` with `InterruptedError: [Errno 4]`; they did not reach source tests or the build.
- The Admin diagnosis measured representative Hawkeye reads at roughly 5 ms after the incident; PID 66071 and multiple qmd processes still existed but were no longer blocking reads at that observation point.
- Repository `.vercel/project.json` names only `iifr-global-contemporary-test` with project ID `prj_mlGerIj4TS1vfMqHFmmQ1chA26st`.
- The latest reconciliation observed branch `contemporary-prototype`, HEAD `b184aa0dec50ac15688558c76635c745a2aec2ee`, and the four allowlisted tracked source files modified.
- The local source contains `formatDDMMMYYYY`, ISO application-deadline data `2026-08-10`, and `Founding Batch Scholarship`.
- Existing generated HTML contains the requested ECP display markers, but no fresh independent build was run by the Analyst diagnostic.
- The stable alias mapped to deployment `dpl_B7XrgrCguCvLQR2XKAXiQ8iBj8Lz` at diagnosis time. The known older immutable URL mapped to `dpl_8oPrss65q7LD2BkqdtCQtrjaTgjX`.
- Both diagnosed live targets lacked `Founding Batch Scholarship` and `10-Aug-2026`; they retained old fee/date output.
- Eleven L1-L11 cards have no accepted implementation result; L2-L11 is ten todo cards with `started_at=NULL` in the Analyst's read.
- No screenshot set exists for the newly requested changes. Existing screenshots cover only older About, Research/Faculty, and Events/Insights hero states.
- Production snapshot at diagnosis time: project `iifr-global`; `targets.production` pointed to failed deployment `dpl_8qRqQ1VanhdvXyEhsefsGoNNcEdo`, while latest READY preview was `dpl_2itLdbgo9KoRdaYNyZ8t9JMBVkqs` on `existing-fixes` SHA `87ed1d14240349f65d701bb05d82ea0c80e2a4f1`.

### Derived

- The verifier failure was a worker-startup reliability failure, not evidence of a source, test, or build failure.
- The stable alias is stale because no deployment containing the local ECP corrections was created and mapped to it. The repository is not linked to the wrong Vercel project.
- The existing `dist/` tree is supporting artifact evidence, not an immutable build receipt and not deployment evidence.
- The four-file 109/33 local ECP diff can prove only its bounded ECP requirements and supporting display/content changes. Murali's full-rewrite-first decision prohibits deploying that scope alone; deployment evidence must cover the integrated accepted L1-L13 result.
- The known old immutable hash URL should remain unchanged by design; Gate 6 must validate the **new** immutable deployment URL and then the stable alias.

### Assumed until each execution gate rechecks it

- The working tree, branch, process pressure, Vercel alias, deployment IDs, and production snapshot have not changed since the diagnostics.
- An authenticated reviewer or protection-bypass path is available for the test project. If anonymous access is required, that is a separate explicit approval gate; this plan does not authorize changing protection settings.
- The installed Vercel CLI supports the command forms below. Gate 4 must confirm with `vercel --version` and command help before any write.
- Vercel CLI can create a prebuilt deployment without a GitHub push from the correctly linked local directory. If not, stop; do not substitute a Git push.

## Root-cause tree

**Top event: the shared review URL cannot demonstrate the requested Aug-6 state.**

1. **Implementation incomplete**
   - Local ECP baseline: a four-file tracked diff of 109 insertions / 33 deletions exists locally, containing the three Murali-provided requirements plus supporting display/content changes, but is not on live targets.
   - Remaining full-site scope: L1-L11 has no accepted implementation result; L2-L11 is ten unstarted cards; L12 is partial, blocked, and lineage-ambiguous; L13 is unimplemented/blocked.

2. **Independent verifier startup failure**
   - Exact failure: repeated EINTR in `_realpath_no_eintr` during Hermes startup.
   - Consequence: independent verifier runs did not exercise source/build assertions.
   - Not established: any failure in the website source, build, or tests.

3. **Filesystem/process contention**
   - Historically present during the verifier incident; currently cleared at the Admin observation point.
   - qmd/Syncthing pressure is a plausible contributor, but the diagnostics do not prove a single process caused every EINTR.
   - Recovery implication: re-measure at Gate 0; do not kill or restart processes as part of this plan.

4. **Vercel link/deploy omission**
   - Link is correctly scoped to the isolated test project.
   - No post-correction deployment was created from the local state.
   - Therefore Vercel could not serve the correction bytes.

5. **Alias/hash mismatch**
   - Stable alias points to an older deployment.
   - A separate immutable hash URL is also old; immutable URLs do not update.
   - Recovery implication: verify a newly created immutable URL first, then move only the stable test alias to that exact deployment.

6. **Visual verification absent**
   - String presence cannot prove spacing, alignment, wrapping, responsive behavior, fonts, or equal-height surfaces.
   - Recovery implication: visual evidence is a separate Gate 7, not a side effect of marker checks.

### Alternatives considered and ruled out or left open

- **Wrong Vercel project:** ruled out by `.vercel/project.json` and read-only project inspection.
- **A failed post-correction Vercel deploy:** ruled out by deployment chronology; no post-correction deployment was attempted.
- **A proven clean local build:** still open. Existing artifacts and executor claims are insufficient; Gate 1 must re-derive it.
- **Alias promotion as the only fault:** ruled out. Even a correctly moved alias cannot expose bytes that were never deployed.
- **qmd PID 66071 as the sole cause:** not proven; treat it as a contention risk, not an established single root cause.

## Proposed execution-card map

No new execution card may be created or promoted until `t_ffc06750` returns `APPROVED`. The labels below are proposed successor cards for the originating operator to create after approval.

| Proposed card | Gate | Owner | Purpose |
|---|---:|---|---|
| `NEW-G0-fs-startup-preflight` | 0 | admin | Read-only filesystem, process-pressure, and verifier-startup health check |
| `NEW-FULL-REWRITE-L1-L13` | prerequisite | `iifr-ecp-marketing` orchestrator + existing lane owners | Reconcile, implement, independently accept, and integrate the remaining full-site L1-L13 scope; no deployment |
| `NEW-G1-integrated-integrity-build` | 1 | coder | Audit accepted integrated scope and create a fresh full-site local build receipt; no source edits |
| `NEW-G2-independent-integrated-verify` | 2 | verifier | Independent full-site source/static/rendered verdict; no fallback self-verification |
| `NEW-G3-local-commit-only` | 3 | coder | Commit the exact accepted integrated file manifest locally; no push |
| `NEW-G4-vercel-identity-preflight` | 4 | admin | Read-only test-project identity, reviewer access, production snapshot, and immediate pre-deploy alias-target capture |
| `NEW-G5-isolated-prebuilt-deploy` | 5 | admin | Create one new immutable full-site preview deployment only in the isolated test project |
| `NEW-G6-alias-marker-proof` | 6 | verifier | Verify immutable URL, authorize test-alias move, then prove exact mapping and markers |
| `NEW-G7-full-site-visual-proof` | 7B | verifier | Desktop/mobile full-site screenshot and pixel-level verdict |

Each card must carry this plan path, the verifier contract, exact redlines, and its predecessor as a parent. The full-rewrite prerequisite must complete before Gate 1. Gate 6 may require Admin to perform the alias write after the verifier's immutable-URL precheck; keep the write and final independent read in distinct card events or substeps.

## Steps

### Gate 0 — Filesystem health and process-contention check

**Owner/card:** Admin / `NEW-G0-fs-startup-preflight`  
**Dependencies:** plan verifier `t_ffc06750` APPROVED  
**Risk:** medium; the previous independent verifier never reached the repo.

1. Recheck task status and current workspace path.
2. Measure at least 20 reads/realpath calls across:
   - `src/contemporary/lib/content.ts`
   - `src/contemporary/components/Hero.astro`
   - `dist/client/contemporary/programmes/ecp/index.html` if present
   - `docs/contemporary-live-state-reconciliation-2026-08-06.md`
3. Record zero/nonzero EINTR count, median, p95, and maximum latency. Pass threshold: zero EINTR and p95 below 250 ms. Any single read above 1 second requires a second sample; repeated >1 second is a stop.
4. Read-only inventory qmd, qmd-MCP, Syncthing, and active build/dev processes. Do not terminate, pause, restart, or alter them.
5. Run a bounded verifier-profile startup/read canary that exits after reading one allowlisted file. Pass only if it starts cleanly and records the file path and byte count.

**Outputs:** Gate-0 receipt with timestamps, samples, process inventory, canary run/event, and pass/fail.  
**Stop conditions:** any EINTR, repeated >1s reads, stale lock/write activity on allowlisted files, or verifier canary startup failure. If failed, block and route the Hermes retry-ceiling/process-pressure issue separately; do not build or deploy.

### Full-rewrite prerequisite — reconcile, implement, and accept L1-L13 before deployment gates

**Owner/card:** `iifr-ecp-marketing` orchestrator and accepted lane owners / `NEW-FULL-REWRITE-L1-L13`  
**Dependencies:** Gate 0 PASS and plan verifier APPROVED  
**Risk:** high; current remaining full-site scope has unresolved ownership, lineage, source, and dependency gaps.

1. Preserve the four-file ECP baseline and its 109-insertion / 33-deletion patch digest; do not deploy or overwrite it while reconciling the remaining scope.
2. Reconcile the L2-L11 count to ten, resolve L3/L7/L11 owner mismatches, select canonical L1/L12/L13 lineage, resolve L8/L13 overlap and the authoritative webinar source, and repair terminal-synthesis dependencies.
3. Execute and independently accept every required L1-L13 lane under the approved routing, with each lane returning exact changed-file, source, build, and visual evidence as applicable.
4. Produce one integrated changed-file manifest that explicitly distinguishes the preserved local ECP baseline from files changed for the remaining L1-L13 scope, while proving both are present in the final working tree.
5. Freeze the accepted integrated manifest and evidence digests for Gate 1. Do not create a local release commit or Vercel deployment in this prerequisite.

**Outputs:** reconciled dependency graph, accepted lane verdicts, integrated changed-file manifest, ECP-baseline digest, remaining-scope digests, and terminal-synthesis readiness receipt.  
**Stop conditions:** any unresolved lane/owner/lineage/source decision, rejected implementation, ECP-baseline loss or unexplained drift, incomplete L1-L13 manifest, or any request to deploy only the ECP subset.

### Gate 1 — Integrated full-site source integrity and fresh clean build

**Owner/card:** Coder / `NEW-G1-integrated-integrity-build`  
**Dependencies:** full-rewrite prerequisite PASS  
**Risk:** high; the integrated tree must account for both the four-file ECP baseline and every accepted remaining L1-L13 change.

1. Re-record branch, HEAD, status, and tracked diff. Match every tracked source change to the frozen integrated manifest; diagnostic Markdown files may remain untracked but must not be staged.
2. Reconfirm the ECP subset is still exactly the preserved four-file 109-insertion / 33-deletion baseline unless an accepted full-site lane intentionally extends one of those files and documents the resulting superseding digest. Save separate ECP-baseline and remaining-scope receipts.
3. Run `git diff --check` on the complete integrated source manifest.
4. Run the repository's required verification command: `npm run build`. Record command, start/end time, exit code, Astro route count, and build-output location.
5. Verify the built ECP page's rendered visible text, not just raw HTML counts:
   - present: `Founding Batch Scholarship`, `10-Aug-2026`, `21-Aug-2026`, `31-Jan-2027`;
   - absent from visible copy: `Founding Cohort special pricing` and `₹1,50,000`;
   - ISO dates remain permitted in data/JSON-LD where schema requires them.
6. Check every L1-L13 route in the accepted route manifest in a bounded local preview. Home, Programmes index, and ECP detail must contain the ECP baseline markers; all other lanes must satisfy their accepted route/marker/geometry contracts.
7. Re-record Git status after the build. Generated files may change; no tracked source outside the frozen integrated manifest may change.

**Outputs:** source patch digest, build log/exit receipt, route list, marker assertions, and post-build status.  
**Stop conditions:** unaccounted tracked source drift, ECP-baseline mismatch without an accepted superseding digest, incomplete L1-L13 evidence manifest, `git diff --check` failure, build nonzero, missing required marker, visible old marker, or build-induced tracked source change.

### Gate 2 — Independent static and rendered verification

**Owner/card:** Verifier / `NEW-G2-independent-integrated-verify`  
**Dependencies:** Gate 1 PASS  
**Risk:** high governance risk; prior acceptance was an explicitly authorized fallback, not an independent run.

1. Start a fresh verifier worker after Gate 0; do not reuse the builder session.
2. Re-read the complete integrated changed-file manifest. For the ECP subset, verify the four-file 109/33 baseline contains the three Murali-provided requirements plus supporting display/content changes; for the remaining scope, verify every L1-L13 lane against its accepted evidence.
3. Independently inspect Gate-1 build output and run local rendered DOM checks for every route in the accepted full-site route manifest, including Home, Programmes, and ECP detail.
4. Verify date behavior is ECP-scoped and does not silently rewrite unrelated programme dates.
5. Verify machine-readable ISO dates are still valid where required.
6. Return `APPROVED`, `REVISION_REQUESTED`, or `BLOCKED` with explicit evidence and no source edits.

**Outputs:** independent verdict linked to the patch digest and build receipt.  
**Stop conditions:** verifier startup failure, evidence digest mismatch, ECP-versus-remaining-scope accounting ambiguity, incomplete L1-L13 coverage, or any marker/rendered-state failure. Same-profile self-verification is not an automatic fallback.

### Gate 3 — Local commit only; no GitHub push

**Owner/card:** Coder / `NEW-G3-local-commit-only`  
**Dependencies:** Gate 2 APPROVED  
**Risk:** medium; accidental staging could capture unrelated work.

1. Recheck the integrated diff and per-scope digests equal the Gate-2 approved receipts.
2. Stage every path from the approved integrated manifest explicitly; do not use `git add .` or `git add -A`.
3. Verify the staged-name set is exactly the approved integrated manifest and `git diff --cached --check` passes.
4. Create one local full-site commit with a message that does not misrepresent the change as ECP-only.
5. Record commit SHA and tree SHA. Verify no Git remote write occurred.
6. Verify tracked source is clean relative to the new commit; diagnostic docs may remain untracked.

**Outputs:** local full-site commit SHA/tree SHA, exact staged-file receipt, and preserved ECP-versus-remaining-scope accounting.  
**Stop conditions:** extra staged path, approved digest mismatch, commit hook/build failure, or any instruction/tool path requiring `git push`. GitHub push is prohibited.

### Gate 4 — Isolated Vercel identity/link preflight and production snapshot

**Owner/card:** Admin / `NEW-G4-vercel-identity-preflight`  
**Dependencies:** Gate 3 PASS  
**Risk:** high; wrong-account or wrong-project deployment could cross the redline.

1. Re-read `.vercel/project.json`; require:
   - project name `iifr-global-contemporary-test`;
   - project ID `prj_mlGerIj4TS1vfMqHFmmQ1chA26st`;
   - expected team/org scope.
2. Confirm the Vercel CLI version and exact supported syntax for `build`, `deploy --prebuilt`, `inspect`, and `alias set` without mutating state.
3. Read-only inspect the stable test alias and current deployment history.
4. Confirm the reviewer can access test deployments through existing authorized login or bypass. If anonymous review is required and protection blocks it, stop for a separate explicit test-project-only protection decision.
5. Snapshot production project `iifr-global` before any test-project write:
   - project ID/name;
   - current `targets.production` deployment ID/state;
   - current latest READY preview deployment ID/ref/SHA;
   - aliases/domains relevant to the read-only snapshot.
6. Verify the local commit SHA is still HEAD and tracked source is clean.
7. **Immediately before Gate 5 begins**, resolve the stable test alias to its then-current deployment and record `pre_change_alias_deployment_id`, immutable URL, project ID, capture timestamp, and read receipt. This runtime value—not any deployment ID copied from a diagnosis or this document—is the only authorized rollback target. If the alias target changes between capture and deploy start, stop and recapture under a new Gate-4 receipt.

**Outputs:** signed preflight receipt containing test project ID, team scope, CLI version, reviewer-access result, local commit/tree SHA, production snapshot, and the immediately pre-deploy `pre_change_alias_deployment_id` capture.  
**Stop conditions:** project/scope mismatch, missing or mutated `.vercel` link, unavailable auth, unsupported CLI command shape, no reviewer access, dirty tracked source, inability to snapshot production, inability to resolve the stable alias to one exact test-project deployment, or alias drift after capture. Do not run `vercel link` as an in-flow repair; block instead.

### Gate 5 — Isolated test deploy only

**Owner/card:** Admin / `NEW-G5-isolated-prebuilt-deploy`  
**Dependencies:** Gate 4 PASS  
**Risk:** high but bounded to the isolated project.

1. Confirm the Gate-4 runtime alias capture is the latest completed action and the integrated full-site commit is still HEAD. From the correctly linked repo, build the Vercel prebuilt artifact using the Gate-4-confirmed CLI syntax. Expected shape:
   - `vercel build --yes --scope thehawkeyes-projects`
   - verify `.vercel/output` was freshly produced from the Gate-3 commit.
2. Record a manifest/digest of the prebuilt output, the full-site local commit/tree SHA, and the accepted integrated source manifest.
3. Create one **preview/immutable** deployment without `--prod` and without alias promotion. Expected shape:
   - `vercel deploy --prebuilt --yes --scope thehawkeyes-projects`
4. Capture deployment ID, immutable deployment URL, project ID/name, target, create time, state, and build logs.
5. Re-read the production snapshot and compare it byte-for-byte/field-for-field with Gate 4.

**Outputs:** new immutable test deployment URL/ID plus provenance receipt.  
**Stop conditions:** command resolves outside the isolated project, unexpected `--prod`/production target behavior, deploy failure, missing immutable URL, deployment not READY, provenance mismatch, or any production snapshot drift. Do not move the stable alias on a failed Gate 5.

### Gate 6 — Exact deployment proof, stable alias mapping, and feature markers

**Owner/card:** Verifier for pre/post proof, with the single alias write performed by Admin / `NEW-G6-alias-marker-proof`  
**Dependencies:** Gate 5 PASS  
**Risk:** high; this is the only stable review-alias mutation.

1. **Before alias mutation**, independently inspect the new immutable deployment ID/URL and confirm it belongs to project `prj_mlGerIj4TS1vfMqHFmmQ1chA26st`.
2. On the new immutable URL, assert every accepted L1-L13 functional/rendered contract. The ECP subset must include:
   - `Founding Batch Scholarship` present in intended contexts;
   - `10-Aug-2026`, `21-Aug-2026`, and `31-Jan-2027` present where specified;
   - `Founding Cohort special pricing` and `₹1,50,000` absent from visible ECP copy;
   - HTTP success alone is insufficient.
3. If and only if step 2 passes, Admin maps the stable test alias to the exact new deployment. Expected shape after CLI-help preflight:
   - `vercel alias set <new-immutable-deployment-url> iifr-global-contemporary-test.vercel.app --scope thehawkeyes-projects`
4. Read-only resolve the stable alias and require its deployment ID to equal the Gate-5 deployment ID exactly.
5. Repeat the complete L1-L13 rendered assertions on the stable alias and compare key response/body digests with the immutable URL.
6. Re-read the production snapshot; require no drift attributable to this flow.
7. Preserve the old known hash URL as historical evidence; do not expect or attempt to change it.

**Outputs:** Gate-4 runtime pre-change target, before/after alias mapping, immutable and stable URL full-site marker tables, response/body digests, and unchanged-production receipt.  
**Stop conditions:** marker failure on immutable URL, alias maps to any other deployment, alias marker mismatch, reviewer access failure, test project mismatch, or production drift.

### Gate 7 — Screenshot and pixel-level review of requested pages

**Owner/card:** Verifier / `NEW-G7-full-site-visual-proof`  
**Dependencies:** Gate 6 PASS  
**Risk:** medium; visual claims cannot be inferred from text probes.

Gate 7 has a bounded ECP sub-check and one authorized completion target:

**Gate 7A — ECP subset evidence within the integrated deployment (non-authorizing):**

- Capture stable-alias and immutable-URL screenshots at minimum 1280px desktop and 390px mobile for:
  - Home ECP signal;
  - Programmes ECP card;
  - ECP detail hero, cohort facts, fee/scholarship, and application deadline.
- Compare stable and immutable renders for the same viewport.
- Check clipping, wrapping, overlap, date legibility, scholarship text alignment, focus/CTA visibility, and browser-console errors.
- Gate 7A verifies only the ECP subset of the integrated deployment. It does not authorize an ECP-only deployment, does not complete the recovery, and must not be used as the terminal verdict.

**Gate 7B — full requested website review (required terminal target):**

After the full-rewrite prerequisite and integrated Gates 1-6 pass, capture desktop/mobile evidence for:

- Home hero/header, pathway icons, section whitespace, and offer statuses;
- Programmes hierarchy/statuses and ECP detail;
- Research & Faculty hub plus Academic Council and Faculty detail/list routes;
- For Institutions equal-height cards with measured bounding boxes at 1280px and 360/390px;
- Events & Insights webinar embeds, briefing, and sourced recent writing;
- Pracademic treatment on representative pages;
- About Executive Board and partner callouts;
- Admissions page, Zoho iframe rendering, canonical Apply-now route, focus, and responsive behavior.

Gate 7B cannot pass from current evidence. The full-rewrite prerequisite must first repair ownership/dependencies and deliver accepted L1-L13 implementation evidence; only the resulting integrated deployment can enter this review.

**Outputs:** screenshot index, viewport sizes, page/deployment IDs, pixel/geometry checks, console errors, and explicit 7A/7B verdicts.  
**Stop conditions:** missing route, clipping/overlap, unstable layout, iframe failure, alias/hash visual mismatch, missing screenshot, any attempt to deploy the ECP subset alone, or any attempt to treat 7A as the terminal/full-site verdict.

## Full-rewrite-first sequence before integrated deployment

1. Reconcile the canonical plan's incorrect “8 L2-L11 lanes” count to ten.
2. Reconcile L3/L7/L11 owner mismatches before dispatch.
3. Decide canonical lineage for L1 and partial L12 Admin work; comments alone cannot satisfy dependencies.
4. Resolve L8/L13 overlap and the authoritative third webinar source.
5. Decide L12 residual scope: FAQ, eligibility, scholarship categories, capstones, and embeds.
6. Repair terminal synthesis `t_26e24e6a` dependencies so accepted L1/L12/L13 outcomes are represented.
7. Execute L1-L11 through their existing cards under the approved D-routing, and resolve/execute the remaining L12/L13 scope; do not attribute the current local ECP 109/33 diff to those lanes.
8. Require each lane to return changed-file, build, source, and visual evidence as applicable.
9. Freeze the integrated manifest, then run Gates 1-7 once for the full-site commit and isolated deployment; do not run an earlier ECP-only Gate 3-7 sequence.
10. Run terminal synthesis only after the dependency graph reflects accepted outcomes.

## Dependencies and sequencing

Critical path for the selected full-site recovery:

`t_ffc06750 APPROVED → G0 → full-rewrite L1-L13 prerequisite → G1 → G2 → G3 → G4 runtime capture → G5 → G6 → G7A subset check → G7B terminal verdict`

No mutation gate may run in parallel with its verifier predecessor. Full-site lane work may run in parallel only where the reconciled dependency graph permits, but all lanes must converge into one accepted integrated manifest before Gate 1. Gate 4 read-only identity and production checks follow Gate 3; its live alias-target capture must occur immediately before Gate 5. Gate 5 must wait for that complete Gate-4 receipt. No ECP-only commit, deployment, alias mutation, or terminal Gate 7A outcome is authorized.

## Rollback plan

### Before deployment

- If Gates 0-2 fail, leave source as-is and block with evidence; do not commit or deploy.
- If Gate 3 commit fails, unstage only the paths in the approved integrated manifest; do not reset or discard unrelated working-tree content.
- If the local commit later needs correction, preserve it and add a new local corrective commit; do not rewrite shared history and do not push.

### New immutable deployment

- A failed preview deployment receives no stable alias and can be left for audit or deleted only under a separately approved cleanup card.
- No rollback action may target production `iifr-global`.

### Stable alias

- Gate 4 records the stable alias's live `pre_change_alias_deployment_id` and immutable URL immediately before Gate 5; no deployment ID is hard-coded as a rollback target.
- If and only if post-alias verification fails, Admin restores the stable alias to the exact Gate-4-captured `pre_change_alias_deployment_id`, then Verifier proves the restored mapping. A diagnosis-time or document-copied deployment ID must never substitute for the runtime capture.
- If the captured deployment is unavailable, outside the isolated test project, ambiguous, or the capture receipt is missing, stop and block; do not guess a rollback target.
- Do not delete either deployment until evidence retention is complete.

### Protection/access

- This plan does not change Vercel protection. If a separately approved review-window change is made, its card must capture original settings and restore them after sign-off.

## Global stop conditions and hard redlines

Stop and block immediately if any of the following occurs:

- independent verifier cannot start reliably;
- filesystem read health regresses or EINTR recurs;
- tracked source drift is not accounted for by the accepted integrated manifest, or the four-file 109/33 ECP baseline changes without an accepted superseding digest;
- local build or rendered assertions fail;
- local approved digest changes before commit/deploy;
- any step requires a GitHub push;
- `.vercel/project.json`, account, team, or deployment project does not exactly match the isolated test project;
- reviewer cannot access the new deployment under the approved access model;
- immutable deployment markers fail;
- stable alias does not map to the exact verified deployment;
- production Vercel snapshot changes during the flow;
- any instruction would write to `iifr-global`, Hostinger, DNS, public_html, `.htaccess`, FTP/SFTP, GitHub, CRM, forms, tracking, or paid platforms;
- anyone attempts an ECP-only commit/deployment, treats Gate 7A as terminal, or claims full-site completion without Gate 7B.

## Risks and mitigations

- **Risk: stale diagnostic state.** → Re-derive branch, diff, process health, alias, deployment, and production snapshot at their gates.
- **Risk: verifier startup wedges again.** → Gate 0 canary; no same-profile fallback without explicit human authorization.
- **Risk: accidental unrelated commit.** → Explicit integrated-manifest staging, staged-name equality check, no broad `git add`.
- **Risk: direct deploy lacks GitHub SHA metadata.** → Bind a local commit SHA, tree SHA, approved patch digest, prebuilt-output digest, deployment ID, and marker/body proof in one receipt.
- **Risk: stable alias moved before bytes are proven.** → Deploy preview first; immutable verification precedes the alias write.
- **Risk: test deployment protection blocks review.** → Preflight the reviewer access path; do not silently change protection.
- **Risk: ECP subset becomes a de facto Track A release.** → Prohibit ECP-only commit/deploy; Gate 7A is a non-authorizing subset check and Gate 7B is the only terminal target.
- **Risk: rollback points to stale diagnosis-time state.** → Capture the live alias deployment ID at Gate 4 immediately before deployment and permit rollback only to that captured target after post-deploy failure.
- **Risk: production drift is mistaken for recovery scope.** → Snapshot before/after; report drift and stop, never repair production in this flow.

## Success criteria

### Plan acceptance

- `t_ffc06750` returns `APPROVED` against the Verifier Contract below.
- The plan contains the full-rewrite prerequisite, all Gates 0-7, owner/card mapping, runtime-captured rollback, stop conditions, redlines, and separate accounting for the local ECP baseline versus remaining L1-L13 scope.

### Integrated full-site review outcome

- Gate 0 proves healthy reads and a reliable independent-verifier canary.
- The full-rewrite prerequisite accepts every required L1-L13 lane and freezes an integrated manifest that separately accounts for the four-file 109/33 ECP baseline and remaining scope.
- Gate 1 records a fresh integrated `npm run build` exit 0 and exact full-site rendered assertions.
- Gate 2 independently approves the integrated diff and rendered output.
- Gate 3 creates one local full-site commit containing exactly the approved integrated manifest and performs no push.
- Gate 4 proves isolated project identity, records production unchanged, and captures the live pre-change stable-alias deployment ID immediately before deployment.
- Gate 5 creates one READY full-site immutable deployment in `iifr-global-contemporary-test` only.
- Gate 6 proves all accepted markers on the new immutable URL and stable alias and proves exact deployment-ID equality.
- Gate 7A verifies the ECP subset without authorizing completion; Gate 7B provides the terminal desktop/mobile full-site verdict.
- Final statement is bounded by the Gate 7B evidence and does not overclaim any unverified lane.

### Full website outcome

- L1-L11 ownership/dependencies are reconciled and each lane has accepted implementation evidence.
- L12/L13 scope and lineage are resolved and accepted.
- The one authorized integrated commit passes Gates 1-6 without a preceding ECP-only deployment.
- Gate 7B passes on every requested page and terminal synthesis `t_26e24e6a` reflects the accepted graph.

## Verifier Contract

- **Original objective:** Produce a diagnosis-backed, execution-ready full-rewrite-first recovery plan that preserves the local four-file 109-insertion / 33-deletion ECP baseline, integrates and accepts the remaining L1-L13 scope, and creates one isolated full-site review deployment without touching production.
- **Final deliverables:**
  1. `docs/vercel-verification-recovery-plan-2026-08-06.md`;
  2. planner mirror/reference at `memory/plans/plan_2026-08-06_iifr-contemporary-vercel-verification-recovery.md`;
  3. one append-only HANDOFF reference;
  4. independent plan verdict on `t_ffc06750` before execution authorization.
- **Task-specific acceptance rubric:** observed/derived/assumed claims are honest; the local ECP baseline is accurately stated as four tracked files and 109 insertions / 33 deletions containing the three Murali-provided requirements plus supporting display/content changes; that baseline remains distinct from the remaining L1-L13 scope; full-rewrite-first sequencing prohibits an ECP-only Track A deployment; Gates 0-7 are sequential and checkable; every gate has an owner/card, inputs, outputs, evidence, risk, and stop condition; local commit has no GitHub push; only project `prj_mlGerIj4TS1vfMqHFmmQ1chA26st` can be mutated later; Gate 4 captures the live pre-change alias target immediately before deployment; rollback uses only that capture after post-deploy failure; immutable URL is verified before stable alias movement; alias and immutable deployment both receive full-site proof; Gate 7B is terminal; production and all hard redlines are preserved.
- **Required evidence/tests:** re-read both diagnostic parent results and the reconciliation; re-derive verifier crash class; inspect `.vercel/project.json`; verify local ECP 4-file/109-insertion/33-deletion scope accounting; verify L1-L13 lane/card mapping; confirm no ECP-only deploy path remains; confirm command sequencing does not require GitHub push; confirm rollback references only the Gate-4 runtime-captured alias target; confirm production snapshot before/after requirement; confirm Gate 7A is non-authorizing and Gate 7B is terminal.
- **Verifier:** `t_ffc06750` (`verifier` profile), returning `APPROVED`, `REVISION_REQUESTED`, or `BLOCKED` with concise evidence.
- **origin_profile:** `planner`
- **revision_count:** 1
- **max_revisions:** 3

## Source record

- Admin technical diagnosis: `t_6560bfdb`
- Analyst evidence reconciliation: `t_bbc70ac1`
- Live-state report: `docs/contemporary-live-state-reconciliation-2026-08-06.md`
- Canonical TODO tracker: `docs/todo-plan-2026-08-06.md`
- Prior prototype verifier report: `docs/contemporary-prototype-verification.md`
- Repository Vercel link: `.vercel/project.json`
- Project build contract: `package.json` (`npm run build`)
- Vercel/Astro config: `vercel.json`, `astro.config.mjs`
