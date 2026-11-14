"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for diagnostics
    console.error("Nebula Drive Application Error:", error);
  }, [error]);

  const handleClearCacheAndReset = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("nebula_drive_v4_state");
        sessionStorage.clear();
      }
    } catch {
      // Ignore
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 select-none">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#152437] border border-[#293C51] shadow-2xl flex flex-col items-center text-center space-y-5">
        <NebulaLogo size="md" showText={false} />

        <div className="w-14 h-14 rounded-2xl bg-[#F16D78]/15 border border-[#F16D78]/30 flex items-center justify-center text-[#F16D78]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-[#F16D78] font-bold tracking-widest block">
            TELEMETRY BUS EXCEPTION // RECOVERY MODE
          </span>
          <h2 className="font-display font-black text-2xl text-[#F5F8FC] mt-1">
            Cockpit Session Interrupted
          </h2>
          <p className="text-xs font-mono text-[#A5B5C8] mt-2 max-w-md leading-relaxed">
            A temporary client-side state discrepancy occurred. You can seamlessly reload the telemetry engine or clear stale cache to restore full operation.
          </p>
        </div>

        {error?.message && (
          <div className="w-full p-3 rounded-xl bg-[#091321] border border-[#293C51] text-left">
            <span className="text-[9px] font-mono text-[#A5B5C8] uppercase block">DIAGNOSTIC LOG:</span>
            <code className="text-[11px] font-mono text-[#F16D78] block truncate mt-0.5">
              {error.message}
            </code>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETRY COCKPIT</span>
          </button>

          <button
            onClick={handleClearCacheAndReset}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1E314B] hover:bg-[#253956] border border-[#293C51] text-[#F5F8FC] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <span>RESET CACHE & RELOAD</span>
          </button>
        </div>

        <Link
          href="/"
          className="text-xs font-mono text-[#A5B5C8] hover:text-[#79C7FF] flex items-center space-x-1.5 transition-colors pt-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Nebula Drive Portal</span>
        </Link>
      </div>
    </div>
  );
}

