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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <Link href="/vehicles" className="hover:text-[#79C7FF]">Vehicles</Link>
          <span>/</span>
          <span className="text-[#F5F8FC]">{activeVehicle.name}</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              {activeVehicle.name} {"//"} Digital Twin
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              VIN: {activeVehicle.vin} • License Plate: {activeVehicle.licensePlate} • Year: {activeVehicle.year}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#79C7FF]/15 text-[#79C7FF] border border-[#79C7FF]/30">
              SIMULATED PROTOTYPE
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Interactive 3D Digital Twin Showroom */}
      <Vehicle3DViewer vehicle={activeVehicle} />

      {/* Technical Specifications Grid */}
      <div className="nebula-card p-6">
        <h2 className="font-display font-bold text-lg text-[#F5F8FC] mb-4">
          Powertrain & Hardware Architecture Specifications
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#1E314B] border border-[#293C51]">
            <span className="text-[10px] text-[#A5B5C8] block uppercase">POWERTRAIN</span>
            <span className="font-bold text-[#F5F8FC]">Dual-Permanent Magnet</span>
            <span className="text-[10px] text-[#A5B5C8] block mt-0.5">Front/Rear Axle Split</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E314B] border border-[#293C51]">
            <span className="text-[10px] text-[#A5B5C8] block uppercase">VOLTAGE ARCHITECTURE</span>
            <span className="font-bold text-[#79C7FF]">800V High-Power</span>
            <span className="text-[10px] text-[#A5B5C8] block mt-0.5">Silicon-Carbide Inverter</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E314B] border border-[#293C51]">
            <span className="text-[10px] text-[#A5B5C8] block uppercase">TELEMETRY BUS</span>
            <span className="font-bold text-[#35C99A]">ISO-11898 CAN 2.0B</span>
            <span className="text-[10px] text-[#A5B5C8] block mt-0.5">500 kbps Differential</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E314B] border border-[#293C51]">
            <span className="text-[10px] text-[#A5B5C8] block uppercase">SAFETY INTEGRITY</span>
            <span className="font-bold text-[#F5F8FC]">ISO 26262 ASIL-D</span>
            <span className="text-[10px] text-[#A5B5C8] block mt-0.5">Dual-Core Lockstep ECU</span>
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
              className="nebula-card p-5 hover:border-[#79C7FF]/50 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#1E314B] border border-[#293C51] flex items-center justify-center text-[#79C7FF] mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#F5F8FC] group-hover:text-[#79C7FF] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-[#A5B5C8] mt-1.5 leading-relaxed">{m.desc}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs font-mono text-[#79C7FF] font-bold mt-4">
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
