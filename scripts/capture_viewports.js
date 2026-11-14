const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log('Starting Next.js on port 3009...');
const server = spawn('npx', ['next', 'start', '-p', '3009'], {
  shell: true,
  stdio: 'pipe',
  cwd: path.join(__dirname, '..')
});

let isStarted = false;

server.stdout.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('Ready') || msg.includes('started') || msg.includes('3009') || msg.includes('localhost')) {
    if (!isStarted) {
      isStarted = true;
      setTimeout(runCaptures, 1500);
    }
  }
});

server.stderr.on('data', (d) => {
  console.log('Server err:', d.toString());
});

// Fallback timer
setTimeout(() => {
  if (!isStarted) {
    isStarted = true;
    setTimeout(runCaptures, 1500);
  }
}, 4500);

function runCaptures() {
  console.log('Server is ready. Capturing screenshots...');

  try {
    // 1. Desktop 1440x900
    const desktopOut = path.join(outDir, 'desktop_dashboard_reference_match.png');
    execFileSync(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--window-size=1440,900',
      `--screenshot=${desktopOut}`,
      'http://localhost:3009/dashboard'
    ]);
    console.log('Captured Desktop (1440x900):', fs.existsSync(desktopOut), fs.statSync(desktopOut).size);

    // 2. Mobile 390x844
    const mobileOut = path.join(outDir, 'mobile_dashboard_390x844.png');
    execFileSync(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--window-size=390,844',
      `--screenshot=${mobileOut}`,
      'http://localhost:3009/dashboard'
    ]);
    console.log('Captured Mobile (390x844):', fs.existsSync(mobileOut), fs.statSync(mobileOut).size);
  } catch (err) {
    console.error('Error during capture:', err.message);
  } finally {
    server.kill();
    process.exit(0);
  }
}
