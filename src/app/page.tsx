"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  Cpu,
  Camera,
  MapPin,
  Sliders,
  BarChart3,
  ArrowRight,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import NebulaLogo from "@/components/NebulaLogo";

export default function LandingPage() {
  const { activeVehicle } = useSimulationStore();

  const features = [
    {
      title: "Real-Time Telemetry & TPMS",
      desc: "Deterministic 4-corner tyre pressure & thermal mesh monitoring with dynamic drive profiles.",
      icon: Activity,
      href: `/vehicle/${activeVehicle.id}/diagnostics`,
      badge: "LIVE MESH",
    },
    {
      title: "AI Camera Inspection",
      desc: "Browser camera & upload visual assessment for exterior scratches, dents, and tyre tread condition.",
      icon: Camera,
      href: `/vehicle/${activeVehicle.id}/inspection`,
      badge: "VISION AI",
    },
    {
      title: "Tactical GPS & Trip Playback",
      desc: "Vector-rendered route replay with timestamped waypoints, elevation, and energy analytics.",
      icon: MapPin,
      href: `/vehicle/${activeVehicle.id}/location`,
      badge: "MAP HUD",
    },
    {
      title: "Remote Commands & Audit Log",
      desc: "Perimeter lock, valet governor, and climate control with simulated latency and security audit logging.",
      icon: Sliders,
      href: `/vehicle/${activeVehicle.id}/controls`,
      badge: "SECURE",
    },
    {
      title: "OBD-II DTC Diagnostics",
      desc: "Automated controller scanning across 48 virtual ECUs with freeze-frame fault analysis.",
      icon: Cpu,
      href: `/vehicle/${activeVehicle.id}/diagnostics`,
      badge: "ISO-14229",
    },
    {
      title: "Fleet Analytics & PDF Reports",
      desc: "Historical trend analysis, energy efficiency curves, and one-click downloadable PDF reports.",
      icon: BarChart3,
      href: "/analytics",
      badge: "EXPORT",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] text-[#1F2A37]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#D8E0E7]">
        <div className="absolute inset-0 bg-[radial-gradient(#D8E0E7_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2E8B8B]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
            {/* Glowing Hero Automotive Crest Emblem */}
            <div className="mb-1">
              <NebulaLogo size="xl" showText={false} />
            </div>

            {/* Attribution & Platform Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D8E0E7] text-xs font-mono shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2E8B8B] animate-pulse" />
              <span className="text-[#5B6675]">FINAL-YEAR PROJECT //</span>
              <span className="text-[#1F2A37] font-bold">ZAINAB AMANAT</span>
              <span className="text-[#2E8B8B] font-bold">M245008</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-[#1F2A37] leading-none">
              NEBULA DRIVE
              <span className="block text-2xl sm:text-3xl font-semibold text-[#5B6675] mt-2 font-sans tracking-normal">
                Intelligence in Motion
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#5B6675] leading-relaxed max-w-2xl font-mono">
              Enterprise-grade connected car telemetry, predictive TPMS diagnostics, AI visual inspection, and remote command cockpit for next-generation vehicle fleets.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-[#FFFFFF] font-display font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(46,139,139,0.25)] flex items-center space-x-2 cursor-pointer"
              >
                <span>ENTER COMMAND COCKPIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="px-5 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEF2F5] border border-[#D8E0E7] hover:border-[#2E8B8B] text-[#1F2A37] font-mono text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer shadow-xs"
              >
                <Info className="w-4 h-4 text-[#5B6675]" />
                <span>ARCHITECTURE & CREDITS</span>
              </Link>
            </div>

            {/* Simulation Disclosure Notice */}
            <div className="pt-4 flex items-center space-x-2 text-[10px] font-mono text-[#5B6675] bg-[#FFFBEB] border border-[#FDE68A] px-4 py-2 rounded-xl text-left sm:text-center shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B98121] flex-shrink-0" />
              <span>
                Demonstration platform powered by a deterministic telemetry simulator. No real vehicle hardware connection is fabricated.
              </span>
            </div>
          </div>

          {/* Cinematic Automotive Visual Preview */}
          <div className="relative mt-8 sm:mt-12 w-full max-w-4xl mx-auto h-64 sm:h-96 rounded-2xl overflow-hidden nebula-card border border-[#D8E0E7] shadow-xl flex items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#FFFFFF] to-[#EEF2F5]">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono text-[#5B6675] bg-[#FFFFFF]/90 px-2.5 py-1 rounded-lg border border-[#D8E0E7] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
              <span>DIGITAL TWIN // HYPERION GT (SIMULATED PROTOTYPE)</span>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/assets/images/hyperion-gt-hero.jpg"
                alt="Nebula Hyperion GT Luxury Electric Hypercar"
                fill
                className="object-contain filter contrast-105 drop-shadow-[0_15px_30px_rgba(31,42,55,0.25)]"
                priority
              />
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 text-[#2E8B8B] hover:bg-[#D5EAE7] text-[10px] font-mono font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>OPEN DIGITAL TWIN</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Matrix Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E8B8B] font-bold">
            ARCHITECTURE & CAPABILITIES
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] mt-1">
            Engineered for Comprehensive Fleet Oversight
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.title}
                href={feat.href}
                className="nebula-card p-6 flex flex-col justify-between group hover:border-[#2E8B8B] transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-center text-[#2E8B8B] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#EEF2F5] border border-[#D8E0E7] text-[#5B6675]">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1F2A37] group-hover:text-[#2E8B8B] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-mono text-[#5B6675] mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="flex items-center space-x-1 text-xs font-mono text-[#2E8B8B] font-semibold mt-6 group-hover:translate-x-1 transition-transform">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
