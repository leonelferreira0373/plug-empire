#!/usr/bin/env bash
set -e
SCOPE="leonelferreira0373s-projects"

add_env() {
  local name="$1"
  local value="$2"
  # Remove existing (ignore failures), then add fresh
  vercel env rm "$name" production --yes --scope "$SCOPE" >/dev/null 2>&1 || true
  printf '%s' "$value" | vercel env add "$name" production --scope "$SCOPE" >/dev/null 2>&1
  echo "  + $name"
}

add_env "SMTP_HOST" "smtp-relay.brevo.com"
add_env "SMTP_PORT" "587"
add_env "SMTP_USER" "leonelferreira0373@gmail.com"
add_env "SMTP_PASS" "REDACTED_SET_AS_ENV_VAR"
add_env "EMAIL_FROM" "Plug Empire <leonelferreira0373@gmail.com>"
add_env "EMAIL_OWNER" "Plugempire.contact@gmail.com"
add_env "BANK_BENEFICIARY" "Plug Empire"
add_env "BANK_IBAN" "LT94 3250 0121 0231 5412"

echo "Done."
