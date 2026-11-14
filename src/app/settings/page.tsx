"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  Globe,
  User,
  Volume2,
  VolumeX,
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
      try {
        localStorage.removeItem("nebula_drive_v4_state");
        sessionStorage.clear();
      } catch {}
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Settings &amp; Preferences</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Platform Configuration &amp; Settings
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Telemetry units, simulation parameters, telemetry bridges, and authenticated driver identity.
            </p>
          </div>

          {savedNotice && (
            <div className="px-3.5 py-1.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#2FA36B] flex items-center space-x-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved</span>
            </div>
          )}
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Module 1: Measurement Units */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-[#2E8B8B]" />
              <h2 className="font-display font-bold text-lg text-[#1F2A37]">Measurement Units</h2>
            </div>
            <p className="text-xs font-mono text-[#5B6675]">
              Choose preferred telemetry measurement system for velocity, distance, and pressure.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6">
              <button
                onClick={() => handleUnitChange("METRIC")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all shadow-xs ${
                  settings.unitSystem === "METRIC"
                    ? "bg-[#E7F3F1] border-[#2E8B8B] text-[#1F2A37]"
                    : "bg-[#FFFFFF] border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                <div className="text-xs font-bold text-[#1F2A37]">METRIC (SI)</div>
                <div className="text-[10px] text-[#5B6675] mt-1">KM/H • KM • °C • PSI</div>
              </button>

              <button
                onClick={() => handleUnitChange("IMPERIAL")}
                className={`p-4 rounded-xl border text-left font-mono cursor-pointer transition-all shadow-xs ${
                  settings.unitSystem === "IMPERIAL"
                    ? "bg-[#E7F3F1] border-[#2E8B8B] text-[#1F2A37]"
                    : "bg-[#FFFFFF] border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                <div className="text-xs font-bold text-[#1F2A37]">IMPERIAL</div>
                <div className="text-[10px] text-[#5B6675] mt-1">MPH • MILES • °F • BAR</div>
              </button>
            </div>

            <div className="pt-3 border-t border-[#D8E0E7] flex items-center justify-between">
              <span className="text-xs font-mono text-[#5B6675]">Audio Feedback:</span>
              <button
                onClick={handleSoundToggle}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors flex items-center space-x-1.5 ${
                  settings.soundFeedback
                    ? "bg-[#E7F3F1] text-[#2E8B8B] border border-[#86B6B2]/40"
                    : "bg-[#EEF2F5] text-[#5B6675]"
                }`}
              >
                {settings.soundFeedback ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{settings.soundFeedback ? "ENABLED" : "MUTED"}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
            Active Telemetry Unit: <strong>{settings.unitSystem} Standard</strong>
          </div>
        </div>

        {/* Module 2: Driver & Student Identity */}
        <div className="nebula-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-[#2E8B8B]" />
              <h2 className="font-display font-bold text-lg text-[#1F2A37]">Driver &amp; Tenancy Profile</h2>
            </div>
            <p className="text-xs font-mono text-[#5B6675]">
              Authenticated user details active across telemetry audit and command logs.
            </p>

            <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2.5 my-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#5B6675]">Student Engineer:</span>
                <span className="font-bold text-[#1F2A37]">{user?.name || "Zainab Amanat"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6675]">Roll Number:</span>
                <span className="font-bold text-[#2E8B8B] font-mono-numbers">
                  {user?.rollNo || "M245008"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6675]">Access Role:</span>
                <span className="text-[#2FA36B] font-bold">{user?.role || "STUDENT_LEAD"}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
            Tenancy: Single-Institution Student Project Sandbox (Zainab Amanat - M245008)
          </div>
        </div>
      </div>

      {/* Factory Reset Danger Zone */}
      <div className="p-6 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-[#C74E58]">
            Reset Vehicle State to Factory Seed
          </h3>
          <p className="text-xs font-mono text-[#5B6675] mt-0.5">
            Clear all injected fault codes, tyre punctures, and custom audit entries back to nominal status.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="px-4 py-2 rounded-xl bg-[#C74E58] hover:bg-[#b0404a] text-white font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET TO DEFAULTS</span>
        </button>
      </div>
    </div>
  );
}
