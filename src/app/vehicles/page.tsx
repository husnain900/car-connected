"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Car,
  Plus,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function VehiclesPage() {
  const { vehicles, activeVehicleId, setActiveVehicle } = useSimulationStore();

  const [pairingModalOpen, setPairingModalOpen] = useState(false);
  const [pairingTab, setPairingTab] = useState<"SIMULATOR" | "HARDWARE">("SIMULATOR");

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles & Fleet Management</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Connected Fleet & Vehicle Twins
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Select active vehicle twin, manage fleet profiles, and configure simulated telemetry or physical OBD-II / MQTT hardware bridges.
            </p>
          </div>

          <button
            onClick={() => setPairingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>PAIR NEW VEHICLE / BRIDGE</span>
          </button>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Vehicle Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((v) => {
          const isActive = v.id === activeVehicleId;
          return (
            <div
              key={v.id}
              className={`nebula-card p-6 flex flex-col justify-between transition-all ${
                isActive
                  ? "border-[#D6F45A]/50 shadow-[0_0_25px_rgba(214,244,90,0.08)]"
                  : "border-white/10 opacity-80 hover:opacity-100"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
                      {v.type.replace("_", " ")}
                    </span>
                    <h2 className="font-display font-black text-2xl text-[#F4F7FB] mt-0.5">
                      {v.name}
                    </h2>
                    <p className="text-xs font-mono text-[#8794A6]">{v.model}</p>
                  </div>

                  {isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D6F45A] text-[#0B1018] flex items-center space-x-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACTIVE TWIN</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveVehicle(v.id)}
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 hover:bg-[#D6F45A] hover:text-[#0B1018] text-[#F4F7FB] transition-colors cursor-pointer"
                    >
                      SWITCH ACTIVE
                    </button>
                  )}
                </div>

                {/* Automotive Visual Render */}
                <div className="relative w-full h-44 my-4 rounded-xl overflow-hidden bg-[#0B1018] border border-white/5 flex items-center justify-center p-3">
                  <Image
                    src={
                      v.id === "veh-hyperion-01"
                        ? "/assets/images/hyperion-gt-hero.jpg"
                        : "/assets/images/hyperion-gt-angle.jpg"
                    }
                    alt={v.name}
                    fill
                    className="object-contain filter contrast-110"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/8 text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#8794A6] block uppercase">Est. Range</span>
                    <span className="font-bold text-[#F4F7FB] font-mono-numbers">{v.estRangeKm} KM</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8794A6] block uppercase">Battery SoC</span>
                    <span className="font-bold text-[#43D9A3] font-mono-numbers">{v.batteryLevelPct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8794A6] block uppercase">Plate</span>
                    <span className="font-bold text-[#D6F45A]">{v.licensePlate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2">
                <span className="text-[10px] font-mono text-[#8794A6] truncate max-w-[200px]">
                  VIN: {v.vin}
                </span>

                <Link
                  href="/dashboard"
                  onClick={() => setActiveVehicle(v.id)}
                  className="text-xs font-mono font-bold text-[#D6F45A] hover:underline flex items-center space-x-1"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pairing Wizard Modal */}
      {pairingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#151D28] border border-white/20 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#D6F45A]/15 border border-[#D6F45A]/30 flex items-center justify-center text-[#D6F45A]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
                    Vehicle Pairing & Bridge Wizard
                  </h3>
                  <span className="text-[10px] font-mono text-[#8794A6] uppercase">
                    NEBULA VEHICLE BUS ADAPTER v4.2
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPairingModalOpen(false)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8794A6] hover:text-[#F4F7FB]"
              >
                ✕
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center space-x-2 bg-[#0B1018] p-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setPairingTab("SIMULATOR")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                  pairingTab === "SIMULATOR"
                    ? "bg-[#D6F45A] text-[#0B1018]"
                    : "text-[#8794A6] hover:text-[#F4F7FB]"
                }`}
              >
                SIMULATOR FLEET (DEMO)
              </button>
              <button
                onClick={() => setPairingTab("HARDWARE")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                  pairingTab === "HARDWARE"
                    ? "bg-[#D6F45A] text-[#0B1018]"
                    : "text-[#8794A6] hover:text-[#F4F7FB]"
                }`}
              >
                OBD-II / CAN HARDWARE
              </button>
            </div>

            {pairingTab === "SIMULATOR" ? (
              <div className="space-y-4 text-xs font-mono text-[#8794A6]">
                <p>
                  Deploy a virtual digital twin using deterministic seeded telemetry for university defense and presentations.
                </p>

                <div className="p-4 rounded-xl bg-[#1B2636] border border-white/8 space-y-2">
                  <div className="flex justify-between">
                    <span>Virtual Telemetry Model:</span>
                    <span className="text-[#F4F7FB]">Dual-Motor Hypercar 800V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sensor Sampling Rate:</span>
                    <span className="text-[#D6F45A]">2,500 ms (Adjustable)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seed Configuration:</span>
                    <span className="text-[#43D9A3]">Zainab Amanat (M245008)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert("Virtual simulator vehicle is already active and paired to your session.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#D6F45A] text-[#0B1018] font-bold text-xs hover:bg-[#c2df47] transition-colors"
                >
                  INITIALIZE SIMULATOR TWIN
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono text-[#8794A6]">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>Hardware Integration Boundary Notice:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Connecting to an actual vehicle requires an authenticated microcontroller bridge (e.g., ESP32 / Arduino CAN transceiver) paired via MQTT or WebSocket. Browsers cannot directly interface with CAN-bus hardware.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#F4F7FB] block">
                    MQTT / REST BRIDGE ENDPOINT URL
                  </label>
                  <input
                    type="text"
                    defaultValue="wss://bridge.nebula-drive.internal/v1/telemetry"
                    className="w-full p-2.5 rounded-xl bg-[#0B1018] border border-white/10 text-xs font-mono text-[#F4F7FB] outline-none focus:border-[#D6F45A]"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Bridge configuration saved. In live mode, telemetry packets will route via this endpoint.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#1B2636] border border-white/20 text-[#F4F7FB] font-bold text-xs hover:bg-[#253347] transition-colors"
                >
                  SAVE BRIDGE CONFIGURATION
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
