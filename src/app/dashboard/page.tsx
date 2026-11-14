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
  Activity,
  BatteryCharging,
  Gauge,
  Compass,
  CheckCircle2,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useSimulationStore } from "@/lib/simulationStore";

// Dynamically import 3D WebGL Digital Twin with ssr: false for rock-solid stability
const Vehicle3DViewer = dynamic(() => import("@/components/Vehicle3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-[#D8E0E7] bg-gradient-to-b from-[#FFFFFF] via-[#F6F8FA] to-[#EEF2F5] flex flex-col items-center justify-center p-6 space-y-3 shadow-[0_5px_24px_rgba(31,42,55,0.055)] select-none">
      <div className="w-12 h-12 rounded-2xl bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
        <Sparkles className="w-6 h-6 animate-spin" />
      </div>
      <div className="text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E8B8B] font-bold block">
          3D DIGITAL TWIN // INITIALIZING
        </span>
        <span className="text-xs font-mono text-[#5B6675] mt-1 block">
          Calibrating telemetry mesh & Scandinavian studio lighting...
        </span>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  const {
    activeVehicle,
    executeCommand,
    setClimateTemp,
    clearAllFaults,
    unreadAlertsCount,
  } = useSimulationStore();

  const isFaultActive = Boolean(activeVehicle?.activeFaults && activeVehicle.activeFaults.length > 0);
  const avgPsi = (
    activeVehicle.tires.reduce((acc, t) => acc + t.psi, 0) / (activeVehicle.tires.length || 1)
  ).toFixed(1);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* ========================================================= */}
      {/* 1. HEADER STRIP & DATA PROVENANCE (Aurora Studio Style)   */}
      {/* ========================================================= */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Eyebrow & Simulation Badge */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E8B8B] font-bold">
              CAR INTELLIGENCE
            </span>
            <span className="text-[#D8E0E7]">•</span>
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[10px] font-mono font-bold text-[#B98121]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98121] animate-pulse" />
              <span>{activeVehicle.dataSourceLabel || "DEMO SIMULATION"}</span>
            </span>
            <span className="text-[#D8E0E7] hidden xs:inline">•</span>
            <span className="font-mono text-[10px] text-[#5B6675] hidden xs:inline" suppressHydrationWarning>
              Updated: {activeVehicle?.lastUpdated ? new Date(activeVehicle.lastUpdated).toLocaleTimeString() : "Live"}
            </span>
          </div>

          {/* VIN & Plate Identifiers */}
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <span className="text-[#5B6675]">VIN:</span>
            <span className="font-bold text-[#1F2A37]">{activeVehicle.vin}</span>
            <span className="text-[#D8E0E7]">•</span>
            <span className="font-bold px-2 py-0.5 rounded bg-[#EEF2F5] text-[#2E8B8B] border border-[#D8E0E7]">
              {activeVehicle.licensePlate}
            </span>
          </div>
        </div>

        {/* Primary Page Title (Sora Font) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#1F2A37]">
              Your vehicle, at a glance
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              {activeVehicle.name} — {activeVehicle.model} ({activeVehicle.type})
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono self-start sm:self-auto">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#E7F3F1] text-[#2E8B8B] font-bold border border-[#86B6B2]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeVehicle.driveMode} MODE</span>
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* ========================================================= */}
      {/* 2. FOUR EQUAL KPI CARDS (Section 4 Specification)         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* KPI 1: Vehicle Health */}
        <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between min-h-[116px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-sans font-medium text-[#5B6675]">Vehicle Health</span>
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#2FA36B]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] font-mono-numbers">
                {isFaultActive ? "82" : "98"}
              </span>
              <span className="text-sm font-bold text-[#2FA36B] font-mono">%</span>
            </div>
            <div className="flex items-center space-x-1 text-[11px] font-mono text-[#5B6675] mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isFaultActive ? "bg-[#C74E58]" : "bg-[#2FA36B]"}`} />
              <span>{isFaultActive ? "Active DTC Detected" : "Optimal Condition"}</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Battery SoC / Energy */}
        <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between min-h-[116px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-sans font-medium text-[#5B6675]">Battery State of Charge</span>
            <div className="w-7 h-7 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
              <BatteryCharging className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] font-mono-numbers">
                {activeVehicle.batteryLevelPct}
              </span>
              <span className="text-sm font-bold text-[#2E8B8B] font-mono">%</span>
            </div>
            <div className="text-[11px] font-mono text-[#5B6675] mt-1 flex items-center space-x-1.5">
              <span>{activeVehicle.cellVoltage}V</span>
              <span>•</span>
              <span>{activeVehicle.packTempC}°C Pack</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Tyre Status */}
        <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between min-h-[116px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-sans font-medium text-[#5B6675]">Tyre Status</span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-center text-[#1F2A37]">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] font-mono-numbers">
                {avgPsi}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#5B6675] font-mono">PSI AVG</span>
            </div>
            <div className="text-[11px] font-mono text-[#5B6675] mt-1 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
              <span>4-Wheel Mesh Monitored</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Estimated Range */}
        <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between min-h-[116px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-sans font-medium text-[#5B6675]">Estimated Range</span>
            <div className="w-7 h-7 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] font-mono-numbers">
                {activeVehicle.estRangeKm}
              </span>
              <span className="text-sm font-bold text-[#2E8B8B] font-mono">KM</span>
            </div>
            <div className="text-[11px] font-mono text-[#5B6675] mt-1">
              Dynamic EPA Calculation
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ACTIVE FAULT NOTIFICATION BANNER (If DTC Injected)        */}
      {/* ========================================================= */}
      {isFaultActive && (
        <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#FFE4E6] border border-[#FDA4AF] flex items-center justify-center text-[#C74E58] shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#C74E58]">
                DIAGNOSTIC TROUBLE CODE ACTIVE ({activeVehicle.activeFaults.length})
              </div>
              <div className="text-[11px] font-mono text-[#5B6675] mt-0.5">
                {activeVehicle.activeFaults[0].code}: {activeVehicle.activeFaults[0].description}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="px-3 py-1.5 rounded-lg bg-[#C74E58] hover:bg-[#A93C45] text-xs font-mono font-bold text-white transition-colors"
            >
              Inspect Diagnostics
            </Link>
            <button
              onClick={clearAllFaults}
              className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F5] border border-[#D8E0E7] text-xs font-mono font-bold text-[#1F2A37] transition-colors cursor-pointer"
            >
              Reset Fault
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. HERO ROW: 8-COL 3D DIGITAL TWIN + 4-COL ACTIONS STACK */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
        {/* 8-Column Digital Twin Panel */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <Vehicle3DViewer vehicle={activeVehicle} />

          {/* Quick Subsystem Telemetry Strip */}
          <div className="nebula-card p-3.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#5B6675]">
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[9px] uppercase text-[#5B6675] block">ODOMETER</span>
                <span className="text-xs font-bold text-[#1F2A37] font-mono-numbers">
                  {activeVehicle.odometerKm.toLocaleString()} KM
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-[#5B6675] block">BATTERY SOH</span>
                <span className="text-xs font-bold text-[#1F2A37] font-mono-numbers">
                  {activeVehicle.batteryHealthPct}%
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase text-[#5B6675] block">PERIMETER STATUS</span>
                <span className="text-xs font-bold text-[#2FA36B] flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{activeVehicle.isLocked ? "SECURED // LOCKED" : "UNLOCKED // OPEN"}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D8E0E7]">
              <Link
                href={`/vehicle/${activeVehicle.id}/diagnostics`}
                className="px-3 py-1.5 rounded-lg bg-[#EEF2F5] hover:bg-[#D8E0E7] text-xs font-mono text-[#1F2A37] hover:text-[#2E8B8B] transition-colors min-h-[32px] flex items-center"
              >
                Full Telemetry Matrix →
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Column Stack: Quick Controls & Alerts Summary */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Quick Controls Card */}
          <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[#D8E0E7] pb-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                  REMOTE ACTUATORS
                </span>
                <h3 className="font-display font-bold text-base text-[#1F2A37]">
                  Quick Controls
                </h3>
              </div>
              <Link
                href={`/vehicle/${activeVehicle.id}/controls`}
                className="text-xs font-mono text-[#2E8B8B] hover:underline flex items-center space-x-1"
              >
                <span>Full Deck</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Lock / Unlock & Valet Actuators */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => executeCommand(activeVehicle.isLocked ? "UNLOCK_VEHICLE" : "LOCK_VEHICLE")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 cursor-pointer transition-all min-h-[48px] ${
                  activeVehicle.isLocked
                    ? "bg-[#FFFFFF] border-[#D8E0E7] hover:border-[#2E8B8B] text-[#1F2A37]"
                    : "bg-[#E7F3F1] border-[#2E8B8B] text-[#2E8B8B]"
                }`}
              >
                {activeVehicle.isLocked ? (
                  <Lock className="w-5 h-5 text-[#5B6675]" />
                ) : (
                  <Unlock className="w-5 h-5 text-[#2E8B8B]" />
                )}
                <div className="text-center">
                  <div className="text-[11px] font-mono font-bold">
                    {activeVehicle.isLocked ? "UNLOCK DOORS" : "LOCK PERIMETER"}
                  </div>
                  <div className="text-[9px] font-mono text-[#5B6675]">
                    {activeVehicle.isLocked ? "Status: Secured" : "Status: Open"}
                  </div>
                </div>
              </button>

              <button
                onClick={() => executeCommand("TOGGLE_VALET")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 cursor-pointer transition-all min-h-[48px] ${
                  activeVehicle.valetActive
                    ? "bg-[#F0FDF4] border-[#2FA36B] text-[#2FA36B]"
                    : "bg-[#FFFFFF] border-[#D8E0E7] hover:border-[#2E8B8B] text-[#1F2A37]"
                }`}
              >
                <Wind className="w-5 h-5" />
                <div className="text-center">
                  <div className="text-[11px] font-mono font-bold">VALET GOVERNOR</div>
                  <div className="text-[9px] font-mono text-[#5B6675]">
                    {activeVehicle.valetActive ? "Limit: 50 km/h" : "Unrestricted"}
                  </div>
                </div>
              </button>
            </div>

            {/* Pre-Conditioning Thermostat Widget */}
            <div className="bg-[#EEF2F5] border border-[#D8E0E7] p-3 rounded-xl flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5B6675] uppercase">Target Cabin Temp</span>
                <span className="text-xs font-bold font-mono text-[#1F2A37]">
                  {activeVehicle.climateTempC.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setClimateTemp(18.0)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    activeVehicle.climateTempC === 18.0
                      ? "bg-[#2E8B8B] text-white"
                      : "bg-[#FFFFFF] border border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                  }`}
                >
                  18°C Eco
                </button>
                <button
                  onClick={() => setClimateTemp(21.0)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    activeVehicle.climateTempC === 21.0
                      ? "bg-[#2E8B8B] text-white"
                      : "bg-[#FFFFFF] border border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                  }`}
                >
                  21°C Comfort
                </button>
                <button
                  onClick={() => setClimateTemp(24.5)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    activeVehicle.climateTempC === 24.5
                      ? "bg-[#2E8B8B] text-white"
                      : "bg-[#FFFFFF] border border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                  }`}
                >
                  24.5°C Warm
                </button>
              </div>
            </div>
          </div>

          {/* Alerts & Attention Summary Card */}
          <div className="nebula-card p-4 sm:p-5 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#D8E0E7] pb-2">
              <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                SYSTEM FEED
              </span>
              <Link href="/alerts" className="text-[10px] font-mono text-[#2E8B8B] hover:underline">
                View All ({unreadAlertsCount})
              </Link>
            </div>

            <div className="space-y-2">
              {isFaultActive ? (
                <div className="p-2.5 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] text-xs font-mono text-[#C74E58]">
                  <div className="font-bold flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Fault: {activeVehicle.activeFaults[0].code}</span>
                  </div>
                  <div className="text-[10px] text-[#5B6675] mt-1">
                    {activeVehicle.activeFaults[0].description}
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#2FA36B]">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All Subsystems Nominal</span>
                  </div>
                  <div className="text-[10px] text-[#5B6675] mt-1">
                    CAN bus telemetry poller healthy. 0 active DTC faults.
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-mono text-[#5B6675] pt-1">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#2E8B8B]" />
                  <span>Next scheduled service</span>
                </span>
                <span className="font-bold text-[#1F2A37]">In 2,450 KM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. LOWER ROW: 4-CORNER TPMS MESH + MAINTENANCE PREVIEW     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        {/* Module 1: TPMS Mesh Quick Status */}
        <div className="nebula-card p-4 sm:p-6 flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center justify-between border-b border-[#D8E0E7] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                CHASSIS SAFETY
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1F2A37]">
                TPMS Tyre Mesh Readouts
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="text-xs font-mono text-[#2E8B8B] hover:underline flex items-center space-x-1"
            >
              <span>Detailed TPMS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 my-4">
            {activeVehicle.tires.map((t) => {
              const isWarning = t.status === "warning" || t.status === "critical";
              return (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between ${
                    isWarning
                      ? "bg-[#FFF1F2] border-[#FECDD3] text-[#C74E58]"
                      : "bg-[#FFFFFF] border-[#D8E0E7] text-[#1F2A37]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">{t.name} ({t.id})</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWarning ? "bg-[#C74E58] animate-ping" : "bg-[#2FA36B]"
                      }`}
                    />
                  </div>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <span className="font-display font-bold text-xl sm:text-2xl font-mono-numbers">
                      {t.psi.toFixed(1)}
                    </span>
                    <span className="text-[10px] font-mono text-[#5B6675]">PSI</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#5B6675] mt-1 gap-1">
                    <span>Temp: {t.tempC}°C</span>
                    <span>Target: {t.targetPsi}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
            <span>Calibrated Range: 30.0–42.0 PSI</span>
            <span className="text-[#2FA36B] font-bold">433 MHz RF Wheel Link OK</span>
          </div>
        </div>

        {/* Module 2: Maintenance & Next Service Card */}
        <div className="nebula-card p-4 sm:p-6 flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center justify-between border-b border-[#D8E0E7] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                LIFECYCLE PREDICTIVE
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1F2A37]">
                Maintenance & Next Service
              </h3>
            </div>
            <Link
              href={`/vehicle/${activeVehicle.id}/maintenance`}
              className="text-xs font-mono text-[#2E8B8B] hover:underline flex items-center space-x-1"
            >
              <span>Service Roster</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 my-3">
            <div className="p-3.5 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#1F2A37]">
                    Carbon-Ceramic Brake Pad Inspection
                  </h4>
                  <p className="text-[10px] font-mono text-[#5B6675]">
                    Due Target: 20,000 KM • Current: {activeVehicle.odometerKm.toLocaleString()} KM
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B98121] border border-[#FDE68A]">
                DUE SOON
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#2FA36B]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#1F2A37]">
                    High-Voltage Dielectric Coolant Flush
                  </h4>
                  <p className="text-[10px] font-mono text-[#5B6675]">
                    Certified service logged at 15,000 KM
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] text-[#2FA36B] border border-[#BBF7D0]">
                OPTIMAL
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
            <span>Predictive Decay Algorithm Active</span>
            <Link
              href={`/vehicle/${activeVehicle.id}/maintenance`}
              className="text-[#2E8B8B] hover:underline"
            >
              Log New Service +
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
