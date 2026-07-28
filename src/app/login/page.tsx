"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthMarketingCarousel from "../components/AuthMarketingCarousel";
import { ArrowRight, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      if (data.token) {
        localStorage.setItem("ilogitrack_jwt", data.token);
        const userToSave = data.user || {
          email,
          name: email.toLowerCase().includes("ajinkya") ? "Ajinkya Biradar" : email.split("@")[0],
          company: "Apex Logistics India Fleet",
        };
        localStorage.setItem("ilogitrack_user", JSON.stringify(userToSave));
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = (provider: string) => {
    const dummyUser = {
      id: `sso_${provider}_${Math.floor(1000 + Math.random() * 9000)}`,
      name: `Demo ${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      role: "Fleet Dispatcher",
      company: "SSO Enterprise Logistics",
    };

    localStorage.setItem("ilogitrack_jwt", "sso_dummy_jwt_token_2026");
    localStorage.setItem("ilogitrack_user", JSON.stringify(dummyUser));

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F3F1] text-[#15170F] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 hidden lg:block border-r border-[#15170F]/10">
        <AuthMarketingCarousel />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md flex flex-col gap-8">
          
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15170F]/5 border border-[#15170F]/10 text-xs font-mono text-[#15170F]/70 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>SECURE DISPATCH CONSOLE</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#15170F] tracking-tight">
              Welcome back.
            </h1>
            <p className="text-sm text-[#15170F]/70 font-normal">
              Log in to manage active shipments and view real-time fleet telemetry.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSSOLogin("Google")}
              className="w-full py-3 px-4 rounded-full bg-white border border-[#15170F]/15 hover:border-[#15170F]/30 text-xs font-semibold text-[#15170F] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSSOLogin("Apple")}
              className="w-full py-3 px-4 rounded-full bg-white border border-[#15170F]/15 hover:border-[#15170F]/30 text-xs font-semibold text-[#15170F] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4 fill-current text-[#15170F]" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.36-6.09-3.29-2.73-7.25-7.44-11.89-14.14-7.4-10.7-13.14-22.61-17.21-35.73-4.08-13.12-6.12-25.5-6.12-37.13 0-14.15 3.44-26.06 10.32-35.73 6.88-9.67 15.65-14.55 26.31-14.65 4.84 0 10.13 1.25 15.87 3.75 5.74 2.5 9.8 3.75 12.18 3.75 2.12 0 6.38-1.33 12.77-3.99 6.39-2.66 11.84-3.86 16.36-3.6 11.95.76 21.46 5.12 28.53 13.08-10.45 6.32-15.54 15.08-15.28 26.27.26 8.76 3.74 16.14 10.45 22.14 6.71 6 14.54 9.29 23.49 9.87-2.61 7.63-6.1 15.5-10.47 23.6zM119.22 31.85c0-6.75 2.37-13.19 7.1-19.32 4.73-6.13 10.87-9.87 18.42-11.23.13 1.01.2 1.83.2 2.47 0 6.74-2.45 13.29-7.36 19.64-4.91 6.35-10.96 10.02-18.16 11.01-.07-.76-.2-1.61-.2-2.57z" />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#15170F]/40 font-mono">
            <div className="flex-1 h-px bg-[#15170F]/10" />
            <span>OR EMAIL</span>
            <div className="flex-1 h-px bg-[#15170F]/10" />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-600 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-[#15170F] uppercase">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#15170F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#15170F]/15 text-sm font-sans text-[#15170F] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-[#15170F] uppercase">
                  Password
                </label>
                <a href="#" className="text-xs font-mono text-[#FF5A1F] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#15170F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#15170F]/15 text-sm font-sans text-[#15170F] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-[#FF5A1F] text-white font-bold text-sm hover:bg-[#FF5A1F]/90 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs font-sans text-[#15170F]/70">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#FF5A1F] font-bold hover:underline">
              Start for free
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
