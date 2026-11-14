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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">GPS & Trip Replay</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37]">
              Tactical GPS Tracking & Trip Analytics
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-0.5">
              Interactive route replay, timestamped telemetry waypoints, and energy consumption logs.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Main HUD & Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Trip Selection & Replay Controls */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
              MISSION LOGS
            </span>
            <h3 className="font-display font-bold text-lg text-[#1F2A37] mt-0.5">
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
                        ? "bg-[#E7F3F1] border-[#2E8B8B]/40 text-[#1F2A37] shadow-xs"
                        : "bg-[#FFFFFF] border-[#D8E0E7] text-[#5B6675] hover:text-[#1F2A37] hover:bg-[#EEF2F5]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F2A37] truncate max-w-[180px]">
                        {trip.title}
                      </span>
                      <span className="text-[10px] text-[#2E8B8B] font-bold font-mono-numbers">
                        {trip.distanceKm} KM
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#5B6675] mt-1.5">
                      <span>{trip.durationMins} MINS</span>
                      <span>Avg: {trip.avgSpeedKmH} km/h</span>
                      <span>{trip.energyKwh} kWh</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Replay Scrubbing Controls */}
            <div className="mt-6 p-4 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5B6675] uppercase font-bold">
                  ROUTE PLAYBACK ENGINE
                </span>
                <span className="text-xs font-mono font-bold text-[#2E8B8B] font-mono-numbers">
                  {playbackProgress}% COMPLETED
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={playbackProgress}
                onChange={(e) => setPlaybackProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-[#D8E0E7] rounded-lg appearance-none cursor-pointer accent-[#2E8B8B]"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-[#2E8B8B] hover:bg-[#236F70] text-white text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "PAUSE REPLAY" : "PLAY ROUTE"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setPlaybackProgress(0);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F5] text-xs font-mono text-[#5B6675] hover:text-[#1F2A37] border border-[#D8E0E7] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Device Location Check */}
          <div className="mt-6 pt-4 border-t border-[#D8E0E7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#5B6675] uppercase font-bold">
                DEVICE LOCATION COMPARISON
              </span>
              <button
                onClick={requestDeviceGps}
                className="text-[9px] font-mono text-[#2E8B8B] hover:underline cursor-pointer"
              >
                Query Phone GPS
              </button>
            </div>
            {deviceGps ? (
              <div className="p-2 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-[9px] font-mono text-[#2FA36B]">
                Device Lat: {deviceGps.lat.toFixed(4)}° N, Lng: {deviceGps.lng.toFixed(4)}° W (User Device Only)
              </div>
            ) : deviceGpsError ? (
              <div className="p-2 rounded bg-[#FFF1F2] border border-[#FECDD3] text-[9px] font-mono text-[#C74E58]">
                {deviceGpsError}
              </div>
            ) : (
              <div className="text-[9px] font-mono text-[#5B6675]">
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
                <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                  TACTICAL VECTOR MAP HUD
                </span>
                <h3 className="font-display font-bold text-lg text-[#1F2A37]">
                  {currentTrip.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
                <Compass className="w-3.5 h-3.5 text-[#2E8B8B]" />
                <span>HEADING 042° NE // SAT-8 LOCK</span>
              </div>
            </div>

            {/* Dynamic Map HUD Render */}
            <div className="relative w-full h-80 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#EEF2F5] border border-[#D8E0E7] overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-[450px] h-[450px] border border-[#D8E0E7] rounded-full pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] border border-[#D8E0E7] rounded-full pointer-events-none" />
              <div className="absolute w-[150px] h-[150px] border border-[#D8E0E7] rounded-full pointer-events-none" />

              {/* Vector Roads & Waypoints SVG */}
              <svg className="absolute inset-0 w-full h-full p-6 pointer-events-none" viewBox="0 0 500 250">
                <line x1="0" y1="125" x2="500" y2="125" stroke="rgba(46,139,139,0.12)" strokeDasharray="4 4" />
                <line x1="250" y1="0" x2="250" y2="250" stroke="rgba(46,139,139,0.12)" strokeDasharray="4 4" />

                {/* Base Route Curve */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="#D8E0E7"
                  strokeWidth="3.5"
                />

                {/* Traveled Animated Path */}
                <path
                  d="M 60,190 Q 180,60 260,130 T 440,70"
                  fill="none"
                  stroke="#2E8B8B"
                  strokeWidth="4"
                  strokeDasharray="450"
                  strokeDashoffset={450 - (playbackProgress / 100) * 450}
                  strokeLinecap="round"
                />

                {/* Origin Marker */}
                <circle cx="60" cy="190" r="5" fill="#2FA36B" />
                <text x="50" y="215" fill="#2FA36B" fontSize="10" fontFamily="monospace" fontWeight="bold">ORIGIN</text>

                {/* Destination Marker */}
                <circle cx="440" cy="70" r="6" fill="#2E8B8B" />
                <text x="420" y="55" fill="#2E8B8B" fontSize="10" fontFamily="monospace" fontWeight="bold">DEST</text>

                {/* Waypoint Charging Station */}
                <circle cx="260" cy="130" r="4" fill="#B98121" />
                <text x="240" y="150" fill="#B98121" fontSize="9" fontFamily="monospace">DC CHARGER</text>
              </svg>

              {/* HUD Telemetry Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#FFFFFF]/95 border border-[#D8E0E7] text-[10px] font-mono text-[#5B6675] space-y-1 shadow-xs">
                <div>ORIGIN: <span className="text-[#1F2A37] font-semibold">{currentTrip.originName}</span></div>
                <div>DESTINATION: <span className="text-[#1F2A37] font-semibold">{currentTrip.destName}</span></div>
                <div>EST. ENERGY: <span className="text-[#2E8B8B] font-bold">{currentTrip.energyKwh} kWh</span></div>
              </div>

              <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-[#FFFFFF]/95 border border-[#D8E0E7] text-right text-[10px] font-mono shadow-xs">
                <span className="text-[#5B6675]">SIMULATED GNSS COORDINATES:</span>
                <div className="text-xs font-bold text-[#1F2A37] font-mono-numbers">
                  37.7749° N, 122.4194° W
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8E0E7] mt-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#5B6675] uppercase block">TOTAL DISTANCE</span>
              <span className="font-bold text-[#1F2A37] font-mono-numbers">{currentTrip.distanceKm} KM</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B6675] uppercase block">TRIP DURATION</span>
              <span className="font-bold text-[#1F2A37] font-mono-numbers">{currentTrip.durationMins} MINS</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B6675] uppercase block">AVG VELOCITY</span>
              <span className="font-bold text-[#1F2A37] font-mono-numbers">{currentTrip.avgSpeedKmH} KM/H</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B6675] uppercase block">EFFICIENCY</span>
              <span className="font-bold text-[#2E8B8B] font-mono-numbers">
                {(currentTrip.energyKwh / (currentTrip.distanceKm / 100)).toFixed(1)} kWh/100km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
