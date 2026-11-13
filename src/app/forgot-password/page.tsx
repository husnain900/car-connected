"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import NebulaLogo from "@/components/NebulaLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 select-none text-[#F5F8FC]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl nebula-card border border-[#293C51] space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <NebulaLogo size="lg" showText={false} />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#F5F8FC]">
            Password Recovery
          </h1>
          <p className="text-xs font-mono text-[#A5B5C8]">
            Dispatch simulated reset token to registered student email
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-[#35C99A]/15 border border-[#35C99A]/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#35C99A] mx-auto" />
            <div className="text-xs font-mono font-bold text-[#F5F8FC]">
              RECOVERY TOKEN DISPATCHED
            </div>
            <p className="text-[11px] font-mono text-[#A5B5C8]">
              A simulated password reset sequence has been queued for <strong className="text-[#F5F8FC]">{email}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#79C7FF] font-bold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#A5B5C8] font-bold block">
                REGISTERED EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A5B5C8] absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                  className="w-full bg-[#091321] border border-[#293C51] focus:border-[#79C7FF] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-[#F5F8FC] outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#79C7FF] hover:bg-[#68b5ea] text-[#091321] font-mono font-bold text-xs tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              DISPATCH RECOVERY LINK
            </button>

            <div className="pt-2 text-center text-xs font-mono text-[#A5B5C8]">
              <Link href="/login" className="text-[#79C7FF] hover:underline flex items-center justify-center space-x-1">
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
