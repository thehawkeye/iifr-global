# Secret-safe Vercel Preview runbook

Purpose: update the **test Vercel project only** and create a Preview deployment without exposing the GitHub client secret.

This runbook does not touch production, Hostinger, `iifr.global` DNS, `/admissions/`, source files, or the old OAuth App.

## Guardrails

- Run every command below in Murali's own terminal.
- Never put the client secret in chat, a Kanban card, a file, a screenshot, clipboard automation, command arguments, shell history, or logs.
- Murali must generate the new GitHub App client secret in GitHub and enter it personally at Vercel's hidden prompt.
- Do not use `--value`, `--env`, `--build-env`, `vercel env pull`, or any command that prints environment values.
- Stop immediately if any command returns HTTP 4xx/5xx, shows a permission or project-owner mismatch, or references production, Hostinger, DNS, `iifr.global`, or `/admissions/`.
- Do not generate, inspect, revoke, or paste the secret through Hermes or any automation.

## 1. Confirm the terminal is attached to the test project

```bash
cd /Users/lyraai/Documents/hawkeye/.worktrees/t_b708eed0
vercel project inspect --scope thehawkeyes-projects
```

Continue only if the displayed project name is exactly:

```text
iifr-global-contemporary-test
```

If the command displays another project, production, a custom domain, Hostinger, DNS, or an unexpected owner, stop. Do not continue.

## 2. Add the two non-secret Preview values

Use the interactive prompt for each variable. Never add a value with a flag.

```bash
vercel env add PUBLIC_KEYSTATIC_GITHUB_APP_SLUG preview --force --scope thehawkeyes-projects
```

At the hidden/value prompt, enter exactly:

```text
iifr-contemporary-keystatic-test
```

Select Preview when prompted for the environment, and select all Preview branches when prompted for a branch. If the CLI reports a 4xx/5xx or permission mismatch, stop.

```bash
vercel env add KEYSTATIC_GITHUB_CLIENT_ID preview --force --scope thehawkeyes-projects
```

At the value prompt, enter exactly:

```text
Iv23liBdWch283Rb6OZU
```

Select Preview and all Preview branches. Stop on any 4xx/5xx or permission mismatch.

## 3. Add the client secret — Murali only

1. In GitHub, open **Settings → Developer settings → GitHub Apps → IIFR Contemporary Keystatic Test**.
2. Click **Generate a new client secret**.
3. Keep the generated value in the local terminal only. Do not paste it into chat, this document, a card, a screenshot, or any automation input.
4. Run this command in the same user-controlled terminal:

```bash
vercel env add KEYSTATIC_GITHUB_CLIENT_SECRET preview --force --scope thehawkeyes-projects
```

5. At the hidden value prompt, paste the secret directly. Select Preview and all Preview branches. Do not send the value or a screenshot of the prompt anywhere.
6. Reply to the operator only with `SECRET SET` if a completion signal is needed. Do not report the value, length, prefix, or clipboard contents.

Do not run an env command for `KEYSTATIC_SECRET`; it must remain present and unchanged.

## 4. Verify metadata only — never values

This lists environment-variable names and scope metadata. It must not be replaced with `vercel env pull` or a decrypted API request.

```bash
vercel env ls preview --scope thehawkeyes-projects
```

Expected Preview names:

```text
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
```

Verify only the displayed environment/scope and timestamp fields. The secret should be marked sensitive/encrypted. Do not copy any value from the output into chat, a file, a card, or a screenshot. If `KEYSTATIC_SECRET` is absent, has an unexpected scope, or appears to have been changed, stop and report it; do not attempt a repair in this runbook.

## 5. Rebuild the test project Preview only

Run from the already verified, linked test-project directory:

```bash
vercel deploy --target preview --force --yes --skip-domain --scope thehawkeyes-projects
```

This creates a new Preview deployment and waits for the result. `--skip-domain` prevents automatic domain assignment; do not run `vercel promote`, `vercel alias`, `vercel --prod`, or any production deployment command.

Capture only the deployment URL/ID, target, state, and timestamps from the CLI result. If the result is not Ready, or any 4xx/5xx appears, stop.

## 6. Verify the deployment without exposing configuration values

Replace only `DEPLOYMENT_URL` with the non-secret URL printed by the deploy command:

```bash
vercel inspect DEPLOYMENT_URL --json \
  | jq '{id, url, target, state, createdAt, readyState}'
```

The result must identify a Preview deployment for `iifr-global-contemporary-test`. Do not include environment values in the output or logs.

## Stop and rollback rules

Stop immediately for:

- any HTTP 4xx/5xx or deployment failure;
- an owner, team, project, or permission mismatch;
- any reference to production, Hostinger, DNS, `iifr.global`, `/admissions/`, or the old OAuth App;
- an env scope other than Preview or a missing/unexpected `KEYSTATIC_SECRET`;
- any prompt that would print, reveal, or store the client secret.

Do not improvise a rollback by reading secret values. Preserve the existing rollback anchor and route rollback through the approved test-project operator path using names/scopes only. Keep the old OAuth App unchanged until the separate smoke test and verifier accept the result.
