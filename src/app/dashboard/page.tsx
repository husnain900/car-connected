"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Unlock,
  Wind,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import Vehicle3DViewer from "@/components/Vehicle3DViewer";

export default function DashboardPage() {
  const {
    activeVehicle,
    executeCommand,
    setClimateTemp,
    clearAllFaults,
  } = useSimulationStore();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header & Source Transparency Banner */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-amber-300">
              {activeVehicle.dataSourceLabel}
            </span>
            <span className="text-white/20">•</span>
            <span className="font-mono text-[10px] text-[#8794A6]">
              Last Tick: {new Date(activeVehicle.lastUpdated).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-[#8794A6]">VIN:</span>
            <span className="text-[10px] font-mono font-bold text-[#F4F7FB]">{activeVehicle.vin}</span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] font-mono font-bold text-[#D6F45A]">{activeVehicle.licensePlate}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wide text-[#F4F7FB]">
              {activeVehicle.name}
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">{activeVehicle.model}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="nebula-card px-3.5 py-1.5 flex flex-col items-end">
              <span className="text-[9px] font-mono text-[#8794A6]">EST. RANGE</span>
              <span className="font-display font-black text-base text-[#F4F7FB] font-mono-numbers">
                {activeVehicle.estRangeKm} <span className="text-[10px] text-[#D6F45A]">KM</span>
              </span>
            </div>

            <div className="nebula-card px-3.5 py-1.5 flex flex-col items-end">
              <span className="text-[9px] font-mono text-[#8794A6]">BATTERY SOC</span>
              <span className="font-display font-black text-base text-[#43D9A3] font-mono-numbers">
                {activeVehicle.batteryLevelPct}%
              </span>
            </div>

            <div className="nebula-card px-3.5 py-1.5 flex flex-col items-end">
              <span className="text-[9px] font-mono text-[#8794A6]">DRIVE MODE</span>
              <span className="font-display font-extrabold text-xs text-[#D6F45A] tracking-wider mt-0.5">
                {activeVehicle.driveMode}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Active Fault Notification Alert (if any fault injected) */}
      {activeVehicle.activeFaults.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-red-200">
                ACTIVE DTC FAULT CODES DETECTED ({activeVehicle.activeFaults.length})
              </div>
              <div className="text-[11px] font-mono text-red-300 mt-0.5">
                {activeVehicle.activeFaults[0].code}: {activeVehicle.activeFaults[0].description}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-mono font-bold text-red-200 transition-colors"
            >
              Inspect Diagnostics
            </Link>
            <button
              onClick={clearAllFaults}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#F4F7FB] transition-colors"
            >
              Reset Fault
            </button>
          </div>
        </div>
      )}

      {/* Digital Twin Interactive 3D WebGL Cockpit with Hotspots */}
      <div className="space-y-3">
        <Vehicle3DViewer vehicle={activeVehicle} />

        {/* Quick Subsystem Status Bar */}
        <div className="nebula-card px-5 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8794A6]">
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-[9px] uppercase text-[#8794A6] block">ODOMETER</span>
              <span className="text-xs font-bold text-[#F4F7FB] font-mono-numbers">
                {activeVehicle.odometerKm.toLocaleString()} KM
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-[#8794A6] block">CELL VOLTAGE</span>
              <span className="text-xs font-bold text-[#F4F7FB] font-mono-numbers">
                {activeVehicle.cellVoltage} V
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-[#8794A6] block">SECURITY STATE</span>
              <span className="text-xs font-bold text-[#43D9A3] flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5" />
                <span>{activeVehicle.isLocked ? "PERIMETER LOCKED" : "UNLOCKED"}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F4F7FB] transition-colors"
            >
              Full Telemetry Matrix →
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: 4-Corner TPMS & Remote Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Module 1: TPMS Mesh Quick Status */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
                CHASSIS SAFETY
              </span>
              <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
                TPMS Tyre Mesh Readouts
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="text-xs font-mono text-[#D6F45A] hover:underline flex items-center space-x-1"
            >
              <span>Detailed TPMS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 my-4">
            {activeVehicle.tires.map((t) => {
              const isWarning = t.status === "warning" || t.status === "critical";
              return (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isWarning
                      ? "bg-red-500/10 border-red-500/40 text-red-300"
                      : "bg-[#1B2636] border-white/8 text-[#F4F7FB]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">{t.name} ({t.id})</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWarning ? "bg-red-400 animate-ping" : "bg-[#43D9A3]"
                      }`}
                    />
                  </div>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <span className="font-display font-black text-xl font-mono-numbers">
                      {t.psi}
                    </span>
                    <span className="text-[10px] font-mono text-[#8794A6]">PSI</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8794A6] mt-1">
                    <span>Temp: {t.tempC}°C</span>
                    <span>Target: {t.targetPsi}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/8 text-[10px] font-mono text-[#8794A6]">
            <span>Thresholds: Min 30 PSI • Max 42 PSI</span>
            <span className="text-[#43D9A3]">Continuous 4-Wheel Scan</span>
          </div>
        </div>

        {/* Module 2: Quick Command Hub */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
                OPERATIONS
              </span>
              <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
                Remote Control Commands
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/controls`}
              className="text-xs font-mono text-[#D6F45A] hover:underline flex items-center space-x-1"
            >
              <span>Command Logs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 my-4">
            <button
              onClick={() => executeCommand(activeVehicle.isLocked ? "UNLOCK_VEHICLE" : "LOCK_VEHICLE")}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                activeVehicle.isLocked
                  ? "bg-[#1B2636] border-white/10 hover:border-white/25 text-[#F4F7FB]"
                  : "bg-[#D6F45A]/15 border-[#D6F45A]/40 text-[#D6F45A]"
              }`}
            >
              {activeVehicle.isLocked ? (
                <Lock className="w-5 h-5 text-[#8794A6]" />
              ) : (
                <Unlock className="w-5 h-5 text-[#D6F45A]" />
              )}
              <div className="text-center">
                <div className="text-xs font-mono font-bold">
                  {activeVehicle.isLocked ? "UNLOCK DOORS" : "LOCK PERIMETER"}
                </div>
                <div className="text-[9px] font-mono text-[#8794A6]">
                  {activeVehicle.isLocked ? "Status: Secured" : "Status: Open"}
                </div>
              </div>
            </button>

            <button
              onClick={() => executeCommand("TOGGLE_VALET")}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                activeVehicle.valetActive
                  ? "bg-[#43D9A3]/15 border-[#43D9A3]/40 text-[#43D9A3]"
                  : "bg-[#1B2636] border-white/10 hover:border-white/25 text-[#F4F7FB]"
              }`}
            >
              <Wind className="w-5 h-5" />
              <div className="text-center">
                <div className="text-xs font-mono font-bold">VALET GOVERNOR</div>
                <div className="text-[9px] font-mono text-[#8794A6]">
                  {activeVehicle.valetActive ? "Limit: 50 km/h" : "Unrestricted"}
                </div>
              </div>
            </button>
          </div>

          {/* Climate preset slider quick widget */}
          <div className="bg-[#1B2636] border border-white/8 p-3 rounded-xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-[#8794A6] uppercase">Thermostat Target</span>
              <span className="text-xs font-bold font-mono text-[#F4F7FB]">
                {activeVehicle.climateTempC.toFixed(1)}°C (Pre-Conditioning)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setClimateTemp(18.0)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[9px] font-mono text-[#8794A6] hover:text-[#F4F7FB]"
              >
                18°C
              </button>
              <button
                onClick={() => setClimateTemp(21.0)}
                className="px-2 py-1 rounded bg-[#D6F45A]/15 text-[#D6F45A] text-[9px] font-mono font-bold"
              >
                21°C
              </button>
              <button
                onClick={() => setClimateTemp(24.5)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[9px] font-mono text-[#8794A6] hover:text-[#F4F7FB]"
              >
                24.5°C
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
