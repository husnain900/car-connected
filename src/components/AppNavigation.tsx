"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  Activity,
  Camera,
  MapPin,
  Sliders,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  Info,
  ChevronDown,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Menu,
  X,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function AppNavigation() {
  const pathname = usePathname();
  const {
    vehicles,
    activeVehicle,
    setActiveVehicle,
    isSimulating,
    toggleSimulation,
    injectScenario,
    clearAllFaults,
    unreadAlertsCount,
    user,
  } = useSimulationStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [vehicleSelectorOpen, setVehicleSelectorOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/vehicles", label: "Fleet & Twin", icon: Car },
    { href: `/vehicle/${activeVehicle.id}/diagnostics`, label: "Diagnostics & TPMS", icon: Activity },
    { href: `/vehicle/${activeVehicle.id}/inspection`, label: "AI Inspection", icon: Camera },
    { href: `/vehicle/${activeVehicle.id}/location`, label: "GPS & Trips", icon: MapPin },
    { href: `/vehicle/${activeVehicle.id}/controls`, label: "Remote Controls", icon: Sliders },
    { href: `/vehicle/${activeVehicle.id}/maintenance`, label: "Maintenance", icon: Wrench },
    { href: "/analytics", label: "Analytics & Reports", icon: BarChart3 },
    { href: "/alerts", label: "Alerts Center", icon: Bell, badge: unreadAlertsCount },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/admin", label: "Simulator Bench", icon: Terminal },
    { href: "/about", label: "About & Architecture", icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href.split("?")[0])) return true;
    return false;
  };

  return (
    <>
      {/* Top Bar for Desktop and Mobile */}
      <header className="sticky top-0 z-40 w-full bg-[#0B1018]/90 backdrop-blur-md border-b border-white/8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Left */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#151D28] border border-white/10 flex items-center justify-center font-display font-black text-sm text-[#D6F45A] shadow-inner group-hover:border-[#D6F45A]/50 transition-colors">
                ND
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-display font-black text-sm tracking-wider text-[#F4F7FB]">
                    NEBULA DRIVE
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#D6F45A] bg-[#D6F45A]/10 px-1.5 py-0.5 rounded border border-[#D6F45A]/20">
                    v4.2
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#8794A6] tracking-widest hidden sm:inline">
                  INTELLIGENCE IN MOTION
                </span>
              </div>
            </Link>

            {/* Vehicle Switcher in Header */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setVehicleSelectorOpen(!vehicleSelectorOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#151D28] border border-white/10 hover:border-white/20 text-xs font-mono text-[#F4F7FB] transition-colors cursor-pointer"
              >
                <Car className="w-3.5 h-3.5 text-[#D6F45A]" />
                <span className="font-bold">{activeVehicle.name}</span>
                <span className="text-[#8794A6] text-[10px]">({activeVehicle.licensePlate})</span>
                <ChevronDown className="w-3 h-3 text-[#8794A6]" />
              </button>

              <AnimatePresence>
                {vehicleSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-[#151D28] border border-white/15 p-2 shadow-2xl z-50 flex flex-col space-y-1"
                  >
                    <div className="px-3 py-1.5 text-[9px] font-mono uppercase text-[#8794A6] font-bold">
                      SELECT ACTIVE VEHICLE
                    </div>
                    {vehicles.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setActiveVehicle(v.id);
                          setVehicleSelectorOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          v.id === activeVehicle.id
                            ? "bg-[#D6F45A]/15 text-[#D6F45A] border border-[#D6F45A]/30 font-bold"
                            : "text-[#F4F7FB] hover:bg-white/5"
                        }`}
                      >
                        <div>
                          <div>{v.name}</div>
                          <div className="text-[9px] text-[#8794A6]">{v.licensePlate} • {v.model}</div>
                        </div>
                        <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-[#8794A6]">
                          {v.status}
                        </span>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-white/8 mt-1">
                      <Link
                        href="/vehicles"
                        onClick={() => setVehicleSelectorOpen(false)}
                        className="w-full flex items-center justify-center space-x-1 py-1.5 text-[10px] font-mono text-[#D6F45A] hover:underline"
                      >
                        <span>Manage Fleet & Pair Hardware</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Header Controls: Demo Status, Viva Scenarios, Profile */}
          <div className="flex items-center space-x-2.5">
            {/* Prominent Demo Simulation Indicator (Non-Negotiable Requirement) */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>DEMO SIMULATION</span>
              <span className="text-amber-500/60 font-normal">|</span>
              <span className="text-amber-200/90 font-mono-numbers">
                {new Date(activeVehicle.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>

            {/* Viva Fault Injector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setScenarioOpen(!scenarioOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#D6F45A]/10 hover:bg-[#D6F45A]/20 border border-[#D6F45A]/30 text-[#D6F45A] text-xs font-mono font-bold transition-all cursor-pointer"
                title="Inject Simulated Telemetry Scenarios for University Viva"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VIVA TEST SCENARIOS</span>
                <span className="sm:hidden">TESTS</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {scenarioOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-[#151D28] border border-white/15 p-3 shadow-2xl z-50 flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/8">
                      <span className="text-[10px] font-mono uppercase text-[#F4F7FB] font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Viva Simulation Controls</span>
                      </span>
                      <button
                        onClick={toggleSimulation}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#F4F7FB] flex items-center space-x-1"
                      >
                        {isSimulating ? <Pause className="w-2.5 h-2.5 text-amber-400" /> : <Play className="w-2.5 h-2.5 text-[#D6F45A]" />}
                        <span>{isSimulating ? "PAUSE TICKER" : "START TICKER"}</span>
                      </button>
                    </div>

                    <div className="text-[10px] font-mono text-[#8794A6] leading-relaxed">
                      Inject deterministic fault conditions to demonstrate real-time alerts, DTC generation, and TPMS response during evaluation:
                    </div>

                    <div className="flex flex-col space-y-1.5 pt-1">
                      <button
                        onClick={() => {
                          injectScenario("TPMS_PUNCTURE_RR");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-300 transition-colors"
                      >
                        <div className="font-bold">1. TPMS Puncture Event (RR 22 PSI)</div>
                        <div className="text-[9px] text-[#8794A6]">Triggers low pressure code C0077 & dashboard warning</div>
                      </button>

                      <button
                        onClick={() => {
                          injectScenario("BATTERY_THERMAL_ALERT");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-mono text-amber-300 transition-colors"
                      >
                        <div className="font-bold">2. High Battery Temp Alert (48.6°C)</div>
                        <div className="text-[9px] text-[#8794A6]">Triggers code P0A7F & cooling pump advisory</div>
                      </button>

                      <button
                        onClick={() => {
                          injectScenario("BRAKE_PAD_WEAR");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs font-mono text-blue-300 transition-colors"
                      >
                        <div className="font-bold">3. Brake Wear Warning (ISO-14229)</div>
                        <div className="text-[9px] text-[#8794A6]">Triggers code C1120 & friction pad reminder</div>
                      </button>

                      <button
                        onClick={() => {
                          clearAllFaults();
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-[#43D9A3]/10 hover:bg-[#43D9A3]/20 border border-[#43D9A3]/30 text-xs font-mono text-[#43D9A3] transition-colors flex items-center justify-between"
                      >
                        <div className="font-bold">Reset to 100% Nominal State</div>
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell with Badge */}
            <Link
              href="/alerts"
              className="relative w-9 h-9 rounded-xl bg-[#151D28] border border-white/10 flex items-center justify-center text-[#8794A6] hover:text-[#F4F7FB] hover:border-white/20 transition-colors"
              title="Alert Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6E73] text-[9px] font-bold text-white flex items-center justify-center font-mono-numbers">
                  {unreadAlertsCount}
                </span>
              )}
            </Link>

            {/* Student Attribution Chip */}
            <Link
              href="/about"
              className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#151D28] border border-white/10 hover:border-[#D6F45A]/40 transition-colors text-xs font-mono text-[#F4F7FB]"
              title="Student Lead & Engineering Specifications"
            >
              <div className="w-6 h-6 rounded-lg bg-[#D6F45A]/15 border border-[#D6F45A]/30 flex items-center justify-center text-[10px] text-[#D6F45A] font-bold">
                ZA
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold leading-tight">{user?.name || "Zainab Amanat"}</span>
                <span className="text-[8px] text-[#8794A6] leading-tight">M245008</span>
              </div>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-[#151D28] border border-white/10 flex items-center justify-center text-[#8794A6] hover:text-[#F4F7FB]"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Ribbon (Desktop) */}
        <div className="hidden md:block border-t border-white/8 bg-[#0B1018]/60 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center space-x-1 py-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-lg flex items-center space-x-2 text-xs font-mono font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-[#151D28] text-[#D6F45A] border border-[#D6F45A]/30 shadow-sm"
                      : "text-[#8794A6] hover:text-[#F4F7FB] hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-[#D6F45A]" : "text-[#8794A6]"}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-[#FF6E73] text-white font-bold font-mono-numbers">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#0B1018] px-4 py-4 space-y-1"
            >
              <div className="p-3 mb-2 rounded-xl bg-[#151D28] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#F4F7FB]">{activeVehicle.name}</div>
                  <div className="text-[9px] font-mono text-[#8794A6]">{activeVehicle.licensePlate} • DEMO SIMULATOR</div>
                </div>
                <Link
                  href="/vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono text-[#D6F45A] hover:underline"
                >
                  Switch
                </Link>
              </div>

              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-mono font-semibold transition-all ${
                      active
                        ? "bg-[#D6F45A]/15 text-[#D6F45A] border border-[#D6F45A]/30 font-bold"
                        : "text-[#8794A6] hover:text-[#F4F7FB] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FF6E73] text-white font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

