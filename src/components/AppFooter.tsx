"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-white/8 bg-[#0B1018]/80 py-6 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8794A6]">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span className="font-bold text-[#F4F7FB]">NEBULA DRIVE</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span>INTELLIGENCE IN MOTION</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>DEMO SIMULATION PLATFORM</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>
            Engineered by <strong className="text-[#F4F7FB]">Zainab Amanat</strong> (Roll No: <span className="font-mono-numbers text-[#D6F45A]">M245008</span>)
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <Link
            href="/about"
            className="flex items-center space-x-1 text-[#8794A6] hover:text-[#D6F45A] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Architecture & Credits</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
