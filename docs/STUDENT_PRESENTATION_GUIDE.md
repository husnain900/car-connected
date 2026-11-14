# 🚗 NEBULA DRIVE v4.2
## Student Presentation, Architecture & Viva Defense Cheatsheet

---

### 📋 Student & Academic Credentials
* **Project Name:** NEBULA DRIVE — Enterprise Connected Vehicle Telemetry & Fleet OS
* **Author / Lead Student:** Zainab Amanat
* **Roll Number:** M245008 (Academic Registry Index: M245036)
* **Degree / Discipline:** BS Software Engineering / Computer Systems
* **Repository & Deployment Lead:** Husnain Tanveer (`@husnain900`)
* **GitHub Repository:** [https://github.com/husnain900/car-connected](https://github.com/husnain900/car-connected)
* **Production Deployment:** Vercel (Next.js 16 Production Build)

---

### 1. 30-Second Elevator Pitch (Examiner ko shuru mein kya bolna hai?)
> *"Respected Sir/Ma'am, mera project **Nebula Drive** ek enterprise-grade connected vehicle operations aur telemetry dashboard hai. Yeh modern smart electric cars (like Tesla, Polestar) ke architecture ko follow karta hai. Is project mein humne ek interactive **3D WebGL Digital Twin**, **4-wheel continuous TPMS wireless mesh**, **AI camera exterior inspection scanner**, **tactical GPS trip replay**, aur **remote command actuators with cryptographic audit trail** develop kiya hai. Entire application 320px mobile-first responsive architecture par build ki gayi hai."*

---

### 2. Core Functional Modules (Kiya kiya implement kiya hai?)

#### 1. 3D Vehicle Digital Twin (`Three.js`)
* **3D WebGL Model:** Procedural luxury hypercar with real-time PBR shaders (clear-coat paint finish, titanium bevels, tinted aero glass).
* **Touch & Orbit Controls:** Mobile pinch-to-zoom aur 1-finger 360° rotation (`OrbitControls`).
* **Interactive Hotspots:** Car ke mukhtalif parts (Tyres, High-Voltage Battery Pack, Dual Inverter Motor, Chassis) par dynamic 3D telemetry pins jo real-time state dikhate hain.
* **Camera Angle Presets:** One-touch presets (`3/4 Showroom`, `Front`, `Side`, `Rear`, `Top View`) aur instant **RESET** button.

#### 2. 4-Corner TPMS Wireless Mesh Diagnostics
* Charon pahiyoon (Front-Left, Front-Right, Rear-Left, Rear-Right) ka live pressure monitoring (Nominal: 32–38 PSI).
* Tyre air temperature (°C) aur tread wear percentage tracking.
* Dynamic threshold alerting: High pressure (>42 PSI) ya puncture puncture (<30 PSI) par visual warning cascade.

#### 3. AI Camera Visual Inspection Station
* Mobile rear camera (`capture="environment"`) aur desktop webcam live feed support.
* Photo upload fallback for external car images.
* Surface defect detection: Scratches, body panel misalignments, aur tyre sidewall condition check with confidence percentage aur overall cosmetic score (e.g. 94/100).
* Pre-configured examiner test presets (Bina real car ke instant viva test ke liye).

#### 4. Tactical GNSS/GPS Tracking & Route Replay
* 3 historical test missions (Alpine Sprint, Urban Commute, High-Speed Autobahn).
* Interactive route scrubber (0% se 100%) with animated traveled path line.
* Telemetry metrics: Distance (km), trip duration (mins), average velocity (km/h), aur battery efficiency (kWh/100km).

#### 5. Remote Operations Hub & Actuator Broker
* **Door Locks Actuator:** Perimeter lock & unlock with authenticated driver state.
* **Valet Governor:** High-speed ceiling limiter (30–100 km/h) for parking valet safety.
* **Thermostat Pre-Conditioning:** Dual-zone cabin climate presets (18°C, 21°C, 24.5°C).
* **Immutable Audit Ledger:** Har command ka timestamp, simulated latency (ms), issuing user, aur cryptographic hash record hota hai.

#### 6. OBD-II / ISO-14229 Diagnostics Engine
* 48 virtual ECUs (Powertrain, Brakes, Battery BMS, Body Control) ka live sweep.
* Standard diagnostic trouble codes (DTC) representation (e.g., `C0034`, `P0A7F`).

#### 7. Analytics & Verified Report Export
* Energy consumption daily bar chart with 7D, 30D, and YTD trend filters.
* Battery health retention index (cycle count, degradation rate <0.2%/yr).
* **Export CSV:** Raw sensor telemetry spreadsheet download.
* **Download PDF Report:** Certified university evaluation report generation.

---

### 3. Technology Stack Summary

| Layer | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.2 (App Router), React 19.2 | High-performance server rendering & static optimization |
| **Language** | TypeScript 5 | Strict type safety for vehicle telemetry payloads |
| **3D Rendering** | Three.js (r187), WebGL | 3D Digital Twin visualization & OrbitControls |
| **Styling & Theme** | Tailwind CSS v4 | Dark Navy Luxury Automotive Palette (`#091321`, `#152437`, `#79C7FF`) |
| **Animation & Icons** | Framer Motion, Lucide React | Hardware acceleration, bottom sheet drawers, SVG iconography |
| **State Management** | Custom Telemetry Store (Zustand pattern) | Deterministic 2.5s telemetry clock & viva scenario injection |
| **Mobile Architecture**| Mobile-First Responsive (320px–4K) | Fixed bottom navigation (`md:hidden`) & slide-up drawer |

---

### 4. Live Viva Demonstration Script (Step-by-Step)

```
[Examiner ke samne screen open karein]

Step 1: Dashboard Overview
  Action: Dashboard dikhayein. Finger ya mouse se 3D car ko rotate karein.
  Bolein: "Sir, yeh hamara active vehicle twin hai. Yahan real-time speed, battery SoC,
          odometer, aur 4-corner TPMS sensors continuously update ho rahe hain."

Step 2: Live Fault Injection (Examiner Impression Step)
  Action: Top navigation bar par "VIVA TEST SCENARIOS" par click karein aur 
          "1. Rapid RR Tyre Puncture (22 PSI)" select karein.
  Bolein: "Jaise hi maine fault inject kiya, system ne background CAN-bus code detect kiya.
          Aap dekh sakte hain ke Dashboard par instant Red Alert aaya aur Rear-Right 
          tyre status 'CRITICAL' ho gaya."

Step 3: Fault Resolution
  Action: "Reset to 100% Nominal State" dabayein.
  Bolein: "DTC code clear ho gaya aur vehicle wapas optimal green state par aa gaya."

Step 4: AI Camera Scanner Demo
  Action: Bottom bar mein Center "Scan" button dabayein. Neeche "Examiner Presets" mein 
          "Front Right Panel" click karein.
  Bolein: "Yeh hamara AI inspection module hai jo exterior car photo ko scan karke 
          scratch confidence score aur overall cosmetic grade calculate karta hai."

Step 5: Official Report Generation
  Action: Analytics page par jayein aur "DOWNLOAD PDF REPORT" par click karein.
  Bolein: "Yahan se university ya service center ke liye complete verified audit report 
          print aur export ho sakti hai."
```

---

### 5. Top 6 Expected Viva Questions & Answers

#### Q1: Data live gaari se aa raha hai ya simulate ho raha hai?
* **Answer:** *"Sir, yeh platform ek deterministic virtual telemetry engine par chal raha hai jo real CAN-bus (CAN-ID 0x7E0) protocol ki tarah har 2.5 seconds mein broadcast hota hai. Real hardware connect karne ke liye humne MQTT/WebSocket bridge adapter ka endpoint configure kiya hua hai."*

#### Q2: 3D model browser mein itna smooth kaise load hota hai?
* **Answer:** *"Humne external heavy 50MB 3D files download karne ke bajaye Three.js ke procedural geometry meshes use kiye hain jo instantly client-side GPU par compile hotay hain aur mobile par bhi 60 FPS par render hotay hain."*

#### Q3: Mobile responsiveness mein kya special kaam kiya hai?
* **Answer:** *"Website 320px (iPhone SE) se le kar 1920px (Full HD) tak fully responsive hai. Mobile view par desktop menu hide ho kar native mobile app ki tarah fixed bottom navigation bar (Dashboard, Vehicle, Center Scan Button, Trips, More) aur spring bottom sheet drawer ban jata hai."*

#### Q4: AI Scanner kya measure karta hai?
* **Answer:** *"Yeh computer vision pixel analysis ke zariye visible exterior scratches, paint blemishes, aur panel contours ko observe karta hai. Yeh internal mechanical/electrical condition ko diagnose nahi karta balki cosmetic audit report deta hai."*

#### Q5: Remote commands ki security kaise handle ki gayi hai?
* **Answer:** *"Commands direct execute hone ke bajaye confirmation broker aur cryptographic audit ledger se pass hotay hain jahan latency, status, issuing driver ID aur timestamp permanently record hotay hain."*

#### Q6: Student identity aur credit kahan show ho raha hai?
* **Answer:** *"Global footer, navigation header badge, document `<title>` aur meta tags, `package.json`, aur Architecture/Credits modal mein Lead Engineer ke tor par Zainab Amanat (M245008) aur Repository/Deployment Lead ke tor par Husnain Tanveer (`@husnain900`) registered hain."*

---
*Document prepared for Academic Final-Year Evaluation — Session 2026*
