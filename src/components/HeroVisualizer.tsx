"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Compass, Shield, Zap, RefreshCw, Camera } from "lucide-react";
import gsap from "gsap";

export default function HeroVisualizer() {
  const [activeAngle, setActiveAngle] = useState<"side" | "angle">("side");
  const rangeRef = useRef<HTMLSpanElement>(null);
  const odometerRef = useRef<HTMLSpanElement>(null);
  const voltageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (rangeRef.current) {
        gsap.fromTo(
          rangeRef.current,
          { textContent: "0" },
          {
            textContent: "584",
            duration: 1.8,
            ease: "power3.out",
            snap: { textContent: 1 },
          }
        );
      }

      if (odometerRef.current) {
        const target = { val: 14200.0 };
        gsap.to(target, {
          val: 14289.42,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (odometerRef.current) {
              odometerRef.current.textContent =
                target.val.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " KM";
            }
          },
        });
      }

      if (voltageRef.current) {
        const target = { val: 0.0 };
        gsap.to(target, {
          val: 784.2,
          duration: 2.0,
          ease: "power2.out",
          onUpdate: () => {
            if (voltageRef.current) {
              voltageRef.current.textContent = target.val.toFixed(1) + " V";
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const floatVariants = (delay: number) => ({
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
        delay: delay,
      },
    },
  });

  return (
    <div className="relative w-full h-[460px] md:h-[500px] rounded-2xl glass-panel glass-panel-glow-cyan overflow-hidden flex flex-col justify-between p-5 sm:p-7 md:p-8 gsap-animate-card select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(39,39,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(39,39,42,0.12)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-zinc-700/60 pointer-events-none" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-zinc-700/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-zinc-700/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-zinc-700/60 pointer-events-none" />

      <div className="z-10 flex flex-wrap gap-4 items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 font-bold uppercase">
              VEHICLE IDENTIFIER
            </span>
            <span className="bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest">
              AG-HYPERION v4.2
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-widest mt-1 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            HYPERION GT
          </h2>
          <span className="font-mono text-[9px] text-zinc-400 tracking-wider">
            HIGH-EFFICIENCY DUAL-ROTOR ALL-ELECTRIC PLATFORM
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="glass-panel border-zinc-800/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl flex flex-col items-end">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold">EST. RANGE</span>
            <div className="flex items-baseline space-x-1">
              <span ref={rangeRef} className="font-display font-black text-base sm:text-lg text-white font-mono-numbers">
                584
              </span>
              <span className="font-mono text-[10px] text-neon-cyan font-bold">KM</span>
            </div>
          </div>

          <div className="glass-panel border-zinc-800/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl flex flex-col items-end">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold">DRIVE MODE</span>
            <span className="font-display font-extrabold text-xs sm:text-sm text-neon-emerald tracking-wider mt-0.5">
              HYPER SPORT
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-10">
        <div className="relative w-[88%] sm:w-[78%] h-[68%] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAngle}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={
                  activeAngle === "side"
                    ? "/assets/images/hyperion-gt-hero.jpg"
                    : "/assets/images/hyperion-gt-angle.jpg"
                }
                alt={
                  activeAngle === "side"
                    ? "Hyperion GT Electric Hypercar - Studio Side Profile"
                    : "Hyperion GT Electric Hypercar - Front Three-Quarter Studio Perspective"
                }
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain filter contrast-[1.12] brightness-[0.98] drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[16%] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent blur-[2px]" />
          <div className="absolute bottom-[16%] left-[24%] right-[24%] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent" />
        </div>
      </div>

      <motion.div
        variants={floatVariants(0)}
        initial="animate"
        animate="animate"
        className="hidden md:flex absolute left-8 top-[36%] z-20 glass-panel border-zinc-800/80 p-3 rounded-xl shadow-2xl items-center space-x-3 pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan">
          <Navigation className="w-4 h-4 rotate-45" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[8px] tracking-wider text-zinc-500 font-bold uppercase">GPS COORDINATES</span>
          <span className="font-mono text-[10px] tracking-widest text-zinc-200 font-bold font-mono-numbers">
            37.7749° N, 122.4194° W
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={floatVariants(1.6)}
        initial="animate"
        animate="animate"
        className="hidden md:flex absolute right-8 top-[46%] z-20 glass-panel border-zinc-800/80 p-3 rounded-xl shadow-2xl items-center space-x-3 pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <Compass className="w-4 h-4 text-neon-emerald" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[8px] tracking-wider text-zinc-500 font-bold uppercase">TOTAL ODOMETER</span>
          <span ref={odometerRef} className="font-mono text-[10px] tracking-widest text-zinc-200 font-bold font-mono-numbers">
            14,289.42 KM
          </span>
        </div>
      </motion.div>

      <div className="z-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mt-auto">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">SYSTEM HEALTH</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-neon-emerald" />
              <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-200">NOMINAL</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase">CELL VOLTAGE</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-neon-cyan" />
              <span ref={voltageRef} className="font-mono text-[11px] font-bold tracking-widest text-zinc-200 font-mono-numbers">
                784.2 V
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-zinc-950/70 border border-zinc-800 rounded-lg p-1">
          <button
            onClick={() => setActiveAngle("side")}
            className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-wider transition-all flex items-center space-x-1 cursor-pointer ${
              activeAngle === "side"
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Camera className="w-3 h-3" />
            <span>PROFILE VIEW</span>
          </button>
          <button
            onClick={() => setActiveAngle("angle")}
            className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-wider transition-all flex items-center space-x-1 cursor-pointer ${
              activeAngle === "angle"
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Camera className="w-3 h-3" />
            <span>3/4 ANGLE VIEW</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 font-bold tracking-widest">
          <RefreshCw className="w-3.5 h-3.5 animate-spin [animation-duration:12s] text-neon-cyan" />
          <span>CAN STREAM ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
