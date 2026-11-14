"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  const handleResetSession = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch {
      // Ignore
    }
    window.location.href = "/dashboard";
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F6F8FA] text-[#1F2A37] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#D8E0E7] shadow-[0_10px_40px_rgba(31,42,55,0.08)] flex flex-col items-center text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center text-[#C74E58]">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-widest block">
              NEBULA DRIVE VEHICLE OS v4.2
            </span>
            <h1 className="font-display font-bold text-2xl text-[#1F2A37] mt-1">
              System Recovery Mode
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-2 leading-relaxed">
              The telemetry interface encountered an unexpected layout event. Tap below to reload the cockpit session or clear cache.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5 w-full pt-2">
            <button
              onClick={() => reset()}
              className="w-full min-h-[44px] py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY COCKPIT</span>
            </button>

            <button
              onClick={handleResetSession}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#EEF2F5] hover:bg-[#E2E8F0] border border-[#D8E0E7] text-[#1F2A37] font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              <span>CLEAR CACHE & RESTART ENGINE</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
