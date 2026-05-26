"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { User } from "@/types";
import "@/style/auth.css";
import { validateAuthLogin, validateAuthRegister } from "@/lib/validation";

type Props = {
  onClose: () => void;
  onLogin: (user: User) => void;
};

export default function AuthModal({ onClose, onLogin }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateAuthLogin(form.email, form.password);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");
    const match = users.find((u) => u.email === form.email && u.password === form.password);
    if (!match) { setErrors({ email: "Invalid email or password." }); return; }
    onLogin(match);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateAuthRegister(form.firstName, form.lastName, form.email, form.password, form.confirm);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");
    if (users.find((u) => u.email === form.email)) {
      setErrors({ email: "Email already registered." }); return;
    }
    const newUser: User = { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="auth-card relative w-full max-w-[440px] bg-[#fff] p-6 md:p-8 rounded-lg shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-black/40 hover:text-black">
          <X size={18} />
        </button>

        <div className="flex gap-6 mb-8 border-b border-black/10">
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); }}
              className={`pb-3 text-[12px] uppercase tracking-widest transition-colors ${tab === t ? "border-b-2 border-black text-black" : "text-black/40"}`}
              style={{ fontFamily: "Beatrice Deck Trial Medium" }}>
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="auth-label">Email</label>
              <input name="email" type="email" placeholder="you@example.com"
                className="auth-input" value={form.email} onChange={handleChange} />
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>
            <div>
              <label className="auth-label">Password</label>
              <input name="password" type="password" placeholder="••••••••"
                className="auth-input" value={form.password} onChange={handleChange} />
              {errors.password && <p className="auth-error">{errors.password}</p>}
            </div>
            <button type="submit" className="auth-button mt-2">Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="auth-label">First Name</label>
                <input name="firstName" type="text" placeholder="John"
                  className="auth-input" value={form.firstName} onChange={handleChange} />
                {errors.firstName && <p className="auth-error">{errors.firstName}</p>}
              </div>
              <div>
                <label className="auth-label">Last Name</label>
                <input name="lastName" type="text" placeholder="Doe"
                  className="auth-input" value={form.lastName} onChange={handleChange} />
                {errors.lastName && <p className="auth-error">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="auth-label">Email</label>
              <input name="email" type="email" placeholder="you@example.com"
                className="auth-input" value={form.email} onChange={handleChange} />
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>
            <div>
              <label className="auth-label">Password</label>
              <input name="password" type="password" placeholder="••••••••"
                className="auth-input" value={form.password} onChange={handleChange} />
              {errors.password && <p className="auth-error">{errors.password}</p>}
            </div>
            <div>
              <label className="auth-label">Confirm Password</label>
              <input name="confirm" type="password" placeholder="••••••••"
                className="auth-input" value={form.confirm} onChange={handleChange} />
              {errors.confirm && <p className="auth-error">{errors.confirm}</p>}
            </div>
            <button type="submit" className="auth-button mt-2">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
