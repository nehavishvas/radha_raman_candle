"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart, Send, Check } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-brand-charcoal text-white/80 border-t border-brand-gold/20 pt-16 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Sanctuary Circle */}
        <div className="bg-brand-charcoal/80 border border-brand-gold/20 rounded-2xl p-8 sm:p-10 mb-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
          
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold block mb-2">
            The Radharaman Sanctuary Circle
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Receive Private Batches & Curated Aromas
          </h3>
          <p className="text-xs text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
            Join our inner circle for early access to seasonal hand-poured harvests, bespoke ceremonial offerings, and 10% off your initial sanctuary order.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-5 py-2.5 rounded-full">
              <Check size={14} />
              <span>Devotional blessings! Your VIP invitation is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 text-white placeholder-white/40 text-xs px-5 py-3 rounded-full border border-white/20 focus:outline-none focus:border-brand-gold text-center sm:text-left"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-gold hover:bg-brand-peach text-brand-charcoal rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Join Circle</span>
                <Send size={12} />
              </button>
            </form>
          )}
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-white/10 text-xs">
          
          {/* Brand info (2 cols on large) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 select-none group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-brand-gold/50 bg-[#f3ded2] shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo-emblem.jpg"
                  alt="Radharaman Luxury Candles"
                  className="object-cover w-full h-full scale-102"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-bold tracking-widest text-white group-hover:text-brand-peach transition-colors">
                  RADHARAMAN
                </span>
                <span className="text-[8px] font-semibold tracking-[0.22em] text-brand-gold uppercase -mt-0.5">
                  LUXURY CANDLES
                </span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              Sacred hand-poured illumination crafted with natural soy wax and ethically sourced pure botanicals. Inspired by the immortal peace of Vrindavan.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-brand-gold font-semibold pt-1">
              <Sparkles size={14} />
              <span>100% Toxin-Free • Small Batch • Clean Burning</span>
            </div>
          </div>

          {/* Shop Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-brand-cream uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/shop" className="hover:text-brand-gold transition-colors">
                  Shop All Candles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=scented" className="hover:text-brand-gold transition-colors">
                  Scented Candles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=soy-wax" className="hover:text-brand-gold transition-colors">
                  Soy Wax Bases
                </Link>
              </li>
              <li>
                <Link href="/shop?category=aromatherapy" className="hover:text-brand-gold transition-colors">
                  Aromatherapy
                </Link>
              </li>
              <li>
                <Link href="/shop?category=artisanal-shapes" className="hover:text-brand-gold transition-colors">
                  Artisanal Shapes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gift-sets" className="hover:text-brand-gold transition-colors">
                  Curated Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Sanctuary Experience */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-brand-cream uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/quiz" className="hover:text-brand-gold transition-colors">
                  Sensory Scent Quiz
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Our Sacred Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Bespoke Event Favors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-gold transition-colors">
                  Your Sanctuary Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-brand-cream uppercase tracking-wider">
              Concierge
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Customer Concierge
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-brand-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <span className="text-white/50 block">Shipping: Complimentary &gt; $50</span>
              </li>
              <li>
                <span className="text-white/50 block">Atelier: Vrindavan Botanical Lab</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Radharaman Luxury Candles. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
