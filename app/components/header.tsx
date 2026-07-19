"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleCart, logout } from "../store/cartSlice";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scrollToSection: (id: string) => void;
  onLoginClick: () => void;
}

export default function Header({ searchQuery, setSearchQuery, scrollToSection, onLoginClick }: HeaderProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel transition-all duration-300 border-b border-brand-peach/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-charcoal hover:text-brand-gold md:hidden transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links - Left side on desktop */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => scrollToSection("collection")}
              className="text-brand-charcoal/80 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Shop Candles
            </button>
            <button
              onClick={() => scrollToSection("fragrance-quiz")}
              className="text-brand-charcoal/80 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Scent Quiz
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="text-brand-charcoal/80 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Our Heritage
            </button>
          </nav>

          {/* Logo Brand - Center */}
          <div className="flex flex-col items-center justify-center text-center cursor-pointer select-none">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-gold/30">
                <img
                  src="/logo.jpg"
                  alt="Radharaman Logo Icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-brand-charcoal">
                RADHARAMAN
              </span>
            </div>
            <span className="hidden sm:inline text-[9px] font-semibold tracking-[0.25em] text-brand-gold uppercase mt-0.5">
              LUXURY CANDLES
            </span>
          </div>

          {/* Actions - Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative hidden sm:block w-48 md:w-64">
              <input
                type="text"
                placeholder="Search scents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-cream/50 text-xs px-4 py-2 pl-9 rounded-full border border-brand-peach/20 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all duration-300 text-brand-charcoal"
              />
              <Search className="absolute left-3 top-2.5 text-brand-charcoal/40" size={14} />
            </div>

            {/* Login Toggle */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-wider text-brand-charcoal/80 hidden lg:inline">
                  Hi, {user?.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-[10px] font-bold text-brand-blue hover:text-brand-blue-dark tracking-widest uppercase cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer border border-brand-peach/30 px-3.5 py-2 rounded-full"
              >
                Sign In
              </button>
            )}

            {/* Cart Icon Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2.5 rounded-full hover:bg-brand-peach/10 text-brand-charcoal transition-all duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} className="stroke-[1.5]" />
              {totalQuantity > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[9px] font-bold text-white ring-2 ring-brand-cream animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-dark text-white border-t border-brand-gold/15 py-4 px-6 space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search scents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-charcoal/80 text-xs px-4 py-2.5 pl-9 rounded-md border border-brand-gold/20 text-white focus:outline-none focus:border-brand-gold"
            />
            <Search className="absolute left-3 top-3 text-white/40" size={14} />
          </div>

          <div className="flex flex-col space-y-3 font-medium tracking-wide">
            <button
              onClick={() => {
                scrollToSection("collection");
                setMobileMenuOpen(false);
              }}
              className="text-left text-brand-peach-light hover:text-brand-gold py-2 border-b border-white/5"
            >
              Shop Candles
            </button>
            <button
              onClick={() => {
                scrollToSection("fragrance-quiz");
                setMobileMenuOpen(false);
              }}
              className="text-left text-brand-peach-light hover:text-brand-gold py-2 border-b border-white/5"
            >
              Scent Quiz
            </button>
            <button
              onClick={() => {
                scrollToSection("our-story");
                setMobileMenuOpen(false);
              }}
              className="text-left text-brand-peach-light hover:text-brand-gold py-2"
            >
              Our Heritage
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
