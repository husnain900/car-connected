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
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2B65B] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F2B65B]">
              {activeVehicle.dataSourceLabel}
            </span>
            <span className="text-[#293C51]">•</span>
            <span className="font-mono text-[10px] text-[#A5B5C8]">
              Last Tick: {new Date(activeVehicle.lastUpdated).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-[#A5B5C8]">VIN:</span>
            <span className="text-[10px] font-mono font-bold text-[#F5F8FC]">{activeVehicle.vin}</span>
            <span className="text-[#293C51]">•</span>
            <span className="text-[10px] font-mono font-bold text-[#79C7FF]">{activeVehicle.licensePlate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wide text-[#F5F8FC]">
              {activeVehicle.name}
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">{activeVehicle.model}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:space-x-3">
            <div className="nebula-card px-2 sm:px-3.5 py-1.5 flex flex-col items-center sm:items-end text-center sm:text-right">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#A5B5C8]">EST. RANGE</span>
              <span className="font-display font-black text-sm sm:text-base text-[#F5F8FC] font-mono-numbers">
                {activeVehicle.estRangeKm} <span className="text-[9px] sm:text-[10px] text-[#79C7FF]">KM</span>
              </span>
            </div>

            <div className="nebula-card px-2 sm:px-3.5 py-1.5 flex flex-col items-center sm:items-end text-center sm:text-right">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#A5B5C8]">BATTERY SOC</span>
              <span className="font-display font-black text-sm sm:text-base text-[#35C99A] font-mono-numbers">
                {activeVehicle.batteryLevelPct}%
              </span>
            </div>

            <div className="nebula-card px-2 sm:px-3.5 py-1.5 flex flex-col items-center sm:items-end text-center sm:text-right">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#A5B5C8]">DRIVE MODE</span>
              <span className="font-display font-extrabold text-[11px] sm:text-xs text-[#79C7FF] tracking-wider mt-0.5">
                {activeVehicle.driveMode}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/40 to-transparent" />
      </div>

      {/* Active Fault Notification Alert (if any fault injected) */}
      {activeVehicle.activeFaults.length > 0 && (
        <div className="p-4 rounded-xl bg-[#F16D78]/10 border border-[#F16D78]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#F16D78]/20 border border-[#F16D78]/30 flex items-center justify-center text-[#F16D78] flex-shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#F16D78]">
                ACTIVE DTC FAULT CODES DETECTED ({activeVehicle.activeFaults.length})
              </div>
              <div className="text-[11px] font-mono text-[#F16D78]/90 mt-0.5">
                {activeVehicle.activeFaults[0].code}: {activeVehicle.activeFaults[0].description}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="px-3 py-1.5 rounded-lg bg-[#F16D78]/20 hover:bg-[#F16D78]/30 text-xs font-mono font-bold text-[#F16D78] transition-colors"
            >
              Inspect Diagnostics
            </Link>
            <button
              onClick={clearAllFaults}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#F5F8FC] transition-colors"
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
        <div className="nebula-card p-3.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#A5B5C8]">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <div>
              <span className="text-[9px] uppercase text-[#A5B5C8] block">ODOMETER</span>
              <span className="text-xs font-bold text-[#F5F8FC] font-mono-numbers">
                {activeVehicle.odometerKm.toLocaleString()} KM
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-[#A5B5C8] block">CELL VOLTAGE</span>
              <span className="text-xs font-bold text-[#F5F8FC] font-mono-numbers">
                {activeVehicle.cellVoltage} V
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[9px] uppercase text-[#A5B5C8] block">SECURITY STATE</span>
              <span className="text-xs font-bold text-[#35C99A] flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5" />
                <span>{activeVehicle.isLocked ? "PERIMETER LOCKED" : "UNLOCKED"}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#293C51]/60">
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F5F8FC] hover:text-[#79C7FF] transition-colors min-h-[36px] flex items-center"
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
              <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
                CHASSIS SAFETY
              </span>
              <h3 className="font-display font-bold text-lg text-[#F5F8FC]">
                TPMS Tyre Mesh Readouts
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="text-xs font-mono text-[#79C7FF] hover:underline flex items-center space-x-1"
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
                      ? "bg-[#F16D78]/10 border-[#F16D78]/40 text-[#F16D78]"
                      : "bg-[#1E314B] border-[#293C51] text-[#F5F8FC]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">{t.name} ({t.id})</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWarning ? "bg-[#F16D78] animate-ping" : "bg-[#35C99A]"
                      }`}
                    />
                  </div>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <span className="font-display font-black text-xl font-mono-numbers">
                      {t.psi}
                    </span>
                    <span className="text-[10px] font-mono text-[#A5B5C8]">PSI</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#A5B5C8] mt-1">
                    <span>Temp: {t.tempC}°C</span>
                    <span>Target: {t.targetPsi}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#293C51] text-[10px] font-mono text-[#A5B5C8]">
            <span>Thresholds: Min 30 PSI • Max 42 PSI</span>
            <span className="text-[#35C99A]">Continuous 4-Wheel Scan</span>
          </div>
        </div>

        {/* Module 2: Quick Command Hub */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
                OPERATIONS
              </span>
              <h3 className="font-display font-bold text-lg text-[#F5F8FC]">
                Remote Control Commands
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/controls`}
              className="text-xs font-mono text-[#79C7FF] hover:underline flex items-center space-x-1"
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
                  ? "bg-[#1E314B] border-[#293C51] hover:border-[#79C7FF]/40 text-[#F5F8FC]"
                  : "bg-[#79C7FF]/15 border-[#79C7FF]/40 text-[#79C7FF]"
              }`}
            >
              {activeVehicle.isLocked ? (
                <Lock className="w-5 h-5 text-[#A5B5C8]" />
              ) : (
                <Unlock className="w-5 h-5 text-[#79C7FF]" />
              )}
              <div className="text-center">
                <div className="text-xs font-mono font-bold">
                  {activeVehicle.isLocked ? "UNLOCK DOORS" : "LOCK PERIMETER"}
                </div>
                <div className="text-[9px] font-mono text-[#A5B5C8]">
                  {activeVehicle.isLocked ? "Status: Secured" : "Status: Open"}
                </div>
              </div>
            </button>

            <button
              onClick={() => executeCommand("TOGGLE_VALET")}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                activeVehicle.valetActive
                  ? "bg-[#35C99A]/15 border-[#35C99A]/40 text-[#35C99A]"
                  : "bg-[#1E314B] border-[#293C51] hover:border-[#79C7FF]/40 text-[#F5F8FC]"
              }`}
            >
              <Wind className="w-5 h-5" />
              <div className="text-center">
                <div className="text-xs font-mono font-bold">VALET GOVERNOR</div>
                <div className="text-[9px] font-mono text-[#A5B5C8]">
                  {activeVehicle.valetActive ? "Limit: 50 km/h" : "Unrestricted"}
                </div>
              </div>
            </button>
          </div>

          {/* Climate preset slider quick widget */}
          <div className="bg-[#1E314B] border border-[#293C51] p-3 rounded-xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-[#A5B5C8] uppercase">Thermostat Target</span>
              <span className="text-xs font-bold font-mono text-[#F5F8FC]">
                {activeVehicle.climateTempC.toFixed(1)}°C (Pre-Conditioning)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setClimateTemp(18.0)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[9px] font-mono text-[#A5B5C8] hover:text-[#F5F8FC]"
              >
                18°C
              </button>
              <button
                onClick={() => setClimateTemp(21.0)}
                className="px-2 py-1 rounded bg-[#79C7FF]/15 border border-[#79C7FF]/30 text-[#79C7FF] text-[9px] font-mono font-bold"
              >
                21°C
              </button>
              <button
                onClick={() => setClimateTemp(24.5)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[9px] font-mono text-[#A5B5C8] hover:text-[#F5F8FC]"
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
