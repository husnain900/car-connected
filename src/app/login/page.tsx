"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useSimulationStore();

  const [email, setEmail] = useState("zainab.amanat@university.edu");
  const [password, setPassword] = useState("••••••••");
  const role: "STUDENT_LEAD" | "FLEET_MANAGER" | "EVALUATOR" = "STUDENT_LEAD";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "user-session",
      name: role === "STUDENT_LEAD" ? "Zainab Amanat" : role === "FLEET_MANAGER" ? "Fleet Administrator" : "Academic Examiner",
      email: email,
      role: role,
      rollNo: role === "STUDENT_LEAD" ? "M245008" : undefined,
    });
    router.push("/dashboard");
  };

  const loginAsDemo = (demoRole: "STUDENT_LEAD" | "FLEET_MANAGER" | "EVALUATOR") => {
    setUser({
      id: `demo-${demoRole.toLowerCase()}`,
      name: demoRole === "STUDENT_LEAD" ? "Zainab Amanat" : demoRole === "FLEET_MANAGER" ? "Fleet Administrator" : "Academic Examiner",
      email: demoRole === "STUDENT_LEAD" ? "zainab.amanat@university.edu" : `${demoRole.toLowerCase()}@nebula-drive.internal`,
      role: demoRole,
      rollNo: demoRole === "STUDENT_LEAD" ? "M245008" : undefined,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-white/10 space-y-6">
        <div className="text-center space-y-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#151D28] border border-[#D6F45A]/40 flex items-center justify-center shadow-[0_0_20px_rgba(214,244,90,0.25)] mx-auto mb-3">
            <Image
              src="/assets/images/nebula-logo.png"
              alt="Nebula Drive Emblem"
              fill
              sizes="48px"
              className="object-cover rounded-xl"
              priority
            />
          </div>
          <h1 className="font-display font-black text-2xl text-[#F4F7FB]">
            Nebula Drive Cockpit Login
          </h1>
          <p className="text-xs font-mono text-[#8794A6]">
            Secure session access for connected fleet operations
          </p>
        </div>

        {/* Viva Quick Login Profiles */}
        <div className="p-3.5 rounded-xl bg-[#1B2636] border border-white/8 space-y-2">
          <span className="text-[10px] font-mono text-[#8794A6] uppercase font-bold block">
            ONE-CLICK VIVA EVALUATION ACCESS:
          </span>
          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => loginAsDemo("STUDENT_LEAD")}
              className="w-full p-2 rounded-lg bg-[#D6F45A]/10 hover:bg-[#D6F45A]/20 border border-[#D6F45A]/30 text-left text-xs font-mono text-[#D6F45A] font-bold transition-colors flex items-center justify-between"
            >
              <span>1. Student Lead (Zainab Amanat // M245008)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => loginAsDemo("EVALUATOR")}
              className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-mono text-[#F4F7FB] transition-colors flex items-center justify-between"
            >
              <span>2. Academic Examiner / Evaluator</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => loginAsDemo("FLEET_MANAGER")}
              className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-mono text-[#F4F7FB] transition-colors flex items-center justify-between"
            >
              <span>3. Fleet Operations Admin</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8794A6] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0B1018] border border-white/10 focus:border-[#D6F45A] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F4F7FB] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
                PASSWORD
              </label>
              <Link href="/forgot-password" className="text-[10px] font-mono text-[#D6F45A] hover:underline">
                Forgot password?
              </Link>
            </div>
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
            SIGN IN TO TELEMETRY COCKPIT
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-[#8794A6]">
          Need an account?{" "}
          <Link href="/register" className="text-[#D6F45A] hover:underline font-bold">
            Register new driver profile
          </Link>
        </div>
      </div>
    </div>
  );
}
