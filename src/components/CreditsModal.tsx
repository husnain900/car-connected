"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Cpu, ShieldCheck, Layers, Terminal, Sparkles, UserCheck } from "lucide-react";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 glass-panel"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-emerald/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white">
                      ENGINEERING CREDITS & SPECS
                    </h2>
                    <p className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                      NEBULA CONNECTED VEHICLE PLATFORM // v4.2
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Close Credits Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neon-cyan/10 via-zinc-900/40 to-neon-emerald/10 border border-neon-cyan/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center font-display font-black text-neon-cyan text-base tracking-wider">
                    ZA
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-display font-black text-lg text-white tracking-wide">
                        Zainab Amanat
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                        LEAD ENGINEER
                      </span>
                    </div>
                    <p className="font-mono text-xs text-zinc-400 tracking-widest">
                      ROLL NUMBER: <span className="text-white font-bold font-mono-numbers">M245008</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800">
                  <UserCheck className="w-4 h-4 text-neon-emerald" />
                  <span className="font-mono text-[10px] text-zinc-300 font-semibold tracking-wider">
                    OFFICIAL AUTHOR
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start space-x-3">
                  <Cpu className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Core Framework
                    </div>
                    <div className="font-sans font-semibold text-xs text-white mt-0.5">
                      Next.js 16 (App Router) & React 19
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 mt-0.5">
                      Turbopack Static Compilation
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start space-x-3">
                  <Layers className="w-4 h-4 text-neon-emerald mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Interface & Motion
                    </div>
                    <div className="font-sans font-semibold text-xs text-white mt-0.5">
                      Tailwind CSS v4 & Framer Motion
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 mt-0.5">
                      GSAP Precision Numeric Counters
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start space-x-3">
                  <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Automotive Visuals
                    </div>
                    <div className="font-sans font-semibold text-xs text-white mt-0.5">
                      Gemini 4K Studio Rendering
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 mt-0.5">
                      Photorealistic Multi-Angle Showroom
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start space-x-3">
                  <ShieldCheck className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Security & Standards
                    </div>
                    <div className="font-sans font-semibold text-xs text-white mt-0.5">
                      AES-256 ECU Handshake Simulation
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 mt-0.5">
                      CAN-Bus / TPMS Live Mesh Diagnostics
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 font-mono text-[10px]">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5 text-neon-emerald" />
                  <span>STUDENT PROJECT // VERIFIED PRODUCTION READY</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-semibold tracking-wider transition-colors"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

