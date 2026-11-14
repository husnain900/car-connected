"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Wrench, AlertTriangle, ShieldCheck } from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function MaintenancePage() {
  const { activeVehicle, maintenance, completeMaintenance } = useSimulationStore();

  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const filtered = maintenance.filter((item) => {
    if (filterCategory === "ALL") return true;
    return item.category === filterCategory;
  });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Maintenance Scheduler</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Predictive Maintenance & Service Log
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Mileage-based intervals, component lifecycle monitoring, and certified workshop service history.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="nebula-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#5B6675] font-bold tracking-wider">TOTAL SERVICE ITEMS</span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF2F5] text-[#2E8B8B] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] font-mono-numbers mt-2">
            {maintenance.length} Records
          </div>
          <span className="text-[10px] font-mono text-[#5B6675] mt-1 block">Scheduled maintenance calendar</span>
        </div>

        <div className="nebula-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#B98121] font-bold tracking-wider">ATTENTION NEEDED</span>
            <div className="w-7 h-7 rounded-lg bg-[#FFFBEB] text-[#B98121] border border-[#FDE68A] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-bold text-2xl sm:text-3xl text-[#B98121] font-mono-numbers mt-2">
            {maintenance.filter((m) => m.status === "DUE_SOON" || m.status === "OVERDUE").length} Due Soon
          </div>
          <span className="text-[10px] font-mono text-[#5B6675] mt-1 block">Within next 1,000 km threshold</span>
        </div>

        <div className="nebula-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#2FA36B] font-bold tracking-wider">COMPLETED SERVICES</span>
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] text-[#2FA36B] border border-[#BBF7D0] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-bold text-2xl sm:text-3xl text-[#2FA36B] font-mono-numbers mt-2">
            {maintenance.filter((m) => m.status === "COMPLETED").length} Certified
          </div>
          <span className="text-[10px] font-mono text-[#5B6675] mt-1 block">Verified workshop logs</span>
        </div>
      </div>

      {/* Service Items Table */}
      <div className="nebula-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="font-display font-bold text-lg text-[#1F2A37]">
            Vehicle Service Roster
          </h2>

          <div className="flex items-center space-x-1.5 bg-[#EEF2F5] p-1 rounded-xl border border-[#D8E0E7] text-xs font-mono max-w-full overflow-x-auto scrollbar-none">
            {["ALL", "BRAKES", "TYRES", "HV_COOLANT", "CABIN_AIR"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs font-mono font-bold ${
                  filterCategory === cat
                    ? "bg-[#2E8B8B] text-white shadow-xs"
                    : "text-[#5B6675] hover:text-[#1F2A37]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          {filtered.map((item) => {
            const isDueSoon = item.status === "DUE_SOON";
            const isCompleted = item.status === "COMPLETED";
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] hover:border-[#86B6B2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E7F3F1] border border-[#86B6B2]/40 text-[#2E8B8B] font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-sans font-bold text-sm text-[#1F2A37]">{item.title}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5B6675] mt-2">
                    <span>Interval: {item.intervalKm.toLocaleString()} km</span>
                    <span>•</span>
                    <span>Due Target: {item.dueKm.toLocaleString()} km</span>
                    <span>•</span>
                    <span>Due Date: {item.dueDate}</span>
                    <span>•</span>
                    <span>Est. Cost: ${item.estimatedCostUsd}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                      isCompleted
                        ? "bg-[#F0FDF4] text-[#2FA36B] border border-[#BBF7D0]"
                        : isDueSoon
                        ? "bg-[#FFFBEB] text-[#B98121] border border-[#FDE68A]"
                        : "bg-[#EEF2F5] border border-[#D8E0E7] text-[#5B6675]"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => completeMaintenance(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2E8B8B] hover:bg-[#236F70] text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-sm flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
