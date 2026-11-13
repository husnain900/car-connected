"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Info,
  CheckCheck,
  Plus,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function AlertsPage() {
  const { alerts, markAlertRead, markAllAlertsRead, injectScenario } = useSimulationStore();

  const [severityFilter, setSeverityFilter] = useState<string>("ALL");

  const filtered = alerts.filter((a) => {
    if (severityFilter === "ALL") return true;
    return a.severity === severityFilter;
  });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Alerts & Notifications</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Notification Center & Telemetry Alerts
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Live event stream for TPMS threshold triggers, battery thermal warnings, and controller faults.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => injectScenario("TPMS_PUNCTURE_RR")}
              className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mono font-bold transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Critical Alert</span>
            </button>

            <button
              onClick={markAllAlertsRead}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#F4F7FB] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-[#43D9A3]" />
              <span>MARK ALL AS READ</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 bg-[#151D28] p-1.5 rounded-xl border border-white/10 self-start text-xs font-mono">
        {["ALL", "CRITICAL", "WARNING", "INFO"].map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              severityFilter === sev
                ? "bg-[#D6F45A] text-[#0B1018] font-bold"
                : "text-[#8794A6] hover:text-[#F4F7FB]"
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="nebula-card p-6">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#8794A6] italic">
            No notification events matching the selected severity filter.
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {filtered.map((alert) => {
              const isCrit = alert.severity === "CRITICAL";
              const isWarn = alert.severity === "WARNING";
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    !alert.read
                      ? isCrit
                        ? "bg-red-500/15 border-red-500/40"
                        : isWarn
                        ? "bg-amber-500/15 border-amber-500/40"
                        : "bg-[#1B2636] border-[#D6F45A]/40"
                      : "bg-[#1B2636]/60 border-white/5 opacity-70"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCrit
                          ? "bg-red-500/20 text-red-400"
                          : isWarn
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {isCrit ? (
                        <AlertTriangle className="w-4 h-4 animate-pulse" />
                      ) : isWarn ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isCrit
                              ? "bg-red-500 text-white"
                              : isWarn
                              ? "bg-amber-400 text-black"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[10px] font-mono text-[#8794A6]">
                          Source: {alert.source}
                        </span>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-[#D6F45A]" />
                        )}
                      </div>

                      <h3 className="font-mono font-bold text-sm text-[#F4F7FB] mt-1">{alert.title}</h3>
                      <p className="text-xs font-mono text-[#8794A6] mt-0.5 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto flex-shrink-0">
                    <span className="text-[10px] font-mono text-[#8794A6]">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>

                    {!alert.read && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-[#F4F7FB] transition-colors"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
