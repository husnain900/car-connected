"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Compass,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function LocationPage() {
  const { activeVehicle, trips } = useSimulationStore();

  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id || "trip-01");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(35); // 0 to 100
  const [deviceGps, setDeviceGps] = useState<{ lat: number; lng: number } | null>(null);
  const [deviceGpsError, setDeviceGpsError] = useState<string | null>(null);

  const currentTrip = trips.find((t) => t.id === selectedTripId) || trips[0];

  // Route playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 2;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const requestDeviceGps = () => {
    setDeviceGpsError(null);
    if (!navigator.geolocation) {
      setDeviceGpsError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDeviceGps({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setDeviceGpsError(`Device GPS permission denied: ${err.message}`);
      }
    );
  };

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
          <span className="text-[#D6F45A]">GPS & Trip Replay</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F4F7FB]">
              Tactical GPS Tracking & Trip Analytics
            </h1>
            <p className="text-xs font-mono text-[#8794A6] mt-0.5">
              Interactive route replay, timestamped telemetry waypoints, and energy consumption logs.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Main HUD & Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Trip Selection & Replay Controls */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              MISSION LOGS
            </span>
            <h3 className="font-display font-bold text-lg text-[#F4F7FB] mt-0.5">
              Recorded Fleet Trips
            </h3>

            <div className="flex flex-col space-y-2.5 mt-4">
              {trips.map((trip) => {
                const isSelected = trip.id === currentTrip.id;
                return (
                  <button
                    key={trip.id}
                    onClick={() => {
                      setSelectedTripId(trip.id);
                      setPlaybackProgress(0);
                      setIsPlaying(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#D6F45A]/15 border-[#D6F45A]/40 text-[#F4F7FB]"
                        : "bg-[#1B2636] border-white/8 text-[#8794A6] hover:text-[#F4F7FB] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F4F7FB] truncate max-w-[180px]">
                        {trip.title}
                      </span>
                      <span className="text-[10px] text-[#D6F45A] font-bold font-mono-numbers">
                        {trip.distanceKm} KM
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#8794A6] mt-1.5">
                      <span>{trip.durationMins} MINS</span>
                      <span>Avg: {trip.avgSpeedKmH} km/h</span>
                      <span>{trip.energyKwh} kWh</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Replay Scrubbing Controls */}
            <div className="mt-6 p-4 rounded-xl bg-[#1B2636] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8794A6] uppercase font-bold">
                  ROUTE PLAYBACK ENGINE
                </span>
                <span className="text-xs font-mono font-bold text-[#D6F45A] font-mono-numbers">
                  {playbackProgress}% COMPLETED
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={playbackProgress}
                onChange={(e) => setPlaybackProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#D6F45A]"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "PAUSE REPLAY" : "PLAY ROUTE"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setPlaybackProgress(0);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8794A6] hover:text-[#F4F7FB] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Device Location Check */}
          <div className="mt-6 pt-4 border-t border-white/8 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#8794A6] uppercase font-bold">
                DEVICE LOCATION COMPARISON
              </span>
              <button
                onClick={requestDeviceGps}
                className="text-[9px] font-mono text-[#D6F45A] hover:underline"
              >
                Query Phone GPS
              </button>
            </div>
            {deviceGps ? (
              <div className="p-2 rounded bg-black/40 text-[9px] font-mono text-[#43D9A3]">
                Device Lat: {deviceGps.lat.toFixed(4)}° N, Lng: {deviceGps.lng.toFixed(4)}° W (User Device Only)
              </div>
            ) : deviceGpsError ? (
              <div className="p-2 rounded bg-red-500/10 text-[9px] font-mono text-red-300">
                {deviceGpsError}
              </div>
            ) : (
              <div className="text-[9px] font-mono text-[#8794A6]">
                Vehicle GPS is sourced from the telemetry engine. You may optionally verify device GPS separately.
              </div>
            )}
          </div>
        </div>

        {/* Right Columns: Tactical Vector Map Display */}
        <div className="lg:col-span-2 nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
                  TACTICAL VECTOR MAP HUD
                </span>
                <h3 className="font-display font-bold text-lg text-[#F4F7FB]">
                  {currentTrip.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#8794A6]">
                <Compass className="w-3.5 h-3.5 text-[#D6F45A]" />
                <span>HEADING 042° NE // SAT-8 LOCK</span>
              </div>
            </div>

            {/* Dynamic Map HUD Render */}
            <div className="relative w-full h-80 rounded-xl bg-[#0B1018] border border-white/10 overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute w-[150px] h-[150px] border border-white/5 rounded-full pointer-events-none" />

              {/* Vector Roads & Waypoints SVG */}
              <svg className="absolute inset-0 w-full h-full p-6 pointer-events-none" viewBox="0 0 500 250">
                <line x1="0" y1="125" x2="500" y2="125" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="250" y1="0" x2="250" y2="250" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* Base Route Curve */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="3"
                />

                {/* Traveled Animated Path */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="#D6F45A"
                  strokeWidth="3.5"
                  strokeDasharray="450"
                  strokeDashoffset={450 - (playbackProgress / 100) * 450}
                  strokeLinecap="round"
                />

                {/* Origin Marker */}
                <circle cx="60" cy="190" r="5" fill="#43D9A3" />
                <text x="50" y="215" fill="#43D9A3" fontSize="10" fontFamily="monospace">ORIGIN</text>

                {/* Destination Marker */}
                <circle cx="440" cy="70" r="6" fill="#D6F45A" />
                <text x="420" y="55" fill="#D6F45A" fontSize="10" fontFamily="monospace">DEST</text>

                {/* Waypoint Charging Station */}
                <circle cx="260" cy="130" r="4" fill="#F8BE62" />
                <text x="240" y="150" fill="#F8BE62" fontSize="9" fontFamily="monospace">DC CHARGER</text>
              </svg>

              {/* HUD Telemetry Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#151D28]/85 border border-white/10 text-[10px] font-mono text-[#8794A6] space-y-1">
                <div>ORIGIN: <span className="text-[#F4F7FB]">{currentTrip.originName}</span></div>
                <div>DESTINATION: <span className="text-[#F4F7FB]">{currentTrip.destName}</span></div>
                <div>EST. ENERGY: <span className="text-[#D6F45A] font-bold">{currentTrip.energyKwh} kWh</span></div>
              </div>

              <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-[#151D28]/85 border border-white/10 text-right text-[10px] font-mono">
                <span className="text-[#8794A6]">SIMULATED GNSS COORDINATES:</span>
                <div className="text-xs font-bold text-[#F4F7FB] font-mono-numbers">
                  37.7749° N, 122.4194° W
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/8 mt-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#8794A6] uppercase block">TOTAL DISTANCE</span>
              <span className="font-bold text-[#F4F7FB] font-mono-numbers">{currentTrip.distanceKm} KM</span>
            </div>
            <div>
              <span className="text-[9px] text-[#8794A6] uppercase block">TRIP DURATION</span>
              <span className="font-bold text-[#F4F7FB] font-mono-numbers">{currentTrip.durationMins} MINS</span>
            </div>
            <div>
              <span className="text-[9px] text-[#8794A6] uppercase block">AVG VELOCITY</span>
              <span className="font-bold text-[#F4F7FB] font-mono-numbers">{currentTrip.avgSpeedKmH} KM/H</span>
            </div>
            <div>
              <span className="text-[9px] text-[#8794A6] uppercase block">EFFICIENCY</span>
              <span className="font-bold text-[#D6F45A] font-mono-numbers">
                {(currentTrip.energyKwh / (currentTrip.distanceKm / 100)).toFixed(1)} kWh/100km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
