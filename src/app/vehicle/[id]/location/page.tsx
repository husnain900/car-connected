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
  const { activeVehicle } = useSimulationStore();

  const [selectedTripId, setSelectedTripId] = useState("trip-01");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(35);
  const [deviceGps, setDeviceGps] = useState<{ lat: number; lng: number } | null>(null);
  const [deviceGpsError, setDeviceGpsError] = useState<string | null>(null);

  const trips = [
    {
      id: "trip-01",
      title: "Alpine Test Circuit Sprint",
      distanceKm: 42.8,
      durationMins: 28,
      avgSpeedKmH: 91.7,
      energyKwh: 11.2,
      originName: "Base Camp A-1",
      destName: "Summit Telemetry Station",
    },
    {
      id: "trip-02",
      title: "Urban Eco-Commute Simulation",
      distanceKm: 18.4,
      durationMins: 34,
      avgSpeedKmH: 32.5,
      energyKwh: 3.1,
      originName: "Silicon District Hub",
      destName: "Metro Supercharger",
    },
    {
      id: "trip-03",
      title: "High-Speed Autobahn Sweep",
      distanceKm: 86.2,
      durationMins: 45,
      avgSpeedKmH: 114.9,
      energyKwh: 24.6,
      originName: "South Ring Interchange",
      destName: "Aero Testing Facility",
    },
  ];

  const currentTrip = trips.find((t) => t.id === selectedTripId) || trips[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
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
        setDeviceGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setDeviceGpsError(`Unable to fetch device GPS: ${err.message}`);
      }
    );
  };

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
          <span className="text-[#79C7FF]">GPS & Trip Replay</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F8FC]">
              Tactical GPS Tracking & Trip Analytics
            </h1>
            <p className="text-xs font-mono text-[#A5B5C8] mt-0.5">
              Interactive route replay, timestamped telemetry waypoints, and energy consumption logs.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#293C51] via-[#293C51]/50 to-transparent" />
      </div>

      {/* Main HUD & Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Trip Selection & Replay Controls */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
              MISSION LOGS
            </span>
            <h3 className="font-display font-bold text-lg text-[#F5F8FC] mt-0.5">
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
                        ? "bg-[#79C7FF]/15 border-[#79C7FF]/40 text-[#F5F8FC]"
                        : "bg-[#1E314B] border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC] hover:border-[#79C7FF]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F5F8FC] truncate max-w-[180px]">
                        {trip.title}
                      </span>
                      <span className="text-[10px] text-[#79C7FF] font-bold font-mono-numbers">
                        {trip.distanceKm} KM
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#A5B5C8] mt-1.5">
                      <span>{trip.durationMins} MINS</span>
                      <span>Avg: {trip.avgSpeedKmH} km/h</span>
                      <span>{trip.energyKwh} kWh</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Replay Scrubbing Controls */}
            <div className="mt-6 p-4 rounded-xl bg-[#1E314B] border border-[#293C51] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#A5B5C8] uppercase font-bold">
                  ROUTE PLAYBACK ENGINE
                </span>
                <span className="text-xs font-mono font-bold text-[#79C7FF] font-mono-numbers">
                  {playbackProgress}% COMPLETED
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={playbackProgress}
                onChange={(e) => setPlaybackProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-[#091321] rounded-lg appearance-none cursor-pointer accent-[#79C7FF]"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "PAUSE REPLAY" : "PLAY ROUTE"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setPlaybackProgress(0);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-[#152437] hover:bg-[#152437]/80 text-xs font-mono text-[#A5B5C8] hover:text-[#F5F8FC] border border-[#293C51] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Device Location Check */}
          <div className="mt-6 pt-4 border-t border-[#293C51] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#A5B5C8] uppercase font-bold">
                DEVICE LOCATION COMPARISON
              </span>
              <button
                onClick={requestDeviceGps}
                className="text-[9px] font-mono text-[#79C7FF] hover:underline cursor-pointer"
              >
                Query Phone GPS
              </button>
            </div>
            {deviceGps ? (
              <div className="p-2 rounded bg-[#091321] border border-[#293C51] text-[9px] font-mono text-[#35C99A]">
                Device Lat: {deviceGps.lat.toFixed(4)}° N, Lng: {deviceGps.lng.toFixed(4)}° W (User Device Only)
              </div>
            ) : deviceGpsError ? (
              <div className="p-2 rounded bg-[#F16D78]/15 border border-[#F16D78]/30 text-[9px] font-mono text-[#F16D78]">
                {deviceGpsError}
              </div>
            ) : (
              <div className="text-[9px] font-mono text-[#A5B5C8]">
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
                <span className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
                  TACTICAL VECTOR MAP HUD
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5F8FC]">
                  {currentTrip.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#A5B5C8]">
                <Compass className="w-3.5 h-3.5 text-[#79C7FF]" />
                <span>HEADING 042° NE // SAT-8 LOCK</span>
              </div>
            </div>

            {/* Dynamic Map HUD Render */}
            <div className="relative w-full h-80 rounded-xl bg-[#091321] border border-[#293C51] overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-[450px] h-[450px] border border-[#293C51]/40 rounded-full pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] border border-[#293C51]/30 rounded-full pointer-events-none" />
              <div className="absolute w-[150px] h-[150px] border border-[#293C51]/20 rounded-full pointer-events-none" />

              {/* Vector Roads & Waypoints SVG */}
              <svg className="absolute inset-0 w-full h-full p-6 pointer-events-none" viewBox="0 0 500 250">
                <line x1="0" y1="125" x2="500" y2="125" stroke="rgba(121,199,255,0.08)" strokeDasharray="4 4" />
                <line x1="250" y1="0" x2="250" y2="250" stroke="rgba(121,199,255,0.08)" strokeDasharray="4 4" />

                {/* Base Route Curve */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="rgba(165, 181, 200, 0.2)"
                  strokeWidth="3"
                />

                {/* Traveled Animated Path */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="#79C7FF"
                  strokeWidth="3.5"
                  strokeDasharray="450"
                  strokeDashoffset={450 - (playbackProgress / 100) * 450}
                  strokeLinecap="round"
                />

                {/* Origin Marker */}
                <circle cx="60" cy="190" r="5" fill="#35C99A" />
                <text x="50" y="215" fill="#35C99A" fontSize="10" fontFamily="monospace">ORIGIN</text>

                {/* Destination Marker */}
                <circle cx="440" cy="70" r="6" fill="#79C7FF" />
                <text x="420" y="55" fill="#79C7FF" fontSize="10" fontFamily="monospace">DEST</text>

                {/* Waypoint Charging Station */}
                <circle cx="260" cy="130" r="4" fill="#F2B65B" />
                <text x="240" y="150" fill="#F2B65B" fontSize="9" fontFamily="monospace">DC CHARGER</text>
              </svg>

              {/* HUD Telemetry Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#152437]/90 border border-[#293C51] text-[10px] font-mono text-[#A5B5C8] space-y-1">
                <div>ORIGIN: <span className="text-[#F5F8FC]">{currentTrip.originName}</span></div>
                <div>DESTINATION: <span className="text-[#F5F8FC]">{currentTrip.destName}</span></div>
                <div>EST. ENERGY: <span className="text-[#79C7FF] font-bold">{currentTrip.energyKwh} kWh</span></div>
              </div>

              <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-[#152437]/90 border border-[#293C51] text-right text-[10px] font-mono">
                <span className="text-[#A5B5C8]">SIMULATED GNSS COORDINATES:</span>
                <div className="text-xs font-bold text-[#F5F8FC] font-mono-numbers">
                  37.7749° N, 122.4194° W
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#293C51] mt-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#A5B5C8] uppercase block">TOTAL DISTANCE</span>
              <span className="font-bold text-[#F5F8FC] font-mono-numbers">{currentTrip.distanceKm} KM</span>
            </div>
            <div>
              <span className="text-[9px] text-[#A5B5C8] uppercase block">TRIP DURATION</span>
              <span className="font-bold text-[#F5F8FC] font-mono-numbers">{currentTrip.durationMins} MINS</span>
            </div>
            <div>
              <span className="text-[9px] text-[#A5B5C8] uppercase block">AVG VELOCITY</span>
              <span className="font-bold text-[#F5F8FC] font-mono-numbers">{currentTrip.avgSpeedKmH} KM/H</span>
            </div>
            <div>
              <span className="text-[9px] text-[#A5B5C8] uppercase block">EFFICIENCY</span>
              <span className="font-bold text-[#79C7FF] font-mono-numbers">
                {(currentTrip.energyKwh / (currentTrip.distanceKm / 100)).toFixed(1)} kWh/100km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
