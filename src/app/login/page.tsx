"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import NebulaLogo from "@/components/NebulaLogo";

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
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none text-[#1F2A37]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-[#D8E0E7] space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <NebulaLogo size="lg" showText={false} />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#1F2A37] tracking-tight">
            Nebula Drive Cockpit Login
          </h1>
          <p className="text-xs font-mono text-[#5B6675]">
            Secure session access for connected fleet operations
          </p>
        </div>

        {/* Viva Quick Login Profiles */}
        <div className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] space-y-2">
          <span className="text-[10px] font-mono text-[#5B6675] uppercase font-bold block">
            ONE-CLICK VIVA EVALUATION ACCESS:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => loginAsDemo("STUDENT_LEAD")}
              className="px-2 py-1.5 rounded-lg bg-[#E7F3F1] border border-[#86B6B2]/40 text-[#2E8B8B] hover:bg-[#2E8B8B] hover:text-white transition-colors text-[10px] font-mono font-bold cursor-pointer"
            >
              Student (Zainab)
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo("EVALUATOR")}
              className="px-2 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8E0E7] text-[#1F2A37] hover:bg-[#2E8B8B] hover:text-white transition-colors text-[10px] font-mono font-bold cursor-pointer"
            >
              Examiner Viva
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo("FLEET_MANAGER")}
              className="px-2 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8E0E7] text-[#1F2A37] hover:bg-[#2E8B8B] hover:text-white transition-colors text-[10px] font-mono font-bold cursor-pointer"
            >
              Fleet Manager
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
              Driver / Operator Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5B6675]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] focus:border-[#2E8B8B] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold">
                Master Security Key
              </label>
              <Link href="/forgot-password" className="text-[10px] font-mono text-[#2E8B8B] hover:underline">
                Forgot key?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5B6675]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F6F8FA] border border-[#D8E0E7] text-xs font-mono text-[#1F2A37] focus:border-[#2E8B8B] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm mt-2"
          >
            <span>AUTHENTICATE &amp; ENTER COCKPIT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-[#5B6675]">
          New student pilot?{" "}
          <Link href="/register" className="text-[#2E8B8B] font-bold hover:underline">
            Register vehicle twin
          </Link>
        </div>
      </div>
    </div>
  );
}
