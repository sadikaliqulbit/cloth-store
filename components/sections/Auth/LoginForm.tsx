"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/style/auth.css";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") ?? "[]");
    const match = users.find(
      (u: { email: string; password: string }) =>
        u.email === form.email && u.password === form.password
    );
    if (!match) {
      setError("Invalid email or password.");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(match));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <div className="w-full max-w-[480px] bg-white border border-black/10 p-10">
        <h1 className="uppercase text-[28px] leading-none tracking-[-1px] mb-1 font-beatriceDeckExtrabold">Welcome Back</h1>
        <p className="text-[12px] text-black/50 mb-8 font-beatriceRegular">Sign in to your account to continue.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-black/60 mb-1 font-beatriceDeckMedium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="auth-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-black/60 mb-1 font-beatriceDeckMedium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <p className="text-[11px] text-red-500 mt-1 font-beatriceRegular">{error}</p>}
          </div>

          <button type="submit" className="auth-button mt-2">
            Sign In
          </button>
        </form>

        <div className="auth-divider">
          <span className="text-[11px] text-black/40 uppercase tracking-widest auth-or">or</span>
        </div>

        <p className="text-center auth-subtext">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[12px] text-black/50 underline underline-offset-2 hover:text-black transition-colors font-beatriceRegular">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
