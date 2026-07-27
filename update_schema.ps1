$schemaPath = "d:\erpvvinfratech\prisma\schema.prisma"
$content = Get-Content $schemaPath -Raw
$marker = "// ================================================================================="

$index = $content.IndexOf($marker)
if ($index -ge 0) {
    $newContent = $content.Substring(0, $index)
    Set-Content $schemaPath -Value $newContent -NoNewline
    Write-Host "Removed previous phase 1 appended text."
} else {
    Write-Host "Marker not found."
}
