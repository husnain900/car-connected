"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Camera,
  MapPin,
  Sliders,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import Vehicle3DViewer from "@/components/Vehicle3DViewer";

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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <Link href="/vehicles" className="hover:text-[#D6F45A]">Vehicles</Link>
          <span>/</span>
          <span className="text-[#F4F7FB]">{activeVehicle.name}</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              {activeVehicle.name} {"//"} Digital Twin
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              VIN: {activeVehicle.vin} • License Plate: {activeVehicle.licensePlate} • Year: {activeVehicle.year}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D6F45A]/15 text-[#D6F45A] border border-[#D6F45A]/30">
              SIMULATED PROTOTYPE
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Interactive 3D Digital Twin Showroom */}
      <Vehicle3DViewer vehicle={activeVehicle} />

      {/* Technical Specifications Grid */}
      <div className="nebula-card p-6">
        <h2 className="font-display font-bold text-lg text-[#F4F7FB] mb-4">
          Powertrain & Hardware Architecture Specifications
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[10px] text-[#8794A6] block">POWERTRAIN</span>
            <span className="font-bold text-[#F4F7FB]">Dual-Permanent Magnet</span>
            <span className="text-[10px] text-[#8794A6] block mt-0.5">Front/Rear Axle Split</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[10px] text-[#8794A6] block">VOLTAGE ARCHITECTURE</span>
            <span className="font-bold text-[#D6F45A]">800V High-Power</span>
            <span className="text-[10px] text-[#8794A6] block mt-0.5">Silicon-Carbide Inverter</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[10px] text-[#8794A6] block">TELEMETRY BUS</span>
            <span className="font-bold text-[#43D9A3]">ISO-11898 CAN 2.0B</span>
            <span className="text-[10px] text-[#8794A6] block mt-0.5">500 kbps Differential</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B2636] border border-white/8">
            <span className="text-[10px] text-[#8794A6] block">SAFETY INTEGRITY</span>
            <span className="font-bold text-[#F4F7FB]">ISO 26262 ASIL-D</span>
            <span className="text-[10px] text-[#8794A6] block mt-0.5">Dual-Core Lockstep ECU</span>
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
              className="nebula-card p-5 hover:border-[#D6F45A]/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#1B2636] border border-white/10 flex items-center justify-center text-[#D6F45A] mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#F4F7FB] group-hover:text-[#D6F45A] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-[#8794A6] mt-1.5 leading-relaxed">{m.desc}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs font-mono text-[#D6F45A] font-bold mt-4">
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
