"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Wind,
  AlertTriangle,
  History,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function ControlsPage() {
  const {
    activeVehicle,
    executeCommand,
    setClimateTemp,
    auditLogs,
  } = useSimulationStore();

  const [confirmModal, setConfirmModal] = useState<{ open: boolean; action: string; title: string } | null>(null);
  const [valetLimit, setValetLimit] = useState(activeVehicle.valetSpeedLimitKmH);
  const [isProcessing, setIsProcessing] = useState(false);

  const requestAction = (action: string, title: string) => {
    setConfirmModal({ open: true, action, title });
  };

  const confirmAction = () => {
    if (!confirmModal) return;
    setIsProcessing(true);
    setTimeout(() => {
      executeCommand(confirmModal.action);
      setIsProcessing(false);
      setConfirmModal(null);
    }, 250);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F4F7FB]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#D6F45A]">Remote Command Hub</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Remote Operations & Command Broker
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Secure simulated actuators for vehicle perimeter locking, valet governor limits, climate pre-conditioning, and cryptographic audit tracking.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#151D28] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#F4F7FB]">
                  Confirm Vehicle Command
                </h3>
                <span className="text-[10px] font-mono text-[#8794A6] uppercase">
                  SIMULATED ACTUATOR BROKER
                </span>
              </div>
            </div>

            <p className="text-xs font-mono text-[#8794A6] leading-relaxed">
              Are you sure you want to execute <strong>{confirmModal.title}</strong> on{" "}
              <span className="text-[#F4F7FB]">{activeVehicle.name}</span>? This command will be logged in the immutable audit ledger.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8794A6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs transition-colors flex items-center space-x-1.5"
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
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              PERIMETER ACCESS
            </span>
            <h3 className="font-display font-bold text-lg text-[#F4F7FB] mt-0.5">
              Door & Trunk Lock Actuator
            </h3>
            <p className="text-xs font-mono text-[#8794A6] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.isLocked ? "text-[#43D9A3]" : "text-amber-400"}>
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
                  ? "bg-[#1B2636] border-white/10 hover:border-white/25 text-[#F4F7FB]"
                  : "bg-[#D6F45A] text-[#0B1018] hover:bg-[#c2df47] shadow-[0_0_20px_rgba(214,244,90,0.25)]"
              }`}
            >
              {activeVehicle.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{activeVehicle.isLocked ? "UNLOCK VEHICLE" : "LOCK VEHICLE"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#8794A6] pt-3 border-t border-white/8">
            Requires driver biometric or authenticated token before release.
          </div>
        </div>

        {/* Module 2: Valet Mode Speed Limiter */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              SPEED GOVERNOR
            </span>
            <h3 className="font-display font-bold text-lg text-[#F4F7FB] mt-0.5">
              Valet Limiter Mode
            </h3>
            <p className="text-xs font-mono text-[#8794A6] mt-2">
              Current State:{" "}
              <strong className={activeVehicle.valetActive ? "text-[#43D9A3]" : "text-[#8794A6]"}>
                {activeVehicle.valetActive ? "ACTIVE (GOVERNOR ARMED)" : "UNRESTRICTED"}
              </strong>
            </p>
          </div>

          <div className="my-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8794A6]">Speed Ceiling:</span>
              <span className="font-bold text-[#D6F45A] font-mono-numbers">{valetLimit} KM/H</span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={valetLimit}
              onChange={(e) => setValetLimit(Number(e.target.value))}
              className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#D6F45A]"
            />

            <button
              onClick={() => requestAction("TOGGLE_VALET", "Toggle Valet Governor")}
              className={`w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors ${
                activeVehicle.valetActive
                  ? "bg-[#43D9A3]/15 border-[#43D9A3]/40 text-[#43D9A3]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-[#F4F7FB]"
              }`}
            >
              <Wind className="w-4 h-4" />
              <span>{activeVehicle.valetActive ? "DISABLE VALET LIMIT" : "ARM VALET GOVERNOR"}</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#8794A6] pt-3 border-t border-white/8">
            Restricts peak torque and locks infotainment settings.
          </div>
        </div>

        {/* Module 3: Climate Pre-Conditioning */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              THERMAL PRE-CONDITIONING
            </span>
            <h3 className="font-display font-bold text-lg text-[#F4F7FB] mt-0.5">
              Dual-Zone Cabin Climate
            </h3>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-display font-black text-2xl text-[#D6F45A] font-mono-numbers">
                {activeVehicle.climateTempC.toFixed(1)}°C
              </span>
              <span className="text-xs font-mono text-[#8794A6]">Thermostat Target</span>
            </div>
          </div>

          <div className="my-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setClimateTemp(18.0)}
                className="py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#8794A6] hover:text-[#F4F7FB] border border-white/8"
              >
                Max A/C (18°)
              </button>
              <button
                onClick={() => setClimateTemp(21.0)}
                className="py-1.5 rounded-lg bg-[#D6F45A]/15 text-[#D6F45A] text-[10px] font-mono font-bold border border-[#D6F45A]/30"
              >
                Comfort (21°)
              </button>
              <button
                onClick={() => setClimateTemp(24.5)}
                className="py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#8794A6] hover:text-[#F4F7FB] border border-white/8"
              >
                Defrost (24.5°)
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#1B2636] border border-white/8 text-xs font-mono">
              <span className="text-[#8794A6]">Eco Battery Loop:</span>
              <button
                onClick={() => executeCommand("TOGGLE_ECO")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeVehicle.ecoMode ? "bg-[#43D9A3]/20 text-[#43D9A3]" : "bg-white/10 text-[#8794A6]"
                }`}
              >
                {activeVehicle.ecoMode ? "ENABLED" : "OFF"}
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#8794A6] pt-3 border-t border-white/8">
            Pre-conditions battery coolant loop while plugged in to preserve driving range.
          </div>
        </div>
      </div>

      {/* Command Audit Log */}
      <div className="nebula-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#D6F45A]" />
            <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
              Cryptographic Command Audit Ledger
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8794A6]">
            Total Entries: <strong className="text-[#F4F7FB]">{auditLogs.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#8794A6] text-[10px] uppercase">
                <th className="pb-2">Command</th>
                <th className="pb-2">Issued By</th>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Simulated Latency</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {auditLogs.map((entry) => (
                <tr key={entry.id} className="text-[#F4F7FB]">
                  <td className="py-2.5 font-bold text-[#D6F45A]">{entry.commandName}</td>
                  <td className="py-2.5 text-[#8794A6]">{entry.issuedBy}</td>
                  <td className="py-2.5 text-[#8794A6]">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </td>
                  <td className="py-2.5 font-mono-numbers">{entry.latencyMs} ms</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#43D9A3]/15 text-[#43D9A3]">
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-[#8794A6] text-[11px] truncate max-w-xs">{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-white/8 text-[10px] font-mono text-[#8794A6]">
          Simulated command broker with immutable audit trailing. Real vehicle hardware requires physical relay isolation and secure key exchanges.
        </div>
      </div>
    </div>
  );
}
