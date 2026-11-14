# Start Next.js server on port 3000
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "d:\car-connected\docs\screenshots"

Write-Host "Starting Next.js production server on port 3000..."
$serverProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run start -- -p 3000" -PassThru -NoNewWindow

# Wait for server to boot
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:3000/dashboard" -UseBasicParsing -TimeoutSec 2
        if ($res.StatusCode -eq 200) {
            $ready = $true
            break
        }
    } catch {
        Start-Sleep -Milliseconds 800
    }
}

if (-not $ready) {
    Write-Host "Server failed to start in time."
    Stop-Process -Id $serverProcess.Id -Force
    exit 1
}

Write-Host "Server online! Beginning responsive screenshot capture suite..."

$viewports = @(
    @{ name = "320x568_iphone_se"; w = 320; h = 568 },
    @{ name = "360x800_android_standard"; w = 360; h = 800 },
    @{ name = "375x812_iphone_x"; w = 375; h = 812 },
    @{ name = "390x844_iphone_14"; w = 390; h = 844 },
    @{ name = "430x932_iphone_pro_max"; w = 430; h = 932 },
    @{ name = "768x1024_tablet_portrait"; w = 768; h = 1024 },
    @{ name = "1024x768_tablet_landscape"; w = 1024; h = 768 },
    @{ name = "1440x900_desktop_macbook"; w = 1440; h = 900 },
    @{ name = "1920x1080_desktop_fhd"; w = 1920; h = 1080 }
)

$routes = @(
    @{ slug = "dashboard"; path = "/dashboard" },
    @{ slug = "maintenance"; path = "/vehicle/nebula-hyperion-01/maintenance" },
    @{ slug = "inspection"; path = "/vehicle/nebula-hyperion-01/inspection" }
)

foreach ($vp in $viewports) {
    $w = $vp.w
    $h = $vp.h
    $vpName = $vp.name
    Write-Host "Capturing viewport: $vpName (${w}x${h})..."

    foreach ($r in $routes) {
        $slug = $r.slug
        $url = "http://localhost:3000$($r.path)"
        $outFile = Join-Path $outDir "${vpName}_${slug}.png"

        # Capture using Chrome headless
        & $chrome --headless=new --disable-gpu --hide-scrollbars --window-size="$w,$h" --screenshot="$outFile" "$url"
    }
}

Write-Host "Screenshots captured successfully in $outDir!"

# Shutdown server
Stop-Process -Id $serverProcess.Id -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next-server*" -or $_.CommandLine -like "*car-connected*" } | Stop-Process -Force -ErrorAction SilentlyContinue

