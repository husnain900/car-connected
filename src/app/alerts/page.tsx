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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Alerts & Notifications</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Notification Center & Telemetry Alerts
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Live event stream for TPMS threshold triggers, battery thermal warnings, and controller faults.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => injectScenario("TPMS_PUNCTURE_RR")}
              className="px-3 py-1.5 rounded-xl bg-[#F16D78]/15 hover:bg-[#F16D78]/25 border border-[#F16D78]/30 text-[#F16D78] text-xs font-mono font-bold transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Critical Alert</span>
            </button>

            <button
              onClick={markAllAlertsRead}
              className="px-3.5 py-1.5 rounded-xl bg-[#1E314B] hover:bg-[#152437] border border-[#293C51] text-xs font-mono font-bold text-[#F5F8FC] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-[#35C99A]" />
              <span>MARK ALL AS READ</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 bg-[#152437] p-1.5 rounded-xl border border-[#293C51] self-start text-xs font-mono">
        {["ALL", "CRITICAL", "WARNING", "INFO"].map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              severityFilter === sev
                ? "bg-[#79C7FF] text-[#091321] font-bold"
                : "text-[#A5B5C8] hover:text-[#F5F8FC]"
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="nebula-card p-6">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#A5B5C8] italic">
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
                        ? "bg-[#F16D78]/15 border-[#F16D78]/40"
                        : isWarn
                        ? "bg-[#F2B65B]/15 border-[#F2B65B]/40"
                        : "bg-[#1E314B] border-[#79C7FF]/40"
                      : "bg-[#1E314B]/60 border-[#293C51] opacity-75"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCrit
                          ? "bg-[#F16D78]/20 text-[#F16D78]"
                          : isWarn
                          ? "bg-[#F2B65B]/20 text-[#F2B65B]"
                          : "bg-[#79C7FF]/20 text-[#79C7FF]"
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
                              ? "bg-[#F16D78] text-white"
                              : isWarn
                              ? "bg-[#F2B65B] text-[#091321] font-bold"
                              : "bg-[#79C7FF]/20 text-[#79C7FF]"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[10px] font-mono text-[#A5B5C8]">
                          Source: {alert.source}
                        </span>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-[#79C7FF] animate-pulse" />
                        )}
                      </div>

                      <h3 className="font-mono font-bold text-sm text-[#F5F8FC] mt-1">{alert.title}</h3>
                      <p className="text-xs font-mono text-[#A5B5C8] mt-0.5 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto flex-shrink-0">
                    <span className="text-[10px] font-mono text-[#A5B5C8]">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>

                    {!alert.read && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-2.5 py-1 rounded bg-[#1E314B] hover:bg-[#253956] border border-[#293C51] text-[10px] font-mono text-[#F5F8FC] transition-colors cursor-pointer"
                      >
                        Acknowledge
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
