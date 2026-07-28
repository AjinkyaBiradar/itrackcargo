"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Authentication failed.");
        toast.error(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back! Redirecting to dashboard...");
      // Store token in localStorage as well for client accessibility
      if (data.token) {
        localStorage.setItem("ilogitrack_jwt", data.token);
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err) {
      setErrorMessage("Network error occurred. Please try again.");
      toast.error("Failed to connect to authentication server.");
      setIsLoading(false);
    }
  };

  const handleSSO = (provider: string) => {
    toast.info(`Connecting via ${provider} SSO...`);
    setIsLoading(true);
    setTimeout(() => {
      // Simulate successful SSO JWT issuance
      const fakeToken = "sso_jwt_token_" + Date.now();
      localStorage.setItem("ilogitrack_jwt", fakeToken);
      document.cookie = `auth_token=${fakeToken}; path=/; max-age=86400`;
      toast.success(`Signed in with ${provider}! Redirecting...`);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Social SSO Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSSO("Google")}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E8E5DC] rounded-2xl text-xs font-semibold text-[#101010] hover:bg-[#F3F1EA] transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => handleSSO("Apple")}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#101010] border border-[#101010] rounded-2xl text-xs font-semibold text-white hover:bg-[#222] transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.97.99-3.12-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.91-1.03 3.03 1.12.09 2.28-.56 2.97-1.41z" />
          </svg>
          Apple
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <hr className="w-full border-[#E8E5DC]" />
        <span className="absolute bg-[#FAF9F5] px-3 text-[11px] font-mono text-[#666] uppercase">
          or login with email
        </span>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-xs text-red-600 font-semibold"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Work Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono font-bold text-[#101010] uppercase">
          Work Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#666] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@logistics.corp"
            required
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-medium text-[#101010] placeholder:text-[#8E8E93] focus:outline-none focus:border-[#4338FF] shadow-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-[#101010] uppercase">
            Password
          </label>
          <a href="#" className="text-xs text-[#4338FF] font-semibold hover:underline">
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#666] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-medium text-[#101010] placeholder:text-[#8E8E93] focus:outline-none focus:border-[#4338FF] shadow-sm"
          />
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 text-xs font-medium text-[#666] cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-[#E8E5DC] text-[#4338FF] focus:ring-[#4338FF]"
          />
          Remember session for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#4338FF] text-white hover:bg-[#3228D9] font-bold rounded-2xl text-sm shadow-[0_12px_28px_rgba(67,56,255,0.25)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        {isLoading ? "Signing in..." : "Sign in to Dashboard"}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </form>
  );
}
