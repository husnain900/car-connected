"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Info,
  RotateCcw,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function DiagnosticsPage() {
  const {
    activeVehicle,
    injectScenario,
    clearAllFaults,
  } = useSimulationStore();

  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setScanMessage("Interrogating CAN-Bus IDs 0x7E0–0x7E8...");
    setTimeout(() => {
      setScanMessage("Polling 48 Virtual ECUs (Powertrain, Brakes, Battery, Body)...");
      setTimeout(() => {
        setIsScanning(false);
        setScanMessage(null);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F4F7FB]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#D6F45A]">Diagnostics & TPMS</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Vehicle Diagnostics & TPMS Monitor
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Comprehensive 4-corner tyre mesh, high-voltage battery health, and OBD-II / ISO-14229 DTC diagnostic inspection.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs flex items-center space-x-2 cursor-pointer transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "SCANNING ECUs..." : "RUN FULL DIAGNOSTIC SCAN"}</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Simulated Scanner Banner when scanning */}
      {scanMessage && (
        <div className="p-4 rounded-xl bg-[#151D28] border border-[#D6F45A]/40 flex items-center space-x-3 text-xs font-mono text-[#D6F45A] animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Viva Fault Injector Bar */}
      <div className="p-4 rounded-xl bg-[#151D28] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-[#F4F7FB] font-bold">VIVA EVALUATION CONTROLS:</span>
          <span className="text-[#8794A6] hidden sm:inline">Inject simulated faults to test warning cascades:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => injectScenario("TPMS_PUNCTURE_RR")}
            className="px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-[10px] font-mono font-bold transition-colors"
          >
            + Inject RR Puncture (22 PSI)
          </button>
          <button
            onClick={() => injectScenario("BATTERY_THERMAL_ALERT")}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold transition-colors"
          >
            + High Battery Temp (48°C)
          </button>
          <button
            onClick={() => injectScenario("BRAKE_PAD_WEAR")}
            className="px-2.5 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold transition-colors"
          >
            + Brake Friction Wear
          </button>
          <button
            onClick={clearAllFaults}
            className="px-2.5 py-1.5 rounded-lg bg-[#43D9A3]/15 hover:bg-[#43D9A3]/25 border border-[#43D9A3]/30 text-[#43D9A3] text-[10px] font-mono font-bold transition-colors flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Nominal</span>
          </button>
        </div>
      </div>

      {/* Section 1: TPMS 4-Corner Mesh in Depth */}
      <div className="nebula-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">CHASSIS MONITOR</span>
            <h2 className="font-display font-bold text-xl text-[#F4F7FB]">
              4-Corner TPMS Wireless Mesh Diagnostics
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
            <span>Nominal Range: 32–38 PSI</span>
            <span>•</span>
            <span className="text-[#43D9A3]">Continuous 433 MHz RF Protocol</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeVehicle.tires.map((tire) => {
            const isCrit = tire.status === "critical";
            const isWarn = tire.status === "warning";
            return (
              <div
                key={tire.id}
                className={`p-4 rounded-xl border flex flex-col justify-between min-h-[160px] ${
                  isCrit
                    ? "bg-red-500/10 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                    : isWarn
                    ? "bg-amber-500/10 border-amber-500/40"
                    : "bg-[#1B2636] border-white/8"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-black text-sm text-[#F4F7FB]">{tire.id}</span>
                    <span className="text-[10px] font-mono text-[#8794A6]">{tire.name}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isCrit
                        ? "bg-red-500 text-white animate-pulse"
                        : isWarn
                        ? "bg-amber-400 text-black font-bold"
                        : "bg-[#43D9A3]/15 text-[#43D9A3]"
                    }`}
                  >
                    {tire.status}
                  </span>
                </div>

                <div className="my-2">
                  <div className="flex items-baseline space-x-1">
                    <span
                      className={`font-display font-black text-3xl font-mono-numbers ${
                        isCrit ? "text-red-400" : "text-[#F4F7FB]"
                      }`}
                    >
                      {tire.psi}
                    </span>
                    <span className="text-xs font-mono text-[#8794A6]">PSI</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#8794A6] mt-2">
                    <span>Temp: {tire.tempC}°C</span>
                    <span>Tread Wear: {tire.wearPct}%</span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCrit ? "bg-red-500" : "bg-[#D6F45A]"
                    }`}
                    style={{ width: `${Math.min(100, (tire.psi / 40) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Active DTC (Diagnostic Trouble Codes) */}
      <div className="nebula-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">OBD-II & ISO-14229</span>
            <h2 className="font-display font-bold text-xl text-[#F4F7FB]">
              Active Diagnostic Fault Codes (DTC)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8794A6]">
            Total Active Codes: <strong className="text-[#F4F7FB]">{activeVehicle.activeFaults.length}</strong>
          </span>
        </div>

        {activeVehicle.activeFaults.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#1B2636] border border-white/8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#43D9A3]/10 border border-[#43D9A3]/30 flex items-center justify-center text-[#43D9A3]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-[#F4F7FB]">
                NO ACTIVE DTC FAULT CODES
              </div>
              <p className="text-xs font-mono text-[#8794A6] mt-1 max-w-md">
                All virtual controllers (Powertrain, Brakes, High-Voltage Battery, Chassis & TPMS) reported zero MIL/DTC faults during the last sweep.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {activeVehicle.activeFaults.map((fault) => (
              <div
                key={fault.code}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500 text-white">
                      {fault.severity}
                    </span>
                    <span className="font-mono font-bold text-sm text-red-200">{fault.code}</span>
                    <span className="text-[10px] font-mono text-[#8794A6]">[{fault.standard}]</span>
                    <span className="text-[10px] font-mono text-[#8794A6]">• {fault.system}</span>
                  </div>
                  <p className="text-xs font-mono text-[#F4F7FB] mt-1 font-semibold">{fault.description}</p>
                  <p className="text-[11px] font-mono text-amber-300 mt-0.5">
                    <strong>Recommended Action:</strong> {fault.recommendedAction}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-[#8794A6] self-end sm:self-auto flex-shrink-0">
                  Detected: {new Date(fault.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-[10px] font-mono text-[#8794A6]">
          <div className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Demonstration telemetry adapter. Physical vehicle access requires compliant OBD-II CAN hardware bridge.</span>
          </div>
          <span>ISO 14229 Unified Diagnostic Services (UDS)</span>
        </div>
      </div>
    </div>
  );
}
