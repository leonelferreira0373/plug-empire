# Push environment variables to Vercel production.
# Real secret values must be set as PowerShell vars BEFORE running this script:
#
#   $env:SMTP_PASS = "REDACTED_SET_AS_ENV_VAR..."
#   $env:BANK_IBAN = "PT50 ..."
#   .\scripts\set-vercel-env.ps1
#
# This file intentionally does NOT carry secrets — keep them in your password
# manager or a gitignored .env.local.

$ErrorActionPreference = "Stop"
$scope = "leonelferreira0373s-projects"

$vars = @{
    "SMTP_HOST"        = "smtp-relay.brevo.com"
    "SMTP_PORT"        = "587"
    "SMTP_USER"        = "leonelferreira0373@gmail.com"
    "SMTP_PASS"        = $env:SMTP_PASS
    "EMAIL_FROM"       = "Stravages <leonelferreira0373@gmail.com>"
    "EMAIL_OWNER"      = "Plugempire.contact@gmail.com"
    "BANK_BENEFICIARY" = "Stravages"
    "BANK_IBAN"        = $env:BANK_IBAN
    "BANK_BIC"         = ""
}

foreach ($name in $vars.Keys) {
    $val = $vars[$name]
    if ([string]::IsNullOrEmpty($val)) {
        Write-Host "  ! skipping $name (empty value)"
        continue
    }
    try { vercel env rm $name production --yes --scope $scope 2>&1 | Out-Null } catch {}
    $val | vercel env add $name production --scope $scope 2>&1 | Out-Null
    Write-Host "  + $name"
}

Write-Host "Done."
