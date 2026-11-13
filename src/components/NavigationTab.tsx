"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, BatteryCharging, Navigation, Compass, Route } from "lucide-react";

export default function NavigationTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDest, setActiveDest] = useState({
    name: "NEBULA HQ",
    eta: "14:35 // 35 MINS",
    dist: "42.8 KM",
    batteryRequired: "12%",
  });

  const waypoints = [
    { name: "NEBULA HQ", eta: "14:35 // 35 MINS", dist: "42.8 KM", batteryRequired: "12%" },
    { name: "METROPOLIS SUPERCHARGER V4", eta: "14:15 // 15 MINS", dist: "16.4 KM", batteryRequired: "5%" },
    { name: "SILICON VALLEY AUTOBOUND", eta: "15:02 // 62 MINS", dist: "89.2 KM", batteryRequired: "24%" },
    { name: "COASTAL GRAND PRIX CIRCUIT", eta: "15:40 // 100 MINS", dist: "142.0 KM", batteryRequired: "38%" },
  ];

  const filteredWaypoints = waypoints.filter((wp) =>
    wp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full gsap-animate-card select-none">
      <div className="lg:col-span-1 glass-panel glass-panel-glow-cyan rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[380px]">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">MISSION ROUTE</span>
          <h3 className="font-display font-bold text-lg tracking-widest text-text-base">TRIP & WAYPOINTS</h3>
          <div className="h-[1px] w-full bg-border-base my-3" />
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center my-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH DESTINATION..."
              className="w-full bg-zinc-950/40 border border-border-base focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-text-base tracking-wider outline-none transition-colors uppercase placeholder:text-zinc-600"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-mono text-[8px] tracking-widest text-zinc-500 font-bold uppercase">
              SELECT DESTINATION
            </span>
            {filteredWaypoints.length === 0 ? (
              <div className="p-3 text-center text-xs font-mono text-zinc-500 italic">No waypoints matched.</div>
            ) : (
              filteredWaypoints.map((wp) => (
                <button
                  key={wp.name}
                  onClick={() => setActiveDest(wp)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeDest.name === wp.name
                      ? "bg-neon-cyan/15 border-neon-cyan text-text-base shadow-[0_0_12px_rgba(0,240,255,0.12)]"
                      : "bg-zinc-900/20 dark:bg-zinc-950/40 border-border-base/70 text-zinc-400 hover:text-text-base hover:border-border-base"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate mr-2">
                    <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${activeDest.name === wp.name ? "text-neon-cyan" : "text-zinc-500"}`} />
                    <span className="truncate">{wp.name}</span>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono-numbers flex-shrink-0">{wp.dist}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-border-base text-[9px] font-mono text-zinc-500 font-bold flex items-center justify-between">
          <span>GNSS ACCURACY: &lt; 0.5 M</span>
          <span className="text-neon-cyan">ROUTE DYNAMICALLY REROUTED</span>
        </div>
      </div>

      <div className="lg:col-span-2 glass-panel glass-panel-glow-emerald rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between min-h-[380px]">
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">VECTOR HUD</span>
            <h3 className="font-display font-bold text-lg tracking-widest text-text-base">TACTICAL NAVIGATION HUD</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] text-zinc-500">TARGET WAYPOINT</span>
            <span className="font-display font-extrabold text-sm text-neon-cyan tracking-wider uppercase">
              {activeDest.name}
            </span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-border-base my-3 z-10" />

        <div className="flex-1 flex items-center justify-center relative min-h-[200px] bg-black/80 rounded-xl border border-border-base/50 overflow-hidden select-none">
          <div className="absolute w-[440px] h-[440px] border border-zinc-900/40 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] border border-zinc-900/30 rounded-full" />
            <div className="w-[200px] h-[200px] border border-zinc-900/20 rounded-full" />
          </div>

          <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none opacity-85" viewBox="0 0 400 200">
            <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(63, 63, 70, 0.25)" strokeDasharray="4 4" />
            <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(63, 63, 70, 0.25)" strokeDasharray="4 4" />

            <path d="M 50,50 Q 150,30 200,100 T 350,150" fill="none" stroke="rgba(63, 63, 70, 0.35)" strokeWidth="1.5" />
            <path d="M 20,180 Q 100,100 200,100 T 380,40" fill="none" stroke="rgba(63, 63, 70, 0.35)" strokeWidth="1.5" />

            <motion.path
              d="M 120,120 Q 200,100 280,100 T 320,60"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <circle cx="120" cy="120" r="4" fill="#05ff80" />
            <circle cx="320" cy="60" r="5" fill="#00f0ff" />
            <circle cx="200" cy="100" r="4" fill="#eab308" />
          </svg>

          <div className="absolute top-3 left-4 flex items-center space-x-1.5 text-neon-emerald font-mono text-[9px] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>HEADING 042° NE // SPEED 84 KM/H</span>
          </div>

          <div className="absolute bottom-3 left-4 font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex flex-col space-y-0.5">
            <span>COORDINATES: LAT 37.7749° N // LON 122.4194° W</span>
            <span>UPLINK: SHIELD GNSS SAT-8 (16 CHANNELS)</span>
          </div>

          <div className="absolute bottom-3 right-4 flex items-center space-x-1.5 text-yellow-400 font-mono text-[8px] font-bold tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>EST. BATTERY REQUIRED: {activeDest.batteryRequired}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-base mt-4 z-10">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">EST. ARRIVAL TIME</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Route className="w-3.5 h-3.5 text-neon-emerald" />
              <span className="font-display font-black text-sm text-text-base font-mono-numbers">{activeDest.eta}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">REMAINING DISTANCE</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Navigation className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="font-display font-black text-sm text-neon-cyan font-mono-numbers">{activeDest.dist}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
