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
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none text-[#F5F8FC]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-[#293C51] space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <NebulaLogo size="lg" showText={false} />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#F5F8FC]">
            Nebula Drive Cockpit Login
          </h1>
          <p className="text-xs font-mono text-[#A5B5C8]">
            Secure session access for connected fleet operations
          </p>
        </div>

        {/* Viva Quick Login Profiles */}
        <div className="p-3.5 rounded-xl bg-[#1E314B] border border-[#293C51] space-y-2">
          <span className="text-[10px] font-mono text-[#A5B5C8] uppercase font-bold block">
            ONE-CLICK VIVA EVALUATION ACCESS:
          </span>
          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => loginAsDemo("STUDENT_LEAD")}
              className="w-full p-2 rounded-lg bg-[#79C7FF]/10 hover:bg-[#79C7FF]/20 border border-[#79C7FF]/30 text-left text-xs font-mono text-[#79C7FF] font-bold transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>1. Student Lead (Zainab Amanat // M245008)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => loginAsDemo("EVALUATOR")}
              className="w-full p-2 rounded-lg bg-[#152437] hover:bg-[#1E314B] border border-[#293C51] text-left text-xs font-mono text-[#F5F8FC] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>2. Academic Examiner / Evaluator</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => loginAsDemo("FLEET_MANAGER")}
              className="w-full p-2 rounded-lg bg-[#152437] hover:bg-[#1E314B] border border-[#293C51] text-left text-xs font-mono text-[#F5F8FC] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>3. Fleet Operations Admin</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold block">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A5B5C8] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#091321] border border-[#293C51] focus:border-[#79C7FF] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F5F8FC] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold block">
                PASSWORD
              </label>
              <Link href="/forgot-password" className="text-[10px] font-mono text-[#79C7FF] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A5B5C8] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#091321] border border-[#293C51] focus:border-[#79C7FF] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F5F8FC] outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            SIGN IN TO TELEMETRY COCKPIT
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-[#A5B5C8]">
          Need an account?{" "}
          <Link href="/register" className="text-[#79C7FF] hover:underline font-bold">
            Register new driver profile
          </Link>
        </div>
      </div>
    </div>
  );
}
