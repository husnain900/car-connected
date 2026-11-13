"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  Globe,
  User,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function SettingsPage() {
  const { settings, updateSettings, user } = useSimulationStore();

  const [savedNotice, setSavedNotice] = useState(false);

  const handleUnitChange = (unit: "METRIC" | "IMPERIAL") => {
    updateSettings({ unitSystem: unit });
    triggerSave();
  };

  const handleSoundToggle = () => {
    updateSettings({ soundFeedback: !settings.soundFeedback });
    triggerSave();
  };

  const triggerSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const resetAllData = () => {
    if (confirm("Reset all vehicle telemetry, fault codes, and audit logs to original defaults?")) {
      localStorage.removeItem("nebula_drive_v4_state");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Settings & Preferences</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Platform Configuration & Settings
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Telemetry units, simulation parameters, telemetry bridges, and authenticated driver identity.
            </p>
          </div>

          {savedNotice && (
            <div className="px-3.5 py-1.5 rounded-xl bg-[#43D9A3]/15 border border-[#43D9A3]/30 text-xs font-mono text-[#43D9A3] flex items-center space-x-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved</span>
            </div>
          )}
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Measurement Units */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-[#D6F45A]" />
              <h2 className="font-display font-bold text-lg text-[#F4F7FB]">Measurement Units</h2>
            </div>
            <p className="text-xs font-mono text-[#8794A6]">
              Choose preferred telemetry measurement system for velocity, distance, and pressure.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6">
              <button
                onClick={() => handleUnitChange("METRIC")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all ${
                  settings.unitSystem === "METRIC"
                    ? "bg-[#D6F45A]/15 border-[#D6F45A] text-[#F4F7FB]"
                    : "bg-[#1B2636] border-white/8 text-[#8794A6] hover:text-[#F4F7FB]"
                }`}
              >
                <div className="text-xs font-bold text-[#F4F7FB]">METRIC (SI)</div>
                <div className="text-[10px] text-[#8794A6] mt-1">KM/H • KM • °C • PSI</div>
              </button>

              <button
                onClick={() => handleUnitChange("IMPERIAL")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all ${
                  settings.unitSystem === "IMPERIAL"
                    ? "bg-[#D6F45A]/15 border-[#D6F45A] text-[#F4F7FB]"
                    : "bg-[#1B2636] border-white/8 text-[#8794A6] hover:text-[#F4F7FB]"
                }`}
              >
                <div className="text-xs font-bold text-[#F4F7FB]">IMPERIAL</div>
                <div className="text-[10px] text-[#8794A6] mt-1">MPH • MILES • °F • BAR</div>
              </button>
            </div>
            <div className="pt-3 border-t border-white/8 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8794A6]">Sound Feedback:</span>
              <button
                onClick={handleSoundToggle}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                  settings.soundFeedback
                    ? "bg-[#D6F45A]/20 text-[#D6F45A] border border-[#D6F45A]/30"
                    : "bg-white/10 text-[#8794A6]"
                }`}
              >
                {settings.soundFeedback ? "ENABLED" : "MUTED"}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/8 text-[10px] font-mono text-[#8794A6]">
            Active Unit: {settings.unitSystem} Standard
          </div>
        </div>

        {/* Module 2: Driver & Student Identity */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-[#D6F45A]" />
              <h2 className="font-display font-bold text-lg text-[#F4F7FB]">Driver & Tenancy Profile</h2>
            </div>
            <p className="text-xs font-mono text-[#8794A6]">
              Authenticated user details active across telemetry audit and command logs.
            </p>

            <div className="p-4 rounded-xl bg-[#1B2636] border border-white/8 space-y-2.5 my-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#8794A6]">Student Engineer:</span>
                <span className="font-bold text-[#F4F7FB]">{user?.name || "Zainab Amanat"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8794A6]">Roll Number:</span>
                <span className="font-bold text-[#D6F45A] font-mono-numbers">
                  {user?.rollNo || "M245008"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8794A6]">Access Role:</span>
                <span className="text-[#43D9A3] font-bold">{user?.role || "STUDENT_LEAD"}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/8 text-[10px] font-mono text-[#8794A6]">
            Tenancy: Single-Institution Student Project Sandbox
          </div>
        </div>
      </div>

      {/* Danger Zone / Factory Reset */}
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-red-200">
            Reset Vehicle State to Factory Seed
          </h3>
          <p className="text-xs font-mono text-red-300/80 mt-0.5">
            Clear all injected fault codes, tyre punctures, and custom audit entries back to nominal status.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET TO DEFAULTS</span>
        </button>
      </div>
    </div>
  );
}
