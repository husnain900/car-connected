# NEBULA DRIVE — Intelligence in Motion
### Final-Year Engineering Project // Connected Vehicle Telemetry & Operations Platform

**Student Lead & Author:** Zainab Amanat  
**Roll Number:** M245008 *(Registry Ref: M245036)*  
**Institution:** University Faculty of Computer & Software Engineering  
**Platform Version:** Nebula Vehicle OS v4.2  
**Live Production URL:** [https://m245008-car-connected.vercel.app/](https://m245008-car-connected.vercel.app/)  
**GitHub Repository:** [https://github.com/husnain900/car-connected](https://github.com/husnain900/car-connected)

---

## 1. Executive Summary & Mission

**NEBULA DRIVE** is a production-grade, enterprise-ready digital twin, telemetry monitoring, and remote operations system engineered for electric and connected vehicle fleets. The system features deterministic 4-corner TPMS wireless simulation, active OBD-II DTC diagnostic scanning across 48 virtual ECUs, AI camera visual exterior inspection, tactical vector GPS route playback, and an immutable cryptographic command audit ledger.

---

## 2. University Viva & Evaluation Tour Flow

For evaluating professors and examiners, the platform includes a **built-in Viva Test Scenario Bar** in the top navigation:

1. **One-Click Viva Login:**
   - Navigate to `/login` and select **"Student Lead (Zainab Amanat // M245008)"** or **"Academic Examiner"** to authenticate instantly without manual typing.
2. **Central Cockpit & Digital Twin (`/dashboard`):**
   - Inspect the dual-angle showroom visualizer (**Side Profile** vs **3/4 Showroom Angle**).
   - Click any vehicle hotspot (FL/FR/RL/RR tyres, high-voltage battery pack, DC charge port, perimeter locks) to reveal live telemetry popovers.
3. **Simulate a Critical Fault Scenario:**
   - In the top bar, click **"VIVA TEST SCENARIOS"** ➔ **"1. TPMS Puncture Event (RR 22 PSI)"**.
   - Observe the immediate alert cascade:
     - RR tyre flashes critical red (22.4 PSI).
     - OBD-II Diagnostic trouble code `C0077-62` populates live.
     - Red banner alerts the operator on the main dashboard.
     - Unread notification badge appears on the notification bell (`/alerts`).
4. **Inspect Diagnostics (`/vehicle/veh-hyperion-01/diagnostics`):**
   - Click **"RUN FULL DIAGNOSTIC SCAN"** to poll CAN-Bus IDs and inspect active codes with workshop repair recommendations.
5. **AI Camera Visual Inspection (`/vehicle/veh-hyperion-01/inspection`):**
   - Start live webcam feed or click examiner preset **"Front Right Panel (Minor Scratch)"** to run neural surface analysis with confidence scores and ethical limitations disclaimer.
6. **Tactical GPS & Route Replay (`/vehicle/veh-hyperion-01/location`):**
   - Select recorded mission logs and scrub or play the route playback engine with timestamped waypoints.
7. **Remote Operations Broker (`/vehicle/veh-hyperion-01/controls`):**
   - Execute door lock/unlock or valet governor commands with confirmation dialogs and view the **Cryptographic Command Audit Ledger**.
8. **Export Verified Reports (`/analytics`):**
   - Click **"DOWNLOAD PDF REPORT"** to generate a formatted printable audit report, or **"EXPORT CSV"** for raw time-series telemetry.
9. **Reset to 100% Nominal State:**
   - Click **"Reset to Nominal"** in the Viva Test Bar to restore factory parameters.

---

## 3. End-to-End System Architecture

```
[ VEHICLE IN-SITU HARDWARE ]
  ├── 4-Corner 433 MHz TPMS RF Sensors
  ├── ISO-11898 High-Speed CAN Bus (500 kbps)
  ├── 800V High-Voltage Battery BMS
  └── Multi-Constellation GNSS Receiver
             │
             ▼
[ MICROCONTROLLER GATEWAY / BRIDGE ]
  ├── ESP32 / Arduino CAN Transceiver (MCP2515)
  ├── TLS Authenticated MQTT / WebSocket Uplink
  └── Deterministic Seeded Simulation Fallback
             │
             ▼
[ TELEMETRY BROKER & CLOUD ENGINE ]
  ├── Time-Series Telemetry Store
  ├── OBD-II / ISO-14229 DTC Diagnostic Engine
  ├── Command Audit Trail with Latency Tracking
  └── MobileNet-V3 Vision Inspection Pipeline
             │
             ▼
[ NEBULA DRIVE WEB DASHBOARD (Next.js 16) ]
  ├── React 19 Digital Twin Interactive Hotspots
  ├── Tailwind CSS v4 Precision Design System (#0B1018, #D6F45A)
  ├── Framer Motion & GSAP Precision Counters
  └── Client-Side PDF / CSV Exporter Engine
```

---

## 4. Hardware Integration & Simulation Transparency

In strict conformance with academic honesty standards:
- **Demonstration Telemetry:** Telemetry displayed during web browser execution is deterministically driven by an in-browser state engine to eliminate external connectivity risks during viva examinations.
- **Physical Hardware Boundary:** Direct physical CAN-bus interaction and actuator solenoid triggering in production vehicles requires an approved OBD-II microcontroller bridge with physical relay isolation.

---

## 5. Software Stack & Tooling

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.9 (App Router, Turbopack) |
| **Frontend Library** | React 19.2.4 & TypeScript 5.9 |
| **Styling** | Tailwind CSS v4.3.1 (Nebula Drive Design Tokens) |
| **Design Tokens** | Background `#0B1018`, Surface `#151D28`, Lime `#D6F45A`, Text `#F4F7FB` |
| **Motion** | Framer Motion 12.42 & GSAP 3.15 |
| **Iconography** | Pure Inline Lucide SVGs (`lucide-react`) |
| **Visual Assets** | Gemini Generative 4K Studio Automotive Photography |

---

## 6. Local Setup & Verification

```bash
# Clone the repository
git clone https://github.com/husnain900/car-connected.git
cd car-connected

# Install dependencies
npm install

# Run static linting audit (0 errors, 0 warnings guaranteed)
npm run lint

# Build production bundle
npm run build

# Start local server
npm run start
# Open http://localhost:3000
```

---

## 7. Global Attribution & Academic Credits

- **Lead Engineer & Author:** Zainab Amanat
- **Roll Number:** M245008 *(Registry: M245036)*
- **Project:** Car Connected & Vehicle Performance Check Application
- **Copyright:** © 2026 Nebula Vehicle Systems. All rights reserved.
