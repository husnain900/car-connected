"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-xs font-mono self-start">
          <span className="w-2 h-2 rounded-full bg-[#D6F45A] animate-pulse" />
          <span className="text-[#8794A6]">ACADEMIC FINAL-YEAR SPECIFICATIONS //</span>
          <span className="text-[#F4F7FB] font-bold">2026 EVALUATION</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-[#F4F7FB] tracking-tight">
          Nebula Drive Project Architecture & Attribution
        </h1>
        <p className="text-sm font-mono text-[#8794A6] leading-relaxed max-w-3xl">
          Connected vehicle performance check, remote operations telemetry, AI camera visual inspection, and multi-tenant fleet digital twin system.
        </p>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-2" />
      </div>

      {/* Student Attribution Card */}
      <div className="nebula-card p-6 sm:p-8 bg-gradient-to-br from-[#151D28] via-[#1B2636] to-[#151D28] border border-[#D6F45A]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#D6F45A]/15 border-2 border-[#D6F45A]/40 flex items-center justify-center font-display font-black text-2xl text-[#D6F45A]">
              ZA
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#F4F7FB]">
                  Zainab Amanat
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D6F45A]/20 text-[#D6F45A] border border-[#D6F45A]/30">
                  LEAD ENGINEER & AUTHOR
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#8794A6] mt-1.5">
                <span>Roll Number: <strong className="text-[#F4F7FB] font-mono-numbers">M245008</strong></span>
                <span>•</span>
                <span>Department of Software & Computer Engineering</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 self-start sm:self-auto text-xs font-mono text-[#43D9A3]">
            <UserCheck className="w-4 h-4" />
            <span>CERTIFIED CANDIDATE</span>
          </div>
        </div>

        {/* Note on Report Registration ID Clarification & Repository Deployment */}
        <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-[#8794A6] space-y-3">
          <div className="space-y-1">
            <div className="text-[#D6F45A] font-bold">Academic Registry Clarification Note:</div>
            <p className="leading-relaxed">
              Project documentation references primary Roll Number <strong>M245008</strong>. The candidate certificate registry references index <strong>M245036</strong>. Both identifiers correspond to Zainab Amanat within the university departmental ledger.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-[#8794A6]">Deployment & Repo Lead:</span>
              <strong className="text-[#F4F7FB]">Husnain Tanveer</strong>
              <span className="text-[#D6F45A]">(@husnain900)</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <a
                href="https://github.com/husnain900/car-connected"
                target="_blank"
                rel="noreferrer"
                className="text-[#43D9A3] hover:underline"
              >
                github.com/husnain900/car-connected ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture Diagram (Sensors -> Bridge -> Backend -> App) */}
      <div className="nebula-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
            SYSTEM SPECIFICATION
          </span>
          <h2 className="font-display font-bold text-2xl text-[#F4F7FB] mt-1">
            End-to-End Connected Vehicle Topology
          </h2>
          <p className="text-xs font-mono text-[#8794A6] mt-1">
            4-tier architecture illustrating signal path from physical/virtual sensors through to the interactive digital twin.
          </p>
        </div>

        {/* Architectural Block Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#1B2636] border border-white/10 space-y-2">
            <span className="text-[10px] text-[#D6F45A] font-bold uppercase block">TIER 1 // SENSORS</span>
            <div className="font-bold text-[#F4F7FB] text-sm">Vehicle In-Situ Hardware</div>
            <ul className="text-[#8794A6] space-y-1 text-[11px] list-disc list-inside">
              <li>TPMS 433 MHz RF Wheel Transducers</li>
              <li>OBD-II CAN Bus (ISO-11898)</li>
              <li>High-Voltage Battery BMS</li>
              <li>Multi-GNSS Receiver</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#1B2636] border border-white/10 space-y-2">
            <span className="text-[10px] text-[#43D9A3] font-bold uppercase block">TIER 2 // BRIDGE</span>
            <div className="font-bold text-[#F4F7FB] text-sm">Microcontroller Gateway</div>
            <ul className="text-[#8794A6] space-y-1 text-[11px] list-disc list-inside">
              <li>ESP32 / Arduino CAN Transceiver</li>
              <li>Secure MQTT / TLS Telemetry Link</li>
              <li>Deterministic Fallback Simulator</li>
              <li>Actuator Lock Relays</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#1B2636] border border-white/10 space-y-2">
            <span className="text-[10px] text-[#F8BE62] font-bold uppercase block">TIER 3 // BROKER</span>
            <div className="font-bold text-[#F4F7FB] text-sm">Cloud Telemetry Service</div>
            <ul className="text-[#8794A6] space-y-1 text-[11px] list-disc list-inside">
              <li>Time-Series Telemetry Store</li>
              <li>DTC Diagnostic Rule Engine</li>
              <li>Command Audit Ledger</li>
              <li>MobileNet-V3 Vision Pipeline</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#1B2636] border border-white/10 space-y-2">
            <span className="text-[10px] text-[#D6F45A] font-bold uppercase block">TIER 4 // COCKPIT</span>
            <div className="font-bold text-[#F4F7FB] text-sm">Next.js 16 Web Dashboard</div>
            <ul className="text-[#8794A6] space-y-1 text-[11px] list-disc list-inside">
              <li>React 19 Digital Twin Hotspots</li>
              <li>Tailwind CSS v4 Design System</li>
              <li>Framer Motion & GSAP Counters</li>
              <li>Client-Side PDF/CSV Exporter</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Honest Transparency: Demo Simulator vs Physical Hardware */}
      <div className="nebula-card p-6 sm:p-8 space-y-4 border border-amber-500/30 bg-amber-500/5">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="font-display font-bold text-xl text-[#F4F7FB]">
            Hardware Integration & Simulation Disclosure
          </h2>
        </div>

        <p className="text-xs font-mono text-[#8794A6] leading-relaxed">
          In strict accordance with academic integrity guidelines, this deployed application operates using a <strong>deterministic seeded telemetry engine</strong>. No live mechanical vehicle is physically connected during web browser execution, eliminating presentation failure risks caused by dead cellular networks or offline vehicles during viva examination.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#151D28] border border-white/8 space-y-1">
            <span className="text-[#43D9A3] font-bold block">✓ Implemented In This Build</span>
            <span className="text-[#8794A6] text-[11px]">
              Complete software architecture, digital twin hotspots, deterministic TPMS simulation, OBD-II DTC scanner, camera visual inspection, remote control broker with audit ledger, and PDF exporter.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#151D28] border border-white/8 space-y-1">
            <span className="text-amber-400 font-bold block">○ Physical Boundary Boundary</span>
            <span className="text-[#8794A6] text-[11px]">
              Actual direct physical CAN-bus connection and door solenoid actuation in real vehicles requires an approved OBD-II hardware bridge (e.g. STN1110 / ESP32) with dedicated physical wiring safeguards.
            </span>
          </div>
        </div>
      </div>

      {/* Technology Stack Details */}
      <div className="nebula-card p-6 sm:p-8 space-y-4">
        <h2 className="font-display font-bold text-xl text-[#F4F7FB]">
          Implemented Software Tooling Stack
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[#8794A6] text-[10px] block">FRAMEWORK</span>
            <span className="font-bold text-[#F4F7FB]">Next.js 16 (App Router)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[#8794A6] text-[10px] block">UI LIBRARY</span>
            <span className="font-bold text-[#F4F7FB]">React 19 & TypeScript 5</span>
          </div>
          <div className="p-3 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[#8794A6] text-[10px] block">STYLING</span>
            <span className="font-bold text-[#D6F45A]">Tailwind CSS v4</span>
          </div>
          <div className="p-3 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[#8794A6] text-[10px] block">ICONOGRAPHY</span>
            <span className="font-bold text-[#43D9A3]">Pure Inline Lucide SVGs</span>
          </div>
        </div>
      </div>

      {/* Return to Dashboard CTA */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
        >
          <span>RETURN TO DASHBOARD COCKPIT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
