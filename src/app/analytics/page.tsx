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
  const { activeVehicle } = useSimulationStore();

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
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Nebula Drive Vehicle Telemetry Report // ${activeVehicle.vin}</title>
          <style>
            body { font-family: Inter, system-ui, sans-serif; padding: 40px; background: #FFFFFF; color: #1F2A37; line-height: 1.6; }
            h1 { font-family: Sora, sans-serif; font-size: 24px; color: #1F2A37; margin-bottom: 4px; }
            .header-strip { border-bottom: 2px solid #2E8B8B; padding-bottom: 16px; margin-bottom: 24px; }
            .meta { font-family: monospace; font-size: 11px; color: #5B6675; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
            .card { border: 1px solid #D8E0E7; padding: 16px; border-radius: 12px; background: #F6F8FA; }
            .card-label { font-size: 11px; color: #5B6675; font-weight: 600; text-transform: uppercase; font-family: monospace; }
            .card-val { font-size: 20px; font-weight: bold; color: #1F2A37; margin-top: 4px; font-family: monospace; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 12px; font-family: monospace; }
            th, td { border: 1px solid #D8E0E7; padding: 10px; text-align: left; }
            th { background: #EEF2F5; color: #1F2A37; font-weight: bold; }
            .footer { margin-top: 48px; border-top: 1px solid #D8E0E7; padding-top: 16px; font-size: 11px; color: #5B6675; font-family: monospace; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header-strip">
            <h1>NEBULA DRIVE // VEHICLE TELEMETRY AUDIT REPORT</h1>
            <div class="meta">
              Vehicle: ${activeVehicle.name} (${activeVehicle.model}) | VIN: ${activeVehicle.vin} | License Plate: ${activeVehicle.licensePlate}<br/>
              Report Timestamp: ${new Date().toISOString()} | System Architect: Zainab Amanat (Roll No: M245008)
            </div>
          </div>

          <div class="grid">
            <div class="card"><div class="card-label">Battery SoC</div><div class="card-val">${activeVehicle.batteryLevelPct}%</div></div>
            <div class="card"><div class="card-label">Estimated Range</div><div class="card-val">${activeVehicle.estRangeKm} KM</div></div>
            <div class="card"><div class="card-label">Odometer</div><div class="card-val">${activeVehicle.odometerKm.toLocaleString()} KM</div></div>
            <div class="card"><div class="card-label">Battery Health</div><div class="card-val">${activeVehicle.batteryHealthPct}%</div></div>
          </div>

          <h3>Weekly Daily Energy Consumption (kWh)</h3>
          <table>
            <thead>
              <tr><th>Day</th><th>Distance Travelled</th><th>Energy Consumed (kWh)</th><th>Efficiency</th></tr>
            </thead>
            <tbody>
              ${energyDailyData.map((d) => `<tr><td>${d.day}</td><td>${d.km} km</td><td>${d.kwh} kWh</td><td>${(d.kwh / (d.km || 1)).toFixed(3)} kWh/km</td></tr>`).join("")}
            </tbody>
          </table>

          <div class="footer">
            CONFIDENTIAL TELEMETRY REPORT • NEBULA VEHICLE OS • CERTIFIED BY ZAINAB AMANAT (M245008)
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 350);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">Fleet Telemetry Analytics</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37] tracking-tight">
              Fleet Driving Analytics & Reports
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-1">
              Historical energy consumption curves, driving efficiency, component degradation tracking, and verified report export.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={exportCSV}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono font-bold text-[#1F2A37] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#2FA36B]" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={exportPDFReport}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF REPORT</span>
            </button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#2FA36B] flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Main Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
        {/* Chart 1: Energy Consumption Bar Chart */}
        <div className="lg:col-span-2 nebula-card p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
                  ENERGY EFFICIENCY TREND
                </span>
                <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-0.5">
                  Daily Energy Consumption (kWh)
                </h3>
              </div>

              <div className="flex items-center space-x-1 bg-[#EEF2F5] p-1 rounded-xl border border-[#D8E0E7] text-xs font-mono">
                {(["7D", "30D", "YTD"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                      dateRange === r
                        ? "bg-[#2E8B8B] text-white shadow-xs"
                        : "text-[#5B6675] hover:text-[#1F2A37]"
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
                  <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full group mx-1.5">
                    <span className="text-[10px] font-mono text-[#2E8B8B] mb-1 font-mono-numbers opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {d.kwh} kWh
                    </span>
                    <div
                      className="w-full max-w-[38px] bg-[#EEF2F5] hover:bg-[#86B6B2] rounded-t-lg transition-all duration-300 relative flex items-end justify-center shadow-xs"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="w-full bg-[#2E8B8B]/40 rounded-t-lg h-full" />
                    </div>
                    <span className="text-xs font-mono text-[#5B6675] mt-2 font-bold">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#D8E0E7] text-xs font-mono text-[#5B6675]">
            <span>Average: <strong>15.4 kWh / day</strong></span>
            <span>Total Fleet Miles: <strong>620 km</strong></span>
            <span className="text-[#2FA36B] font-bold">Efficiency Score: 94%</span>
          </div>
        </div>

        {/* Chart 2: Battery Degradation & Capacity Index */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold tracking-wider">
              LIFECYCLE DEGRADATION
            </span>
            <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-0.5">
              Battery Health Index
            </h3>

            <div className="my-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-[#5B6675]">HEALTH RETENTION</span>
                <span className="font-display font-bold text-3xl text-[#2FA36B] font-mono-numbers">
                  {activeVehicle.batteryHealthPct}%
                </span>
              </div>

              <div className="h-2.5 w-full bg-[#EEF2F5] rounded-full overflow-hidden p-[1px] border border-[#D8E0E7]">
                <div
                  className="h-full bg-gradient-to-r from-[#86B6B2] to-[#2E8B8B] rounded-full"
                  style={{ width: `${activeVehicle.batteryHealthPct}%` }}
                />
              </div>

              <div className="space-y-2.5 text-xs font-mono text-[#5B6675] pt-2">
                <div className="flex justify-between">
                  <span>Cycle Count:</span>
                  <span className="text-[#1F2A37] font-bold">142 Equivalent Full Cycles</span>
                </div>
                <div className="flex justify-between">
                  <span>Degradation Rate:</span>
                  <span className="text-[#2FA36B] font-bold">&lt; 0.2% / year</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Life:</span>
                  <span className="text-[#1F2A37] font-bold">8.4 Years Remaining</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D8E0E7] text-[10px] font-mono text-[#5B6675]">
            Based on IEEE 1451 smart transducer telemetry standard simulation.
          </div>
        </div>
      </div>
    </div>
  );
}
