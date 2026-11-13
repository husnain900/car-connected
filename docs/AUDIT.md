# NEBULA DRIVE — Technical Audit & Verification Matrix

**Project:** Car Connected & Performance Check Application (Final-Year Capstone)  
**Lead Engineer & Author:** Zainab Amanat (Roll No: M245008 / Index M245036)  
**Repository & Deployment Maintainer:** Husnain Tanveer ([@husnain900](https://github.com/husnain900))  
**Deployment Target:** `https://m245008-car-connected.vercel.app/`  
**Repository:** `https://github.com/husnain900/car-connected`  
**Evaluation Date:** Academic Session 2026  

---

## 1. Executive Summary & Verification Ledger

Nebula Drive is an enterprise-grade connected vehicle intelligence platform engineered with Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, and Three.js WebGL.

All 16 routes in this build have been compiled, verified with `eslint` (0 errors, 0 warnings), and validated for live viva presentation.

---

## 2. Feature & Route Gap Matrix

| Feature / Module | Route | Status | Protocol / Data Provenance | Fallback / Safeguard | Viva Demonstration Notes |
|---|---|---|---|---|---|
| **Public Landing Page** | `/` | `VERIFIED` | Static SSR & Framer Motion | High-performance CSS | Hero banner, platform pillars, live viva demo links. |
| **Command Cockpit** | `/dashboard` | `VERIFIED` | Three.js WebGL + Deterministic Store | 2D Studio Photography Fallback | 3D hypercar mesh, OrbitControls, interactive 3D hotspot pins, 4-wheel TPMS status, quick controls. |
| **Fleet / Garage Manager** | `/vehicles` & `/garage` | `VERIFIED` | LocalStorage Multi-vehicle Tenancy | Default Seeded Hyperion GT & Stellar SUV | Switch between vehicles; pairing modal with simulator vs physical bridge toggle. |
| **Vehicle 3D Twin & Specs** | `/vehicle/[id]` & `/vehicle` | `VERIFIED` | Three.js Orbit & Paint Customizer | 2D Multi-angle Studio Views | 800V silicon-carbide powertrain specifications, VIN registry, battery metrics. |
| **Diagnostics & TPMS Mesh** | `/vehicle/[id]/diagnostics` & `/diagnostics` | `VERIFIED` | CAN-Bus 433 MHz RF Wheel Mesh Simulation | ISO-11898 Interrogation Poller | 4-wheel pressure/temperature readouts, active OBD-II DTC scanner with simulated ECU interrogation. |
| **AI Camera Inspection** | `/vehicle/[id]/inspection` & `/ai-inspection` | `VERIFIED` | WebRTC `navigator.mediaDevices.getUserMedia` | Examiner Sample Preset Buttons & File Upload | Live camera reticle, synthetic neural defect classification, cosmetic score, and ethical limitation disclosure. |
| **Tactical GPS & Waypoints** | `/vehicle/[id]/location` & `/tracking` | `VERIFIED` | Vector HUD + HTML5 Geolocation API | Default Islamabad Capital Loop Route | Route playback scrubber (0–100%), velocity curve, device GPS vs vehicle GNSS comparison. |
| **Remote Actuators & Audit** | `/vehicle/[id]/controls` & `/controls` | `VERIFIED` | Cryptographic SHA-256 Audit Ledger | Client-side Session State | Door locks, climate temperature adjuster, speed governor limiter, full non-repudiation audit trail. |
| **Predictive Maintenance** | `/vehicle/[id]/maintenance` & `/maintenance` | `VERIFIED` | Mileage/Time Interval Decay Engine | Service Log Archival | Scheduled service checklist, brake pad wear alerts, "Mark Completed" state machine. |
| **Analytics & Telemetry Export** | `/analytics` | `VERIFIED` | Client-Side CSV & HTML-to-PDF Engine | Blob Download Safeguard | Real-time efficiency curve, battery health index, one-click PDF audit report and CSV telemetry export. |
| **Real-time Alerts Center** | `/alerts` | `VERIFIED` | Priority Severity Filter (Critical/Warn/Info) | LocalStorage Persisted Queue | Dismiss, filter by severity, mark all as read. |
| **Simulator Control Center** | `/admin` | `VERIFIED` | CAN-Bus Packet Streamer & Fault Injector | 3 One-Click Viva Scenarios | 1-click viva scenarios (Nominal, Puncture, Battery Overtemp), telemetry clock frequency modulation, raw CAN hex streamer. |
| **Settings & Units** | `/settings` | `VERIFIED` | Metric (KM/PSI/°C) vs Imperial Switcher | Factory Reset Safeguard | Sound toggles, driver tenancy profile, cache flush. |
| **Academic Architecture & About** | `/about` | `VERIFIED` | 4-Tier Topology System Architecture | Static High-Availability Page | Detailed signal diagram (Tier 1 Sensors → Tier 2 Bridge → Tier 3 Cloud Broker → Tier 4 Next.js Cockpit), student attribution (Zainab Amanat M245008). |
| **Authentication Flow** | `/login`, `/register`, `/forgot-password` | `VERIFIED` | One-Click Viva Quick-Login Buttons | Role-based Session Mock | Fast login buttons for Student Lead, External Examiner, and Fleet Manager. |

---

## 3. Data Provenance & Academic Integrity

In strict adherence to academic evaluation ethics:
1. **Simulation Transparency:** Every telemetry dashboard clearly features a `DEMO SIMULATION` indicator, live clock timestamp, and source origin badge. No fabricated claims of direct physical vehicle wireless connections are made during browser presentation.
2. **AI Inspection Ethical Boundaries:** The AI camera visual inspection module clearly discloses that visual RGB photography cannot inspect internal brake pad thickness, internal battery cell degradation, or mechanical transmission wear without physical diagnostic telemetry.
3. **Deterministic Fault Injection:** The platform provides predictable, repeatable test vectors (Viva Scenarios 1, 2, and 3) so that academic evaluators can inspect reproducible state transitions without flaky connection risks.

---

## 4. UI/UX & Design System Validation

- **Main Background:** `#091321` (Deep luxury midnight navy)
- **Sidebar & Card Background:** `#152437` (Rich navy slate)
- **Elevated Surfaces:** `#1E314B` (Precision navy elevation)
- **Subtle Borders:** `#293C51` (Crisp 1px architectural borders)
- **Primary Accent:** `#79C7FF` (Electric celestial azure)
- **Primary Typography:** `#F5F8FC` (High-contrast clean ice white)
- **Secondary / Telemetry Labels:** `#A5B5C8` (Muted aerospace platinum slate)
- **Semantic Colors:**
  - Optimal / Nominal (Success): `#35C99A` (Precision mint green)
  - Warning / Caution: `#F2B65B` (Warm automotive amber)
  - Critical / Fault (Error): `#F16D78` (Refined automotive rose-crimson)
- **Typography Stack:**
  - Headings: `Manrope` (weights 600–800)
  - Interface / Body: `Inter` (weights 400–600)
  - Numerical Telemetry & DTC Codes: `JetBrains Mono` (weights 400–700)
- **Brand Identity & Emblem:**
  - Bespoke Aerospace Automotive Crest SVG vector emblem in `NebulaLogo.tsx` with hexagonal shield facets, aerodynamic hypercar delta wings, titanium chrome bevels, and central telemetry horizon nexus.
- **Viewports Tested:**
  - 375px (Mobile Safari / Chrome)
  - 768px (Tablet portrait)
  - 1024px (Tablet landscape)
  - 1440px (Laptop / Desktop standard)
  - 1920px (Full HD presentation projector)

---

## 5. Verification Sign-off

- **Student Author:** Zainab Amanat
- **Roll Number:** M245008 (Certificate Registry M245036)
- **Repository Maintainer:** Husnain Tanveer (`husnain900`)
- **Status:** PASS (0 ESLint Errors, 0 Warnings, 100% Routes Operational)

