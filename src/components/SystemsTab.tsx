"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Shield, Play, Pause, Trash2, CheckCircle2 } from "lucide-react";

export default function SystemsTab() {
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "SYS: INITIATING NEBULA VEHICLE OS v4.2...",
    "SEC: AES-256 ENCRYPTED ECU HANDSHAKE COMPLETE",
    "NET: DUAL 5G CARRIER UPLINK SYNCHRONIZED // 120 Mbps",
    "TPMS: WIRELESS PRESSURE SENSOR MESH BALANCED [FL, FR, RL, RR]",
    "POWERTRAIN: DUAL INVERTER SUBSYSTEM ARMED [SPORT MODE]",
    "CAN-BUS: ISO-11898 HIGH-SPEED BUS ONLINE (500 kbps)",
    "SYS: ALL SUBSYSTEMS NOMINAL. READY FOR OPERATION."
  ]);

  useEffect(() => {
    if (isPaused) return;

    const liveLogEvents = [
      "DRIVE: TORQUE VECTORING CONTROLLER STABLE // FRONT 42% REAR 58%",
      "SYS: RECALCULATING REAL-TIME RANGE ESTIMATION [584 KM]",
      "NET: SYNCHRONIZING TELEMETRY PACKETS TO FLEET CLOUD",
      "THERMAL: HIGH-VOLTAGE PACK TEMPERATURE 34.2°C // PUMP IDLE",
      "OTA: CRYPTOGRAPHIC SIGNATURE VERIFIED (SHA-256)",
      "PILOT: AUTONOMOUS GUIDANCE THREAD NOMINAL"
    ];

    const interval = setInterval(() => {
      const randomLog = liveLogEvents[Math.floor(Math.random() * liveLogEvents.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLogs((prev) => [...prev.slice(-14), `[${timeStr}] ${randomLog}`]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const ecuModules = [
    { name: "AP.GUIDANCE", desc: "Autopilot Neural Inference ECU", latency: "2ms", status: "ONLINE" },
    { name: "PT.INVERTER", desc: "Dual Silicon-Carbide Drive", latency: "1ms", status: "ONLINE" },
    { name: "CH.VECTOR", desc: "Chassis Active Stability Vector", latency: "3ms", status: "ONLINE" },
    { name: "TH.PUMP", desc: "Thermal Cryo-Cooling Module", latency: "4ms", status: "ONLINE" },
    { name: "SEC.SHIELD", desc: "Hardware HSM Crypto Vault", latency: "1ms", status: "ONLINE" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full gsap-animate-card select-none">
      <div className="lg:col-span-1 glass-panel glass-panel-glow-cyan rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[380px]">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">BUS ARCHITECTURE</span>
          <h3 className="font-display font-bold text-lg tracking-widest text-text-base">ECU HARDWARE MATRIX</h3>
          <div className="h-[1px] w-full bg-border-base my-3" />
        </div>

        <div className="space-y-2.5 flex-1 flex flex-col justify-center my-2">
          {ecuModules.map((ecu) => (
            <div
              key={ecu.name}
              className="flex justify-between items-center bg-zinc-900/30 dark:bg-zinc-950/60 border border-border-base/50 p-2.5 rounded-xl"
            >
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono text-[10px] font-bold text-text-base">{ecu.name}</span>
                  <span className="text-[8px] font-mono text-zinc-500 font-mono-numbers">({ecu.latency})</span>
                </div>
                <span className="text-[8px] font-mono text-zinc-400">{ecu.desc}</span>
              </div>
              <span className="text-neon-emerald font-mono text-[9px] font-bold tracking-widest flex items-center space-x-1.5 bg-neon-emerald/10 border border-neon-emerald/20 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-2.5 h-2.5 text-neon-emerald" />
                <span>{ecu.status}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border-base text-[9px] font-mono text-zinc-500 font-bold flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-neon-cyan" />
            <span>5/5 NODES CERTIFIED</span>
          </div>
          <span>ISO 26262 ASIL-D</span>
        </div>
      </div>

      <div className="lg:col-span-2 glass-panel glass-panel-glow-emerald rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[380px]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">CONSOLE</span>
              <h3 className="font-display font-bold text-lg tracking-widest text-text-base">CAN-BUS REAL-TIME LOGS</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono font-semibold text-zinc-300"
              >
                {isPaused ? <Play className="w-3 h-3 text-neon-emerald" /> : <Pause className="w-3 h-3 text-yellow-400" />}
                <span className="text-[9px]">{isPaused ? "RESUME" : "PAUSE"}</span>
              </button>
              <button
                onClick={() => setLogs([])}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-red-900/50 text-xs font-mono font-semibold text-zinc-400 hover:text-red-400"
                title="Clear Terminal Output"
              >
                <Trash2 className="w-3 h-3" />
                <span className="text-[9px]">CLEAR</span>
              </button>
            </div>
          </div>
          <div className="h-[1px] w-full bg-border-base my-3" />
        </div>

        <div className="flex-1 bg-black/90 rounded-xl p-4 border border-border-base/40 font-mono text-[10px] text-zinc-300 space-y-1.5 overflow-y-auto max-h-56 select-none shadow-inner">
          {logs.length === 0 ? (
            <div className="text-zinc-600 italic">Console buffer cleared. Listening on CAN-Bus channel 0...</div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-neon-cyan mr-2 font-bold select-none">&gt;</span>
                <span className="break-all font-mono-numbers">{log}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest mt-4">
          <div className="flex items-center space-x-1 text-neon-cyan">
            <Terminal className="w-3 h-3" />
            <span>DECRYPT GATEWAY: ONLINE</span>
          </div>
          <span>UPLINK STREAM: 120 KB/S ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
