"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Activity,
  Camera,
  MapPin,
  Sliders,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

const Vehicle3DViewer = dynamic(() => import("@/components/Vehicle3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-[#D8E0E7] bg-gradient-to-b from-[#FFFFFF] via-[#F6F8FA] to-[#EEF2F5] flex flex-col items-center justify-center p-6 space-y-3 shadow-[0_5px_24px_rgba(31,42,55,0.055)] select-none">
      <div className="w-12 h-12 rounded-2xl bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
        <Sparkles className="w-6 h-6 animate-spin" />
      </div>
      <div className="text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E8B8B] font-bold block">
          3D DIGITAL TWIN // INITIALIZING
        </span>
        <span className="text-xs font-mono text-[#5B6675] mt-1 block">
          Loading vehicle geometry & studio reflections...
        </span>
      </div>
    </div>
  ),
});

export default function VehicleDetailPage() {
  const { activeVehicle } = useSimulationStore();

  const submodules = [
    {
      title: "Diagnostics & TPMS Mesh",
      desc: "4-corner wireless tyre pressure monitoring and active OBD-II DTC scanner.",
      icon: Activity,
      href: `/vehicle/${activeVehicle.id}/diagnostics`,
    },
    {
      title: "AI Visual Camera Inspection",
      desc: "Webcam reticle and neural defect classification for body panels and tyre tread.",
      icon: Camera,
      href: `/vehicle/${activeVehicle.id}/inspection`,
    },
    {
      title: "Tactical GPS & Trip Replay",
      desc: "Vector route replay with telemetry waypoints, velocity, and energy consumption.",
      icon: MapPin,
      href: `/vehicle/${activeVehicle.id}/location`,
    },
    {
      title: "Remote Command Actuators",
      desc: "Perimeter door locks, valet speed governor, and dual-zone climate pre-conditioning.",
      icon: Sliders,
      href: `/vehicle/${activeVehicle.id}/controls`,
    },
    {
      title: "Predictive Maintenance Log",
      desc: "Mileage-based scheduled service intervals, brake pad life, and workshop history.",
      icon: Wrench,
      href: `/vehicle/${activeVehicle.id}/maintenance`,
    },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/vehicles" className="hover:text-[#2E8B8B] transition-colors">Vehicles</Link>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              {activeVehicle.name} {"//"} Digital Twin
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              VIN: <strong className="text-[#1F2A37]">{activeVehicle.vin}</strong> • License Plate: <strong className="text-[#2E8B8B]">{activeVehicle.licensePlate}</strong> • Model Year: 2026
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E7F3F1] text-[#2E8B8B] border border-[#86B6B2]/40">
              SIMULATED PROTOTYPE
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Interactive 3D Digital Twin Showroom */}
      <Vehicle3DViewer vehicle={activeVehicle} />

      {/* Technical Specifications Grid */}
      <div className="nebula-card p-6">
        <h2 className="font-display font-bold text-lg text-[#1F2A37] mb-4">
          Powertrain &amp; Hardware Architecture Specifications
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[10px] text-[#5B6675] block uppercase font-bold">POWERTRAIN</span>
            <span className="font-bold text-[#1F2A37]">Dual-Permanent Magnet</span>
            <span className="text-[10px] text-[#5B6675] block mt-0.5">Front/Rear Axle Split</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[10px] text-[#5B6675] block uppercase font-bold">VOLTAGE ARCHITECTURE</span>
            <span className="font-bold text-[#2E8B8B]">800V High-Power</span>
            <span className="text-[10px] text-[#5B6675] block mt-0.5">Silicon-Carbide Inverter</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[10px] text-[#5B6675] block uppercase font-bold">TELEMETRY BUS</span>
            <span className="font-bold text-[#2FA36B]">ISO-11898 CAN 2.0B</span>
            <span className="text-[10px] text-[#5B6675] block mt-0.5">500 kbps Differential</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7]">
            <span className="text-[10px] text-[#5B6675] block uppercase font-bold">SAFETY INTEGRITY</span>
            <span className="font-bold text-[#1F2A37]">ISO 26262 ASIL-D</span>
            <span className="text-[10px] text-[#5B6675] block mt-0.5">Dual-Core Lockstep ECU</span>
          </div>
        </div>
      </div>

      {/* Sub-Module Exploration Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {submodules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.title}
              href={m.href}
              className="nebula-card p-5 hover:border-[#86B6B2] transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B] mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#1F2A37] group-hover:text-[#2E8B8B] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-[#5B6675] mt-1.5 leading-relaxed">{m.desc}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs font-mono text-[#2E8B8B] font-bold mt-4">
                <span>Open View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
