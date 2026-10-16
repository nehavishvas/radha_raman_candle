"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Sparkles, User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleCart, logout, openLoginModal } from "../store/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.cart);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Scent Quiz", href: "/quiz" },
    { label: "Our Heritage", href: "/about" },
    { label: "Bespoke & Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-brand-charcoal/95 text-white backdrop-blur-md shadow-md border-b border-brand-gold/20" 
          : "glass-panel border-b border-brand-peach/15 shadow-xs"
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-brand-charcoal text-brand-peach-light text-[10px] tracking-widest py-1.5 px-4 text-center border-b border-brand-gold/15 flex items-center justify-center gap-2">
        <Sparkles size={11} className="text-brand-gold animate-pulse" />
        <span className="font-medium">COMPLIMENTARY SACRED PACKAGING & DELIVERY ON ORDERS OVER $50</span>
        <span className="hidden sm:inline text-brand-gold">•</span>
        <span className="hidden sm:inline text-brand-gold font-bold">CODE: WELCOME10 FOR 10% OFF</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors duration-200 lg:hidden ${
              scrolled ? "text-white hover:text-brand-peach" : "text-brand-charcoal hover:text-brand-gold"
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Brand - Centered on mobile/tablet, left on desktop */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 sm:gap-3 select-none group max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-brand-gold/50 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-[#f3ded2] shrink-0">
              <img
                src="/logo-emblem.jpg"
                alt="Radharaman Luxury Candles"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-serif text-lg sm:text-2xl font-bold tracking-widest transition-colors whitespace-nowrap ${
                scrolled ? "text-brand-cream" : "text-brand-charcoal group-hover:text-brand-gold-dark"
              }`}>
                RADHARAMAN
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] text-brand-gold uppercase -mt-0.5 whitespace-nowrap">
                LUXURY CANDLES
              </span>
            </div>
          </Link>

          {/* Navigation Links - Center on desktop */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all duration-200 py-1 relative ${
                    active
                      ? "text-brand-gold font-bold"
                      : scrolled
                        ? "text-white/80 hover:text-brand-peach"
                        : "text-brand-charcoal/80 hover:text-brand-gold"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions - Right side */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-40 lg:w-56">
              <input
                type="text"
                placeholder="Search scents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs px-3.5 py-2 pl-8 rounded-full border transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold ${
                  scrolled
                    ? "bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-brand-gold"
                    : "bg-white/80 text-brand-charcoal placeholder-brand-charcoal/40 border-brand-peach/30 focus:border-brand-gold"
                }`}
              />
              <button 
                type="submit" 
                aria-label="Submit search"
                className={`absolute left-2.5 top-2.5 ${scrolled ? "text-white/60" : "text-brand-charcoal/50"}`}
              >
                <Search size={14} />
              </button>
            </form>

            {/* Login Toggle */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold tracking-wider hidden sm:inline ${
                  scrolled ? "text-brand-peach" : "text-brand-charcoal"
                }`}>
                  Hi, {user?.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-[10px] font-bold tracking-widest uppercase text-brand-blue-glow hover:underline cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(openLoginModal("Log in to access your private VIP sanctuary account."))}
                className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 border px-3 py-1.5 rounded-full cursor-pointer ${
                  scrolled
                    ? "border-brand-gold/40 text-brand-peach hover:bg-brand-gold/15"
                    : "border-brand-peach/30 text-brand-charcoal hover:border-brand-gold hover:text-brand-gold"
                }`}
              >
                <UserIcon size={12} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Cart Icon Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className={`relative p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                scrolled
                  ? "hover:bg-white/10 text-brand-peach"
                  : "hover:bg-brand-peach/10 text-brand-charcoal"
              }`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} className="stroke-[1.6]" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[9px] font-bold text-white ring-2 ring-brand-cream animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel-dark text-white border-t border-brand-gold/20 py-5 px-6 space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search scents, notes, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-charcoal/90 text-xs px-4 py-2.5 pl-9 rounded-md border border-brand-gold/30 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold"
            />
            <button type="submit" aria-label="Submit search" className="absolute left-3 top-3 text-white/50">
              <Search size={14} />
            </button>
          </form>

          <div className="flex flex-col space-y-3 font-medium tracking-wide">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm py-2 border-b border-white/5 flex items-center justify-between ${
                    active ? "text-brand-gold font-bold" : "text-brand-peach-light hover:text-brand-gold"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />}
                </Link>
              );
            })}
            
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm py-2 text-brand-peach-light hover:text-brand-gold flex items-center justify-between"
            >
              <span>View Full Cart</span>
              <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full">
                {totalQuantity} items
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
