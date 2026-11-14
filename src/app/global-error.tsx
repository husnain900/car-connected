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
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-[#091321] text-[#F5F8FC] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#152437] border border-[#293C51] shadow-2xl flex flex-col items-center text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F16D78]/15 border border-[#F16D78]/30 flex items-center justify-center text-[#F16D78]">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-[#79C7FF] font-bold tracking-widest block">
              NEBULA DRIVE VEHICLE OS v4.2
            </span>
            <h1 className="font-display font-black text-2xl text-[#F5F8FC] mt-1">
              System Recovery Mode
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-2 leading-relaxed">
              The telemetry interface encountered an unexpected layout event. Tap below to reload the cockpit session.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5 w-full pt-2">
            <button
              onClick={() => reset()}
              className="w-full min-h-[44px] py-3 rounded-xl bg-[#79C7FF] text-[#091321] font-mono font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY COCKPIT</span>
            </button>

            <button
              onClick={handleResetSession}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#1E314B] border border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC] font-mono text-xs font-bold cursor-pointer"
            >
              <span>CLEAR CACHE & RESTART ENGINE</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
