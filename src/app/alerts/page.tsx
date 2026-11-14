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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Alerts & Notifications</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Notification Center & Telemetry Alerts
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Live event stream for TPMS threshold triggers, battery thermal warnings, and controller faults.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => injectScenario("TPMS_PUNCTURE_RR")}
              className="flex-1 sm:flex-initial min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] text-[#C74E58] text-xs font-mono font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Critical Alert</span>
            </button>

            <button
              onClick={markAllAlertsRead}
              className="flex-1 sm:flex-initial min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono font-bold text-[#1F2A37] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCheck className="w-4 h-4 text-[#2FA36B]" />
              <span>MARK ALL AS READ</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 bg-[#EEF2F5] p-1.5 rounded-xl border border-[#D8E0E7] self-start text-xs font-mono">
        {["ALL", "CRITICAL", "WARNING", "INFO"].map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
              severityFilter === sev
                ? "bg-[#2E8B8B] text-white shadow-xs"
                : "text-[#5B6675] hover:text-[#1F2A37]"
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="nebula-card p-6">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#5B6675] italic">
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
                        ? "bg-[#FFF1F2] border-[#FECDD3]"
                        : isWarn
                        ? "bg-[#FFFBEB] border-[#FDE68A]"
                        : "bg-[#E7F3F1] border-[#86B6B2]/40"
                      : "bg-[#FFFFFF] border-[#D8E0E7] opacity-80"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCrit
                          ? "bg-[#FFE4E6] text-[#C74E58]"
                          : isWarn
                          ? "bg-[#FEF3C7] text-[#B98121]"
                          : "bg-[#E7F3F1] text-[#2E8B8B]"
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
                              ? "bg-[#C74E58] text-white"
                              : isWarn
                              ? "bg-[#B98121] text-white"
                              : "bg-[#2E8B8B] text-white"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[10px] font-mono text-[#5B6675]">
                          Source: {alert.source}
                        </span>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-[#2E8B8B] animate-pulse" />
                        )}
                      </div>

                      <h3 className="font-sans font-bold text-sm text-[#1F2A37] mt-1">{alert.title}</h3>
                      <p className="text-xs font-mono text-[#5B6675] mt-0.5 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto flex-shrink-0">
                    <span className="text-[10px] font-mono text-[#5B6675]">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>

                    {!alert.read && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-3 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F5] border border-[#D8E0E7] text-[10px] font-mono text-[#1F2A37] font-bold transition-colors cursor-pointer shadow-xs"
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
