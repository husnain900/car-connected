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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F5F8FC]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#79C7FF]">Remote Command Hub</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Remote Operations & Command Broker
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Secure simulated actuators for vehicle perimeter locking, valet governor limits, climate pre-conditioning, and cryptographic audit tracking.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091321]/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#152437] border border-[#293C51] shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2B65B]/15 border border-[#F2B65B]/30 flex items-center justify-center text-[#F2B65B]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#F5F8FC]">
                  Confirm Vehicle Command
                </h3>
                <span className="text-[10px] font-mono text-[#A5B5C8] uppercase">
                  SIMULATED ACTUATOR BROKER
                </span>
              </div>
            </div>

            <p className="text-xs font-mono text-[#A5B5C8] leading-relaxed">
              Are you sure you want to execute <strong>{confirmModal.title}</strong> on{" "}
              <span className="text-[#F5F8FC] font-bold">{activeVehicle.name}</span>? This command will be logged in the immutable audit ledger.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl bg-[#1E314B] hover:bg-[#253956] text-xs font-mono text-[#A5B5C8] border border-[#293C51] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{isProcessing ? "DISPATCHING..." : "CONFIRM & DISPATCH"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operations Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Module 1: Perimeter Locks */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
              PERIMETER ACCESS
            </span>
            <h3 className="font-display font-bold text-lg text-[#F5F8FC] mt-0.5">
              Door & Trunk Lock Actuator
            </h3>
            <p className="text-xs font-mono text-[#A5B5C8] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.isLocked ? "text-[#35C99A]" : "text-[#F2B65B]"}>
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
              className={`w-full py-4 rounded-xl border font-mono font-bold text-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer ${
                activeVehicle.isLocked
                  ? "bg-[#1E314B] border-[#293C51] hover:border-[#79C7FF]/40 text-[#F5F8FC]"
                  : "bg-[#79C7FF] text-[#091321] hover:bg-[#68b5ea] shadow-[0_0_20px_rgba(121,199,255,0.25)]"
              }`}
            >
              {activeVehicle.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{activeVehicle.isLocked ? "UNLOCK VEHICLE" : "LOCK VEHICLE"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#A5B5C8] pt-3 border-t border-[#293C51]">
            Requires driver biometric or authenticated token before release.
          </div>
        </div>

        {/* Module 2: Valet Mode Speed Limiter */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
              SPEED GOVERNOR
            </span>
            <h3 className="font-display font-bold text-lg text-[#F5F8FC] mt-0.5">
              Valet Limiter Mode
            </h3>
            <p className="text-xs font-mono text-[#A5B5C8] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.valetActive ? "text-[#35C99A]" : "text-[#A5B5C8]"}>
                {activeVehicle.valetActive ? "ACTIVE (GOVERNOR ARMED)" : "UNRESTRICTED"}
              </strong>
            </p>
          </div>

          <div className="my-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#A5B5C8]">Speed Ceiling:</span>
              <span className="font-bold text-[#79C7FF] font-mono-numbers">{valetLimit} KM/H</span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={valetLimit}
              onChange={(e) => setValetLimit(Number(e.target.value))}
              className="w-full h-1.5 bg-[#091321] rounded-lg appearance-none cursor-pointer accent-[#79C7FF]"
            />

            <button
              onClick={() => requestAction("TOGGLE_VALET", "Toggle Valet Governor")}
              className={`w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
                activeVehicle.valetActive
                  ? "bg-[#35C99A]/15 border-[#35C99A]/40 text-[#35C99A]"
                  : "bg-[#1E314B] border-[#293C51] hover:bg-[#152437] text-[#F5F8FC]"
              }`}
            >
              <Wind className="w-4 h-4" />
              <span>{activeVehicle.valetActive ? "DISABLE VALET LIMIT" : "ARM VALET GOVERNOR"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#A5B5C8] pt-3 border-t border-[#293C51]">
            Restricts peak torque and locks infotainment settings.
          </div>
        </div>

        {/* Module 3: Climate Pre-Conditioning */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
              THERMAL PRE-CONDITIONING
            </span>
            <h3 className="font-display font-bold text-lg text-[#F5F8FC] mt-0.5">
              Dual-Zone Cabin Climate
            </h3>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-display font-black text-2xl text-[#79C7FF] font-mono-numbers">
                {activeVehicle.climateTempC.toFixed(1)}°C
              </span>
              <span className="text-xs font-mono text-[#A5B5C8]">Thermostat Target</span>
            </div>
          </div>

          <div className="my-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setClimateTemp(18.0)}
                className="py-1.5 rounded-lg bg-[#1E314B] hover:bg-[#253956] text-[10px] font-mono text-[#A5B5C8] hover:text-[#F5F8FC] border border-[#293C51] cursor-pointer"
              >
                Max A/C (18°)
              </button>
              <button
                onClick={() => setClimateTemp(21.0)}
                className="py-1.5 rounded-lg bg-[#79C7FF]/15 text-[#79C7FF] text-[10px] font-mono font-bold border border-[#79C7FF]/30 cursor-pointer"
              >
                Comfort (21°)
              </button>
              <button
                onClick={() => setClimateTemp(24.5)}
                className="py-1.5 rounded-lg bg-[#1E314B] hover:bg-[#253956] text-[10px] font-mono text-[#A5B5C8] hover:text-[#F5F8FC] border border-[#293C51] cursor-pointer"
              >
                Defrost (24.5°)
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#1E314B] border border-[#293C51] text-xs font-mono">
              <span className="text-[#A5B5C8]">Eco Battery Loop:</span>
              <button
                onClick={() => executeCommand("TOGGLE_ECO")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  activeVehicle.ecoMode ? "bg-[#35C99A]/20 text-[#35C99A]" : "bg-[#152437] text-[#A5B5C8]"
                }`}
              >
                {activeVehicle.ecoMode ? "ENABLED" : "OFF"}
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#A5B5C8] pt-3 border-t border-[#293C51]">
            Pre-conditions battery coolant loop while plugged in to preserve driving range.
          </div>
        </div>
      </div>

      {/* Command Audit Log */}
      <div className="nebula-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#79C7FF]" />
            <h3 className="font-display font-bold text-lg text-[#F5F8FC]">
              Cryptographic Command Audit Ledger
            </h3>
          </div>
          <span className="text-xs font-mono text-[#A5B5C8]">
            Total Entries: <strong className="text-[#F5F8FC]">{auditLogs.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#293C51] text-[#A5B5C8] text-[10px] uppercase">
                <th className="pb-2">Command</th>
                <th className="pb-2">Issued By</th>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Simulated Latency</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293C51]/50">
              {auditLogs.map((entry) => (
                <tr key={entry.id} className="text-[#F5F8FC]">
                  <td className="py-2.5 font-bold text-[#79C7FF]">{entry.commandName}</td>
                  <td className="py-2.5 text-[#A5B5C8]">{entry.issuedBy}</td>
                  <td className="py-2.5 text-[#A5B5C8]">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </td>
                  <td className="py-2.5 font-mono-numbers">{entry.latencyMs} ms</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#35C99A]/15 text-[#35C99A]">
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-[#A5B5C8] text-[11px] truncate max-w-xs">{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293C51] text-[10px] font-mono text-[#A5B5C8]">
          Simulated command broker with immutable audit trailing. Real vehicle hardware requires physical relay isolation and secure key exchanges.
        </div>
      </div>
    </div>
  );
}
