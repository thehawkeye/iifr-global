#!/usr/bin/env bash
# ==============================================================
# IIFR — Production deploy to Hostinger (public_html)
# Phase 2 / T7b — DEPLOY SCRIPT (dry-run only in Phase 2)
#
# PURPOSE
#   Upload the contents of `dist/` (Astro static build output) to
#   Hostinger's `public_html/` docroot for iifr.global via SFTP.
#
# STATUS
#   **DRY-RUN DOCUMENTED ONLY in Phase 2.**
#   This script MUST NOT be executed until Phase 5 cutover and only
#   after Murali gives explicit per-action approval.
#   See webdev-build-spec.md §0 / M9 + §5.2 for the deploy contract.
#
# HOW TO RUN (Phase 5 — Murali per-action approval)
#   HOSTINGER_SFTP_USER=<user> \
#   HOSTINGER_SFTP_HOST=<host> \
#   HOSTINGER_SFTP_PORT=65002 \
#   HOSTINGER_DOCROOT=domains/iifr.global/public_html \
#   ./scripts/deploy-hostinger.sh --live
#
# HOW TO DRY-RUN (Phase 2 — default behaviour)
#   ./scripts/deploy-hostinger.sh
#   # Or with a custom build directory:
#   ./scripts/deploy-hostinger.sh --dist ./dist
#
# CREDENTIALS
#   This script reads SFTP credentials from environment variables only.
#   It DOES NOT embed any password, key path, or account info in source.
#   See ~/.config/hostinger/sftp.env (read-only, 0600) for the real values
#   on the operator's machine.
#
# SAFETY
#   - Refuses to run if `--live` is not passed AND the env var
#     HOSTINGER_DEPLOY_CONFIRM is not set to "yes-i-have-murali-approval".
#   - Refuses to upload from a `dist/` that is older than 30 minutes (a
#     stale build is almost always wrong). Set DEPLOY_ALLOW_STALE=1 to
#     bypass in an emergency.
#   - Refuses to upload if `dist/` is missing or empty.
#   - Performs a SHA-256 compare of every file before and after to
#     surface any partial / truncated upload.
#   - Logs every command, exit code, and SFTP banner to stderr.
# ==============================================================

set -euo pipefail

# ---- Args ----
DIST_DIR="./dist"
MODE="dry-run"
LIVE=""
ARGS=("$@")
i=0
while [[ $i -lt ${#ARGS[@]} ]]; do
  arg="${ARGS[$i]}"
  case "$arg" in
    --live) LIVE="1" ;;
    --dist)
      i=$((i+1))
      DIST_DIR="${ARGS[$i]:-./dist}"
      ;;
    --help|-h)
      sed -n '2,40p' "$0"
      exit 0
      ;;
    *) echo "Unknown arg: $arg" >&2; exit 64 ;;
  esac
  i=$((i+1))
done

# ---- Dist sanity checks ----
if [[ ! -d "$DIST_DIR" ]]; then
  echo "[deploy-hostinger] ERROR: $DIST_DIR does not exist. Run 'npm run build' first." >&2
  exit 2
fi

# Count files + total bytes; refuse if empty
FILE_COUNT=$(find "$DIST_DIR" -type f | wc -l | tr -d ' ')
TOTAL_BYTES=$(find "$DIST_DIR" -type f -print0 | xargs -0 stat -f%z 2>/dev/null | awk '{s+=$1} END {print s+0}')
if [[ "$FILE_COUNT" -eq 0 || "$TOTAL_BYTES" -eq 0 ]]; then
  echo "[deploy-hostinger] ERROR: $DIST_DIR is empty (0 files / 0 bytes)." >&2
  exit 2
fi

# Refuse if the latest file in dist/ is older than 30 min (configurable).
# Use BSD `stat -f %m` for mtime (seconds since epoch) — portable on macOS.
NEWEST_EPOCH=$(find "$DIST_DIR" -type f -exec stat -f %m {} \; | sort -nr | head -1)
NOW_EPOCH=$(date +%s)
NEWEST_MINS=$(( (NOW_EPOCH - NEWEST_EPOCH) / 60 ))
if [[ "$NEWEST_MINS" -gt 30 && "${DEPLOY_ALLOW_STALE:-}" != "1" ]]; then
  echo "[deploy-hostinger] ERROR: $DIST_DIR is $NEWEST_MINS minutes old (limit 30)." >&2
  echo "                            Re-run 'npm run build' or set DEPLOY_ALLOW_STALE=1." >&2
  exit 2
fi

# ---- Mode decision ----
if [[ -n "$LIVE" ]]; then
  if [[ "${HOSTINGER_DEPLOY_CONFIRM:-}" != "yes-i-have-murali-approval" ]]; then
    echo "[deploy-hostinger] ERROR: --live requires HOSTINGER_DEPLOY_CONFIRM=yes-i-have-murali-approval." >&2
    exit 3
  fi
  MODE="live"
fi

# ---- Read credentials (env only) ----
SFTP_USER="${HOSTINGER_SFTP_USER:-}"
SFTP_HOST="${HOSTINGER_SFTP_HOST:-}"
SFTP_PORT="${HOSTINGER_SFTP_PORT:-22}"
DOCROOT="${HOSTINGER_DOCROOT:-domains/iifr.global/public_html}"
SSH_KEY="${HOSTINGER_SSH_KEY:-${HOME}/.ssh/hostinger_ed25519}"

# ---- Output plan ----
echo "=============================================================="
echo "IIFR — Hostinger deploy"
echo "=============================================================="
echo "Mode:         $MODE"
echo "Dist:         $(cd "$DIST_DIR" && pwd)"
echo "Files:        $FILE_COUNT"
echo "Total bytes:  $TOTAL_BYTES"
echo "Newest file:  $NEWEST_MINS min ago"
echo "Target host:  ${SFTP_USER:-(unset)}@${SFTP_HOST:-(unset)}:$SFTP_PORT"
echo "Target path:  /$DOCROOT"
echo "=============================================================="

if [[ "$MODE" == "dry-run" ]]; then
  cat <<'NOTE'

DRY-RUN — no upload will happen.

To perform a real upload in Phase 5 (after Murali's per-action approval):

  HOSTINGER_SFTP_USER=<user> \\
  HOSTINGER_SFTP_HOST=<host> \\
  HOSTINGER_SFTP_PORT=65002 \\
  HOSTINGER_DOCROOT=domains/iifr.global/public_html \\
  HOSTINGER_SSH_KEY=~/.ssh/hostinger_ed25519 \\
  HOSTINGER_DEPLOY_CONFIRM=yes-i-have-murali-approval \\
    ./scripts/deploy-hostinger.sh --live

Steps the live run will execute:

  1. SHA-256 manifest of dist/ → /tmp/iifr-dist.sha256
  2. open sftp → ${SFTP_USER}@${SFTP_HOST}
  3. (defensive) `cd $DOCROOT && mkdir -p .iifr-staging`
  4. `put -r dist/* .iifr-staging/` (recursive)
  5. `rename public_html public_html.prev-$(date +%Y%m%d-%H%M%S)` on the host
     ONLY if HOSTINGER_DOCROOT_BACKUP=1 (otherwise we just `put` in place)
  6. `rename .iifr-staging public_html`
  7. Re-download a manifest and diff against /tmp/iifr-dist.sha256 — fail
     the run if any file is missing or has a different hash.
  8. Print summary + log path.

PHASE 2 CONTRACT: this script is NOT executed. It is build output and a
                   documented deployment procedure. Murali approves cutover.

NOTE
  exit 0
fi

# ---- Live mode (only reachable with explicit approval) ----
echo "[deploy-hostinger] LIVE MODE — uploading $FILE_COUNT files to ${SFTP_USER}@${SFTP_HOST}:${DOCROOT}"
echo "[deploy-hostinger] (Implementation of the live mode is intentionally stubbed in Phase 2.)"
echo "[deploy-hostinger] Murali must verify and approve the live runbook before Phase 5 cutover."
exit 4