#!/usr/bin/env bash
# Push environment variables to Vercel production.
# Real secret values must be exported in the shell BEFORE running this script:
#
#   export SMTP_PASS="REDACTED_SET_AS_ENV_VAR..."
#   export BANK_IBAN="PT50 ..."
#   ./scripts/set-vercel-env.sh
#
# This file intentionally does NOT carry secrets — keep them in your password
# manager or a gitignored .env.local.
set -e
SCOPE="leonelferreira0373s-projects"

add_env() {
  local name="$1"
  local value="$2"
  if [ -z "$value" ]; then
    echo "  ! skipping $name (empty value)"
    return
  fi
  vercel env rm "$name" production --yes --scope "$SCOPE" >/dev/null 2>&1 || true
  printf '%s' "$value" | vercel env add "$name" production --scope "$SCOPE" >/dev/null 2>&1
  echo "  + $name"
}

add_env "SMTP_HOST" "smtp-relay.brevo.com"
add_env "SMTP_PORT" "587"
add_env "SMTP_USER" "leonelferreira0373@gmail.com"
add_env "SMTP_PASS" "${SMTP_PASS:-}"
add_env "EMAIL_FROM" "Stravages <leonelferreira0373@gmail.com>"
add_env "EMAIL_OWNER" "Plugempire.contact@gmail.com"
add_env "BANK_BENEFICIARY" "Stravages"
add_env "BANK_IBAN" "${BANK_IBAN:-}"

echo "Done."
