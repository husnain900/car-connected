"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Activity,
  Send,
  Zap,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

interface CanPacket {
  id: string;
  timestamp: string;
  canId: string;
  source: string;
  payload: string;
}

export default function AdminSimulatorPage() {
  const {
    activeVehicle,
    injectScenario,
    clearAllFaults,
    vehicles,
    setActiveVehicle,
  } = useSimulationStore();

  const [tickerSpeed, setTickerSpeed] = useState<"slow" | "normal" | "fast" | "paused">("normal");
  const [customFaultCode, setCustomFaultCode] = useState("P0537");
  const [customFaultDesc, setCustomFaultDesc] = useState("Rapid Pressure Loss Detected on Right Rear Wheel Sensor");
  const [injectedNotification, setInjectedNotification] = useState<string | null>(null);

  // Raw CAN packet stream
  const [packetStream, setPacketStream] = useState<CanPacket[]>([]);

  useEffect(() => {
    if (tickerSpeed === "paused") return;

    const delay = tickerSpeed === "fast" ? 600 : tickerSpeed === "slow" ? 4000 : 1500;

    const interval = setInterval(() => {
      const canIds = ["0x2A1", "0x1B4", "0x0C8", "0x3F2", "0x510", "0x7E0"];
      const sources = ["TPMS_RF_NODE", "BMS_800V_CTRL", "INVERTER_DUAL_MOTOR", "TACTICAL_GNSS", "BODY_SOLENOID", "OBD2_DIAG"];

      const randomCanId = canIds[Math.floor(Math.random() * canIds.length)];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const randomHex = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase()
      ).join(" ");

      const newPacket: CanPacket = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString().substring(11, 23),
        canId: randomCanId,
        source: randomSource,
        payload: randomHex,
      };

      setPacketStream((prev) => [newPacket, ...prev.slice(0, 14)]);
    }, delay);

    return () => clearInterval(interval);
  }, [tickerSpeed]);

  const triggerVivaScenario = (scenario: "SCENARIO_1_NOMINAL" | "SCENARIO_2_TPMS_PUNCTURE" | "SCENARIO_3_BATTERY_FAULT") => {
    if (scenario === "SCENARIO_1_NOMINAL") {
      clearAllFaults();
      setInjectedNotification("Scenario 1 Activated: Calibrated Nominal Baseline. All faults cleared.");
    } else if (scenario === "SCENARIO_2_TPMS_PUNCTURE") {
      injectScenario("TPMS_PUNCTURE_RR");
      setInjectedNotification("Scenario 2 Activated: TPMS Rapid Puncture on RR Tyre (22 PSI).");
    } else if (scenario === "SCENARIO_3_BATTERY_FAULT") {
      injectScenario("BATTERY_THERMAL_ALERT");
      setInjectedNotification("Scenario 3 Activated: Battery Thermal Alert (High Pack Temp).");
    }
    setTimeout(() => setInjectedNotification(null), 4000);
  };

  const handleCustomInject = (e: React.FormEvent) => {
    e.preventDefault();
    injectScenario("TPMS_PUNCTURE_RR");
    setInjectedNotification(`Custom DTC ${customFaultCode} injected into simulated CAN bus.`);
    setTimeout(() => setInjectedNotification(null), 4000);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Simulation Engine</span>
          <span>/</span>
          <span className="text-[#79C7FF]">Examiner Simulator Controller</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Viva Simulator Control Center
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Interactive test bench for university evaluation: inject faults, trigger viva scenarios, inspect raw CAN telemetry, and modulate ticker speed.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#79C7FF]/15 text-[#79C7FF] border border-[#79C7FF]/30 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>TEST-BENCH READY</span>
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Notification Toast */}
      {injectedNotification && (
        <div className="p-3.5 rounded-xl bg-[#79C7FF]/15 border border-[#79C7FF]/40 text-[#79C7FF] text-xs font-mono flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{injectedNotification}</span>
        </div>
      )}

      {/* Primary Viva Scenarios Deck */}
      <div className="nebula-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#79C7FF] font-bold">
            EXAMINER ONE-CLICK PRESETS
          </span>
          <h2 className="font-display font-bold text-xl text-[#F5F8FC] mt-1">
            Official University Viva Evaluation Scenarios
          </h2>
          <p className="text-xs font-mono text-[#A5B5C8] mt-1">
            Click any button below during your live presentation to demonstrate how the platform responds in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scenario 1 */}
          <div className="p-5 rounded-xl bg-[#1E314B] border border-[#293C51] hover:border-[#35C99A]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C99A]/10 text-[#35C99A] border border-[#35C99A]/20 font-bold">
                  SCENARIO 1
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#35C99A]" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F8FC]">Nominal Cruising Baseline</h3>
              <p className="text-[11px] font-mono text-[#A5B5C8] leading-relaxed">
                All 4 tyres at 34.0 PSI, battery temp 28°C, zero active DTC fault codes, 92% battery health. Ideal state demonstration.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_1_NOMINAL")}
              className="w-full py-2.5 rounded-lg bg-[#35C99A]/20 hover:bg-[#35C99A]/30 text-[#35C99A] text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              TRIGGER SCENARIO 1
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="p-5 rounded-xl bg-[#1E314B] border border-[#293C51] hover:border-[#F16D78]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F16D78]/10 text-[#F16D78] border border-[#F16D78]/20 font-bold">
                  SCENARIO 2
                </span>
                <AlertTriangle className="w-4 h-4 text-[#F16D78]" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F8FC]">TPMS Rapid Puncture (RR 22 PSI)</h3>
              <p className="text-[11px] font-mono text-[#A5B5C8] leading-relaxed">
                Injects pressure loss on Rear Right tyre. Demonstrates 3D digital twin red beacon, CAN DTC P0537, and warning notification.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_2_TPMS_PUNCTURE")}
              className="w-full py-2.5 rounded-lg bg-[#F16D78]/20 hover:bg-[#F16D78]/30 text-[#F16D78] text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              TRIGGER SCENARIO 2
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="p-5 rounded-xl bg-[#1E314B] border border-[#293C51] hover:border-[#F2B65B]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F2B65B]/10 text-[#F2B65B] border border-[#F2B65B]/20 font-bold">
                  SCENARIO 3
                </span>
                <Activity className="w-4 h-4 text-[#F2B65B]" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F8FC]">Battery Thermal Alert (61°C)</h3>
              <p className="text-[11px] font-mono text-[#A5B5C8] leading-relaxed">
                Elevates 800V battery pack temperature past 50°C safety threshold. Triggers thermal derating alert and DTC P0A7F.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_3_BATTERY_FAULT")}
              className="w-full py-2.5 rounded-lg bg-[#F2B65B]/20 hover:bg-[#F2B65B]/30 text-[#F2B65B] text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              TRIGGER SCENARIO 3
            </button>
          </div>
        </div>

        {/* Global Reset */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              clearAllFaults();
              setInjectedNotification("All fault conditions cleared. Restored to nominal state.");
              setTimeout(() => setInjectedNotification(null), 3000);
            }}
            className="px-4 py-2 rounded-xl bg-[#1E314B] hover:bg-[#253956] border border-[#293C51] text-xs font-mono text-[#F5F8FC] flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#79C7FF]" />
            <span>RESET SIMULATOR TO CALIBRATED NOMINAL BASELINE</span>
          </button>
        </div>
      </div>

      {/* Telemetry Clock & Rate Modulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="nebula-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#F5F8FC]">
              Telemetry Ticker Clock
            </h3>
            <span className="text-[10px] font-mono text-[#79C7FF] font-bold uppercase">
              STATUS: {tickerSpeed.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-mono text-[#A5B5C8]">
            Control the background signal generation frequency. Simulates varying CAN bus baud rates and mobile cellular bandwidth conditions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {[
              { id: "slow", label: "SLOW (4s)" },
              { id: "normal", label: "NORMAL (1.5s)" },
              { id: "fast", label: "RAPID (600ms)" },
              { id: "paused", label: "PAUSED" },
            ].map((speed) => (
              <button
                key={speed.id}
                onClick={() => setTickerSpeed(speed.id as typeof tickerSpeed)}
                className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  tickerSpeed === speed.id
                    ? "bg-[#79C7FF] text-[#091321]"
                    : "bg-[#1E314B] border border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>

          {/* Active Vehicle Switcher */}
          <div className="pt-4 border-t border-[#293C51] space-y-2">
            <span className="text-[10px] font-mono text-[#A5B5C8] uppercase font-bold block">
              TARGET VEHICLE IN TEST-BENCH
            </span>
            <div className="flex flex-wrap gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVehicle(v.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeVehicle.id === v.id
                      ? "bg-[#79C7FF] text-[#091321]"
                      : "bg-[#1E314B] border border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC]"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom DTC Injector Form */}
        <div className="nebula-card p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-[#F5F8FC]">
            Custom OBD-II / CAN DTC Injector
          </h3>
          <p className="text-xs font-mono text-[#A5B5C8]">
            Inject ad-hoc diagnostic trouble codes to test the UI notification banner and scanner interrogation behavior.
          </p>

          <form onSubmit={handleCustomInject} className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] font-mono text-[#A5B5C8] uppercase font-bold block mb-1">
                Diagnostic Trouble Code (DTC)
              </label>
              <input
                type="text"
                value={customFaultCode}
                onChange={(e) => setCustomFaultCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#091321] border border-[#293C51] text-xs font-mono text-[#F5F8FC] focus:border-[#79C7FF] focus:outline-none"
                placeholder="e.g. P0537, P0A7F, C1201"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#A5B5C8] uppercase font-bold block mb-1">
                Fault Description
              </label>
              <input
                type="text"
                value={customFaultDesc}
                onChange={(e) => setCustomFaultDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#091321] border border-[#293C51] text-xs font-mono text-[#F5F8FC] focus:border-[#79C7FF] focus:outline-none"
                placeholder="Description of simulated anomaly"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT DTC OVER SIMULATED CAN-BUS</span>
            </button>
          </form>
        </div>
      </div>

      {/* Real-time CAN-Bus Packet Stream Monitor */}
      <div className="nebula-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#79C7FF]" />
            <h3 className="font-display font-bold text-base text-[#F5F8FC]">
              Simulated ISO-11898 CAN-Bus Packet Monitor
            </h3>
          </div>

          <span className="text-[10px] font-mono text-[#35C99A] flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#35C99A] animate-pulse" />
            <span>500 KBPS // HIGH-SPEED CAN</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#091321] border border-[#293C51] font-mono text-[11px] overflow-x-auto max-h-64 space-y-1">
          <div className="text-[#A5B5C8] pb-1 border-b border-[#293C51] grid grid-cols-4 sm:grid-cols-5 text-[10px] font-bold">
            <span>TIMESTAMP</span>
            <span>CAN ARB ID</span>
            <span className="hidden sm:inline">CONTROLLER</span>
            <span className="col-span-2">PAYLOAD (8-BYTE HEX)</span>
          </div>

          {packetStream.map((p) => (
            <div key={p.id} className="grid grid-cols-4 sm:grid-cols-5 text-[#A5B5C8] hover:text-[#F5F8FC] py-0.5">
              <span className="text-[#A5B5C8]">{p.timestamp}</span>
              <span className="text-[#79C7FF] font-bold">{p.canId}</span>
              <span className="hidden sm:inline text-[#79C7FF]">{p.source}</span>
              <span className="col-span-2 font-mono-numbers text-[#F5F8FC]">{p.payload}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
