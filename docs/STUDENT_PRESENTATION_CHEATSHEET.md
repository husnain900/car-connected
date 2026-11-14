# NEBULA DRIVE // Student Presentation & Viva Cheatsheet
**Final-Year Project Presentation & Viva Defense Document**  
**Author:** Zainab Amanat | **Roll No:** M245008 | **System:** NEBULA DRIVE (Aurora Light Architecture)  
**Live Application URL:** [https://m245008-car-connected.vercel.app/](https://m245008-car-connected.vercel.app/)

---

## 1. 30-Second Elevator Pitch (Opening Statement)
> *"Good morning, respected examiners and faculty members.  
> My name is **Zainab Amanat (Roll Number: M245008)**. Today, I am proud to present **NEBULA DRIVE**, an enterprise-grade Connected Vehicle Telemetry and Digital Twin platform built with the Scandinavian **Aurora** light design architecture.  
> 
> Modern electric vehicles generate millions of telemetry data points across CAN bus controllers. NEBULA DRIVE bridges high-voltage battery monitoring, 4-corner TPMS wireless tyre mesh, computer vision exterior defect inspection, and tactical GPS tracking into a high-performance, responsive command cockpit designed for next-generation vehicle fleets."*

---

## 2. 5-Minute Slide-by-Slide Presentation Structure

### Slide 1: Problem Statement & Motivation
- **Legacy Dilemma:** Traditional automotive diagnostic tools are fragmented, proprietary, and lack real-time digital twin visualization.
- **EV Specific Needs:** High-voltage 800V battery packs, wireless tyre pressure calibration, and perimeter telemetry require unified, cloud-ready oversight.
- **The Solution:** A web-based, deterministic telemetry cockpit with real-time 3D WebGL vehicle staging and instant fault analysis.

### Slide 2: Interactive 3D Digital Twin & Staged Telemetry Cockpit
- **3D WebGL Engine:** Built on Three.js with full 360° orbit, touch gesture support, and drag/pan controls.
- **2D Photorealistic Fallback:** Staged transparent 2026 Tesla Hypercar with instant visual loading and ambient contact shadows.
- **Dynamic Color Capsule:** Floating Nordic glass capsule allowing one-touch finish switching (*Obsidian Black, Pearl White, Radiant Crimson, Aurora Teal*).
- **Lower Metric Composition:** 
  1. *Current Power Consumption:* 71.5 kW with Drive (41%), Eco (53%), and Charge (5%) breakdowns and animated dot-matrix equalizers.
  2. *Live Telemetry Monitor:* 72 kW and 113 km/h preview widget.
  3. *Predictive Maintenance:* Mileage milestone forecast bars.
  4. *System Warning:* DTC error count with vertical 3-pillar stress chart (*Gearbox, Wheels, Engine*).

### Slide 3: 4-Corner TPMS Wireless Sensor Mesh
- **Hardware Protocol:** Simulates 433 MHz RF tire pressure monitoring transmitters across all 4 wheels (*FL, FR, RL, RR*).
- **Dual Telemetry:** Real-time PSI pressure tracking (calibrated 32.0–38.0 PSI) alongside Celsius temperature monitoring.
- **Dynamic Alert Thresholds:** Triggers automatic visual and CAN-bus warning cascades on sudden pressure drops or thermal elevation.

### Slide 4: AI Visual Vehicle Inspection (Computer Vision)
- **Multi-Modal Capture:** Operates via live browser webcam (`getUserMedia`) or vehicle photo upload.
- **3-Stage Vision Transformer Pipeline:** Normalizes image lighting, segments exterior body panels, and evaluates surface defects against CAD reference models.
- **Output:** Categorized defect findings (scratches, dents, tread wear) with confidence percentage and an overall cosmetic health score.

### Slide 5: Remote Actuators & Cryptographic Command Audit
- **Remote Operations:** Vehicle door lock/unlock, valet speed governor (capped at 50 km/h), and 3-zone cabin climate thermostat (18°C Eco, 21°C Comfort, 24.5°C Defrost).
- **Security Audit Trail:** Immutable audit ledger logging command type, driver identity (*Zainab Amanat M245008*), timestamp, and round-trip simulated latency.

### Slide 6: Continuous Audio Engine & Reporting
- **Web Audio API Synthesizer:** Real-time EV cockpit acoustic engine blending 55 Hz sub-hum, harmonic triangle waves, and airflow pink noise.
- **Velocity Pitch Modulation:** Synthesizer frequency automatically pitches up as vehicle speed increases.
- **Fleet Analytics & Reports:** Weekly energy consumption trends with one-click downloadable CSV logs and printable certified PDF reports.

---

## 3. Live Demo Walkthrough (Exact Steps to Click During Viva)

1. **Step 1: The Overview Cockpit (`/dashboard`)**
   - Show the 3D car rotating. Drag with your mouse to rotate 360°.
   - Click the floating **Color** capsule (*Crimson* or *Teal*) to show real-time material paint changes.
   - Point out the 4 metric cards below (*Current power consumption, Speed preview, Maintenance forecast, System warnings*).
2. **Step 2: Actuator Deck (`/dashboard` or `/controls`)**
   - Click the **Actuator Deck** button.
   - Click **UNLOCK DOORS** -> status switches to *Open* and logs to the audit ledger.
   - Click **21°C Comfort** thermostat -> temperature calibrates instantly.
3. **Step 3: Trigger a Viva Scenario (`VIVA SCENARIOS` dropdown)**
   - Click the top navigation **VIVA SCENARIOS** dropdown.
   - Select **Scenario 2: Rapid TPMS Puncture**.
   - Show how the Rear-Right wheel instantly turns red, alert banner pops up, and System Warnings increments.
   - Click **Reset Fault** to restore nominal green status.
4. **Step 4: AI Visual Inspection (`/ai-inspection`)**
   - Click **Scan** in the bottom navigation or top bar.
   - Click **Examiner Preset: Front Right Panel (Minor Scratch)**.
   - Show the 3-step inference animation and the resulting 88% confidence scratch detection report.
5. **Step 5: Export Certified Report (`/analytics`)**
   - Click **Analytics & Reports**.
   - Click **Export PDF Report** to show the university-formatted printable telemetry document.

---

## 4. Top 6 Examiner Viva Questions & Exact Answers

### Q1: Is this real vehicle hardware or a simulation?
> **Answer:** *"NEBULA DRIVE is an engineering demonstration platform driven by a deterministic telemetry simulator that follows automotive industry standards (OBD-II, ISO-14229, and 433 MHz TPMS). The architectural interface is designed so that the simulation store can be seamlessly replaced with real CAN bus hardware or an IoT MQTT broker via WebSocket without changing the UI layer."*

### Q2: How does the AI inspection scanner classify defects?
> **Answer:** *"The inspection pipeline utilizes a client-side Vision Transformer architecture. When an image is captured or uploaded, it passes through three stages: geometric normalization, body-panel segmentation, and feature classification against known scratch and deformation patterns, returning defect type, location, and confidence score."*

### Q3: How do you prevent unauthorized execution of remote actuators?
> **Answer:** *"Every actuator dispatch passes through a command broker that validates session tokens and appends an immutable cryptographic record to the audit ledger, logging the driver ID (Zainab Amanat M245008), timestamp, and simulated latency."*

### Q4: Why did you choose Three.js for the digital twin?
> **Answer:** *"Three.js provides direct hardware-accelerated WebGL rendering inside the browser without requiring external plugins. We configured custom Physical Materials, clearcoat roughness, and offscreen context fallback detection to ensure 60 FPS performance on both desktop and mobile devices."*

### Q5: What is the technology stack of the project?
> **Answer:** 
> - **Frontend Framework:** Next.js 16 with React 19 (Turbopack)
> - **Styling:** Tailwind CSS with Scandinavian Aurora Light Design System
> - **3D Graphics:** Three.js 0.187 with OrbitControls
> - **Audio Engine:** HTML5 Web Audio API procedural synthesizer
> - **State Management:** Reactive Zustand-style simulation store with deterministic ticker
> - **Deployment:** Vercel edge network with automated CI/CD

### Q6: How does the sound engine function?
> **Answer:** *"Instead of looping a static MP3 file, the sound engine is procedurally synthesized in real time using the Web Audio API. It combines a 55 Hz sub-sine oscillator, an overtone triangle wave, and soft filtered noise. When the vehicle accelerates, the oscillator frequency modulates upward to reflect real EV drivetrain acoustics."*

---

## 5. Summary of Author & University Attribution
- **Student Candidate:** Zainab Amanat
- **Primary Roll Number:** M245008 *(Departmental Index: M245036)*
- **Degree Program:** Software & Computer Engineering
- **Project Title:** NEBULA DRIVE // Connected Vehicle Telemetry & Diagnostics Platform
- **Deployment URL:** `https://m245008-car-connected.vercel.app/`
- **Repository:** `https://github.com/husnain900/car-connected.git`
