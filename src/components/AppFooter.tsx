"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-[#D8E0E7] bg-[#FFFFFF] py-6 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5B6675]">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div className="flex items-center space-x-2">
            <NebulaLogo size="sm" showText={false} className="scale-75 origin-left" />
            <span className="font-bold text-[#1F2A37]">NEBULA DRIVE</span>
          </div>
          <span className="text-[#D8E0E7] hidden sm:inline">•</span>
          <span>INTELLIGENCE IN MOTION</span>
          <span className="text-[#D8E0E7] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5 text-[#B98121]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98121] animate-pulse" />
            <span>DEMO SIMULATION PLATFORM</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>
            Engineered by <strong className="text-[#1F2A37]">Zainab Amanat</strong> (Roll No: <span className="font-mono-numbers text-[#2E8B8B]">M245008</span>)
          </span>
          <span className="text-[#D8E0E7] hidden sm:inline">•</span>
          <Link
            href="/about"
            className="flex items-center space-x-1 text-[#5B6675] hover:text-[#2E8B8B] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Architecture & Credits</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
