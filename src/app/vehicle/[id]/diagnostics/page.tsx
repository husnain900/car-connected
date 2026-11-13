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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F5F8FC]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#79C7FF]">Diagnostics & TPMS</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Vehicle Diagnostics & TPMS Monitor
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Comprehensive 4-corner tyre mesh, high-voltage battery health, and OBD-II / ISO-14229 DTC diagnostic inspection.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs flex items-center space-x-2 cursor-pointer transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "SCANNING ECUs..." : "RUN FULL DIAGNOSTIC SCAN"}</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Simulated Scanner Banner when scanning */}
      {scanMessage && (
        <div className="p-4 rounded-xl bg-[#152437] border border-[#79C7FF]/40 flex items-center space-x-3 text-xs font-mono text-[#79C7FF] animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Viva Fault Injector Bar */}
      <div className="p-4 rounded-xl bg-[#152437] border border-[#293C51] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 text-[#F2B65B] flex-shrink-0" />
          <span className="text-[#F5F8FC] font-bold">VIVA EVALUATION CONTROLS:</span>
          <span className="text-[#A5B5C8] hidden sm:inline">Inject simulated faults to test warning cascades:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => injectScenario("TPMS_PUNCTURE_RR")}
            className="px-2.5 py-1.5 rounded-lg bg-[#F16D78]/15 hover:bg-[#F16D78]/25 border border-[#F16D78]/30 text-[#F16D78] text-[10px] font-mono font-bold transition-colors cursor-pointer"
          >
            + Inject RR Puncture (22 PSI)
          </button>
          <button
            onClick={() => injectScenario("BATTERY_THERMAL_ALERT")}
            className="px-2.5 py-1.5 rounded-lg bg-[#F2B65B]/15 hover:bg-[#F2B65B]/25 border border-[#F2B65B]/30 text-[#F2B65B] text-[10px] font-mono font-bold transition-colors cursor-pointer"
          >
            + High Battery Temp (48°C)
          </button>
          <button
            onClick={() => injectScenario("BRAKE_PAD_WEAR")}
            className="px-2.5 py-1.5 rounded-lg bg-[#79C7FF]/15 hover:bg-[#79C7FF]/25 border border-[#79C7FF]/30 text-[#79C7FF] text-[10px] font-mono font-bold transition-colors cursor-pointer"
          >
            + Brake Friction Wear
          </button>
          <button
            onClick={clearAllFaults}
            className="px-2.5 py-1.5 rounded-lg bg-[#35C99A]/15 hover:bg-[#35C99A]/25 border border-[#35C99A]/30 text-[#35C99A] text-[10px] font-mono font-bold transition-colors flex items-center space-x-1 cursor-pointer"
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
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">CHASSIS MONITOR</span>
            <h2 className="font-display font-bold text-xl text-[#F5F8FC]">
              4-Corner TPMS Wireless Mesh Diagnostics
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
            <span>Nominal Range: 32–38 PSI</span>
            <span>•</span>
            <span className="text-[#35C99A]">Continuous 433 MHz RF Protocol</span>
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
                    ? "bg-[#F16D78]/10 border-[#F16D78]/50 shadow-[0_0_20px_rgba(241,109,120,0.15)]"
                    : isWarn
                    ? "bg-[#F2B65B]/10 border-[#F2B65B]/40"
                    : "bg-[#1E314B] border-[#293C51]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-black text-sm text-[#F5F8FC]">{tire.id}</span>
                    <span className="text-[10px] font-mono text-[#A5B5C8]">{tire.name}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isCrit
                        ? "bg-[#F16D78] text-white animate-pulse"
                        : isWarn
                        ? "bg-[#F2B65B] text-[#091321] font-bold"
                        : "bg-[#35C99A]/15 text-[#35C99A]"
                    }`}
                  >
                    {tire.status}
                  </span>
                </div>

                <div className="my-2">
                  <div className="flex items-baseline space-x-1">
                    <span
                      className={`font-display font-black text-3xl font-mono-numbers ${
                        isCrit ? "text-[#F16D78]" : "text-[#F5F8FC]"
                      }`}
                    >
                      {tire.psi}
                    </span>
                    <span className="text-xs font-mono text-[#A5B5C8]">PSI</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#A5B5C8] mt-2">
                    <span>Temp: {tire.tempC}°C</span>
                    <span>Tread Wear: {tire.wearPct}%</span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-[#091321] rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCrit ? "bg-[#F16D78]" : isWarn ? "bg-[#F2B65B]" : "bg-[#79C7FF]"
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
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">OBD-II & ISO-14229</span>
            <h2 className="font-display font-bold text-xl text-[#F5F8FC]">
              Active Diagnostic Fault Codes (DTC)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#A5B5C8]">
            Total Active Codes: <strong className="text-[#F5F8FC]">{activeVehicle.activeFaults.length}</strong>
          </span>
        </div>

        {activeVehicle.activeFaults.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#1E314B] border border-[#293C51] text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#35C99A]/10 border border-[#35C99A]/30 flex items-center justify-center text-[#35C99A]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-[#F5F8FC]">
                NO ACTIVE DTC FAULT CODES
              </div>
              <p className="text-xs font-mono text-[#A5B5C8] mt-1 max-w-md">
                All virtual controllers (Powertrain, Brakes, High-Voltage Battery, Chassis & TPMS) reported zero MIL/DTC faults during the last sweep.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {activeVehicle.activeFaults.map((fault) => (
              <div
                key={fault.code}
                className="p-4 rounded-xl bg-[#F16D78]/10 border border-[#F16D78]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F16D78] text-white">
                      {fault.severity}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#F16D78]">{fault.code}</span>
                    <span className="text-[10px] font-mono text-[#A5B5C8]">[{fault.standard}]</span>
                    <span className="text-[10px] font-mono text-[#A5B5C8]">• {fault.system}</span>
                  </div>
                  <p className="text-xs font-mono text-[#F5F8FC] mt-1 font-semibold">{fault.description}</p>
                  <p className="text-[11px] font-mono text-[#F2B65B] mt-0.5">
                    <strong>Recommended Action:</strong> {fault.recommendedAction}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-[#A5B5C8] self-end sm:self-auto flex-shrink-0">
                  Detected: {new Date(fault.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#293C51] flex items-center justify-between text-[10px] font-mono text-[#A5B5C8]">
          <div className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-[#F2B65B]" />
            <span>Demonstration telemetry adapter. Physical vehicle access requires compliant OBD-II CAN hardware bridge.</span>
          </div>
          <span>ISO 14229 Unified Diagnostic Services (UDS)</span>
        </div>
      </div>
    </div>
  );
}
