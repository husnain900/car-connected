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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#F5F8FC]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
          <Link href="/dashboard" className="hover:text-[#79C7FF]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#F5F8FC]">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#79C7FF]">Maintenance Scheduler</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Predictive Maintenance & Service Log
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Mileage-based intervals, component lifecycle monitoring, and certified workshop service history.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">TOTAL SERVICE ITEMS</span>
          <div className="font-display font-black text-2xl text-[#F5F8FC] font-mono-numbers mt-1">
            {maintenance.length} Records
          </div>
          <span className="text-[10px] font-mono text-[#A5B5C8] mt-1 block">Scheduled maintenance calendar</span>
        </div>

        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-[#F2B65B] font-bold">ATTENTION NEEDED</span>
          <div className="font-display font-black text-2xl text-[#F2B65B] font-mono-numbers mt-1">
            {maintenance.filter((m) => m.status === "DUE_SOON" || m.status === "OVERDUE").length} Due Soon
          </div>
          <span className="text-[10px] font-mono text-[#A5B5C8] mt-1 block">Within next 1,000 km threshold</span>
        </div>

        <div className="nebula-card p-5">
          <span className="text-[10px] font-mono uppercase text-[#35C99A] font-bold">COMPLETED SERVICES</span>
          <div className="font-display font-black text-2xl text-[#35C99A] font-mono-numbers mt-1">
            {maintenance.filter((m) => m.status === "COMPLETED").length} Certified
          </div>
          <span className="text-[10px] font-mono text-[#A5B5C8] mt-1 block">Verified workshop logs</span>
        </div>
      </div>

      {/* Service Items Table */}
      <div className="nebula-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="font-display font-bold text-lg text-[#F5F8FC]">
            Vehicle Service Roster
          </h2>

          <div className="flex items-center space-x-1.5 bg-[#091321] p-1 rounded-lg border border-[#293C51] text-xs font-mono max-w-full overflow-x-auto scrollbar-none">
            {["ALL", "BRAKES", "TYRES", "HV_COOLANT", "CABIN_AIR"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? "bg-[#79C7FF] text-[#091321] font-bold"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
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
                className="p-4 rounded-xl bg-[#1E314B] border border-[#293C51] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#152437] border border-[#293C51] text-[#79C7FF] font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-mono font-bold text-sm text-[#F5F8FC]">{item.title}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A5B5C8] mt-2">
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
                        ? "bg-[#35C99A]/15 text-[#35C99A] border border-[#35C99A]/30"
                        : isDueSoon
                        ? "bg-[#F2B65B]/15 text-[#F2B65B] border border-[#F2B65B]/30"
                        : "bg-[#152437] border border-[#293C51] text-[#A5B5C8]"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => completeMaintenance(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#35C99A] hover:bg-[#2fb288] text-[#091321] text-xs font-mono font-bold transition-colors cursor-pointer"
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
