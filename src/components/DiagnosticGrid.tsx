"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, CheckCircle2, RefreshCw } from "lucide-react";

export default function DiagnosticGrid() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("ALL CONTROLLERS PASSING");

  const runDiagnosticScan = () => {
    setIsScanning(true);
    setScanMessage("POLLING 48 ECUs...");
    setTimeout(() => {
      setScanMessage("CAN BUS 2.0B VERIFIED");
      setTimeout(() => {
        setScanMessage("ALL CONTROLLERS PASSING");
        setIsScanning(false);
      }, 700);
    }, 700);
  };

  const cardVariants = {
    hover: {
      y: -4,
      borderColor: "rgba(0, 240, 255, 0.4)",
      boxShadow: "0 0 25px rgba(0, 240, 255, 0.08)",
      transition: {
        duration: 0.25,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="flex flex-col space-y-4 w-full select-none">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">
            HEALTH TELEMETRY
          </span>
          <h3 className="font-display font-bold text-lg tracking-widest text-text-base">
            DIAGNOSTIC TELEMETRY MATRIX
          </h3>
        </div>
        <button
          onClick={runDiagnosticScan}
          disabled={isScanning}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-neon-cyan text-xs font-mono font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-neon-cyan ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "SCANNING..." : "SCAN ECUs"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="glass-panel rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[230px] transition-all duration-300 border-zinc-800/80"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">
                BRAKING SYSTEMS
              </span>
              <h4 className="font-display font-bold text-base tracking-widest text-white mt-0.5">
                BRAKE WEAR
              </h4>
            </div>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neon-cyan">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4 flex flex-col space-y-3.5">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-semibold tracking-wider text-zinc-400">
                <span>FRONT AXLE WEAR</span>
                <span className="text-white font-mono-numbers">84% LIFE RETAINED</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-neon-cyan rounded-full transition-all duration-500" style={{ width: "84%" }} />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-semibold tracking-wider text-zinc-400">
                <span>REAR AXLE WEAR</span>
                <span className="text-white font-mono-numbers">89% LIFE RETAINED</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-neon-cyan rounded-full transition-all duration-500" style={{ width: "89%" }} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
            <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">STATUS</span>
            <span className="text-neon-emerald font-mono text-[10px] font-bold tracking-widest flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald" />
              <span>OPTIMUM</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="glass-panel rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[230px] transition-all duration-300 border-zinc-800/80"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">
                ENERGY MODULE
              </span>
              <h4 className="font-display font-bold text-base tracking-widest text-white mt-0.5">
                BATTERY HEALTH
              </h4>
            </div>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neon-emerald">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4 flex flex-col space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] font-semibold text-zinc-400">HEALTH INDEX</span>
              <span className="font-display font-black text-2xl text-white font-mono-numbers">98.4%</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-emerald rounded-full transition-all duration-500"
                style={{ width: "98.4%" }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-zinc-400 font-semibold pt-1">
              <span>TEMP: 34.2°C</span>
              <span>VOLT: 784.2 V</span>
              <span>142 CYCLES</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
            <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">DEGRADATION RATE</span>
            <span className="text-zinc-300 font-mono text-[10px] font-bold font-mono-numbers">&lt; 0.2% / YR</span>
          </div>
        </motion.div>

        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="glass-panel rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[230px] transition-all duration-300 border-zinc-800/80"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">
                ECU SHIELD
              </span>
              <h4 className="font-display font-bold text-base tracking-widest text-white mt-0.5">
                SYSTEM FAULTS
              </h4>
            </div>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neon-emerald">
              <CheckCircle2 className="w-4 h-4 text-neon-emerald" />
            </div>
          </div>

          <div className="my-4 flex items-center space-x-3.5 bg-zinc-950/60 border border-zinc-900 p-3 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-neon-emerald/15 flex items-center justify-center text-neon-emerald flex-shrink-0">
              <CheckCircle2 className={`w-5 h-5 ${isScanning ? "animate-spin" : ""}`} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] font-bold text-white tracking-wide">
                0 DIAGNOSTIC CODES
              </span>
              <span className="font-mono text-[9px] text-neon-cyan font-semibold mt-0.5">
                {scanMessage}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
            <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">FIREWALL STATE</span>
            <span className="text-neon-emerald font-mono text-[10px] font-bold tracking-widest flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
              <span>SECURE (AES-256)</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
