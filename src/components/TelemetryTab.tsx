"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Gauge, Flame } from "lucide-react";

export default function TelemetryTab() {
  const [rpm, setRpm] = useState(6200);
  const [torqueFront, setTorqueFront] = useState(42);
  const [power, setPower] = useState(284);
  const [gForceX, setGForceX] = useState(0.12);
  const [gForceY, setGForceY] = useState(0.24);
  const [driveProfile, setDriveProfile] = useState<"SPORT" | "TRACK" | "ENDURANCE">("SPORT");

  useEffect(() => {
    const timer = setInterval(() => {
      setRpm((prev) => Math.min(8500, Math.max(4500, prev + Math.floor(Math.random() * 300 - 150))));
      setPower((prev) => Math.min(480, Math.max(200, prev + Math.floor(Math.random() * 12 - 6))));
      setGForceX((prev) => Math.min(1.2, Math.max(-1.2, prev + (Math.random() * 0.1 - 0.05))));
      setGForceY((prev) => Math.min(1.2, Math.max(-1.2, prev + (Math.random() * 0.1 - 0.05))));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const selectDriveProfile = (profile: "SPORT" | "TRACK" | "ENDURANCE") => {
    setDriveProfile(profile);
    if (profile === "SPORT") setTorqueFront(42);
    if (profile === "TRACK") setTorqueFront(25);
    if (profile === "ENDURANCE") setTorqueFront(50);
  };

  const torqueRear = 100 - torqueFront;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full gsap-animate-card select-none">
      <div className="glass-panel glass-panel-glow-cyan rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[340px]">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">MOTORS</span>
              <h3 className="font-display font-bold text-lg tracking-widest text-text-base">TORQUE VECTORING</h3>
            </div>
            <div className="flex items-center space-x-1 bg-zinc-950/70 border border-zinc-800 rounded-lg p-1">
              {(["SPORT", "TRACK", "ENDURANCE"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => selectDriveProfile(p)}
                  className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider transition-colors ${
                    driveProfile === p
                      ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[1px] w-full bg-border-base my-3" />
        </div>

        <div className="space-y-6 flex-1 flex flex-col justify-center my-2">
          <div className="flex justify-between items-end font-mono text-[10px] font-bold text-zinc-400">
            <span className="text-neon-cyan flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>FRONT DUAL AXLE</span>
            </span>
            <span className="text-neon-emerald flex items-center space-x-1">
              <span>REAR DUAL AXLE</span>
              <Flame className="w-3 h-3" />
            </span>
          </div>

          <div className="relative h-4 w-full bg-zinc-950/60 border border-border-base rounded-full overflow-hidden p-[2px]">
            <motion.div
              animate={{ width: `${torqueFront}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="h-full bg-gradient-to-r from-neon-cyan to-blue-500 rounded-l-full"
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-zinc-600/60 z-10" />
          </div>

          <div className="flex justify-between text-xs font-mono font-bold text-text-base">
            <span className="text-neon-cyan font-mono-numbers">{torqueFront}% FRONT</span>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
              DYNAMIC BIAS [{driveProfile}]
            </span>
            <span className="text-neon-emerald font-mono-numbers">{torqueRear}% REAR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-base mt-2">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">PEAK RPM</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Gauge className="w-4 h-4 text-neon-cyan" />
              <span className="font-display font-black text-xl text-text-base font-mono-numbers">{rpm} RPM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">POWER OUTPUT</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Zap className="w-4 h-4 text-neon-emerald" />
              <span className="font-display font-black text-xl text-text-base font-mono-numbers">{power} kW</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel glass-panel-glow-emerald rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[340px]">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">INERTIAL</span>
              <h3 className="font-display font-bold text-lg tracking-widest text-text-base">G-FORCE RADAR</h3>
            </div>
            <div className="flex items-center space-x-1.5 text-neon-emerald font-mono text-[9px] font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>GYRO 6-AXIS ACTIVE</span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-border-base my-3" />
        </div>

        <div className="flex-1 flex items-center justify-center my-2 relative min-h-[170px]">
          <div className="w-36 h-36 border border-border-base/50 rounded-full flex items-center justify-center relative">
            <div className="w-24 h-24 border border-border-base/30 rounded-full" />
            <div className="w-12 h-12 border border-border-base/20 rounded-full" />
            
            <div className="absolute w-full h-[1px] bg-border-base/40" />
            <div className="absolute h-full w-[1px] bg-border-base/40" />

            <motion.div
              animate={{
                x: gForceX * 45,
                y: -gForceY * 45,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="absolute w-3 h-3 bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.9)] rounded-full"
            />
          </div>

          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-zinc-500 font-bold">
            +ACCEL
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-zinc-500 font-bold">
            -BRAKE
          </div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-zinc-500 font-bold">
            PORT
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-zinc-500 font-bold">
            STARBOARD
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-base mt-2">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">LATERAL CORNERING G</span>
            <span className="font-display font-black text-base text-text-base font-mono-numbers">
              {Math.abs(gForceX).toFixed(2)} G
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">LONGITUDINAL G</span>
            <span className="font-display font-black text-base text-text-base font-mono-numbers">
              {gForceY.toFixed(2)} G
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
