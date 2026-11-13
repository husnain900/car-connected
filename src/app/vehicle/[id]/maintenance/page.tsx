"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSimulationStore } from "@/lib/simulationStore";

export default function MaintenancePage() {
  const { activeVehicle, maintenance, completeMaintenance } = useSimulationStore();

  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const filtered = maintenance.filter((item) => {
    if (filterCategory === "ALL") return true;
    return item.category === filterCategory;
  });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F4F7FB]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#D6F45A]">Maintenance Scheduler</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Predictive Maintenance & Service Log
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Mileage-based intervals, component lifecycle monitoring, and certified workshop service history.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">TOTAL SERVICE ITEMS</span>
          <div className="font-display font-black text-2xl text-[#F4F7FB] font-mono-numbers mt-1">
            {maintenance.length} Records
          </div>
          <span className="text-[10px] font-mono text-[#8794A6] mt-1 block">Scheduled maintenance calendar</span>
        </div>

        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">ATTENTION NEEDED</span>
          <div className="font-display font-black text-2xl text-amber-300 font-mono-numbers mt-1">
            {maintenance.filter((m) => m.status === "DUE_SOON" || m.status === "OVERDUE").length} Due Soon
          </div>
          <span className="text-[10px] font-mono text-[#8794A6] mt-1 block">Within next 1,000 km threshold</span>
        </div>

        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-[#43D9A3] font-bold">COMPLETED SERVICES</span>
          <div className="font-display font-black text-2xl text-[#43D9A3] font-mono-numbers mt-1">
            {maintenance.filter((m) => m.status === "COMPLETED").length} Certified
          </div>
          <span className="text-[10px] font-mono text-[#8794A6] mt-1 block">Verified workshop logs</span>
        </div>
      </div>

      {/* Service Items Table */}
      <div className="nebula-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="font-display font-bold text-lg text-[#F4F7FB]">
            Vehicle Service Roster
          </h2>

          <div className="flex items-center space-x-1.5 bg-[#0B1018] p-1 rounded-lg border border-white/10 text-xs font-mono">
            {["ALL", "BRAKES", "TYRES", "HV_COOLANT", "CABIN_AIR"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterCategory === cat
                    ? "bg-[#D6F45A] text-[#0B1018] font-bold"
                    : "text-[#8794A6] hover:text-[#F4F7FB]"
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
                className="p-4 rounded-xl bg-[#1B2636] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#8794A6] font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-mono font-bold text-sm text-[#F4F7FB]">{item.title}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8794A6] mt-2">
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
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                      isCompleted
                        ? "bg-[#43D9A3]/15 text-[#43D9A3] border border-[#43D9A3]/30"
                        : isDueSoon
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-white/10 text-[#8794A6]"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => completeMaintenance(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#43D9A3] hover:bg-[#3bc493] text-[#0B1018] text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Mark Completed
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
