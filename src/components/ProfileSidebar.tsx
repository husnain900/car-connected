"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Key, Eye, EyeOff, Shield, ShieldCheck, Settings, Award } from "lucide-react";

export interface DriverProfile {
  name: string;
  license: string;
  pin: string;
  valetLimit: number;
  energySaving: boolean;
}

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DriverProfile;
  onSave: (updatedProfile: DriverProfile) => void;
}

export default function ProfileSidebar({ isOpen, onClose, profile, onSave }: ProfileSidebarProps) {
  const [name, setName] = useState(profile.name);
  const [license, setLicense] = useState(profile.license);
  const [pin, setPin] = useState(profile.pin);
  const [valetLimit, setValetLimit] = useState(profile.valetLimit);
  const [energySaving, setEnergySaving] = useState(profile.energySaving);
  const [showPin, setShowPin] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      license,
      pin,
      valetLimit,
      energySaving,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950/95 border-l border-border-base z-55 shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none"
          >
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-border-base pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-display font-bold text-base tracking-widest text-text-base">
                      DRIVER SETTINGS
                    </h3>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      TELEMETRY PROFILE CONFIG
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-border-base flex items-center justify-center text-zinc-400 hover:text-text-base cursor-pointer"
                  aria-label="Close Profile Panel"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="mb-6 p-3.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan font-bold font-display text-xs">
                  ZA
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-xs text-white">
                      Zainab Amanat
                    </span>
                    <Award className="w-3.5 h-3.5 text-neon-cyan" />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">
                    ROLL NO: <span className="text-neon-cyan font-bold font-mono-numbers">M245008</span>
                  </span>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="flex flex-col space-y-1.5">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                    DRIVER INITIALS / NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ENTER DRIVER NAME"
                      required
                      className="w-full bg-zinc-900/60 border border-border-base focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-text-base tracking-widest outline-none transition-colors uppercase"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                    LICENSE PLATE REGISTER
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      placeholder="E.G. M24-5008"
                      required
                      className="w-full bg-zinc-900/60 border border-border-base focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-text-base tracking-widest outline-none transition-colors uppercase"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                    SECURITY ACCESS PIN
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPin ? "text" : "password"}
                      value={pin}
                      maxLength={4}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="4-DIGIT PIN"
                      required
                      className="w-full bg-zinc-900/60 border border-border-base focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-12 text-xs font-semibold text-text-base tracking-widest outline-none transition-colors font-mono-numbers"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3.5 top-3 text-zinc-400 hover:text-text-base cursor-pointer"
                      aria-label={showPin ? "Hide PIN" : "Show PIN"}
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 bg-zinc-900/40 border border-border-base/60 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                      VALET SPEED LIMIT
                    </span>
                    <div className="flex items-baseline space-x-0.5">
                      <span className="font-display font-black text-sm text-neon-emerald font-mono-numbers">
                        {valetLimit}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-400 font-bold">KM/H</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    value={valetLimit}
                    onChange={(e) => setValetLimit(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none accent-emerald-400"
                  />
                </div>

                <div className="flex items-center justify-between bg-zinc-900/40 border border-border-base/60 p-4 rounded-xl">
                  <div className="flex flex-col pr-4">
                    <span className="font-display font-bold text-xs tracking-wider text-text-base">
                      ECO BATTERY SAVING
                    </span>
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider">
                      OPTIMIZE VOLTAGE CELL DEGRADATION
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnergySaving(!energySaving)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                      energySaving ? "bg-neon-cyan" : "bg-zinc-800"
                    }`}
                    aria-label="Toggle Eco Mode"
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-4 h-4 rounded-full bg-white absolute top-1 left-1"
                      style={{ x: energySaving ? 20 : 0 }}
                    />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full font-display font-extrabold text-xs tracking-widest py-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-center space-x-2 ${
                    saveSuccess
                      ? "bg-neon-emerald text-black border-neon-emerald shadow-[0_0_20px_rgba(5,255,128,0.3)]"
                      : "bg-neon-cyan hover:bg-neon-cyan/90 text-black border-neon-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{saveSuccess ? "PROFILE SYNCHRONIZED!" : "APPLY & SAVE PROFILE"}</span>
                </motion.button>
              </form>
            </div>

            <div className="mt-8 border-t border-border-base pt-4 flex items-center justify-between text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
              <span>ECU CRYPTO: AES-256</span>
              <span>STATE: SYNCHRONIZED</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
