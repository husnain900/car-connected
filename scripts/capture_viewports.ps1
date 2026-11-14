# Modern Automotive Screenshot Automation Suite (Car Connected M245008)
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "d:\car-connected\docs\screenshots"
$port = 3005

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

Write-Host "Starting Next.js production server on port $port..."
$serverProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run start -- -p $port" -PassThru -NoNewWindow

# Wait for server to boot
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:$port/dashboard" -UseBasicParsing -TimeoutSec 2
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
    Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
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
    @{ slug = "inspection"; path = "/vehicle/nebula-hyperion-01/inspection" },
    @{ slug = "diagnostics"; path = "/vehicle/nebula-hyperion-01/diagnostics" }
)

foreach ($vp in $viewports) {
    $w = $vp.w
    $h = $vp.h
    $vpName = $vp.name
    Write-Host "Capturing viewport: $vpName (${w}x${h})..."

    foreach ($r in $routes) {
        $slug = $r.slug
        $url = "http://localhost:$port$($r.path)"
        $tmpScreenshot = Join-Path $env:TEMP "scr_${vpName}_${slug}.png"
        $finalFile = Join-Path $outDir "${vpName}_${slug}.png"

        # Capture using Chrome headless via TEMP directory
        cmd.exe /c "`"$chrome`" --headless=new --disable-gpu --hide-scrollbars --window-size=$w,$h `"--screenshot=$tmpScreenshot`" $url" | Out-Null
        
        if (Test-Path $tmpScreenshot) {
            Move-Item -Path $tmpScreenshot -Destination $finalFile -Force
        }
    }
}

Write-Host "Screenshots captured successfully in $outDir!"

# Shutdown server
Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next-server*3005*" -or $_.CommandLine -like "*-p 3005*" } | Stop-Process -Force -ErrorAction SilentlyContinue
