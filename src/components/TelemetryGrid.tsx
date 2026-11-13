"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Wind, Sliders, ShieldCheck, RefreshCw, Gauge } from "lucide-react";

export default function TelemetryGrid() {
  const [isLocked, setIsLocked] = useState(true);
  const [valetActive, setValetActive] = useState(false);
  const [temperature, setTemperature] = useState(21.0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [tires, setTires] = useState([
    { id: "FL", name: "Front Left", psi: 35.2, temp: "26°C", status: "optimal", xClass: "left-4 sm:left-6 top-4 sm:top-6", align: "items-start" },
    { id: "FR", name: "Front Right", psi: 34.8, temp: "28°C", status: "optimal", xClass: "right-4 sm:right-6 top-4 sm:top-6", align: "items-end" },
    { id: "RL", name: "Rear Left", psi: 35.0, temp: "27°C", status: "optimal", xClass: "left-4 sm:left-6 bottom-4 sm:bottom-6", align: "items-start" },
    { id: "RR", name: "Rear Right", psi: 35.1, temp: "27°C", status: "optimal", xClass: "right-4 sm:right-6 bottom-4 sm:bottom-6", align: "items-end" },
  ]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseFloat(e.target.value));
  };

  const calibrateTires = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setTires([
        { id: "FL", name: "Front Left", psi: 35.0, temp: "25°C", status: "optimal", xClass: "left-4 sm:left-6 top-4 sm:top-6", align: "items-start" },
        { id: "FR", name: "Front Right", psi: 35.0, temp: "25°C", status: "optimal", xClass: "right-4 sm:right-6 top-4 sm:top-6", align: "items-end" },
        { id: "RL", name: "Rear Left", psi: 35.0, temp: "25°C", status: "optimal", xClass: "left-4 sm:left-6 bottom-4 sm:bottom-6", align: "items-start" },
        { id: "RR", name: "Rear Right", psi: 35.0, temp: "25°C", status: "optimal", xClass: "right-4 sm:right-6 bottom-4 sm:bottom-6", align: "items-end" },
      ]);
      setIsCalibrating(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full select-none">
      <div className="glass-panel glass-panel-glow-emerald rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[380px]">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(39,39,42,0.1)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

        <div className="flex justify-between items-center z-10">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">DIAGNOSTICS</span>
            <h3 className="font-display font-bold text-lg tracking-widest text-white">TPMS TIRE MESH</h3>
          </div>
          <button
            onClick={calibrateTires}
            disabled={isCalibrating}
            className="flex items-center space-x-1.5 bg-neon-emerald/10 hover:bg-neon-emerald/20 border border-neon-emerald/30 text-neon-emerald text-[9px] px-2.5 py-1 rounded font-mono font-bold tracking-wider cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isCalibrating ? "animate-spin" : ""}`} />
            <span>{isCalibrating ? "BALANCING..." : "CALIBRATE"}</span>
          </button>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-6 min-h-[220px]">
          <div className="relative w-40 h-60 border border-zinc-800 rounded-[2.5rem] flex items-center justify-center bg-black/60 shadow-inner">
            <div className="absolute w-28 h-28 border border-dashed border-zinc-800 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-16 h-16 border border-zinc-700/40 rounded-full" />
            <div className="absolute w-[92%] h-[1px] bg-neon-cyan/20 blur-[1px] animate-pulse" />

            <div className="text-zinc-500 font-mono text-[9px] absolute top-10 font-bold tracking-widest">
              CHASSIS
            </div>
            <div className="text-zinc-600 font-mono text-[8px] absolute bottom-10 font-bold tracking-widest font-mono-numbers">
              4-WHEEL SENSOR
            </div>

            <div className="absolute top-2 w-16 h-3 bg-neon-cyan/15 rounded-full blur-[2px]" />
            <div className="absolute bottom-2 w-16 h-3 bg-red-500/15 rounded-full blur-[2px]" />
          </div>

          {tires.map((tire) => (
            <div
              key={tire.id}
              className={`absolute ${tire.xClass} z-10 flex flex-col ${tire.align} justify-between p-2.5 sm:p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 shadow-xl`}
            >
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[9px] text-zinc-400 font-bold">{tire.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald" />
              </div>
              <div className="flex items-baseline space-x-0.5 mt-1">
                <span className="font-display font-black text-sm sm:text-base text-white font-mono-numbers">
                  {tire.psi}
                </span>
                <span className="font-mono text-[8px] text-zinc-500 font-bold">PSI</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 mt-0.5 font-mono-numbers">{tire.temp}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border-base text-[9px] font-mono text-zinc-500 font-bold tracking-widest">
          <span>STANDARD TARGET: 35.0 PSI</span>
          <span className="text-neon-emerald">STATUS: ALL CORNERS BALANCED</span>
        </div>
      </div>

      <div className="glass-panel glass-panel-glow-cyan rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[380px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">OPERATIONS</span>
            <h3 className="font-display font-bold text-lg tracking-widest text-white">COMMAND & CONTROL</h3>
          </div>
          <div className="flex items-center space-x-1 text-neon-cyan font-mono text-[9px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
            <span>AUTHENTICATED</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLocked(!isLocked)}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2.5 cursor-pointer transition-all duration-300 ${
              isLocked
                ? "bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:text-white"
                : "bg-zinc-950/90 border-neon-cyan text-white shadow-[0_0_20px_rgba(0,240,255,0.18)]"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors">
              {isLocked ? (
                <Lock className="w-4 h-4 text-zinc-400" />
              ) : (
                <Unlock className="w-4 h-4 text-neon-cyan" />
              )}
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-xs tracking-wider uppercase">
                {isLocked ? "LOCK VEHICLE" : "UNLOCKED"}
              </div>
              <span className="font-mono text-[8px] text-zinc-500 tracking-wider">
                {isLocked ? "PERIMETER SECURED" : "READY TO DRIVE"}
              </span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setValetActive(!valetActive)}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2.5 cursor-pointer transition-all duration-300 ${
              valetActive
                ? "bg-zinc-950/90 border-neon-emerald text-white shadow-[0_0_20px_rgba(5,255,128,0.18)]"
                : "bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:text-white"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors">
              <Wind className={`w-4 h-4 ${valetActive ? "text-neon-emerald" : "text-zinc-400"}`} />
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-xs tracking-wider uppercase">
                VALET GOVERNOR
              </div>
              <span className="font-mono text-[8px] tracking-wider uppercase">
                {valetActive ? (
                  <span className="text-neon-emerald font-bold">LIMITED (50 KM/H)</span>
                ) : (
                  <span className="text-zinc-500">UNRESTRICTED</span>
                )}
              </span>
            </div>
          </motion.button>
        </div>

        <div className="mt-5 flex flex-col space-y-3 bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                CLIMATE PRE-CONDITIONING
              </span>
            </div>
            <div className="flex items-baseline space-x-0.5">
              <span className="font-display font-black text-xl text-neon-cyan font-mono-numbers">
                {temperature.toFixed(1)}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 font-bold">°C</span>
            </div>
          </div>

          <div className="relative flex items-center h-6">
            <input
              type="range"
              min="16.0"
              max="28.0"
              step="0.5"
              value={temperature}
              onChange={handleRangeChange}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none accent-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setTemperature(18.0)}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[8px] font-mono font-bold text-zinc-300 transition-colors"
            >
              MAX A/C (18°C)
            </button>
            <button
              onClick={() => setTemperature(21.0)}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[8px] font-mono font-bold text-neon-cyan transition-colors"
            >
              COMFORT (21°C)
            </button>
            <button
              onClick={() => setTemperature(24.5)}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[8px] font-mono font-bold text-zinc-300 transition-colors"
            >
              DEFROST (24.5°C)
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border-base text-[9px] font-mono text-zinc-500 font-bold tracking-widest mt-4">
          <div className="flex items-center space-x-1.5">
            <Gauge className="w-3 h-3 text-neon-cyan" />
            <span>ECU RESPONSE: &lt; 14 MS</span>
          </div>
          <span>WIRELESS TELEMETRY LINK</span>
        </div>
      </div>
    </div>
  );
}
