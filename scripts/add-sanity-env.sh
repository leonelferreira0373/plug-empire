#!/usr/bin/env bash
set -e
SCOPE="leonelferreira0373s-projects"

add_env() {
  local name="$1"
  local value="$2"
  vercel env rm "$name" production --yes --scope "$SCOPE" >/dev/null 2>&1 || true
  printf '%s' "$value" | vercel env add "$name" production --scope "$SCOPE" >/dev/null 2>&1
  echo "  + $name"
}

add_env "NEXT_PUBLIC_SANITY_PROJECT_ID" "9zyci17v"
add_env "NEXT_PUBLIC_SANITY_DATASET" "production"
add_env "SANITY_API_WRITE_TOKEN" "skDQghRLjIGeoeeYgq4MzEvH9XlJWsqt2iJseLV9uIWZGivQlmGw6vJCafq85Lg1Z7ar24bTnUIfCXBmvZXKKoySbbJLgTKYcN2k0mfPerw3OJMu4CWdCy67kfzSmNZePKld3ZJ7KOZanmu35T2EtMN1BuapLYy794CM5tvsRGp8BJO0izW9"

echo "Done."
