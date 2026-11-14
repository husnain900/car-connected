"use client";

import React from "react";

interface NebulaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export default function NebulaLogo({
  className = "",
  size = "md",
  showText = false,
}: NebulaLogoProps) {
  const dimensionMap = {
    sm: { box: "w-8 h-8", icon: 20 },
    md: { box: "w-10 h-10", icon: 24 },
    lg: { box: "w-14 h-14", icon: 34 },
    xl: { box: "w-20 h-20", icon: 48 },
  };

  const { box, icon } = dimensionMap[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Precision Aerospace Automotive Crest Emblem (Aurora Light Palette) */}
      <div
        className={`relative ${box} rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#EEF2F5] border border-[#D8E0E7] shadow-[0_2px_10px_rgba(31,42,55,0.06)] group-hover:border-[#2E8B8B] group-hover:shadow-[0_4px_16px_rgba(46,139,139,0.18)] transition-all duration-300 flex-shrink-0 flex items-center justify-center p-1 overflow-hidden`}
      >
        {/* Subtle radial crest ambient highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,139,139,0.08)_0%,transparent_75%)] pointer-events-none" />

        {/* High-Precision Automotive Vector Emblem */}
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 filter drop-shadow-[0_1px_3px_rgba(31,42,55,0.15)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Aurora Teal Gradient */}
            <linearGradient id="crestTealGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2E8B8B" />
              <stop offset="50%" stopColor="#3FA3A3" />
              <stop offset="100%" stopColor="#236F70" />
            </linearGradient>

            {/* Muted Slate Gradient */}
            <linearGradient id="crestInkGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1F2A37" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#5B6675" />
            </linearGradient>

            {/* Pearl Core Fill */}
            <linearGradient id="pearlCoreGrad" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EEF2F5" />
            </linearGradient>
          </defs>

          {/* Hexagonal Shield Facet Outer Ring */}
          <path
            d="M32 4L56 16V40L32 58L8 40V16L32 4Z"
            stroke="url(#crestTealGrad)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            fill="url(#pearlCoreGrad)"
          />

          {/* Aerodynamic Hypercar Delta-Wing Chevron (Top / Left) */}
          <path
            d="M32 10L50 20L32 28L14 20L32 10Z"
            fill="#E7F3F1"
            stroke="url(#crestTealGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Dynamic "N" Hypercar Speed Wings Architecture */}
          <path
            d="M20 44V22L32 36V48L20 44Z"
            fill="url(#crestTealGrad)"
            stroke="#236F70"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M44 20V42L32 28V16L44 20Z"
            fill="url(#crestInkGrad)"
            stroke="#1F2A37"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Central Telemetry Star / Horizon Nexus Node */}
          <circle cx="32" cy="32" r="3" fill="#2E8B8B" />
          <circle cx="32" cy="32" r="5" stroke="#2E8B8B" strokeWidth="1" strokeDasharray="2 2" />

          {/* Precision Sensor Ticks */}
          <line x1="32" y1="4" x2="32" y2="8" stroke="#2E8B8B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="56" x2="32" y2="60" stroke="#2E8B8B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Outer Hairline Precision Stroke */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-[#2E8B8B]/15 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-sm tracking-wider text-[#1F2A37]">
              NEBULA DRIVE
            </span>
            <span className="text-[9px] font-mono font-bold text-[#2E8B8B] bg-[#E7F3F1] px-1.5 py-0.5 rounded border border-[#86B6B2]/40">
              AURORA
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#5B6675] tracking-widest hidden sm:inline uppercase">
            Intelligence in Motion
          </span>
        </div>
      )}
    </div>
  );
}
