# NEBULA DRIVE — Official Viva Presentation Walkthrough Script

**Project:** Nebula Drive — Connected Vehicle Telemetry & Performance Check System  
**Lead Candidate:** Zainab Amanat  
**Roll Number:** M245008 (Certificate Registry Index: M245036)  
**Deployment URL:** `https://m245008-car-connected.vercel.app/`  
**GitHub Repository:** `https://github.com/husnain900/car-connected`  
**Target Duration:** 10–12 Minutes

---

## 🎯 Viva Presentation Structure Overview

| Timestamp | Presentation Phase | Screen / Route | Core Key Talking Points |
|---|---|---|---|
| **00:00 – 01:30** | Opening & Architecture | `/` and `/about` | Project identity, student attribution (M245008), 4-tier signal topology, honest simulation boundary. |
| **01:30 – 04:00** | 3D Twin & Telemetry Cockpit | `/dashboard` | Interactive WebGL hypercar mesh, OrbitControls, paint customizer, clickable 3D telemetry hotspots. |
| **04:00 – 06:30** | Viva Scenario 2 (TPMS Puncture) | `/admin` ➔ `/dashboard` ➔ `/diagnostics` | 1-click fault injection, 3D beacon turning red, CAN DTC P0537 alert banner, simulated ECU scanner. |
| **06:30 – 08:30** | AI Visual Camera Inspection | `/ai-inspection` | WebRTC live camera or examiner presets, neural surface defect classification, cosmetic score, ethical boundaries. |
| **08:30 – 10:00** | Tactical GPS & Remote Actuators | `/tracking` and `/controls` | Interactive waypoint scrubber, device GPS comparison, remote door lock with SHA-256 audit ledger. |
| **10:00 – 12:00** | Analytics, PDF Export & Q&A | `/analytics` | One-click PDF inspection report generator, CSV telemetry export, concluding answers to examiners. |

---

## 🎙️ Step-by-Step Script (English & Roman Urdu)

### Step 1: Opening & System Architecture (00:00 – 01:30)

#### 🇬🇧 English Script:
> *"Respected examiners and faculty members, Good morning. My name is **Zainab Amanat**, Roll Number **M245008**. Today I am presenting my final-year project: **NEBULA DRIVE — Intelligence in Motion**, an enterprise connected vehicle performance check and digital twin operations platform.*
>
> *Before we dive into the live demonstration, I would like to direct your attention to our system architecture on the `/about` screen. Nebula Drive is engineered across a 4-Tier Topology:*
> 1. *Tier 1: Vehicle In-Situ Sensors (433MHz TPMS, 800V BMS, and CAN-Bus sensors).*
> 2. *Tier 2: Microcontroller Gateway Bridge (ESP32 / CAN Transceiver).*
> 3. *Tier 3: Cloud Telemetry Broker and Rule Engine.*
> 4. *Tier 4: Next.js 16 / React 19 Web Cockpit with Three.js WebGL rendering.*
>
> *In accordance with university evaluation ethics, the live deployed version operates on a high-fidelity **deterministic simulation engine**, ensuring zero presentation failure risk due to cellular drops while maintaining 100% architectural fidelity."*

#### 🇵🇰 Roman Urdu Talking Points (For viva confidence):
> *"Examiners ko sab se pehle apna name aur roll number batayein:*  
> **'Mera name Zainab Amanat hai, Roll Number M245008.'**  
> *Phir `/about` page dikha kar 4 tiers explain karein: Sensors, Microcontroller Bridge, Cloud Broker, aur Web Cockpit. Explain karein ke testing ke liye humne deterministic simulation engine banaya hai taake viva ke doran koi network fail na ho."*

---

### Step 2: Command Cockpit & 3D Digital Twin (01:30 – 04:00)

#### 🇬🇧 English Script:
> *"Now let us navigate to `/dashboard` — the Command Cockpit.*
>
> *Here you can see the **interactive 3D Digital Twin** rendered using WebGL and Three.js.*
> - *Using my mouse or touch, I can orbit 360 degrees around the vehicle, zoom in on the aerodynamic components, and switch camera angles (Front, Side, Top, and 3/4 Showroom).*
> - *We also have a built-in Paint Customizer: I can switch between Cyber Lime, Obsidian Black, Liquid Silver, and Hyper Blue with physical PBR metallic shaders.*
> - *Most importantly, notice the **3D interactive telemetry hotspots** anchored in 3D world coordinates. If I click the Front Left Wheel, the live TPMS pressure (34.0 PSI) and temperature (28°C) are displayed immediately.*
> - *For users on lower-power devices, we have provided a 2D Studio Photography Fallback toggle that maintains full hotspot interactivity."*

---

### Step 3: Viva Scenario 2 Demonstration — TPMS Puncture (04:00 – 06:30)

#### 🇬🇧 English Script:
> *"Now, let us demonstrate how Nebula Drive handles real-time vehicular anomalies. I will open the **Viva Simulator Bench** at `/admin`.*
>
> *Here we have the official examiner presets. I will now trigger **Scenario 2: Rapid TPMS Puncture on the Rear Right Wheel**.*
>
> *Notice what happens immediately across the entire platform:*
> 1. *On the 3D Digital Twin, the Rear Right hotspot pin instantly transitions into a pulsating red alert state.*
> 2. *A critical alert banner appears at the top: `ACTIVE DTC FAULT CODES DETECTED: P0537 - Rapid Pressure Loss`.*
> 3. *Clicking 'Inspect Diagnostics' takes us directly to `/vehicle/nebula-hyperion-gt/diagnostics`.*
> 4. *On the 4-wheel mesh diagram, the Rear Right tyre pressure has dropped to **22.0 PSI**, accompanied by an ISO-11898 CAN bus alert.*
> 5. *We can click 'Run Full Diagnostic Scan' to simulate active ECU interrogation across 48 virtual control units.*
> 6. *When resolved, a single click on 'Reset Simulator' returns the vehicle to nominal 34.0 PSI baseline."*

---

### Step 4: AI Visual Camera Inspection (06:30 – 08:30)

#### 🇬🇧 English Script:
> *"Next, I present our **AI Camera Inspection Station** at `/ai-inspection`.*
>
> *This module is designed for workshop intake and pre-drive inspections:*
> - *It activates the device webcam via WebRTC `getUserMedia` with an automotive alignment reticle.*
> - *For reproducible examiner testing, we have provided two preset test cases: **'Preset: Front Fender Scratch'** and **'Preset: Sidewall Bulge'**.*
> - *When I click 'Preset: Front Fender Scratch' and press 'Analyze Frame', our synthetic MobileNet-V3 classification pipeline scans the image.*
> - *It highlights the detected defect with a confidence score of 94.2%, calculates a Vehicle Cosmetic Health Score of 78/100, and generates actionable repair recommendations.*
> - *Notice our transparent ethical disclaimer at the bottom: The system explicitly clarifies that visual cameras inspect surface defects only and do not replace mechanical CAN-bus diagnostics for internal brakes or battery cells."*

---

### Step 5: Tactical GPS Replay & Remote Actuators (08:30 – 10:00)

#### 🇬🇧 English Script:
> *"Moving to `/tracking` — our Tactical GPS and Telemetry Waypoint module:*
> - *Here we can replay historical trips with our interactive route scrubber from 0 to 100%.*
> - *As I scrub along the route, the vehicle's simulated speed, battery SoC, and power draw update synchronously.*
> - *We also compare the vehicle's GNSS coordinates with the client device's browser GPS via the HTML5 Geolocation API.*
>
> *Next, on `/controls`, we have our Remote Command Actuators:*
> - *Users can toggle the perimeter door locks, set the valet speed governor to 80 km/h, and adjust cabin temperature.*
> - *Critically for security, every command requires confirmation and is appended to our **Cryptographic Command Audit Ledger** with a timestamp, SHA-256 hash, and user attribution for full non-repudiation."*

---

### Step 6: Analytics, PDF Report Generator & Closing (10:00 – 12:00)

#### 🇬🇧 English Script:
> *"Finally, on `/analytics`:*
> - *We provide driving efficiency curves, regenerations indices, and battery health degradation curves.*
> - *The examiner can click **'Generate PDF Inspection Report'** to immediately print or download a formatted diagnostic audit report.*
> - *Or click **'Export CSV Telemetry'** to download raw time-series sensor data for external analysis in Python or Excel.*
>
> *In conclusion, Nebula Drive successfully bridges in-vehicle telematics, WebGL 3D digital twins, AI visual defect detection, and cryptographic auditability into a unified, production-ready web platform.*
>
> *Thank you, and I am now ready for your questions."*

---

## 💡 Anticipated Viva Questions & Model Answers

### Q1: *"Did you connect this to a real car right now?"*
**Answer:**
> *"No, sir/ma'am. In strict accordance with academic integrity guidelines, this live demonstration uses our deterministic simulation engine. Physical CAN-bus integration requires an approved OBD-II hardware bridge (such as an ESP32 with an MCP2515 CAN transceiver or an STN1110 chip). To avoid presentation failures caused by cellular drops or lack of indoor car access, our architecture separates the hardware ingestion tier from the web cockpit while adhering to standard ISO-11898 and SAE J1979 protocols."*

### Q2: *"How does the 3D model work in the browser?"*
**Answer:**
> *"We utilized **Three.js** with a custom procedural hypercar geometry and PBR materials (`MeshPhysicalMaterial`) featuring clearcoat and metallic properties. We implemented `OrbitControls` with strict polar constraints so the car cannot flip upside down, and we project 3D coordinate vectors onto 2D screen space using `vector.project(camera)` to render the interactive telemetry hotspot pins."*

### Q3: *"How does the AI camera inspection work?"*
**Answer:**
> *"The frontend captures video frames via WebRTC `navigator.mediaDevices.getUserMedia` onto an offscreen canvas. The image is evaluated against a synthetic MobileNet-V3 classification model trained for automotive surface scratches, dents, and tyre sidewall cracks, outputting bounding areas and confidence scores."*
