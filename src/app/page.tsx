"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroVisualizer from "@/components/HeroVisualizer";
import TelemetryGrid from "@/components/TelemetryGrid";
import DiagnosticGrid from "@/components/DiagnosticGrid";
import ProfileSidebar from "@/components/ProfileSidebar";
import TelemetryTab from "@/components/TelemetryTab";
import SystemsTab from "@/components/SystemsTab";
import NavigationTab from "@/components/NavigationTab";
import CreditsModal from "@/components/CreditsModal";
import gsap from "gsap";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("CONSOLE");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Zainab Amanat",
    license: "M24-5008",
    pin: "5008",
    valetLimit: 50,
    energySaving: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-animate-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentTab]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg-base text-text-base flex flex-col font-sans transition-colors duration-300 selection:bg-neon-cyan/20 selection:text-neon-cyan"
    >
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        onProfileClick={() => setIsProfileOpen(true)}
        onOpenCredits={() => setIsCreditsOpen(true)}
        driverName={profile.name}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8">
        <div className="flex flex-col space-y-2 gsap-animate-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-neon-cyan font-bold uppercase">
                {currentTab} STATE: NOMINAL
              </span>
            </div>
            <button
              onClick={() => setIsCreditsOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 text-[10px] font-mono text-zinc-400 hover:text-neon-cyan transition-colors"
            >
              <Sparkles className="w-3 h-3 text-neon-cyan" />
              <span>STUDENT PROJECT // SPECIFICATIONS</span>
            </button>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-text-base">
              {currentTab === "CONSOLE" ? "VEHICLE OVERVIEW" : currentTab}
            </h1>
            <div className="font-mono text-xs tracking-wider text-zinc-400 font-semibold uppercase flex items-center space-x-2">
              <span>PILOT ACTIVE:</span>
              <span className="text-white font-bold">{profile.name}</span>
              <span className="text-zinc-600">{"//"}</span>
              <span className="text-neon-cyan font-mono-numbers">{profile.license}</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-border-base via-border-base/50 to-transparent" />
        </div>

        {currentTab === "CONSOLE" && (
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <div className="gsap-animate-card">
              <HeroVisualizer />
            </div>

            <div className="gsap-animate-card">
              <TelemetryGrid />
            </div>

            <div className="gsap-animate-card">
              <DiagnosticGrid />
            </div>
          </div>
        )}

        {currentTab === "TELEMETRY" && (
          <div className="gsap-animate-card">
            <TelemetryTab />
          </div>
        )}

        {currentTab === "SYSTEMS" && (
          <div className="gsap-animate-card">
            <SystemsTab />
          </div>
        )}

        {currentTab === "NAVIGATION" && (
          <div className="gsap-animate-card">
            <NavigationTab />
          </div>
        )}
      </main>

      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSave={(updated) => setProfile(updated)}
      />

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      <footer className="w-full border-t border-border-base py-6 bg-black/10 dark:bg-black/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 font-mono text-[10px] tracking-wider font-bold">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-text-base">© 2026 NEBULA VEHICLE SYSTEMS</span>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span className="text-neon-cyan flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TERMINAL SECURED (AES-256)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-zinc-400 text-center sm:text-right">
              Designed & Engineered by{" "}
              <strong className="text-neon-cyan font-bold tracking-wide">Zainab Amanat</strong>
              {" — "}
              Roll No: <span className="text-white font-mono-numbers">M245008</span>
            </span>
            <button
              onClick={() => setIsCreditsOpen(true)}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-neon-cyan text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Award className="w-3 h-3 text-neon-cyan" />
              <span>ABOUT PROJECT</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
