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
      {/* Precision Aerospace Automotive Crest Emblem */}
      <div
        className={`relative ${box} rounded-xl bg-gradient-to-b from-[#1E314B] to-[#152437] border border-[#293C51] shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(121,199,255,0.15)] group-hover:border-[#79C7FF]/60 group-hover:shadow-[0_0_24px_rgba(121,199,255,0.3)] transition-all duration-300 flex-shrink-0 flex items-center justify-center p-1 overflow-hidden`}
      >
        {/* Subtle radial crest ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,199,255,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* High-Precision Automotive Vector Emblem */}
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Celestial Ice Blue Gradient */}
            <linearGradient id="crestCyanGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#79C7FF" />
              <stop offset="50%" stopColor="#9BD7FF" />
              <stop offset="100%" stopColor="#4FA8F5" />
            </linearGradient>

            {/* Titanium Chrome Bevel */}
            <linearGradient id="titaniumGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5F8FC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#A5B5C8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#293C51" stopOpacity="0.4" />
            </linearGradient>

            {/* Dark Aero Core */}
            <linearGradient id="aeroCoreGrad" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E314B" />
              <stop offset="100%" stopColor="#091321" />
            </linearGradient>
          </defs>

          {/* Hexagonal Shield Facet Outer Ring */}
          <path
            d="M32 4L56 16V40L32 58L8 40V16L32 4Z"
            stroke="url(#titaniumGrad)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            fill="url(#aeroCoreGrad)"
            fillOpacity="0.7"
          />

          {/* Aerodynamic Hypercar Delta-Wing Chevron (Top / Left) */}
          <path
            d="M32 10L50 20L32 28L14 20L32 10Z"
            fill="url(#crestCyanGrad)"
            fillOpacity="0.25"
            stroke="url(#crestCyanGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Dynamic "N" Hypercar Speed Wings Architecture */}
          <path
            d="M20 44V22L32 36V48L20 44Z"
            fill="url(#crestCyanGrad)"
            stroke="#79C7FF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M44 20V42L32 28V16L44 20Z"
            fill="url(#titaniumGrad)"
            stroke="#F5F8FC"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Central Telemetry Star / Horizon Nexus Node */}
          <circle cx="32" cy="32" r="3" fill="#F5F8FC" className="animate-pulse" />
          <circle cx="32" cy="32" r="5" stroke="#79C7FF" strokeWidth="1" strokeDasharray="2 2" />

          {/* Precision Sensor Ticks */}
          <line x1="32" y1="4" x2="32" y2="8" stroke="#79C7FF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="56" x2="32" y2="60" stroke="#79C7FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Outer Hairline Precision Stroke */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-[#79C7FF]/20 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-sm tracking-wider text-[#F5F8FC]">
              NEBULA DRIVE
            </span>
            <span className="text-[9px] font-mono font-bold text-[#79C7FF] bg-[#79C7FF]/10 px-1.5 py-0.5 rounded border border-[#79C7FF]/25">
              v4.2
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#A5B5C8] tracking-widest hidden sm:inline uppercase">
            Intelligence in Motion
          </span>
        </div>
      )}
    </div>
  );
}
