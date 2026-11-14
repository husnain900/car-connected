"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Sparkles } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function DashboardErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Nebula Drive Dashboard Exception Caught:", error);
  }, [error]);

  const handleResetTelemetryState = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("nebula_drive_v4_state");
        sessionStorage.clear();
      }
    } catch {
      // Safe guard
    }
    window.location.reload();
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 select-none">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#D8E0E7] shadow-[0_10px_40px_rgba(31,42,55,0.08)] flex flex-col items-center text-center space-y-5">
        <NebulaLogo size="md" showText={false} />

        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center text-[#C74E58]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-[#C74E58] font-bold tracking-widest block">
            TELEMETRY BUS EXCEPTION // COCKPIT RESTORATION
          </span>
          <h2 className="font-display font-bold text-2xl text-[#1F2A37] mt-1">
            Cockpit Session Paused
          </h2>
          <p className="text-xs font-mono text-[#5B6675] mt-2 max-w-md leading-relaxed">
            The vehicle telemetry stream encountered a temporary client-side discrepancy. Tap below to seamlessly re-initialize the cockpit or clear local telemetry cache.
          </p>
        </div>

        {error?.message && (
          <div className="w-full p-3 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-left">
            <span className="text-[9px] font-mono text-[#5B6675] uppercase block font-bold">
              DIAGNOSTIC LOG:
            </span>
            <code className="text-[11px] font-mono text-[#C74E58] block truncate mt-0.5">
              {error.message}
            </code>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETRY COCKPIT</span>
          </button>

          <button
            onClick={handleResetTelemetryState}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#EEF2F5] hover:bg-[#E2E8F0] border border-[#D8E0E7] text-[#1F2A37] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#2E8B8B]" />
            <span>RESET CACHE & RELOAD</span>
          </button>
        </div>

        <Link
          href="/"
          className="text-xs font-mono text-[#5B6675] hover:text-[#2E8B8B] flex items-center space-x-1.5 transition-colors pt-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Nebula Drive Portal</span>
        </Link>
      </div>
    </div>
  );
}
