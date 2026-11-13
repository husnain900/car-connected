"use client";

import React from "react";
import Image from "next/image";

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
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Premium Hypercar Emblem Badge */}
      <div
        className={`relative ${sizeMap[size]} rounded-xl overflow-hidden bg-[#151D28] border border-[#D6F45A]/40 shadow-[0_0_18px_rgba(214,244,90,0.2)] group-hover:border-[#D6F45A] group-hover:shadow-[0_0_24px_rgba(214,244,90,0.4)] transition-all duration-300 flex-shrink-0 flex items-center justify-center p-0.5`}
      >
        <Image
          src="/assets/images/nebula-logo.png"
          alt="Nebula Drive Automotive Crest"
          fill
          sizes="80px"
          className="object-cover rounded-[10px] filter contrast-125 hover:scale-105 transition-transform duration-300"
          priority
        />
        {/* Subtle Neon Underglow Border */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-[#D6F45A]/30 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="font-display font-black text-sm tracking-wider text-[#F4F7FB]">
              NEBULA DRIVE
            </span>
            <span className="text-[9px] font-mono font-bold text-[#D6F45A] bg-[#D6F45A]/10 px-1.5 py-0.5 rounded border border-[#D6F45A]/25">
              v4.2
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#8794A6] tracking-widest hidden sm:inline">
            INTELLIGENCE IN MOTION
          </span>
        </div>
      )}
    </div>
  );
}
