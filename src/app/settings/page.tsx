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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Settings & Preferences</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Platform Configuration & Settings
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Telemetry units, simulation parameters, telemetry bridges, and authenticated driver identity.
            </p>
          </div>

          {savedNotice && (
            <div className="px-3.5 py-1.5 rounded-xl bg-[#35C99A]/15 border border-[#35C99A]/30 text-xs font-mono text-[#35C99A] flex items-center space-x-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved</span>
            </div>
          )}
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Measurement Units */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-[#79C7FF]" />
              <h2 className="font-display font-bold text-lg text-[#F5F8FC]">Measurement Units</h2>
            </div>
            <p className="text-xs font-mono text-[#A5B5C8]">
              Choose preferred telemetry measurement system for velocity, distance, and pressure.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6">
              <button
                onClick={() => handleUnitChange("METRIC")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all ${
                  settings.unitSystem === "METRIC"
                    ? "bg-[#79C7FF]/15 border-[#79C7FF] text-[#F5F8FC]"
                    : "bg-[#1E314B] border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
              >
                <div className="text-xs font-bold text-[#F5F8FC]">METRIC (SI)</div>
                <div className="text-[10px] text-[#A5B5C8] mt-1">KM/H • KM • °C • PSI</div>
              </button>

              <button
                onClick={() => handleUnitChange("IMPERIAL")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all ${
                  settings.unitSystem === "IMPERIAL"
                    ? "bg-[#79C7FF]/15 border-[#79C7FF] text-[#F5F8FC]"
                    : "bg-[#1E314B] border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
              >
                <div className="text-xs font-bold text-[#F5F8FC]">IMPERIAL</div>
                <div className="text-[10px] text-[#A5B5C8] mt-1">MPH • MILES • °F • BAR</div>
              </button>
            </div>
            <div className="pt-3 border-t border-[#293C51] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A5B5C8]">Sound Feedback:</span>
              <button
                onClick={handleSoundToggle}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold cursor-pointer ${
                  settings.soundFeedback
                    ? "bg-[#79C7FF]/20 text-[#79C7FF] border border-[#79C7FF]/30"
                    : "bg-[#1E314B] border border-[#293C51] text-[#A5B5C8]"
                }`}
              >
                {settings.soundFeedback ? "ENABLED" : "MUTED"}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#293C51] text-[10px] font-mono text-[#A5B5C8]">
            Active Unit: {settings.unitSystem} Standard
          </div>
        </div>

        {/* Module 2: Driver & Student Identity */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-[#79C7FF]" />
              <h2 className="font-display font-bold text-lg text-[#F5F8FC]">Driver & Tenancy Profile</h2>
            </div>
            <p className="text-xs font-mono text-[#A5B5C8]">
              Authenticated user details active across telemetry audit and command logs.
            </p>

            <div className="p-4 rounded-xl bg-[#1E314B] border border-[#293C51] space-y-2.5 my-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#A5B5C8]">Student Engineer:</span>
                <span className="font-bold text-[#F5F8FC]">{user?.name || "Zainab Amanat"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5B5C8]">Roll Number:</span>
                <span className="font-bold text-[#79C7FF] font-mono-numbers">
                  {user?.rollNo || "M245008"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5B5C8]">Access Role:</span>
                <span className="text-[#35C99A] font-bold">{user?.role || "STUDENT_LEAD"}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#293C51] text-[10px] font-mono text-[#A5B5C8]">
            Tenancy: Single-Institution Student Project Sandbox
          </div>
        </div>
      </div>

      {/* Danger Zone / Factory Reset */}
      <div className="p-6 rounded-2xl bg-[#F16D78]/10 border border-[#F16D78]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-[#F16D78]">
            Reset Vehicle State to Factory Seed
          </h3>
          <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
            Clear all injected fault codes, tyre punctures, and custom audit entries back to nominal status.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="px-4 py-2 rounded-xl bg-[#F16D78] hover:bg-[#d95d67] text-white font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET TO DEFAULTS</span>
        </button>
      </div>
    </div>
  );
}
