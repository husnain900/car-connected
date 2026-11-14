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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles & Fleet Management</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37]">
              Connected Fleet & Vehicle Twins
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-0.5">
              Select active vehicle twin, manage fleet profiles, and configure simulated telemetry or physical OBD-II / MQTT hardware bridges.
            </p>
          </div>

          <button
            onClick={() => setPairingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-[#FFFFFF] font-mono font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>PAIR NEW VEHICLE / BRIDGE</span>
          </button>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
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
                  ? "border-[#2E8B8B] shadow-[0_8px_24px_rgba(46,139,139,0.12)]"
                  : "border-[#D8E0E7] opacity-90 hover:opacity-100 hover:border-[#2E8B8B]"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                      {v.type.replace("_", " ")}
                    </span>
                    <h2 className="font-display font-bold text-2xl text-[#1F2A37] mt-0.5">
                      {v.name}
                    </h2>
                    <p className="text-xs font-mono text-[#5B6675]">{v.model}</p>
                  </div>

                  {isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E7F3F1] text-[#2E8B8B] border border-[#86B6B2]/40 flex items-center space-x-1.5 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACTIVE TWIN</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveVehicle(v.id)}
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EEF2F5] hover:bg-[#2E8B8B] hover:text-[#FFFFFF] text-[#1F2A37] border border-[#D8E0E7] transition-colors cursor-pointer"
                    >
                      SWITCH ACTIVE
                    </button>
                  )}
                </div>

                {/* Automotive Visual Render */}
                <div className="relative w-full h-44 my-4 rounded-xl overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-center p-3">
                  <Image
                    src={
                      v.id === "veh-hyperion-01"
                        ? "/assets/images/hyperion-gt-hero.jpg"
                        : "/assets/images/hyperion-gt-angle.jpg"
                    }
                    alt={v.name}
                    fill
                    className="object-contain filter contrast-105"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D8E0E7] text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#5B6675] block uppercase">Est. Range</span>
                    <span className="font-bold text-[#1F2A37] font-mono-numbers">{v.estRangeKm} KM</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#5B6675] block uppercase">Battery SoC</span>
                    <span className="font-bold text-[#2FA36B] font-mono-numbers">{v.batteryLevelPct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#5B6675] block uppercase">Plate</span>
                    <span className="font-bold text-[#2E8B8B]">{v.licensePlate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2">
                <span className="text-[10px] font-mono text-[#5B6675] truncate max-w-[200px]">
                  VIN: {v.vin}
                </span>

                <Link
                  href="/dashboard"
                  onClick={() => setActiveVehicle(v.id)}
                  className="text-xs font-mono font-bold text-[#2E8B8B] hover:underline flex items-center space-x-1"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F2A37]/50 backdrop-blur-xs select-none">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#D8E0E7] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8E0E7]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1F2A37]">
                    Vehicle Pairing & Bridge Wizard
                  </h3>
                  <span className="text-[10px] font-mono text-[#5B6675] uppercase">
                    NEBULA VEHICLE BUS ADAPTER v4.2
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPairingModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#D8E0E7] flex items-center justify-center text-[#5B6675] hover:text-[#1F2A37] hover:bg-[#EEF2F5] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center space-x-2 bg-[#EEF2F5] p-1.5 rounded-xl border border-[#D8E0E7] text-xs font-mono">
              <button
                onClick={() => setPairingTab("SIMULATOR")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  pairingTab === "SIMULATOR"
                    ? "bg-[#2E8B8B] text-white shadow-xs"
                    : "text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                SIMULATOR FLEET (DEMO)
              </button>
              <button
                onClick={() => setPairingTab("HARDWARE")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  pairingTab === "HARDWARE"
                    ? "bg-[#2E8B8B] text-white shadow-xs"
                    : "text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                OBD-II / CAN HARDWARE
              </button>
            </div>

            {pairingTab === "SIMULATOR" ? (
              <div className="space-y-4 text-xs font-mono text-[#5B6675]">
                <p>
                  Deploy a virtual digital twin using deterministic seeded telemetry for university defense and presentations.
                </p>

                <div className="p-4 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] space-y-2">
                  <div className="flex justify-between">
                    <span>Virtual Telemetry Model:</span>
                    <span className="text-[#1F2A37] font-bold">Dual-Motor Hypercar 800V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sensor Sampling Rate:</span>
                    <span className="text-[#2E8B8B] font-bold">2,500 ms (Adjustable)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seed Configuration:</span>
                    <span className="text-[#2FA36B] font-bold">Zainab Amanat (M245008)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert("Virtual simulator vehicle is already active and paired to your session.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#2E8B8B] text-white font-bold text-xs hover:bg-[#236F70] transition-colors cursor-pointer shadow-xs"
                >
                  INITIALIZE SIMULATOR TWIN
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono text-[#5B6675]">
                <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#B98121] space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-[#B98121]" />
                    <span>Hardware Integration Boundary Notice:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Connecting to an actual vehicle requires an authenticated microcontroller bridge (e.g., ESP32 / Arduino CAN transceiver) paired via MQTT or WebSocket. Browsers cannot directly interface with CAN-bus hardware.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#1F2A37] block">
                    MQTT / REST BRIDGE ENDPOINT URL
                  </label>
                  <input
                    type="text"
                    defaultValue="wss://bridge.nebula-drive.internal/v1/telemetry"
                    className="w-full p-2.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] outline-none focus:border-[#2E8B8B]"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Bridge configuration saved. In live mode, telemetry packets will route via this endpoint.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] text-[#1F2A37] font-bold text-xs hover:bg-[#D8E0E7] transition-colors cursor-pointer"
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
