"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-[#293C51] bg-[#091321] py-6 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5B5C8]">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div className="flex items-center space-x-2">
            <NebulaLogo size="sm" showText={false} className="scale-75 origin-left" />
            <span className="font-bold text-[#F5F8FC]">NEBULA DRIVE</span>
          </div>
          <span className="text-[#293C51] hidden sm:inline">•</span>
          <span>INTELLIGENCE IN MOTION</span>
          <span className="text-[#293C51] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5 text-[#F2B65B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B65B] animate-pulse" />
            <span>DEMO SIMULATION PLATFORM</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>
            Engineered by <strong className="text-[#F5F8FC]">Zainab Amanat</strong> (Roll No: <span className="font-mono-numbers text-[#79C7FF]">M245008</span>)
          </span>
          <span className="text-[#293C51] hidden sm:inline">•</span>
          <Link
            href="/about"
            className="flex items-center space-x-1 text-[#A5B5C8] hover:text-[#79C7FF] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Architecture & Credits</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
