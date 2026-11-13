"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-white/10 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#D6F45A]/15 border border-[#D6F45A]/30 flex items-center justify-center font-display font-black text-sm text-[#D6F45A] mx-auto mb-3">
            ND
          </div>
          <h1 className="font-display font-black text-2xl text-[#F4F7FB]">
            Password Recovery
          </h1>
          <p className="text-xs font-mono text-[#8794A6]">
            Dispatch simulated reset token to registered student email
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-[#43D9A3]/15 border border-[#43D9A3]/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#43D9A3] mx-auto" />
            <div className="text-xs font-mono font-bold text-[#F4F7FB]">
              RECOVERY TOKEN DISPATCHED
            </div>
            <p className="text-[11px] font-mono text-[#8794A6]">
              A simulated password reset sequence has been queued for <strong>{email}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#D6F45A] font-bold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#8794A6] font-bold block">
                REGISTERED EMAIL
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D6F45A] hover:bg-[#c2df47] text-[#0B1018] font-mono font-bold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              DISPATCH RECOVERY LINK
            </button>

            <div className="pt-2 text-center text-xs font-mono text-[#8794A6]">
              <Link href="/login" className="text-[#D6F45A] hover:underline flex items-center justify-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
