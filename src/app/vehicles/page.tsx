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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles & Fleet Management</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Connected Fleet & Vehicle Twins
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Select active vehicle twin, manage fleet profiles, and configure simulated telemetry or physical OBD-II / MQTT hardware bridges.
            </p>
          </div>

          <button
            onClick={() => setPairingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>PAIR NEW VEHICLE / BRIDGE</span>
          </button>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
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
                  ? "border-[#79C7FF]/60 shadow-[0_0_25px_rgba(121,199,255,0.12)]"
                  : "border-[#293C51] opacity-85 hover:opacity-100 hover:border-[#79C7FF]/40"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
                      {v.type.replace("_", " ")}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl text-[#F5F8FC] mt-0.5">
                      {v.name}
                    </h2>
                    <p className="text-xs font-mono text-[#A5B5C8]">{v.model}</p>
                  </div>

                  {isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#79C7FF] text-[#091321] flex items-center space-x-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACTIVE TWIN</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveVehicle(v.id)}
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1E314B] hover:bg-[#79C7FF] hover:text-[#091321] text-[#F5F8FC] border border-[#293C51] transition-colors cursor-pointer"
                    >
                      SWITCH ACTIVE
                    </button>
                  )}
                </div>

                {/* Automotive Visual Render */}
                <div className="relative w-full h-44 my-4 rounded-xl overflow-hidden bg-[#091321] border border-[#293C51] flex items-center justify-center p-3">
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

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#293C51] text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#A5B5C8] block uppercase">Est. Range</span>
                    <span className="font-bold text-[#F5F8FC] font-mono-numbers">{v.estRangeKm} KM</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#A5B5C8] block uppercase">Battery SoC</span>
                    <span className="font-bold text-[#35C99A] font-mono-numbers">{v.batteryLevelPct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#A5B5C8] block uppercase">Plate</span>
                    <span className="font-bold text-[#79C7FF]">{v.licensePlate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2">
                <span className="text-[10px] font-mono text-[#A5B5C8] truncate max-w-[200px]">
                  VIN: {v.vin}
                </span>

                <Link
                  href="/dashboard"
                  onClick={() => setActiveVehicle(v.id)}
                  className="text-xs font-mono font-bold text-[#79C7FF] hover:underline flex items-center space-x-1"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#091321]/85 backdrop-blur-md select-none">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-2xl bg-[#152437] border border-[#293C51] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#293C51]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#79C7FF]/15 border border-[#79C7FF]/30 flex items-center justify-center text-[#79C7FF]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F5F8FC]">
                    Vehicle Pairing & Bridge Wizard
                  </h3>
                  <span className="text-[10px] font-mono text-[#A5B5C8] uppercase">
                    NEBULA VEHICLE BUS ADAPTER v4.2
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPairingModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#293C51] flex items-center justify-center text-[#A5B5C8] hover:text-[#F5F8FC] hover:bg-[#1E314B] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center space-x-2 bg-[#091321] p-1.5 rounded-xl border border-[#293C51] text-xs font-mono">
              <button
                onClick={() => setPairingTab("SIMULATOR")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                  pairingTab === "SIMULATOR"
                    ? "bg-[#79C7FF] text-[#091321]"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
              >
                SIMULATOR FLEET (DEMO)
              </button>
              <button
                onClick={() => setPairingTab("HARDWARE")}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                  pairingTab === "HARDWARE"
                    ? "bg-[#79C7FF] text-[#091321]"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
              >
                OBD-II / CAN HARDWARE
              </button>
            </div>

            {pairingTab === "SIMULATOR" ? (
              <div className="space-y-4 text-xs font-mono text-[#A5B5C8]">
                <p>
                  Deploy a virtual digital twin using deterministic seeded telemetry for university defense and presentations.
                </p>

                <div className="p-4 rounded-xl bg-[#1E314B] border border-[#293C51] space-y-2">
                  <div className="flex justify-between">
                    <span>Virtual Telemetry Model:</span>
                    <span className="text-[#F5F8FC] font-bold">Dual-Motor Hypercar 800V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sensor Sampling Rate:</span>
                    <span className="text-[#79C7FF] font-bold">2,500 ms (Adjustable)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seed Configuration:</span>
                    <span className="text-[#35C99A] font-bold">Zainab Amanat (M245008)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert("Virtual simulator vehicle is already active and paired to your session.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#79C7FF] text-[#091321] font-bold text-xs hover:bg-[#68b5ea] transition-colors cursor-pointer"
                >
                  INITIALIZE SIMULATOR TWIN
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono text-[#A5B5C8]">
                <div className="p-3.5 rounded-xl bg-[#F2B65B]/10 border border-[#F2B65B]/30 text-[#F2B65B] space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-[#F2B65B]" />
                    <span>Hardware Integration Boundary Notice:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Connecting to an actual vehicle requires an authenticated microcontroller bridge (e.g., ESP32 / Arduino CAN transceiver) paired via MQTT or WebSocket. Browsers cannot directly interface with CAN-bus hardware.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#F5F8FC] block">
                    MQTT / REST BRIDGE ENDPOINT URL
                  </label>
                  <input
                    type="text"
                    defaultValue="wss://bridge.nebula-drive.internal/v1/telemetry"
                    className="w-full p-2.5 rounded-xl bg-[#091321] border border-[#293C51] text-xs font-mono text-[#F5F8FC] outline-none focus:border-[#79C7FF]"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Bridge configuration saved. In live mode, telemetry packets will route via this endpoint.");
                    setPairingModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#1E314B] border border-[#293C51] text-[#F5F8FC] font-bold text-xs hover:bg-[#152437] hover:border-[#79C7FF]/40 transition-colors cursor-pointer"
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
