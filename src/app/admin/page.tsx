"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  Terminal,
  Send,
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

      setPacketStream((prev) => [newPacket, ...prev.slice(0, 18)]);
    }, delay);

    return () => clearInterval(interval);
  }, [tickerSpeed]);

  const triggerVivaScenario = (scenarioKey: "SCENARIO_1_NOMINAL" | "SCENARIO_2_TPMS_PUNCTURE" | "SCENARIO_3_BATTERY_FAULT") => {
    if (scenarioKey === "SCENARIO_1_NOMINAL") {
      clearAllFaults();
      setInjectedNotification("Viva Scenario 1 Active: Calibrated Nominal Telemetry Baseline.");
    } else if (scenarioKey === "SCENARIO_2_TPMS_PUNCTURE") {
      injectScenario("TPMS_PUNCTURE_RR");
      setInjectedNotification("Viva Scenario 2 Active: Rapid Puncture Injected on Rear-Right Tyre.");
    } else if (scenarioKey === "SCENARIO_3_BATTERY_FAULT") {
      injectScenario("BATTERY_THERMAL_ALERT");
      setInjectedNotification("Viva Scenario 3 Active: High-Voltage Thermal Threshold Exceeded (61°C).");
    }

    setTimeout(() => {
      setInjectedNotification(null);
    }, 4000);
  };

  const handleCustomInject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFaultCode.trim()) return;

    injectScenario("TPMS_PUNCTURE_RR");
    setInjectedNotification(`Custom CAN DTC [${customFaultCode}] broadcasted across high-speed bus.`);
    setTimeout(() => setInjectedNotification(null), 3500);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Examiner Viva Simulator Bench</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Hardware-in-the-Loop Simulator Bench
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Examiner viva fault injection bench, CAN-bus baud rate modulation, and ISO-11898 telemetry packet stream monitor.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {injectedNotification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#2FA36B] flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{injectedNotification}</span>
        </div>
      )}

      {/* Preset Viva Scenarios */}
      <div className="nebula-card p-6 space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
            ACADEMIC VIVA &amp; EVALUATION SUITE
          </span>
          <h2 className="font-display font-bold text-lg text-[#1F2A37] mt-0.5">
            1-Click Faculty Demonstration Scenarios
          </h2>
          <p className="text-xs font-mono text-[#5B6675] mt-1">
            Instantly set the entire telemetry bus into specific deterministic states for thesis evaluation and grading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Scenario 1 */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#F0FDF4] border border-[#BBF7D0] text-[#2FA36B]">
                SCENARIO 1 // OPTIMAL
              </span>
              <h3 className="font-bold text-sm text-[#1F2A37]">Calibrated Nominal Run</h3>
              <p className="text-[11px] font-mono text-[#5B6675] leading-relaxed">
                Clears all DTC codes, sets 4 tires to calibrated 35 PSI, restores battery to optimal 24°C, and resets health to 98%.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_1_NOMINAL")}
              className="w-full py-2.5 rounded-lg bg-[#2E8B8B] hover:bg-[#236F70] text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-sm"
            >
              TRIGGER SCENARIO 1
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#FECDD3] flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFF1F2] border border-[#FECDD3] text-[#C74E58]">
                SCENARIO 2 // CRITICAL TPMS
              </span>
              <h3 className="font-bold text-sm text-[#1F2A37]">Right-Rear Puncture (18.2 PSI)</h3>
              <p className="text-[11px] font-mono text-[#5B6675] leading-relaxed">
                Simulates rapid air loss on RR tire. Triggers red critical HUD status, warning modal, active DTC code, and notification alert.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_2_TPMS_PUNCTURE")}
              className="w-full py-2.5 rounded-lg bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#C74E58] border border-[#FECDD3] text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              TRIGGER SCENARIO 2
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#FDE68A] flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFFBEB] border border-[#FDE68A] text-[#B98121]">
                SCENARIO 3 // THERMAL FAULT
              </span>
              <h3 className="font-bold text-sm text-[#1F2A37]">Battery Thermal Alert (61°C)</h3>
              <p className="text-[11px] font-mono text-[#5B6675] leading-relaxed">
                Elevates 800V battery pack temperature past 50°C safety threshold. Triggers thermal derating alert and DTC P0A7F.
              </p>
            </div>
            <button
              onClick={() => triggerVivaScenario("SCENARIO_3_BATTERY_FAULT")}
              className="w-full py-2.5 rounded-lg bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#B98121] border border-[#FDE68A] text-xs font-mono font-bold transition-colors cursor-pointer"
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
            className="px-4 py-2 rounded-xl bg-[#EEF2F5] hover:bg-[#E2E8F0] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] font-bold flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#2E8B8B]" />
            <span>RESET SIMULATOR TO CALIBRATED NOMINAL BASELINE</span>
          </button>
        </div>
      </div>

      {/* Telemetry Clock & Rate Modulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="nebula-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#1F2A37]">
              Telemetry Ticker Clock
            </h3>
            <span className="text-[10px] font-mono text-[#2E8B8B] font-bold uppercase">
              STATUS: {tickerSpeed.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-mono text-[#5B6675]">
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
                    ? "bg-[#2E8B8B] text-white shadow-xs"
                    : "bg-[#FFFFFF] border border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>

          {/* Active Vehicle Switcher */}
          <div className="pt-4 border-t border-[#D8E0E7] space-y-2">
            <span className="text-[10px] font-mono text-[#5B6675] uppercase font-bold block">
              TARGET VEHICLE IN TEST-BENCH
            </span>
            <div className="flex flex-wrap gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVehicle(v.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeVehicle.id === v.id
                      ? "bg-[#2E8B8B] text-white shadow-xs"
                      : "bg-[#FFFFFF] border border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37]"
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
          <h3 className="font-display font-bold text-base text-[#1F2A37]">
            Custom OBD-II / CAN DTC Injector
          </h3>
          <p className="text-xs font-mono text-[#5B6675]">
            Inject ad-hoc diagnostic trouble codes to test the UI notification banner and scanner interrogation behavior.
          </p>

          <form onSubmit={handleCustomInject} className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] font-mono text-[#5B6675] uppercase font-bold block mb-1">
                Diagnostic Trouble Code (DTC)
              </label>
              <input
                type="text"
                value={customFaultCode}
                onChange={(e) => setCustomFaultCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] focus:border-[#2E8B8B] focus:outline-none"
                placeholder="e.g. P0537, P0A7F, C1201"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#5B6675] uppercase font-bold block mb-1">
                Fault Description
              </label>
              <input
                type="text"
                value={customFaultDesc}
                onChange={(e) => setCustomFaultDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] focus:border-[#2E8B8B] focus:outline-none"
                placeholder="Description of simulated anomaly"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
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
            <Terminal className="w-4 h-4 text-[#2E8B8B]" />
            <h3 className="font-display font-bold text-base text-[#1F2A37]">
              Simulated ISO-11898 CAN-Bus Packet Monitor
            </h3>
          </div>

          <span className="text-[10px] font-mono text-[#2FA36B] flex items-center space-x-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#2FA36B] animate-pulse" />
            <span>500 KBPS // HIGH-SPEED CAN</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#1F2A37] border border-[#D8E0E7] font-mono text-[11px] overflow-x-auto max-h-64 space-y-1 text-white shadow-inner">
          <div className="text-[#86B6B2] pb-1 border-b border-white/10 grid grid-cols-4 sm:grid-cols-5 text-[10px] font-bold">
            <span>TIMESTAMP</span>
            <span>CAN ARB ID</span>
            <span className="hidden sm:inline">CONTROLLER</span>
            <span className="col-span-2">PAYLOAD (8-BYTE HEX)</span>
          </div>

          {packetStream.map((p) => (
            <div key={p.id} className="grid grid-cols-4 sm:grid-cols-5 text-[#D8E0E7] hover:text-white py-0.5">
              <span>{p.timestamp}</span>
              <span className="text-[#86B6B2] font-bold">{p.canId}</span>
              <span className="hidden sm:inline text-[#86B6B2]">{p.source}</span>
              <span className="col-span-2 font-mono-numbers text-white">{p.payload}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
