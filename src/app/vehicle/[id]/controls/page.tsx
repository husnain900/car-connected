"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Wind,
  History,
  AlertTriangle,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function ControlsPage() {
  const {
    activeVehicle,
    executeCommand,
    auditLogs,
  } = useSimulationStore();

  const [confirmModal, setConfirmModal] = useState<{
    action: "LOCK_VEHICLE" | "UNLOCK_VEHICLE" | "TOGGLE_VALET";
    title: string;
  } | null>(null);

  const [valetLimit, setValetLimit] = useState(activeVehicle.valetSpeedLimitKmH || 45);
  const [isProcessing, setIsProcessing] = useState(false);

  const requestAction = (action: "LOCK_VEHICLE" | "UNLOCK_VEHICLE" | "TOGGLE_VALET", title: string) => {
    setConfirmModal({ action, title });
  };

  const confirmAction = () => {
    if (!confirmModal) return;
    setIsProcessing(true);
    executeCommand(confirmModal.action);
    setTimeout(() => {
      setIsProcessing(false);
      setConfirmModal(null);
    }, 600);
  };

  const setClimateTemp = (temp: number) => {
    executeCommand("SET_CLIMATE", `Target thermostat set to ${temp.toFixed(1)}°C`);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Remote Command Hub</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Remote Operations & Command Broker
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Secure simulated actuators for vehicle perimeter locking, valet governor limits, climate pre-conditioning, and cryptographic audit tracking.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2A37]/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#FFFFFF] border border-[#D8E0E7] shadow-[0_20px_50px_rgba(31,42,55,0.15)] space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#B98121]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#1F2A37]">
                  Confirm Vehicle Command
                </h3>
                <span className="text-[10px] font-mono text-[#5B6675] uppercase font-semibold">
                  SIMULATED ACTUATOR BROKER
                </span>
              </div>
            </div>

            <p className="text-xs font-mono text-[#5B6675] leading-relaxed">
              Are you sure you want to execute <strong>{confirmModal.title}</strong> on{" "}
              <span className="text-[#1F2A37] font-bold">{activeVehicle.name}</span>? This command will be logged in the immutable audit ledger.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl bg-[#EEF2F5] hover:bg-[#E2E8F0] text-xs font-mono text-[#5B6675] hover:text-[#1F2A37] border border-[#D8E0E7] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <span>{isProcessing ? "DISPATCHING..." : "CONFIRM & DISPATCH"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operations Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
        {/* Module 1: Perimeter Locks */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
              PERIMETER ACCESS
            </span>
            <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-1">
              Door & Trunk Lock Actuator
            </h3>
            <p className="text-xs font-mono text-[#5B6675] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.isLocked ? "text-[#2FA36B]" : "text-[#B98121]"}>
                {activeVehicle.isLocked ? "SECURED (DOORS LOCKED)" : "UNLOCKED"}
              </strong>
            </p>
          </div>

          <div className="my-6">
            <button
              onClick={() =>
                requestAction(
                  activeVehicle.isLocked ? "UNLOCK_VEHICLE" : "LOCK_VEHICLE",
                  activeVehicle.isLocked ? "Unlock Doors" : "Lock Perimeter"
                )
              }
              className={`w-full py-3.5 rounded-xl border font-mono font-bold text-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-xs ${
                activeVehicle.isLocked
                  ? "bg-[#FFFFFF] border-[#D8E0E7] hover:border-[#2E8B8B] text-[#1F2A37] hover:bg-[#F6F8FA]"
                  : "bg-[#2E8B8B] text-white hover:bg-[#236F70] border-[#2E8B8B]"
              }`}
            >
              {activeVehicle.isLocked ? <Unlock className="w-4 h-4 text-[#2E8B8B]" /> : <Lock className="w-4 h-4" />}
              <span>{activeVehicle.isLocked ? "UNLOCK VEHICLE" : "LOCK VEHICLE"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#5B6675] pt-3 border-t border-[#D8E0E7]">
            Requires driver biometric or authenticated token before release.
          </div>
        </div>

        {/* Module 2: Valet Mode Speed Limiter */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
              SPEED GOVERNOR
            </span>
            <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-1">
              Valet Limiter Mode
            </h3>
            <p className="text-xs font-mono text-[#5B6675] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.valetActive ? "text-[#2FA36B]" : "text-[#5B6675]"}>
                {activeVehicle.valetActive ? "ACTIVE (GOVERNOR ARMED)" : "UNRESTRICTED"}
              </strong>
            </p>
          </div>

          <div className="my-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#5B6675]">Speed Ceiling:</span>
              <span className="font-bold text-[#2E8B8B] font-mono-numbers">{valetLimit} KM/H</span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={valetLimit}
              onChange={(e) => setValetLimit(Number(e.target.value))}
              className="w-full h-1.5 bg-[#EEF2F5] rounded-lg appearance-none cursor-pointer accent-[#2E8B8B]"
            />

            <button
              onClick={() => requestAction("TOGGLE_VALET", "Toggle Valet Governor")}
              className={`w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs ${
                activeVehicle.valetActive
                  ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#2FA36B]"
                  : "bg-[#FFFFFF] border-[#D8E0E7] hover:border-[#2E8B8B] text-[#1F2A37]"
              }`}
            >
              <Wind className="w-4 h-4" />
              <span>{activeVehicle.valetActive ? "DISABLE VALET LIMIT" : "ARM VALET GOVERNOR"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#5B6675] pt-3 border-t border-[#D8E0E7]">
            Restricts peak torque and locks infotainment settings.
          </div>
        </div>

        {/* Module 3: Climate Pre-Conditioning */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
              THERMAL PRE-CONDITIONING
            </span>
            <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-1">
              Dual-Zone Cabin Climate
            </h3>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-display font-bold text-2xl text-[#2E8B8B] font-mono-numbers">
                {activeVehicle.climateTempC.toFixed(1)}°C
              </span>
              <span className="text-xs font-mono text-[#5B6675]">Thermostat Target</span>
            </div>
          </div>

          <div className="my-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setClimateTemp(18.0)}
                className="py-1.5 rounded-lg bg-[#EEF2F5] hover:bg-[#E2E8F0] text-[10px] font-mono text-[#5B6675] hover:text-[#1F2A37] border border-[#D8E0E7] cursor-pointer transition-colors"
              >
                Max A/C (18°)
              </button>
              <button
                onClick={() => setClimateTemp(21.0)}
                className="py-1.5 rounded-lg bg-[#E7F3F1] text-[#2E8B8B] text-[10px] font-mono font-bold border border-[#86B6B2]/40 cursor-pointer shadow-xs"
              >
                Comfort (21°)
              </button>
              <button
                onClick={() => setClimateTemp(24.5)}
                className="py-1.5 rounded-lg bg-[#EEF2F5] hover:bg-[#E2E8F0] text-[10px] font-mono text-[#5B6675] hover:text-[#1F2A37] border border-[#D8E0E7] cursor-pointer transition-colors"
              >
                Defrost (24.5°)
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono">
              <span className="text-[#5B6675]">Eco Battery Loop:</span>
              <button
                onClick={() => executeCommand("TOGGLE_ECO")}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                  activeVehicle.ecoMode ? "bg-[#F0FDF4] border border-[#BBF7D0] text-[#2FA36B]" : "bg-[#EEF2F5] text-[#5B6675]"
                }`}
              >
                {activeVehicle.ecoMode ? "ENABLED" : "OFF"}
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#5B6675] pt-3 border-t border-[#D8E0E7]">
            Pre-conditions battery coolant loop while plugged in to preserve driving range.
          </div>
        </div>
      </div>

      {/* Command Audit Log */}
      <div className="nebula-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#2E8B8B]" />
            <h3 className="font-display font-bold text-lg text-[#1F2A37]">
              Cryptographic Command Audit Ledger
            </h3>
          </div>
          <span className="text-xs font-mono text-[#5B6675]">
            Total Entries: <strong className="text-[#1F2A37]">{auditLogs.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#D8E0E7] text-[#5B6675] text-[10px] uppercase">
                <th className="pb-2.5 font-bold">Command</th>
                <th className="pb-2.5 font-bold">Issued By</th>
                <th className="pb-2.5 font-bold">Timestamp</th>
                <th className="pb-2.5 font-bold">Simulated Latency</th>
                <th className="pb-2.5 font-bold">Status</th>
                <th className="pb-2.5 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E0E7]">
              {auditLogs.map((entry) => (
                <tr key={entry.id} className="text-[#1F2A37] hover:bg-[#F6F8FA] transition-colors">
                  <td className="py-2.5 font-bold text-[#2E8B8B]">{entry.commandName}</td>
                  <td className="py-2.5 text-[#5B6675]">{entry.issuedBy}</td>
                  <td className="py-2.5 text-[#5B6675]">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </td>
                  <td className="py-2.5 font-mono-numbers">{entry.latencyMs} ms</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#F0FDF4] border border-[#BBF7D0] text-[#2FA36B]">
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-[#5B6675] text-[11px] truncate max-w-xs">{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
          Simulated command broker with immutable audit trailing. Real vehicle hardware requires physical relay isolation and secure key exchanges.
        </div>
      </div>
    </div>
  );
}
