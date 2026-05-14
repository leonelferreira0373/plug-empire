$ErrorActionPreference = "Stop"
$scope = "leonelferreira0373s-projects"

$vars = @{
    "SMTP_HOST"        = "smtp-relay.brevo.com"
    "SMTP_PORT"        = "587"
    "SMTP_USER"        = "leonelferreira0373@gmail.com"
    "SMTP_PASS"        = "REDACTED_SET_AS_ENV_VAR"
    "EMAIL_FROM"       = "Plug Empire <leonelferreira0373@gmail.com>"
    "EMAIL_OWNER"      = "Plugempire.contact@gmail.com"
    "BANK_BENEFICIARY" = "Plug Empire"
    "BANK_IBAN"        = "LT94 3250 0121 0231 5412"
    "BANK_BIC"         = ""
}

foreach ($name in $vars.Keys) {
    $val = $vars[$name]
    # Remove existing first (ignore failure), then add fresh
    try { vercel env rm $name production --yes --scope $scope 2>&1 | Out-Null } catch {}
    $val | vercel env add $name production --scope $scope 2>&1 | Out-Null
    Write-Host "  ✓ $name"
}

Write-Host "Done."
