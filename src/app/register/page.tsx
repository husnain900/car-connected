"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Shield, ArrowRight } from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import NebulaLogo from "@/components/NebulaLogo";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useSimulationStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: name || "Registered Pilot",
      email: email,
      role: "STUDENT_LEAD",
      rollNo: rollNo || undefined,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none text-[#1F2A37]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-[#D8E0E7] space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <NebulaLogo size="lg" showText={false} />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#1F2A37] tracking-tight">
            Register Driver Profile
          </h1>
          <p className="text-xs font-mono text-[#5B6675]">
            Create student identity or fleet driver credentials
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
              FULL NAME / INITIALS
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#5B6675] absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zainab Amanat"
                required
                className="w-full bg-[#F6F8FA] border border-[#D8E0E7] focus:border-[#2E8B8B] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#1F2A37] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
              STUDENT ROLL NUMBER / IDENTIFIER
            </label>
            <div className="relative">
              <Shield className="w-4 h-4 text-[#5B6675] absolute left-3.5 top-3" />
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. M245008"
                className="w-full bg-[#F6F8FA] border border-[#D8E0E7] focus:border-[#2E8B8B] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#1F2A37] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5B6675] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pilot@university.edu"
                required
                className="w-full bg-[#F6F8FA] border border-[#D8E0E7] focus:border-[#2E8B8B] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#1F2A37] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
              SECURITY KEY / PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5B6675] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#F6F8FA] border border-[#D8E0E7] focus:border-[#2E8B8B] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#1F2A37] outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm mt-2"
          >
            <span>REGISTER PROFILE &amp; ENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-[#5B6675]">
          Already have credentials?{" "}
          <Link href="/login" className="text-[#2E8B8B] font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
