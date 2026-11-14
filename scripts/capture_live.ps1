$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tmp = Join-Path $env:TEMP "vercel_current_dash.png"
$target = "d:\car-connected\docs\screenshots\vercel_current_dash.png"
& $chrome --headless=new --disable-gpu --window-size=1440,900 --screenshot=$tmp https://m245008-car-connected.vercel.app/dashboard
if (Test-Path $tmp) {
    Move-Item -Path $tmp -Destination $target -Force
    Write-Host "Success! File size:" (Get-Item $target).Length
} else {
    Write-Host "Failed to capture screenshot."
}
