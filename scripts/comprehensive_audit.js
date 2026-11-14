const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'screenshots', 'audit');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const routes = [
  { name: '01_homepage', path: '/' },
  { name: '02_dashboard', path: '/dashboard' },
  { name: '03_ai_inspection', path: '/ai-inspection' },
  { name: '04_diagnostics_tpms', path: '/diagnostics' },
  { name: '05_remote_controls', path: '/controls' },
  { name: '06_gps_tracking', path: '/tracking' },
  { name: '07_fleet_analytics', path: '/analytics' },
  { name: '08_alerts_center', path: '/alerts' },
  { name: '09_viva_simulator', path: '/admin' },
  { name: '10_settings', path: '/settings' },
  { name: '11_about_attribution', path: '/about' },
];

console.log('Starting Next.js on port 3012 for full system audit...');
const server = spawn('npx', ['next', 'start', '-p', '3012'], {
  shell: true,
  stdio: 'pipe',
  cwd: path.join(__dirname, '..')
});

let isStarted = false;

server.stdout.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('Ready') || msg.includes('started') || msg.includes('3012') || msg.includes('localhost')) {
    if (!isStarted) {
      isStarted = true;
      setTimeout(runAudit, 1500);
    }
  }
});

server.stderr.on('data', (d) => {
  console.log('Server err:', d.toString());
});

setTimeout(() => {
  if (!isStarted) {
    isStarted = true;
    setTimeout(runAudit, 1500);
  }
}, 4500);

async function runAudit() {
  console.log('\n=============================================');
  console.log('STARTING AUTOMATED ROUTE AUDIT (1440x900 & 390x844)');
  console.log('=============================================\n');

  const results = [];

  for (const r of routes) {
    const url = `http://localhost:3012${r.path}`;
    console.log(`Auditing: ${r.name} (${r.path})...`);

    // 1. Desktop 1440x900
    const desktopOut = path.join(outDir, `${r.name}_desktop_1440.png`);
    try {
      execFileSync(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--window-size=1440,900',
        `--screenshot=${desktopOut}`,
        url
      ]);
      const deskSize = fs.statSync(desktopOut).size;

      // 2. Mobile 390x844
      const mobileOut = path.join(outDir, `${r.name}_mobile_390.png`);
      execFileSync(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--window-size=390,844',
        `--screenshot=${mobileOut}`,
        url
      ]);
      const mobSize = fs.statSync(mobileOut).size;

      results.push({
        name: r.name,
        path: r.path,
        desktopSize: deskSize,
        mobileSize: mobSize,
        status: 'PASSED'
      });
      console.log(`  ✓ Desktop: ${deskSize} bytes | Mobile: ${mobSize} bytes`);
    } catch (err) {
      console.error(`  ✗ Failed on ${r.name}:`, err.message);
      results.push({
        name: r.name,
        path: r.path,
        status: 'FAILED',
        error: err.message
      });
    }
  }

  console.log('\n=============================================');
  console.log('AUDIT SUMMARY REPORT');
  console.log('=============================================');
  console.table(results);

  server.kill();
  process.exit(0);
}
