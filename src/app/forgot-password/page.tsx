"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none text-[#1F2A37]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-[#D8E0E7] space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <NebulaLogo size="lg" showText={false} />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#1F2A37] tracking-tight">
            Password Recovery
          </h1>
          <p className="text-xs font-mono text-[#5B6675]">
            Dispatch simulated reset token to registered student email
          </p>
        </div>

        {sent ? (
          <div className="p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#2FA36B] mx-auto" />
            <div className="text-xs font-mono font-bold text-[#1F2A37]">
              RECOVERY TOKEN DISPATCHED
            </div>
            <p className="text-[11px] font-mono text-[#5B6675]">
              A simulated password reset sequence has been queued for <strong className="text-[#1F2A37]">{email}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#2E8B8B] font-bold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#5B6675] font-bold block">
                REGISTERED EMAIL
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm mt-2"
            >
              <span>SEND RECOVERY SEQUENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs font-mono text-[#5B6675]">
          <Link href="/login" className="text-[#2E8B8B] font-bold hover:underline inline-flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
