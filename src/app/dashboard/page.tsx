"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Share2,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  Wind,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sliders,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useSimulationStore } from "@/lib/simulationStore";

// Dynamically import 3D WebGL Digital Twin with ssr: false for rock-solid stability
const Vehicle3DViewer = dynamic(() => import("@/components/Vehicle3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden flex items-center justify-center bg-transparent select-none">
      <div className="relative w-[92%] sm:w-[86%] h-[82%] flex items-center justify-center">
        <Image
          src="/assets/images/tesla-roadster-transparent.png"
          alt="Hypercar Studio Staging"
          fill
          className="object-contain filter contrast-105 drop-shadow-[0_20px_45px_rgba(46,139,139,0.22)]"
          priority
        />
      </div>
      {/* Instant Floating Color Capsule Pill */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#18202A]/92 border border-white/10 shadow-2xl backdrop-blur-md">
        <span className="text-xs sm:text-sm font-medium text-[#E2E8F0]">Color</span>
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#18202A] ring-2 ring-white ring-offset-2 ring-offset-[#18202A]" />
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F8FAFC]" />
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F43F5E]" />
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#00C2B2]" />
        </div>
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
  } = useSimulationStore();

  const [currentColorHex, setCurrentColorHex] = useState("#1A222D");
  const [showActuatorDeck, setShowActuatorDeck] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const isFaultActive = Boolean(
    activeVehicle?.activeFaults && activeVehicle.activeFaults.length > 0
  );
  const faultCount = isFaultActive ? activeVehicle.activeFaults.length : 3;

  const avgPsi = (
    activeVehicle.tires.reduce((acc, t) => acc + t.psi, 0) /
    (activeVehicle.tires.length || 1)
  ).toFixed(1);

  const handleShareClick = () => {
    const powerDisplay = activeVehicle.powerKw ?? 71.5;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `NEBULA DRIVE - Vehicle Telemetry [${activeVehicle.name}]: Power ${powerDisplay}kW, Speed ${activeVehicle.currentSpeedKmH}km/h, Battery ${activeVehicle.batteryLevelPct}%`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EDF2F0] text-[#1F2A37] select-none py-4 sm:py-7 px-3 sm:px-6 lg:px-10 flex flex-col space-y-6 sm:space-y-8 max-w-[1440px] mx-auto">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: EDITORIAL SHOWCASE (Exact Reference Match)*/}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-4 pr-0 lg:pr-4">
          {/* Eyebrow & Vehicle ID Tag */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#00C2B2] uppercase tracking-widest">
              TELEMETRY COCKPIT
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[11px] font-medium text-[#64748B] tracking-wide">
              ID: 319801
            </span>
            <span className="text-[#94A3B8] hidden sm:inline">•</span>
            <span className="text-[10px] font-mono text-[#94A3B8] hidden sm:inline">
              VIN: {activeVehicle.vin.slice(0, 14)}...
            </span>
          </div>

          {/* Primary Editorial Title */}
          <div className="space-y-1">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-tight text-[#111827]">
              {activeVehicle.name || "Axiora Pulse Max"}
            </h1>
            <p className="text-xs sm:text-sm font-sans font-medium text-[#64748B]">
              ID: 319801
            </p>
          </div>

          {/* Editorial Vehicle Description */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#475569] max-w-lg font-sans">
            Nexora Pulse X combines future-ready innovation, powerful performance,
            and modern style to deliver speed, precision, and confidence for
            ambitious, forward-thinking individuals.
          </p>

          {/* Primary Pill Button ("See More →") & Sub-Action */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
            <Link
              href={`/vehicle/${activeVehicle.id}`}
              className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3 rounded-full bg-[#111827] text-white hover:bg-black transition-all text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => setShowActuatorDeck(!showActuatorDeck)}
              className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-full bg-white/80 hover:bg-white border border-[#D8E0E7] text-[#1F2A37] text-xs font-mono font-medium transition-all cursor-pointer shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-[#00C2B2]" />
              <span>{showActuatorDeck ? "Hide Actuators" : "Actuator Deck"}</span>
              {showActuatorDeck ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Hero Car Stage (Transparent Canvas & Floating Swatches) */}
        <div className="lg:col-span-7 relative w-full flex flex-col items-center justify-center">
          {/* Seamless Staged 3D / 2D Studio Car Frame */}
          <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden flex items-center justify-center bg-transparent">
            <Vehicle3DViewer
              vehicle={activeVehicle}
              selectedColorHex={currentColorHex}
              onColorChange={(hex) => setCurrentColorHex(hex)}
              className="border-0 bg-transparent shadow-none"
              hidePresetBar={true}
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOWER COMPOSITION: 4-CARD METRIC GRID (Exact Reference)*/}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* --------------------------------------------------------- */}
        {/* CARD 1: Current Power Consumption (Left Column)           */}
        {/* --------------------------------------------------------- */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[340px]">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-semibold text-sm sm:text-base text-[#111827]">
              Current power consumption
            </h3>
            <button
              onClick={handleShareClick}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#111827] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              title="Share power consumption stats"
              aria-label="Share metrics"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Big Stat Readout */}
          <div className="my-2">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#111827] font-mono-numbers tracking-tight">
                {activeVehicle.powerKw ? activeVehicle.powerKw.toFixed(1) : "71.5"}
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#111827] font-sans">
                kW
              </span>
            </div>
          </div>

          {/* Breakdown Rows with Dotted Lines */}
          <div className="space-y-2.5 my-2">
            {/* Row 1: Drive */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00C2B2]" />
                <span className="text-[#334155] font-medium">Drive</span>
              </div>
              <span className="font-mono font-bold text-[#111827]">41%</span>
            </div>
            <div className="border-b border-dashed border-[#E2E8F0] w-full" />

            {/* Row 2: Eco */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-[#334155] font-medium">Eco</span>
              </div>
              <span className="font-mono font-bold text-[#111827]">53%</span>
            </div>
            <div className="border-b border-dashed border-[#E2E8F0] w-full" />

            {/* Row 3: Charge */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F43F5E]" />
                <span className="text-[#334155] font-medium">Charge</span>
              </div>
              <span className="font-mono font-bold text-[#111827]">5%</span>
            </div>
          </div>

          {/* Sub-Metric Columns */}
          <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-[11px] font-mono text-[#94A3B8] pt-2 border-t border-[#F1F5F9]">
            <div>Drive 31.5 kW</div>
            <div>Eco 40.1 kW</div>
            <div>Charge 4.3 kW</div>
          </div>

          {/* Animated Dotted Matrix / Equalizer Clusters */}
          <div className="pt-3 grid grid-cols-3 gap-3 items-end">
            {/* Cluster 1: Teal Equalizer */}
            <div className="flex items-end justify-center space-x-1 h-9">
              {[3, 5, 4, 6].map((dots, colIdx) => (
                <div key={colIdx} className="flex flex-col space-y-0.5 justify-end">
                  {Array.from({ length: dots }).map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className="w-1.5 h-1.5 rounded-full bg-[#00C2B2] animate-dot-pulse"
                      style={{ animationDelay: `${(colIdx * 0.15 + dotIdx * 0.1).toFixed(2)}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Cluster 2: Cyan Equalizer */}
            <div className="flex items-end justify-center space-x-1 h-9">
              {[4, 3, 5, 3].map((dots, colIdx) => (
                <div key={colIdx} className="flex flex-col space-y-0.5 justify-end">
                  {Array.from({ length: dots }).map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-dot-pulse"
                      style={{ animationDelay: `${(colIdx * 0.18 + dotIdx * 0.08).toFixed(2)}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Cluster 3: Pink Equalizer */}
            <div className="flex items-end justify-center space-x-1 h-9">
              {[2, 5, 4, 5].map((dots, colIdx) => (
                <div key={colIdx} className="flex flex-col space-y-0.5 justify-end">
                  {Array.from({ length: dots }).map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-dot-pulse"
                      style={{ animationDelay: `${(colIdx * 0.12 + dotIdx * 0.15).toFixed(2)}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* CENTER STACK: Card 2 & Card 3 (Middle Column)             */}
        {/* --------------------------------------------------------- */}
        <div className="flex flex-col space-y-5 lg:space-y-6">
          {/* CARD 2: Vehicle Telemetry / Speed Preview Widget */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            {/* Top Telemetry Row & Center Car */}
            <div className="grid grid-cols-12 items-center gap-2 py-2">
              {/* Left Stat: Power */}
              <div className="col-span-3 flex flex-col">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#111827] font-mono-numbers">
                  {Math.round(activeVehicle.powerKw || 72)}
                </span>
                <span className="text-[11px] font-mono text-[#64748B] uppercase">
                  kW
                </span>
              </div>

              {/* Center Silhouette */}
              <div className="col-span-6 relative h-16 sm:h-20 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[160px]">
                  <Image
                    src="/assets/images/tesla-roadster-transparent.png"
                    alt="Tesla Silhouette"
                    fill
                    className="object-contain filter contrast-105"
                  />
                </div>
              </div>

              {/* Right Stat: Speed */}
              <div className="col-span-3 flex flex-col items-end">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#111827] font-mono-numbers">
                  {Math.round(activeVehicle.currentSpeedKmH || 113)}
                </span>
                <span className="text-[11px] font-mono text-[#64748B] uppercase">
                  km/h
                </span>
              </div>
            </div>

            {/* Accent Border Lines (Teal Left, Pink Right) */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-1 bg-[#00C2B2] rounded-full w-24 sm:w-28" />
              <div className="h-4 border-r-2 border-b-2 border-[#F43F5E] rounded-br-lg w-20 sm:w-24" />
            </div>
          </div>

          {/* CARD 3: Maintenance Forecast Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-semibold text-sm sm:text-base text-[#111827]">
                Maintenance Forecast
              </h3>
              <button
                onClick={handleShareClick}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#111827] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                title="Share maintenance forecast"
                aria-label="Share forecast"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Progress Milestones */}
            <div className="space-y-3.5 my-3">
              {/* Item 1: Oil Change */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#334155] font-medium">Oil Change in 1300km</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div className="h-full bg-[#F43F5E] rounded-full w-[85%]" />
                </div>
              </div>

              {/* Item 2: Brake Pad Life 65% */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#334155] font-medium">Brake pad life 65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div className="h-full stripe-teal rounded-full w-[65%]" />
                </div>
              </div>

              {/* Item 3: Pressure Check Overdue */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#334155] font-medium">Pressure check Overdue</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div className="h-full stripe-overdue rounded-full w-[90%]" />
                </div>
              </div>
            </div>

            {/* Bottom Dates */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-2 border-t border-[#F1F5F9]">
              <span>15/12/2025</span>
              <span>15/12/2026</span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* CARD 4: System Warning with 3-Pillar Chart (Right Column) */}
        {/* --------------------------------------------------------- */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[340px]">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-semibold text-sm sm:text-base text-[#111827]">
              System warning
            </h3>
            <Link
              href="/alerts"
              className="text-xs font-sans text-[#64748B] hover:text-[#111827] transition-colors"
            >
              See more
            </Link>
          </div>

          {/* Big Error Stat */}
          <div className="my-2">
            <div className="flex items-baseline space-x-2">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#111827] font-mono-numbers">
                {faultCount}
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#111827] font-sans">
                errors found
              </span>
            </div>
          </div>

          {/* Vertical 3-Pillar Bar Chart */}
          <div className="pt-2 pb-1">
            <div className="h-44 sm:h-48 flex items-end justify-between px-3 sm:px-6 gap-3">
              {/* Pillar 1: Gearbox */}
              <div className="flex-1 flex flex-col items-center space-y-2 h-full justify-end">
                <span className="text-[11px] font-sans text-[#64748B] font-medium">
                  Gearbox
                </span>
                <div
                  className="w-full max-w-[56px] bg-[#A7F3D0] rounded-t-xl transition-all duration-500 hover:opacity-90"
                  style={{ height: "42%" }}
                  title="Gearbox: 42% stress level"
                />
              </div>

              {/* Pillar 2: Wheels */}
              <div className="flex-1 flex flex-col items-center space-y-2 h-full justify-end">
                <span className="text-[11px] font-sans text-[#64748B] font-medium">
                  Wheels
                </span>
                <div
                  className="w-full max-w-[56px] bg-[#2DD4BF] rounded-t-xl transition-all duration-500 hover:opacity-90"
                  style={{ height: "65%" }}
                  title="Wheels: 65% wear index"
                />
              </div>

              {/* Pillar 3: Engine */}
              <div className="flex-1 flex flex-col items-center space-y-2 h-full justify-end">
                <span className="text-[11px] font-sans text-[#64748B] font-medium">
                  Engine
                </span>
                <div
                  className="w-full max-w-[56px] bg-[#FB7185] rounded-t-xl transition-all duration-500 hover:opacity-90 animate-pulse"
                  style={{ height: "88%" }}
                  title="Engine: 88% thermal warning"
                />
              </div>
            </div>
          </div>

          {/* Bottom Diagnostic Action Strip */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
            <span>CAN Diagnostics // DTC</span>
            <Link
              href={`/vehicle/${activeVehicle.id}/diagnostics`}
              className="text-[#00C2B2] hover:underline font-bold"
            >
              Clear Faults →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE ACTUATOR DECK & TPMS MESH (Collapsible)    */}
      {/* ========================================================= */}
      {showActuatorDeck && (
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] shadow-sm animate-in fade-in duration-300 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00C2B2] font-bold">
                UNIVERSITY VIVA DEFENSE // COCKPIT BENCH
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#111827]">
                Remote Actuators & 4-Corner TPMS Wheel Sensors
              </h2>
            </div>
            <div className="text-xs font-mono text-[#64748B]">
              Author: <strong className="text-[#111827]">Zainab Amanat (M245008)</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Actuator 1: Doors */}
            <button
              onClick={() =>
                executeCommand(
                  activeVehicle.isLocked ? "UNLOCK_VEHICLE" : "LOCK_VEHICLE"
                )
              }
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                activeVehicle.isLocked
                  ? "bg-white border-[#E2E8F0] hover:border-[#00C2B2] text-[#111827]"
                  : "bg-[#E7F3F1] border-[#00C2B2] text-[#00C2B2]"
              }`}
            >
              {activeVehicle.isLocked ? (
                <Lock className="w-5 h-5 text-[#64748B]" />
              ) : (
                <Unlock className="w-5 h-5 text-[#00C2B2]" />
              )}
              <div className="text-center font-mono">
                <div className="text-xs font-bold">
                  {activeVehicle.isLocked ? "UNLOCK DOORS" : "LOCK PERIMETER"}
                </div>
                <div className="text-[10px] text-[#64748B]">
                  {activeVehicle.isLocked ? "Status: Secured" : "Status: Open"}
                </div>
              </div>
            </button>

            {/* Actuator 2: Valet Mode */}
            <button
              onClick={() => executeCommand("TOGGLE_VALET")}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                activeVehicle.valetActive
                  ? "bg-[#F0FDF4] border-[#2FA36B] text-[#2FA36B]"
                  : "bg-white border-[#E2E8F0] hover:border-[#00C2B2] text-[#111827]"
              }`}
            >
              <Wind className="w-5 h-5" />
              <div className="text-center font-mono">
                <div className="text-xs font-bold">VALET GOVERNOR</div>
                <div className="text-[10px] text-[#64748B]">
                  {activeVehicle.valetActive ? "Governor: 50 km/h" : "Unrestricted"}
                </div>
              </div>
            </button>

            {/* Actuator 3: Thermostat */}
            <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#64748B]">CABIN TEMP</span>
                <span className="font-bold text-[#111827]">
                  {activeVehicle.climateTempC.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                {[18.0, 21.0, 24.5].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setClimateTemp(temp)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      activeVehicle.climateTempC === temp
                        ? "bg-[#00C2B2] text-white"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#111827]"
                    }`}
                  >
                    {temp}°C
                  </button>
                ))}
              </div>
            </div>

            {/* Actuator 4: DTC Fault Injector / Reset */}
            <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">DTC BENCH</span>
                <span
                  className={`font-bold ${
                    isFaultActive ? "text-[#F43F5E]" : "text-[#2FA36B]"
                  }`}
                >
                  {isFaultActive ? "FAULT DETECTED" : "NOMINAL"}
                </span>
              </div>
              <button
                onClick={clearAllFaults}
                className="w-full py-1.5 rounded-lg bg-white hover:bg-[#EEF2F5] border border-[#D8E0E7] text-xs font-bold text-[#111827] transition-colors cursor-pointer"
              >
                Clear All Faults
              </button>
            </div>
          </div>

          {/* 4-Wheel TPMS Mesh */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                TPMS Wireless Sensor Mesh:
              </span>
              <span className="text-[11px] font-mono text-[#111827] font-bold">
                Average Pressure: {avgPsi} PSI
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeVehicle.tires.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl border border-[#E2E8F0] bg-white flex flex-col justify-between font-mono"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{t.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        t.status === "critical"
                          ? "bg-[#F43F5E] animate-ping"
                          : t.status === "warning"
                          ? "bg-[#B98121]"
                          : "bg-[#2FA36B]"
                      }`}
                    />
                  </div>
                  <div className="mt-1 flex items-baseline space-x-1">
                    <span className="font-display font-bold text-xl text-[#111827]">
                      {t.psi.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-[#64748B]">PSI</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-1">
                    Temp: {t.tempC}°C
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Toast Feedback */}
      {copiedShare && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-[#111827] text-white text-xs font-mono shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#00C2B2]" />
          <span>Telemetry snapshot copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
