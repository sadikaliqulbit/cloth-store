"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/style/auth.css";
import { User } from "@/types";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");
    if (users.find((u) => u.email === form.email)) {
      setError("An account with this email already exists.");
      return;
    }
    const newUser: User = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <div className="w-full max-w-[480px] bg-white border border-black/10 p-10">
        <h1 className="uppercase text-[28px] leading-none tracking-[-1px] mb-1 font-beatriceDeckExtrabold">
          Create Account
        </h1>
        <p className="text-[12px] text-black/50 mb-8 font-beatriceRegular">
          Join us and start shopping today.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-black/60 mb-1 font-beatriceDeckMedium">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                placeholder="John"
                className="auth-input"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="auth-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                className="auth-input"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="auth-label">Email</label>
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
            <label className="auth-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="auth-label">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              placeholder="••••••••"
              className="auth-input"
              value={form.confirm}
              onChange={handleChange}
              required
            />
            {error && (
              <p className="text-[11px] text-red-500 mt-1 font-beatriceRegular">
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="auth-button mt-2">
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <span className="text-[11px] text-black/40 uppercase tracking-widest font-beatriceDeckMedium">
            or
          </span>
        </div>

        <p className="text-center text-[12px] text-black/50 mb-8 font-beatriceRegular">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
