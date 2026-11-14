"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NebulaLogo from "@/components/NebulaLogo";
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
  X,
  ExternalLink,
  Terminal,
  MoreHorizontal,
  ChevronRight,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import { cockpitAudio } from "@/lib/audioManager";

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

  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [vehicleSelectorOpen, setVehicleSelectorOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Sync with Cockpit Audio State
  useEffect(() => {
    const unsub = cockpitAudio.subscribe((playing) => setIsAudioPlaying(playing));
    return unsub;
  }, []);

  // Modulate engine pitch with active vehicle telemetry speed
  useEffect(() => {
    if (activeVehicle?.currentSpeedKmH !== undefined) {
      cockpitAudio.updateSpeed(activeVehicle.currentSpeedKmH);
    }
  }, [activeVehicle?.currentSpeedKmH]);

  // Auto-play ambient theme sound on first user gesture anywhere
  useEffect(() => {
    const handleFirstGesture = () => {
      cockpitAudio.start();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, []);

  const toggleCockpitAudio = () => {
    cockpitAudio.toggle();
  };

  // Close drawers and menus on route change safely via async microtask
  useEffect(() => {
    const timer = setTimeout(() => {
      setMoreDrawerOpen(false);
      setScenarioOpen(false);
      setVehicleSelectorOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (moreDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [moreDrawerOpen]);

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

  const secondaryLinks = [
    { href: `/vehicle/${activeVehicle.id}/diagnostics`, label: "Diagnostics & TPMS Mesh", icon: Activity, desc: "4-corner wireless tyre sensors & OBD-II scanner" },
    { href: `/vehicle/${activeVehicle.id}/controls`, label: "Remote Actuators & Controls", icon: Sliders, desc: "Door locks, climate target & valet governor" },
    { href: `/vehicle/${activeVehicle.id}/maintenance`, label: "Predictive Maintenance Log", icon: Wrench, desc: "Mileage service intervals & workshop records" },
    { href: "/analytics", label: "Fleet Driving Analytics", icon: BarChart3, desc: "Energy trend charts & PDF audit report" },
    { href: "/alerts", label: "Alerts & Notifications", icon: Bell, badge: unreadAlertsCount, desc: "Real-time safety events & faults" },
    { href: "/admin", label: "Examiner Viva Controller", icon: Terminal, desc: "Fault injection & raw CAN bus packet stream" },
    { href: "/settings", label: "System Preferences", icon: Settings, desc: "Metric/Imperial units & audio feedback" },
    { href: "/about", label: "Architecture & Credits", icon: Info, desc: "System topology & author attribution" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href.split("?")[0])) return true;
    return false;
  };

  const isVehicleActive = (pathname.startsWith("/vehicle/") && !pathname.includes("/inspection") && !pathname.includes("/location") && !pathname.includes("/diagnostics") && !pathname.includes("/controls") && !pathname.includes("/maintenance")) || pathname === "/vehicles";
  const isScanActive = pathname.includes("/inspection");
  const isTripsActive = pathname.includes("/location") || pathname === "/tracking";

  return (
    <>
      {/* ========================================================= */}
      {/* TOP HEADER BAR (Aurora Light Theme: Mobile 320px to 4K)   */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D8E0E7] select-none shadow-[0_1px_8px_rgba(31,42,55,0.04)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Left */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0">
              <NebulaLogo size="sm" showText={false} />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-[#1F2A37]">
                    NEBULA DRIVE
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#2E8B8B] bg-[#E7F3F1] px-1 sm:px-1.5 py-0.5 rounded border border-[#86B6B2]/40">
                    AURORA
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#5B6675] tracking-widest hidden sm:inline uppercase">
                  INTELLIGENCE IN MOTION
                </span>
              </div>
            </Link>

            {/* Desktop Active Vehicle Dropdown Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setVehicleSelectorOpen(!vehicleSelectorOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8E0E7] hover:border-[#2E8B8B] text-xs font-mono text-[#1F2A37] transition-colors cursor-pointer min-h-[36px] shadow-xs"
              >
                <Car className="w-3.5 h-3.5 text-[#2E8B8B]" />
                <span className="font-bold">{activeVehicle.name}</span>
                <span className="text-[#5B6675] text-[10px]">({activeVehicle.licensePlate})</span>
                <ChevronDown className="w-3 h-3 text-[#5B6675]" />
              </button>

              <AnimatePresence>
                {vehicleSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] p-2 shadow-xl z-50 flex flex-col space-y-1"
                  >
                    <div className="px-3 py-1.5 text-[9px] font-mono uppercase text-[#5B6675] font-bold">
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
                            ? "bg-[#E7F3F1] text-[#2E8B8B] border border-[#2E8B8B]/40 font-bold"
                            : "text-[#1F2A37] hover:bg-[#EEF2F5]"
                        }`}
                      >
                        <div>
                          <div className="font-bold">{v.name}</div>
                          <div className="text-[9px] text-[#5B6675]">{v.licensePlate} • {v.model}</div>
                        </div>
                        <span className="text-[8px] bg-[#EEF2F5] px-1.5 py-0.5 rounded text-[#5B6675] border border-[#D8E0E7]">
                          {v.status}
                        </span>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-[#D8E0E7] mt-1">
                      <Link
                        href="/vehicles"
                        onClick={() => setVehicleSelectorOpen(false)}
                        className="w-full flex items-center justify-center space-x-1 py-1.5 text-[10px] font-mono text-[#2E8B8B] hover:underline"
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

          {/* Right Header Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Prominent Demo Simulation Indicator (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B98121] font-mono text-[10px] font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B98121] animate-pulse" />
              <span>DEMO SIMULATION</span>
              <span className="text-[#B98121]/40 font-normal">|</span>
              <span className="text-[#1F2A37] font-mono-numbers">
                {new Date(activeVehicle.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>

            {/* Viva Fault Injector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setScenarioOpen(!scenarioOpen)}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#E7F3F1] hover:bg-[#D4EAE7] border border-[#86B6B2]/40 text-[#2E8B8B] text-xs font-mono font-bold transition-all cursor-pointer min-h-[36px]"
                title="Inject Simulated Telemetry Scenarios for University Viva"
                aria-label="Viva Test Scenarios"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#B98121]" />
                <span className="hidden sm:inline">VIVA SCENARIOS</span>
                <span className="sm:hidden text-[10px]">SCENARIOS</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {scenarioOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] p-3 shadow-2xl z-50 flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#D8E0E7]">
                      <span className="text-[10px] font-mono uppercase text-[#1F2A37] font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B98121]" />
                        <span>Viva Simulation Controls</span>
                      </span>
                      <button
                        onClick={toggleSimulation}
                        className="text-[9px] font-mono px-2 py-1 rounded bg-[#EEF2F5] hover:bg-[#D8E0E7] text-[#1F2A37] flex items-center space-x-1 cursor-pointer min-h-[28px]"
                      >
                        {isSimulating ? <Pause className="w-2.5 h-2.5 text-[#B98121]" /> : <Play className="w-2.5 h-2.5 text-[#2E8B8B]" />}
                        <span>{isSimulating ? "PAUSE TICKER" : "START TICKER"}</span>
                      </button>
                    </div>

                    <div className="text-[10px] font-mono text-[#5B6675] leading-relaxed">
                      Inject deterministic fault conditions to demonstrate real-time alerts and TPMS cascades during evaluation:
                    </div>

                    <div className="flex flex-col space-y-1.5 pt-1">
                      <button
                        onClick={() => {
                          injectScenario("TPMS_PUNCTURE_RR");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] text-xs font-mono text-[#C74E58] transition-colors cursor-pointer min-h-[44px]"
                      >
                        <div className="font-bold">1. TPMS Puncture Event (RR 22 PSI)</div>
                        <div className="text-[9px] text-[#5B6675]">Triggers low pressure code C0077 & dashboard warning</div>
                      </button>

                      <button
                        onClick={() => {
                          injectScenario("BATTERY_THERMAL_ALERT");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] text-xs font-mono text-[#B98121] transition-colors cursor-pointer min-h-[44px]"
                      >
                        <div className="font-bold">2. High Battery Temp Alert (48.6°C)</div>
                        <div className="text-[9px] text-[#5B6675]">Triggers code P0A7F & cooling pump advisory</div>
                      </button>

                      <button
                        onClick={() => {
                          injectScenario("BRAKE_PAD_WEAR");
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-[#E7F3F1] hover:bg-[#D5EAE7] border border-[#86B6B2]/40 text-xs font-mono text-[#2E8B8B] transition-colors cursor-pointer min-h-[44px]"
                      >
                        <div className="font-bold">3. Brake Wear Warning (ISO-14229)</div>
                        <div className="text-[9px] text-[#5B6675]">Triggers code C1120 & friction pad reminder</div>
                      </button>

                      <button
                        onClick={() => {
                          clearAllFaults();
                          setScenarioOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-xs font-mono text-[#2FA36B] transition-colors flex items-center justify-between cursor-pointer min-h-[44px]"
                      >
                        <div className="font-bold">Reset to 100% Nominal State</div>
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ambient Cockpit Theme Audio Synthesizer */}
            <button
              onClick={toggleCockpitAudio}
              className={`relative px-2.5 sm:px-3 h-9 sm:h-10 rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs min-h-[36px] ${
                isAudioPlaying
                  ? "bg-[#E7F3F1] border-[#2E8B8B] text-[#2E8B8B]"
                  : "bg-[#FFFFFF] border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37] hover:border-[#86B6B2]"
              }`}
              title={isAudioPlaying ? "Mute Continuous Cockpit Theme Sound" : "Play Continuous Cockpit Theme Sound"}
              aria-label="Toggle Cockpit Audio"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#2E8B8B] animate-pulse" />
                  <span className="flex items-end space-x-0.5 h-3.5 pb-0.5">
                    <span className="w-0.5 bg-[#2E8B8B] rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 bg-[#2E8B8B] rounded-full animate-bounce h-3.5" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 bg-[#2E8B8B] rounded-full animate-bounce h-2" style={{ animationDelay: "300ms" }} />
                  </span>
                  <span className="hidden xl:inline text-[10px] font-mono font-bold tracking-wider">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#5B6675]" />
                  <span className="hidden xl:inline text-[10px] font-mono font-bold tracking-wider">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Notification Bell with Badge */}
            <Link
              href="/alerts"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] flex items-center justify-center text-[#5B6675] hover:text-[#1F2A37] hover:border-[#2E8B8B] transition-colors min-h-[36px] min-w-[36px] shadow-xs"
              title="Alert Notifications"
              aria-label="Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C74E58] text-[9px] font-bold text-white flex items-center justify-center font-mono-numbers">
                  {unreadAlertsCount}
                </span>
              )}
            </Link>

            {/* Student Attribution Chip (Desktop) */}
            <Link
              href="/about"
              className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] hover:border-[#2E8B8B] transition-colors text-xs font-mono text-[#1F2A37] shadow-xs"
              title="Student Lead & Engineering Specifications"
            >
              <div className="w-6 h-6 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[10px] text-[#2E8B8B] font-bold">
                ZA
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold leading-tight">{user?.name || "Zainab Amanat"}</span>
                <span className="text-[8px] text-[#5B6675] leading-tight">M245008</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Secondary Navigation Ribbon (Desktop / Tablet Landscape) */}
        <div className="hidden md:block border-t border-[#D8E0E7] bg-[#FFFFFF] overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center space-x-1 py-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-lg flex items-center space-x-2 text-xs font-mono font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer min-h-[36px] ${
                    active
                      ? "bg-[#E7F3F1] text-[#2E8B8B] border border-[#2E8B8B]/40 font-bold shadow-xs"
                      : "text-[#5B6675] hover:text-[#1F2A37] hover:bg-[#EEF2F5] border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-[#2E8B8B]" : "text-[#5B6675]"}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-[#C74E58] text-white font-bold font-mono-numbers">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Mandatory: Dashboard,       */}
      {/* Vehicle, Scan, Trips, More)                               */}
      {/* ========================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFFFF]/98 backdrop-blur-xl border-t border-[#D8E0E7] shadow-[0_-4px_20px_rgba(31,42,55,0.06)] safe-area-bottom select-none"
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {/* 1. Dashboard */}
          <Link
            href="/dashboard"
            className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all ${
              pathname === "/dashboard"
                ? "text-[#2E8B8B]"
                : "text-[#5B6675] hover:text-[#1F2A37]"
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${pathname === "/dashboard" ? "scale-110" : ""}`}>
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono tracking-tight font-medium mt-0.5">
              Dashboard
            </span>
          </Link>

          {/* 2. Vehicle */}
          <Link
            href={`/vehicle/${activeVehicle.id}`}
            className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all ${
              isVehicleActive
                ? "text-[#2E8B8B]"
                : "text-[#5B6675] hover:text-[#1F2A37]"
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${isVehicleActive ? "scale-110" : ""}`}>
              <Car className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono tracking-tight font-medium mt-0.5">
              Vehicle
            </span>
          </Link>

          {/* 3. Center Elevated Action Button: Scan */}
          <Link
            href={`/vehicle/${activeVehicle.id}/inspection`}
            aria-label="AI Visual Inspection Scanner"
            className="flex-1 flex flex-col items-center justify-center h-full min-h-[48px] -mt-5 group"
          >
            <div
              className={`w-13 h-13 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-[0_4px_16px_rgba(31,42,55,0.12)] ${
                isScanActive
                  ? "bg-[#2E8B8B] text-[#FFFFFF] border-[#2E8B8B] shadow-[0_4px_20px_rgba(46,139,139,0.3)] scale-105"
                  : "bg-gradient-to-b from-[#FFFFFF] to-[#EEF2F5] text-[#2E8B8B] border-[#D8E0E7] group-hover:border-[#2E8B8B]"
              }`}
            >
              <Camera className="w-6 h-6 transition-transform group-hover:scale-110" />
            </div>
            <span
              className={`text-[10px] font-mono font-bold tracking-tight mt-1 ${
                isScanActive ? "text-[#2E8B8B]" : "text-[#5B6675]"
              }`}
            >
              Scan
            </span>
          </Link>

          {/* 4. Trips */}
          <Link
            href={`/vehicle/${activeVehicle.id}/location`}
            className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all ${
              isTripsActive
                ? "text-[#2E8B8B]"
                : "text-[#5B6675] hover:text-[#1F2A37]"
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${isTripsActive ? "scale-110" : ""}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono tracking-tight font-medium mt-0.5">
              Trips
            </span>
          </Link>

          {/* 5. More (Accessible Bottom Drawer Trigger) */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            aria-label="Open More Menu"
            className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all cursor-pointer relative ${
              moreDrawerOpen ? "text-[#2E8B8B]" : "text-[#5B6675] hover:text-[#1F2A37]"
            }`}
          >
            <div className="p-1 rounded-lg relative">
              <MoreHorizontal className="w-5 h-5" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#C74E58] ring-2 ring-[#FFFFFF]" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-tight font-medium mt-0.5">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* MOBILE "MORE" ACCESSIBLE EXPANDED DRAWER / SHEET           */}
      {/* ========================================================= */}
      <AnimatePresence>
        {moreDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-50 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreDrawerOpen(false)}
              className="absolute inset-0 bg-[#1F2A37]/50 backdrop-blur-xs"
            />

            {/* Bottom Sheet Modal Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-[#FFFFFF] border-t border-[#D8E0E7] rounded-t-3xl shadow-[0_-10px_40px_rgba(31,42,55,0.2)] flex flex-col overflow-hidden safe-area-bottom"
            >
              {/* Sheet Drag Handle & Header */}
              <div className="p-4 pb-2 border-b border-[#D8E0E7] flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2.5">
                  <NebulaLogo size="sm" showText={false} />
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-[#1F2A37]">
                      NEBULA CONNECTED MENU
                    </h3>
                    <span className="text-[9px] font-mono text-[#5B6675] uppercase">
                      Fleet Operations & Telemetry OS
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMoreDrawerOpen(false)}
                  className="w-10 h-10 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-center text-[#5B6675] hover:text-[#1F2A37] cursor-pointer min-h-[44px] min-w-[44px]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Sheet Content */}
              <div className="overflow-y-auto px-4 py-4 space-y-4">
                {/* Active Vehicle Card */}
                <div className="p-3.5 rounded-2xl bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E7F3F1] border border-[#86B6B2]/40 flex items-center justify-center text-[#2E8B8B]">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-[#1F2A37]">
                        {activeVehicle.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#5B6675]">
                        Plate: {activeVehicle.licensePlate} • SoC: {activeVehicle.batteryLevelPct}%
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/vehicles"
                    onClick={() => setMoreDrawerOpen(false)}
                    className="px-3 py-2 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-[#FFFFFF] text-xs font-mono font-bold min-h-[44px] flex items-center shadow-xs"
                  >
                    Switch
                  </Link>
                </div>

                {/* Secondary Navigation Links */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#5B6675] font-bold px-1 block mb-1">
                    ALL APPLICATION MODULES
                  </span>

                  <div className="grid grid-cols-1 gap-1.5">
                    {secondaryLinks.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDrawerOpen(false)}
                          className={`p-3 rounded-xl flex items-center justify-between min-h-[48px] transition-all ${
                            active
                              ? "bg-[#E7F3F1] border border-[#2E8B8B]/40 text-[#2E8B8B]"
                              : "bg-[#FFFFFF] hover:bg-[#EEF2F5] border border-[#D8E0E7] text-[#1F2A37]"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "bg-[#EEF2F5] text-[#5B6675]"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold leading-tight">
                                {item.label}
                              </div>
                              <div className="text-[9px] font-mono text-[#5B6675] mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {item.badge !== undefined && item.badge > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C74E58] text-white font-bold font-mono-numbers">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-[#5B6675]" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Academic Attribution Footer inside Drawer */}
                <div className="pt-3 border-t border-[#D8E0E7] flex items-center justify-between text-xs font-mono text-[#5B6675]">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#2FA36B]" />
                    <span>Zainab Amanat (M245008)</span>
                  </div>
                  <span className="text-[10px]">Session 2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
