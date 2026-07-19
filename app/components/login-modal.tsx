"use client";

import React, { useState } from "react";
import { X, User, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../store/cartSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message }: LoginModalProps) {
  const dispatch = useDispatch();
  
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (isRegister && !name) {
      setError("Please enter your name");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate authentication
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      dispatch(login({ name: name || email.split("@")[0], email }));
      
      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setEmail("");
        setPassword("");
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl glass-panel shadow-2xl p-6 sm:p-8 text-brand-charcoal animate-scaleIn">
        
        {/* Close Button */}
        {!isSubmitting && !isSuccess && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-peach/10 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        {isSuccess ? (
          /* Login Success State */
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 size={32} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">Access Granted</span>
              <h3 className="font-serif text-xl font-bold">Welcome Back, {name || email.split("@")[0]}</h3>
              <p className="text-xs text-brand-charcoal/65">Your luxury shopping session has been secured.</p>
            </div>
          </div>
        ) : (
          /* Authentication Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex p-2 bg-brand-peach/15 rounded-full text-brand-blue mb-1">
                <Sparkles size={20} className="text-brand-blue" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                {isRegister ? "Join the Sanctuary" : "Unlock Sanctuary Access"}
              </h2>
              <p className="text-xs text-brand-charcoal/60">
                {message || (isRegister ? "Register for VIP batches and updates." : "Log in to check out and track your candles.")}
              </p>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 text-[11px] text-red-600 font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-3.5">
              {/* Name Field (Register Mode Only) */}
              {isRegister && (
                <div className="text-left">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1 flex items-center gap-1">
                    <User size={10} /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/60 text-xs px-3 py-2 rounded-md border border-brand-peach/25 focus:outline-none focus:border-brand-blue"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1 flex items-center gap-1">
                  <Mail size={10} /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/60 text-xs px-3 py-2 rounded-md border border-brand-peach/25 focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Password Field */}
              <div className="text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1 flex items-center gap-1">
                  <Lock size={10} /> Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/60 text-xs px-3 py-2 rounded-md border border-brand-peach/25 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-brand-charcoal hover:bg-brand-blue hover:text-white text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Securing Access...</span>
              ) : (
                <span>{isRegister ? "Register & Enter" : "Authorize Login"}</span>
              )}
            </button>

            {/* Toggle Login/Register */}
            <div className="text-center text-xs text-brand-charcoal/60 pt-2 border-t border-brand-peach/10">
              {isRegister ? (
                <span>
                  Already a VIP?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setError("");
                    }}
                    className="font-semibold text-brand-blue hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </span>
              ) : (
                <span>
                  New to Radharaman?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setError("");
                    }}
                    className="font-semibold text-brand-blue hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
