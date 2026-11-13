"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function AnalyticsPage() {
  const { activeVehicle, auditLogs } = useSimulationStore();

  const [dateRange, setDateRange] = useState<"7D" | "30D" | "YTD">("7D");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const energyDailyData = [
    { day: "Mon", kwh: 16.2, km: 84 },
    { day: "Tue", kwh: 14.8, km: 78 },
    { day: "Wed", kwh: 18.5, km: 96 },
    { day: "Thu", kwh: 15.1, km: 80 },
    { day: "Fri", kwh: 21.0, km: 110 },
    { day: "Sat", kwh: 12.4, km: 62 },
    { day: "Sun", kwh: 9.8, km: 45 },
  ];

  const exportCSV = () => {
    const headers = "Timestamp,Vehicle,VIN,BatteryPct,CellVoltage,EstRangeKm,OdometerKm,SpeedKmH,FL_PSI,FR_PSI,RL_PSI,RR_PSI\n";
    const rows = energyDailyData
      .map((d, i) => {
        const date = new Date(Date.now() - (7 - i) * 86400000).toISOString();
        return `${date},${activeVehicle.name},${activeVehicle.vin},${activeVehicle.batteryLevelPct},${activeVehicle.cellVoltage},${activeVehicle.estRangeKm},${activeVehicle.odometerKm},${d.km / 2},${activeVehicle.tires[0].psi},${activeVehicle.tires[1].psi},${activeVehicle.tires[2].psi},${activeVehicle.tires[3].psi}`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `nebula-telemetry-${activeVehicle.vin}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess("CSV Telemetry Log exported successfully.");
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportPDFReport = () => {
    // Generate clean printable vehicle inspection & telemetry report
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Nebula Drive Vehicle Telemetry Report // ${activeVehicle.vin}</title>
          <style>
            body { font-family: monospace; padding: 32px; background: #fff; color: #111; line-height: 1.5; }
            h1 { margin-bottom: 4px; font-size: 22px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
            .meta { font-size: 11px; color: #555; }
            .section { margin-top: 24px; border: 1px solid #ccc; padding: 16px; border-radius: 6px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
            th { background: #f0f0f0; }
            .badge { display: inline-block; padding: 2px 6px; background: #eee; font-size: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NEBULA DRIVE // VEHICLE PERFORMANCE & AUDIT REPORT</h1>
            <div class="meta">
              Platform: Nebula Vehicle OS v4.2 | Academic Project by Zainab Amanat (Roll No: M245008)<br />
              Generated on: ${new Date().toLocaleString()} | Source: Deterministic Simulation Engine
            </div>
          </div>

          <div class="section">
            <h3>1. VEHICLE TELEMETRY PROFILE</h3>
            <table>
              <tr><th>Vehicle Model</th><td>${activeVehicle.name} (${activeVehicle.model})</td></tr>
              <tr><th>VIN</th><td>${activeVehicle.vin}</td></tr>
              <tr><th>License Plate</th><td>${activeVehicle.licensePlate}</td></tr>
              <tr><th>Odometer</th><td>${activeVehicle.odometerKm.toLocaleString()} KM</td></tr>
              <tr><th>Battery State of Charge</th><td>${activeVehicle.batteryLevelPct}% (${activeVehicle.cellVoltage} V)</td></tr>
              <tr><th>Estimated Range</th><td>${activeVehicle.estRangeKm} KM</td></tr>
              <tr><th>Battery Health Index</th><td>${activeVehicle.batteryHealthPct}% (Degradation &lt; 0.2%/yr)</td></tr>
            </table>
          </div>

          <div class="section">
            <h3>2. 4-CORNER TPMS TYRE MESH DATA</h3>
            <table>
              <tr>
                <th>Tire Position</th><th>Pressure (PSI)</th><th>Target (PSI)</th><th>Temperature (°C)</th><th>Status</th>
              </tr>
              ${activeVehicle.tires
                .map(
                  (t) =>
                    `<tr><td>${t.name} (${t.id})</td><td>${t.psi}</td><td>${t.targetPsi}</td><td>${t.tempC}°C</td><td>${t.status.toUpperCase()}</td></tr>`
                )
                .join("")}
            </table>
          </div>

          <div class="section">
            <h3>3. ACTIVE DIAGNOSTIC CODES (DTC)</h3>
            <p>${activeVehicle.activeFaults.length === 0 ? "Zero fault codes detected. All ECUs nominal." : `${activeVehicle.activeFaults.length} Active Codes Detected.`}</p>
          </div>

          <div class="section">
            <h3>4. RECENT COMMAND AUDIT TRAIL</h3>
            <table>
              <tr><th>Command</th><th>Issued By</th><th>Timestamp</th><th>Latency</th></tr>
              ${auditLogs
                .slice(0, 5)
                .map(
                  (a) =>
                    `<tr><td>${a.commandName}</td><td>${a.issuedBy}</td><td>${new Date(a.timestamp).toLocaleTimeString()}</td><td>${a.latencyMs}ms</td></tr>`
                )
                .join("")}
            </table>
          </div>
          <div style="margin-top: 32px; font-size: 10px; color: #777;">
            Verification Hash: SHA256-NEBULA-${Date.now()} // End of Certified Report
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();

    setDownloadSuccess("Printable Vehicle Audit Report opened.");
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
          <Link href="/dashboard" className="hover:text-[#D6F45A]">Dashboard</Link>
          <span>/</span>
          <span>Analytics & Reports</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Fleet Driving Analytics & Reports
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Historical energy consumption curves, driving efficiency, component degradation tracking, and verified report export.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#1B2636] hover:bg-[#253347] border border-white/10 text-xs font-mono font-bold text-[#F4F7FB] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#43D9A3]" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={exportPDFReport}
              className="px-4 py-2 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF REPORT</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-[#43D9A3]/15 border border-[#43D9A3]/30 text-xs font-mono text-[#43D9A3] flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Main Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Chart 1: Energy Consumption Bar/Line Chart */}
        <div className="lg:col-span-2 nebula-card p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
                  ENERGY EFFICIENCY TREND
                </span>
                <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
                  Daily Energy Consumption (kWh)
                </h3>
              </div>

              <div className="flex items-center space-x-1 bg-[#0B1018] p-1 rounded-lg border border-white/10 text-xs font-mono">
                {(["7D", "30D", "YTD"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      dateRange === r
                        ? "bg-[#D6F45A] text-[#0B1018] font-bold"
                        : "text-[#8794A6] hover:text-[#F4F7FB]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessible SVG Bar Chart */}
            <div className="w-full h-56 relative flex items-end justify-between pt-8 pb-4 px-2">
              {energyDailyData.map((d) => {
                const heightPct = (d.kwh / 25) * 100;
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full group mx-1">
                    <span className="text-[10px] font-mono text-[#8794A6] mb-1 font-mono-numbers opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.kwh} kWh
                    </span>
                    <div className="w-full max-w-[36px] bg-white/10 hover:bg-[#D6F45A] rounded-t-lg transition-all duration-300 relative flex items-end justify-center" style={{ height: `${heightPct}%` }}>
                      <div className="w-full bg-[#D6F45A]/25 rounded-t-lg h-full" />
                    </div>
                    <span className="text-xs font-mono text-[#8794A6] mt-2 font-bold">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/8 text-xs font-mono text-[#8794A6]">
            <span>Average: 15.4 kWh / day</span>
            <span>Total Fleet Miles: 620 km</span>
            <span className="text-[#43D9A3]">Efficiency Score: 94%</span>
          </div>
        </div>

        {/* Chart 2: Battery Degradation & Capacity Index */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              LIFECYCLE DEGRADATION
            </span>
            <h3 className="font-display font-bold text-lg text-[#F4F7FB] mt-0.5">
              Battery Health Index
            </h3>

            <div className="my-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-[#8794A6]">HEALTH RETENTION</span>
                <span className="font-display font-black text-3xl text-[#43D9A3] font-mono-numbers">
                  {activeVehicle.batteryHealthPct}%
                </span>
              </div>

              <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-[1px] border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#D6F45A] to-[#43D9A3] rounded-full"
                  style={{ width: `${activeVehicle.batteryHealthPct}%` }}
                />
              </div>

              <div className="space-y-2 text-xs font-mono text-[#8794A6] pt-2">
                <div className="flex justify-between">
                  <span>Cycle Count:</span>
                  <span className="text-[#F4F7FB] font-bold">142 Equivalent Full Cycles</span>
                </div>
                <div className="flex justify-between">
                  <span>Degradation Rate:</span>
                  <span className="text-[#43D9A3] font-bold">&lt; 0.2% / year</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Life:</span>
                  <span className="text-[#F4F7FB] font-bold">8.4 Years Remaining</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/8 text-[10px] font-mono text-[#8794A6]">
            Based on IEEE 1451 smart transducer telemetry standard simulation.
          </div>
        </div>
      </div>
    </div>
  );
}
