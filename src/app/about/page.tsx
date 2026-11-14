"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function AboutPage() {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D8E0E7] text-xs font-mono shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2E8B8B] animate-pulse" />
            <span className="text-[#5B6675]">ACADEMIC SPECIFICATIONS //</span>
            <span className="text-[#1F2A37] font-bold">2026 EVALUATION</span>
          </div>
          <NebulaLogo size="md" showText={false} />
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#1F2A37] tracking-tight">
          Nebula Drive Project Architecture &amp; Attribution
        </h1>
        <p className="text-sm font-mono text-[#5B6675] leading-relaxed max-w-3xl">
          Connected vehicle performance check, remote operations telemetry, AI camera visual inspection, and multi-tenant fleet digital twin system.
        </p>

        <div className="h-[1px] w-full bg-[#D8E0E7] mt-2" />
      </div>

      {/* Student Attribution Card */}
      <div className="nebula-card p-6 sm:p-8 bg-gradient-to-br from-[#FFFFFF] via-[#F6F8FA] to-[#EEF2F5] border border-[#86B6B2]/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E7F3F1] border-2 border-[#2E8B8B] flex items-center justify-center font-display font-bold text-2xl text-[#2E8B8B] shadow-xs">
              ZA
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#1F2A37]">
                  Zainab Amanat
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3F1] text-[#2E8B8B] border border-[#86B6B2]/40">
                  LEAD ENGINEER &amp; AUTHOR
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#5B6675] mt-1.5">
                <span>Roll Number: <strong className="text-[#2E8B8B] font-mono-numbers">M245008</strong></span>
                <span>•</span>
                <span>Department of Software &amp; Computer Engineering</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] self-start sm:self-auto text-xs font-mono text-[#2FA36B] font-bold">
            <UserCheck className="w-4 h-4" />
            <span>CERTIFIED CANDIDATE</span>
          </div>
        </div>

        {/* Note on Report Registration ID Clarification & Repository Deployment */}
        <div className="mt-6 pt-4 border-t border-[#D8E0E7] text-xs font-mono text-[#5B6675] space-y-3">
          <div className="space-y-1">
            <div className="text-[#2E8B8B] font-bold">Academic Registry Clarification Note:</div>
            <p className="leading-relaxed">
              Project documentation references primary Roll Number <strong>M245008</strong>. The candidate certificate registry references index <strong>M245036</strong>. Both identifiers correspond to Zainab Amanat within the university departmental ledger.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center space-x-2">
              <span className="text-[#5B6675]">Deployment &amp; Repo Lead:</span>
              <strong className="text-[#1F2A37]">Husnain Tanveer</strong>
              <span className="text-[#2E8B8B]">(@husnain900)</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <a
                href="https://github.com/husnain900/car-connected"
                target="_blank"
                rel="noreferrer"
                className="text-[#2E8B8B] font-bold hover:underline"
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
          <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
            SYSTEM SPECIFICATION
          </span>
          <h2 className="font-display font-bold text-2xl text-[#1F2A37] mt-1">
            End-to-End Connected Vehicle Topology
          </h2>
          <p className="text-xs font-mono text-[#5B6675] mt-1">
            4-tier architecture illustrating signal path from physical/virtual sensors through to the interactive digital twin.
          </p>
        </div>

        {/* Architectural Block Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2">
            <span className="text-[10px] text-[#2E8B8B] font-bold uppercase block">TIER 1 // SENSORS</span>
            <div className="font-bold text-[#1F2A37] text-sm">Vehicle In-Situ Hardware</div>
            <ul className="text-[#5B6675] space-y-1 text-[11px] list-disc list-inside">
              <li>TPMS 433 MHz RF Wheel Transducers</li>
              <li>OBD-II CAN Bus (ISO-11898)</li>
              <li>High-Voltage Battery BMS</li>
              <li>Multi-GNSS Receiver</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2">
            <span className="text-[10px] text-[#2FA36B] font-bold uppercase block">TIER 2 // BRIDGE</span>
            <div className="font-bold text-[#1F2A37] text-sm">Microcontroller Gateway</div>
            <ul className="text-[#5B6675] space-y-1 text-[11px] list-disc list-inside">
              <li>ESP32 / Arduino CAN Transceiver</li>
              <li>Secure MQTT / TLS Telemetry Link</li>
              <li>Deterministic Fallback Simulator</li>
              <li>Actuator Lock Relays</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2">
            <span className="text-[10px] text-[#B98121] font-bold uppercase block">TIER 3 // BROKER</span>
            <div className="font-bold text-[#1F2A37] text-sm">Cloud Telemetry Service</div>
            <ul className="text-[#5B6675] space-y-1 text-[11px] list-disc list-inside">
              <li>Time-Series Telemetry Store</li>
              <li>DTC Diagnostic Rule Engine</li>
              <li>Command Audit Ledger</li>
              <li>MobileNet-V3 Vision Pipeline</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2">
            <span className="text-[10px] text-[#2E8B8B] font-bold uppercase block">TIER 4 // COCKPIT</span>
            <div className="font-bold text-[#1F2A37] text-sm">Next.js 16 Web Dashboard</div>
            <ul className="text-[#5B6675] space-y-1 text-[11px] list-disc list-inside">
              <li>Three.js WebGL Digital Twin</li>
              <li>Tailwind CSS v4 Design System</li>
              <li>Framer Motion &amp; GSAP Counters</li>
              <li>Client-Side PDF/CSV Exporter</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Honest Transparency: Demo Simulator vs Physical Hardware */}
      <div className="nebula-card p-6 sm:p-8 space-y-4 border border-[#FDE68A] bg-[#FFFBEB]/40">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 text-[#B98121]" />
          <h2 className="font-display font-bold text-xl text-[#1F2A37]">
            Hardware Integration &amp; Simulation Disclosure
          </h2>
        </div>

        <p className="text-xs font-mono text-[#5B6675] leading-relaxed">
          In strict accordance with academic integrity guidelines, this deployed application operates using a <strong>deterministic seeded telemetry engine</strong>. No live mechanical vehicle is physically connected during web browser execution, eliminating presentation failure risks caused by dead cellular networks or offline vehicles during viva examination.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] space-y-1 shadow-xs">
            <span className="text-[#2FA36B] font-bold block">✓ Implemented In This Build</span>
            <span className="text-[#5B6675] text-[11px]">
              Complete software architecture, digital twin hotspots, deterministic TPMS simulation, OBD-II DTC scanner, camera visual inspection, remote control broker with audit ledger, and PDF exporter.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] space-y-1 shadow-xs">
            <span className="text-[#B98121] font-bold block">○ Physical Boundary Disclosure</span>
            <span className="text-[#5B6675] text-[11px]">
              Actual direct physical CAN-bus connection and door solenoid actuation in real vehicles requires an approved OBD-II hardware bridge (e.g. STN1110 / ESP32) with dedicated physical wiring safeguards.
            </span>
          </div>
        </div>
      </div>

      {/* Technology Stack Details */}
      <div className="nebula-card p-6 sm:p-8 space-y-4">
        <h2 className="font-display font-bold text-xl text-[#1F2A37]">
          Implemented Software Tooling Stack
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[#5B6675] text-[10px] block font-bold">FRAMEWORK</span>
            <span className="font-bold text-[#1F2A37]">Next.js 16 (App Router)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[#5B6675] text-[10px] block font-bold">UI LIBRARY</span>
            <span className="font-bold text-[#1F2A37]">React 19 &amp; TypeScript 5</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[#5B6675] text-[10px] block font-bold">STYLING</span>
            <span className="font-bold text-[#2E8B8B]">Tailwind CSS v4</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[#5B6675] text-[10px] block font-bold">ICONOGRAPHY</span>
            <span className="font-bold text-[#2FA36B]">Pure Inline Lucide SVGs</span>
          </div>
        </div>
      </div>

      {/* Return to Dashboard CTA */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
        >
          <span>RETURN TO DASHBOARD COCKPIT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
