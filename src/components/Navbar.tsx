"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Radio, Compass, Sun, Moon, Award, Menu, X } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  onProfileClick: () => void;
  onOpenCredits: () => void;
  driverName: string;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  theme,
  toggleTheme,
  onProfileClick,
  onOpenCredits,
  driverName,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "CONSOLE", name: "CONSOLE", icon: Cpu },
    { id: "TELEMETRY", name: "TELEMETRY", icon: Radio },
    { id: "SYSTEMS", name: "SYSTEMS", icon: ShieldCheck },
    { id: "NAVIGATION", name: "NAVIGATION", icon: Compass },
  ];

  const initials = driverName
    ? driverName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ZA";

  const handleTabSelect = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-border-base bg-bg-base/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner">
            <span className="font-display font-black text-xl text-neon-cyan select-none tracking-tighter">
              NB
            </span>
            <div className="absolute inset-0 bg-neon-cyan/10 rounded-xl blur-sm pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-bold text-sm tracking-widest text-text-base">
                NEBULA
              </span>
              <span className="text-[10px] font-mono text-neon-cyan font-semibold">OS v4.2</span>
            </div>
            <span className="font-mono text-[9px] tracking-wider text-zinc-500">
              VEHICLE TELEMETRY
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentTab(item.id)}
                className={`relative px-3.5 py-2 flex items-center space-x-2 text-xs font-semibold tracking-wider rounded-lg border transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-bg-panel border-neon-cyan text-text-base shadow-[0_0_15px_rgba(0,240,255,0.08)]"
                    : "bg-transparent border-transparent text-zinc-400 hover:text-text-base hover:border-border-base hover:bg-zinc-500/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-neon-cyan" : "text-zinc-500"}`} />
                <span>{item.name}</span>
                {active && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -bottom-[21px] left-1/4 right-1/4 h-[2px] bg-neon-cyan shadow-[0_0_8px_var(--neon-cyan)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCredits}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan transition-all cursor-pointer font-mono text-[10px] font-bold tracking-wider"
            title="View Student Engineering Credits & System Architecture"
          >
            <Award className="w-3.5 h-3.5 text-neon-cyan flex-shrink-0" />
            <span className="hidden lg:inline">ENG: ZAINAB AMANAT // M245008</span>
            <span className="hidden sm:inline lg:hidden">ZAINAB // M245008</span>
            <span className="sm:hidden">M245008</span>
          </motion.button>

          <div className="hidden xl:flex items-center space-x-2 bg-zinc-900/10 dark:bg-zinc-900/40 border border-border-base rounded-full px-3 py-1.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-emerald" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-text-base font-bold">
              LIVE CAN-BUS
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-zinc-900/10 dark:bg-zinc-900/40 border border-border-base flex items-center justify-center text-zinc-400 hover:text-neon-cyan transition-colors cursor-pointer"
            aria-label="Toggle Color Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onProfileClick}
            className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-900/10 dark:bg-zinc-900/40 border border-border-base hover:border-neon-cyan/50 text-text-base transition-all cursor-pointer font-mono text-xs font-bold"
            title="Driver Profile & Telemetry Controls"
          >
            <div className="w-6 h-6 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-[10px] text-neon-cyan font-bold">
              {initials}
            </div>
            <span className="hidden sm:inline text-text-base text-[10px] tracking-wider uppercase font-semibold">
              {driverName || "ZAINAB AMANAT"}
            </span>
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-border-base flex items-center justify-center text-zinc-400 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-base bg-bg-panel/95 backdrop-blur-xl px-4 py-3 flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-xs font-mono font-bold tracking-wider ${
                  active
                    ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30"
                    : "text-zinc-400 hover:text-text-base hover:bg-zinc-800/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {active && <span className="text-[9px] text-neon-cyan">ACTIVE</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
