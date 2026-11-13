"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Shield } from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

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
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-white/10 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#D6F45A]/15 border border-[#D6F45A]/30 flex items-center justify-center font-display font-black text-sm text-[#D6F45A] mx-auto mb-3">
            ND
          </div>
          <h1 className="font-display font-black text-2xl text-[#F4F7FB]">
            Register Driver Profile
          </h1>
          <p className="text-xs font-mono text-[#8794A6]">
            Create student identity or fleet driver credentials
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
              FULL NAME / INITIALS
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8794A6] absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zainab Amanat"
                required
                className="w-full bg-[#0B1018] border border-white/10 focus:border-[#D6F45A] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F4F7FB] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
              ROLL NUMBER (ACADEMIC ID)
            </label>
            <div className="relative">
              <Shield className="w-4 h-4 text-[#8794A6] absolute left-3.5 top-3" />
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. M245008"
                className="w-full bg-[#0B1018] border border-white/10 focus:border-[#D6F45A] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F4F7FB] outline-none transition-colors uppercase font-mono-numbers"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
              INSTITUTIONAL EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8794A6] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                required
                className="w-full bg-[#0B1018] border border-white/10 focus:border-[#D6F45A] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F4F7FB] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
              SECURITY PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8794A6] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0B1018] border border-white/10 focus:border-[#D6F45A] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F4F7FB] outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            CREATE ACCOUNT & ENTER COCKPIT
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-[#8794A6]">
          Already have credentials?{" "}
          <Link href="/login" className="text-[#D6F45A] hover:underline font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
