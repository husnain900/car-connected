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
    <div className="flex flex-col min-h-screen bg-[#091321] text-[#F5F8FC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#293C51]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(121,199,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(121,199,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#79C7FF]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
            {/* Glowing Hero Automotive Crest Emblem */}
            <div className="mb-1">
              <NebulaLogo size="xl" showText={false} />
            </div>

            {/* Attribution & Platform Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#152437] border border-[#293C51] text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#79C7FF] animate-pulse" />
              <span className="text-[#A5B5C8]">FINAL-YEAR PROJECT //</span>
              <span className="text-[#F5F8FC] font-bold">ZAINAB AMANAT</span>
              <span className="text-[#79C7FF] font-bold">M245008</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[#F5F8FC] leading-none">
              NEBULA DRIVE
              <span className="block text-2xl sm:text-3xl font-semibold text-[#A5B5C8] mt-2 font-sans tracking-normal">
                Intelligence in Motion
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#A5B5C8] leading-relaxed max-w-2xl font-mono">
              Enterprise-grade connected car telemetry, predictive TPMS diagnostics, AI visual inspection, and remote command cockpit for next-generation vehicle fleets.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-display font-extrabold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(121,199,255,0.25)] flex items-center space-x-2 cursor-pointer"
              >
                <span>ENTER COMMAND COCKPIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="px-5 py-3.5 rounded-xl bg-[#152437] hover:bg-[#1E314B] border border-[#293C51] hover:border-[#79C7FF]/40 text-[#F5F8FC] font-mono text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#A5B5C8]" />
                <span>ARCHITECTURE & CREDITS</span>
              </Link>
            </div>

            {/* Simulation Disclosure Notice */}
            <div className="pt-4 flex items-center space-x-2 text-[10px] font-mono text-[#A5B5C8] bg-[#152437]/80 border border-[#293C51] px-4 py-2 rounded-xl">
              <AlertTriangle className="w-3.5 h-3.5 text-[#F2B65B] flex-shrink-0" />
              <span>
                Demonstration platform powered by a deterministic telemetry simulator. No real vehicle hardware connection is fabricated.
              </span>
            </div>
          </div>

          {/* Cinematic Automotive Visual Preview */}
          <div className="relative mt-8 sm:mt-12 w-full max-w-4xl mx-auto h-64 sm:h-96 rounded-2xl overflow-hidden nebula-card border border-[#293C51] shadow-2xl flex items-center justify-center p-3 sm:p-6">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono text-[#A5B5C8] bg-[#091321]/90 px-2.5 py-1 rounded-lg border border-[#293C51]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35C99A]" />
              <span>DIGITAL TWIN // HYPERION GT (SIMULATED PROTOTYPE)</span>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/assets/images/hyperion-gt-hero.jpg"
                alt="Nebula Hyperion GT Luxury Electric Hypercar"
                fill
                className="object-contain filter contrast-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-[#79C7FF]/15 border border-[#79C7FF]/30 text-[#79C7FF] hover:bg-[#79C7FF]/25 text-[10px] font-mono font-bold flex items-center space-x-1.5 transition-colors"
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
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#79C7FF] font-bold">
            ARCHITECTURE & CAPABILITIES
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F5F8FC] mt-1">
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
                className="nebula-card p-6 flex flex-col justify-between group hover:border-[#79C7FF]/50 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1E314B] border border-[#293C51] flex items-center justify-center text-[#79C7FF] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#1E314B] border border-[#293C51] text-[#A5B5C8]">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F5F8FC] group-hover:text-[#79C7FF] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-mono text-[#A5B5C8] mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="flex items-center space-x-1 text-xs font-mono text-[#79C7FF] font-semibold mt-6 group-hover:translate-x-1 transition-transform">
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
