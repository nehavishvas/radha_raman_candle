"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Leaf, 
  Flame, 
  Shield, 
  ArrowRight, 
  Check, 
  Send, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Compass
} from "lucide-react";
import ProductCard from "./components/product-card";
import ProductDetailModal from "./components/product-detail-modal";
import { products, Product, CATEGORIES } from "./data/products";

const heroSlides = [
  {
    subtitle: "Sacred Artisanal Edition",
    title: "Vrindavan Jasmine",
    poeticTag: "Night-Blooming Serenity",
    description: "An enchanting olfactory journey to the sacred groves of Braj. Hand-poured with night-blooming jasmine blossoms, Kashmiri saffron, and warm Mysore sandalwood.",
    image: "/jasmine_candle.png",
    productId: "vrindavan-jasmine",
    notes: ["Night Jasmine", "Kashmiri Saffron", "Mysore Sandalwood"],
    price: 36,
    burnTime: "60 Hours",
    wick: "Organic Cotton Wick",
    rating: 4.9,
    reviews: 142,
  },
  {
    subtitle: "Meditative Warmth",
    title: "Mystic Oudh",
    poeticTag: "Smoky Golden Resins",
    description: "A deep, contemplative blend featuring wild-harvested Assam agarwood (Oudh), balanced masterfully with dark golden amber and smoky bourbon vanilla.",
    image: "/oudh_candle.png",
    productId: "mystic-oudh",
    notes: ["Assam Agarwood", "Golden Amber", "Bourbon Vanilla"],
    price: 42,
    burnTime: "60 Hours",
    wick: "Crackling Wooden Wick",
    rating: 4.8,
    reviews: 98,
  },
  {
    subtitle: "Crisp Mountain Vitality",
    title: "Himalayan Cedar",
    poeticTag: "Subalpine Forest Air",
    description: "Evoke the clean, fresh air of pine forests. A restorative combination of wild pine needle terpenes, Deodar cedarwood bark, and wild honey.",
    image: "/cedar_candle.png",
    productId: "himalayan-cedar",
    notes: ["Himalayan Pine", "Deodar Cedar", "Wild Honey"],
    price: 34,
    burnTime: "55 Hours",
    wick: "Crackling Wooden Wick",
    rating: 4.7,
    reviews: 76,
  },
  {
    subtitle: "Majestic Imperial Gardens",
    title: "Rose & Cardamom",
    poeticTag: "Royal Botanical Harmony",
    description: "A majestic fusion inspired by classic imperial perfumery. Delicate Kannauj damask rose petals accented by warming green cardamom and soft cashmere musk.",
    image: "/rose_candle.png",
    productId: "rose-cardamom",
    notes: ["Kannauj Damask Rose", "Green Cardamom", "White Tea"],
    price: 38,
    burnTime: "60 Hours",
    wick: "Organic Cotton Wick",
    rating: 4.9,
    reviews: 114,
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredCandles = products.filter((p) => p.featured || p.isBestSeller).slice(0, 6);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      
      {/* ========================================================= */}
      {/* HERO BANNER SECTION (Light Luxury Background with Animation) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-[#faf8f5] text-brand-charcoal border-b border-brand-peach/20 min-h-[580px] lg:min-h-[620px] flex flex-col justify-between pt-6 sm:pt-10 pb-5">
        
        {/* Soft Luxury Light Ambient Illumination Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(232,197,175,0.45),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-peach-light/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

        {/* Top/Side Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-brand-peach/30 hover:border-brand-gold bg-white/80 hover:bg-white text-brand-charcoal hover:text-brand-gold-dark transition-all cursor-pointer hidden md:flex items-center justify-center shadow-md backdrop-blur-xs"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-brand-peach/30 hover:border-brand-gold bg-white/80 hover:bg-white text-brand-charcoal hover:text-brand-gold-dark transition-all cursor-pointer hidden md:flex items-center justify-center shadow-md backdrop-blur-xs"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex items-center">
          {heroSlides.map((slide, index) => {
            if (index !== currentSlide) return null;

            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center w-full py-2 sm:py-4">

                {/* Left Column: Editorial & CTA */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 z-10">
                  
                  {/* Top Pill Tag with Subtle Gold Shimmer */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-xs fade-in-up">
                    <Sparkles size={13} className="text-brand-gold animate-pulse" />
                    <span>{slide.subtitle}</span>
                  </div>

                  {/* Title & Poetic Accent */}
                  <div className="space-y-1 fade-in-up delay-100">
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight text-brand-charcoal">
                      {slide.title}
                    </h1>
                    <p className="font-serif italic text-base sm:text-lg text-brand-gold-dark font-medium">
                      {slide.poeticTag}
                    </p>
                  </div>

                  {/* Evocative Description */}
                  <p className="max-w-md text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light fade-in-up delay-200">
                    {slide.description}
                  </p>

                  {/* Scent Notes Badges */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 fade-in-up delay-200">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold-dark mr-1">
                      Key Notes:
                    </span>
                    {slide.notes.map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[11px] px-3.5 py-1 rounded-full bg-white/90 border border-brand-peach/35 text-brand-charcoal font-medium shadow-xs"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Micro Specs strip */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-[11px] text-brand-charcoal/65 font-medium pt-1 fade-in-up delay-200">
                    <span className="flex items-center gap-1.5">
                      <Flame size={14} className="text-brand-gold" />
                      <span>{slide.burnTime} Clean Burn</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Leaf size={14} className="text-brand-gold" />
                      <span>100% Pure Soy Wax</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-amber-600">
                      <Star size={13} fill="currentColor" />
                      <span>{slide.rating} ({slide.reviews})</span>
                    </span>
                  </div>

                  {/* Primary & Secondary Action CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2 fade-in-up delay-300">
                    <Link
                      href={`/shop/${slide.productId}`}
                      className="px-7 py-3.5 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl shadow-brand-charcoal/15 text-center flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Explore Candle — ${slide.price}.00</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/shop"
                      className="px-6 py-3.5 border border-brand-peach/40 bg-white/80 hover:bg-white hover:border-brand-gold text-brand-charcoal transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 text-center shadow-xs cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Browse Shop</span>
                    </Link>
                  </div>

                </div>

                {/* Right Column: Expansive, Grand Candle Showcase with Natural Proportions */}
                <div className="lg:col-span-7 flex justify-center items-center relative fade-in-up delay-100 w-full">
                  
                  {/* Subtle Candlelight Ambient Halo (Pulsing gently behind the canvas) */}
                  <div className="absolute inset-2 bg-gradient-to-tr from-amber-300/35 via-brand-peach/30 to-orange-200/25 rounded-[2.5rem] blur-3xl -z-10 animate-pulse pointer-events-none scale-105" />

                  {/* Floating Large Editorial Showcase */}
                  <div className="relative w-full max-w-[620px] lg:max-w-none h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px] xl:h-[530px] animate-floating flex items-center justify-center">
                    <Link 
                      href={`/shop/${slide.productId}`}
                      className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(5,22,46,0.16)] ring-1 ring-black/5 border border-brand-peach/40 hover:border-brand-gold/60 transition-all duration-700 group cursor-pointer block bg-stone-100"
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-104 transition-transform duration-1000 ease-out"
                      />

                      {/* Subtle cinematic gradient vignette for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                      {/* Top Right Floating Badge */}
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-brand-charcoal/90 backdrop-blur-md text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold tracking-wider shadow-xl flex items-center gap-2 border border-brand-gold/40">
                        <span className="text-brand-peach font-extrabold text-sm sm:text-base">${slide.price}.00</span>
                        <span className="text-white/40 text-[10px]">|</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star size={11} fill="currentColor" />
                          <span className="text-white text-xs">{slide.rating}</span>
                        </div>
                      </div>

                      {/* Bottom Right Discover Action */}
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md text-brand-charcoal px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-brand-peach/30 group-hover:bg-brand-charcoal group-hover:text-white transition-all">
                        <span>Discover Notes & Details</span>
                        <ArrowRight size={13} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Left Bottom Floating Art Label (Non-obstructive luxury placard) */}
                    <div className="absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl border border-brand-peach/35 flex items-center gap-3 z-20 pointer-events-none hidden sm:flex">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark shrink-0">
                        <Flame size={18} className="text-brand-gold animate-pulse" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold-dark">Vrindavan Artisanal</span>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs font-bold text-brand-charcoal">{slide.burnTime} • {slide.wick}</p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Slide Selector Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4">
          <div className="border-t border-brand-peach/25 pt-4 flex flex-wrap items-center justify-between gap-3">
            
            {/* Direct Thumbnail Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative overflow-hidden flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-brand-charcoal text-white font-bold shadow-md scale-102"
                        : "bg-white/80 border border-brand-peach/30 text-brand-charcoal/70 hover:bg-white hover:text-brand-charcoal hover:border-brand-gold"
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt="" 
                      className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-brand-peach/40"
                    />
                    <span>{slide.title}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Scent Quiz Link */}
            <Link
              href="/quiz"
              className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold-dark flex items-center gap-1.5 transition-colors"
            >
              <span>Take Scent Finder Quiz</span>
              <Sparkles size={13} className="text-brand-gold" />
            </Link>

          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* VALUE PROPOSITIONS */}
      {/* ========================================================= */}
      <section className="bg-brand-cream/80 py-10 border-b border-brand-peach/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-brand-charcoal">

            <div className="flex flex-col items-center space-y-2 p-3">
              <div className="p-3 bg-brand-peach/15 text-brand-gold rounded-full">
                <Leaf size={20} className="stroke-[1.5]" />
              </div>
              <span className="font-serif text-sm font-bold">100% Soy Wax</span>
              <span className="text-[10px] text-brand-charcoal/60">Toxin-free, renewable burn</span>
            </div>

            <div className="flex flex-col items-center space-y-2 p-3">
              <div className="p-3 bg-brand-peach/15 text-brand-gold rounded-full">
                <Flame size={20} className="stroke-[1.5]" />
              </div>
              <span className="font-serif text-sm font-bold">60-Hour Clean Burn</span>
              <span className="text-[10px] text-brand-charcoal/60">Slow, long-lasting aroma</span>
            </div>

            <div className="flex flex-col items-center space-y-2 p-3">
              <div className="p-3 bg-brand-peach/15 text-brand-gold rounded-full">
                <Sparkles size={20} className="stroke-[1.5]" />
              </div>
              <span className="font-serif text-sm font-bold">Rare Essential Oils</span>
              <span className="text-[10px] text-brand-charcoal/60">Multi-layered olfactory notes</span>
            </div>

            <div className="flex flex-col items-center space-y-2 p-3">
              <div className="p-3 bg-brand-peach/15 text-brand-gold rounded-full">
                <Shield size={20} className="stroke-[1.5]" />
              </div>
              <span className="font-serif text-sm font-bold">Hand-Poured Quality</span>
              <span className="text-[10px] text-brand-charcoal/60">Vrindavan artisan tradition</span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MULTI-PAGE SECTION SHOWCASE: EXPLORE BY COLLECTION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-brand-peach/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-peach/20 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">
                Artisanal Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Browse Collections by Section
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-brand-charcoal hover:text-brand-gold flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Explore All Section Filters</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Category Card 1: Scented */}
            <Link
              href="/shop?category=scented"
              className="group relative rounded-3xl overflow-hidden border border-brand-peach/25 bg-brand-cream/30 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 min-h-[220px]"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Blossoms & Botanicals
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                  Scented Candles
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Night-blooming jasmine, damask rose, and Kashmiri saffron for gentle, uplifting fragrance throw.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span className="text-brand-gold">Explore Scented →</span>
                <span className="text-[10px] bg-brand-peach/20 px-2.5 py-0.5 rounded-full">Section 1</span>
              </div>
            </Link>

            {/* Category Card 2: Soy Wax */}
            <Link
              href="/shop?category=soy-wax"
              className="group relative rounded-3xl overflow-hidden border border-brand-peach/25 bg-brand-cream/30 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 min-h-[220px]"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Pure Vegetable Bases
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                  Soy Wax Bases
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Precious agarwood, aged sandalwood, and warm amber poured into 100% clean soy wax with wooden wicks.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span className="text-brand-gold">Explore Soy Wax →</span>
                <span className="text-[10px] bg-brand-peach/20 px-2.5 py-0.5 rounded-full">Section 2</span>
              </div>
            </Link>

            {/* Category Card 3: Aromatherapy */}
            <Link
              href="/shop?category=aromatherapy"
              className="group relative rounded-3xl overflow-hidden border border-brand-peach/25 bg-brand-cream/30 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 min-h-[220px]"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Wellness & Breath
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                  Aromatherapy
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Himalayan cedar, juniper berries, pine needles, and pure essential oils formulated for deep focus.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span className="text-brand-gold">Explore Aromatherapy →</span>
                <span className="text-[10px] bg-brand-peach/20 px-2.5 py-0.5 rounded-full">Section 3</span>
              </div>
            </Link>

            {/* Category Card 4: Artisanal Shapes */}
            <Link
              href="/shop?category=artisanal-shapes"
              className="group relative rounded-3xl overflow-hidden border border-brand-peach/25 bg-brand-cream/30 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 min-h-[220px]"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Sculpted Statuary
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                  Artisanal Shapes
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Hand-molded Sacred Hearts and Golden Lotuses cast in natural beeswax and soy blends.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span className="text-brand-gold">Explore Shapes →</span>
                <span className="text-[10px] bg-brand-peach/20 px-2.5 py-0.5 rounded-full">Section 4</span>
              </div>
            </Link>

            {/* Category Card 5: Curated Sets */}
            <Link
              href="/shop?category=gift-sets"
              className="group relative rounded-3xl overflow-hidden border border-brand-peach/25 bg-brand-cream/30 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 min-h-[220px] sm:col-span-2 lg:col-span-2"
            >
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Luxury Ceremonial Presentation
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                  Curated Gift Sets & Trios
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Presented in velvet-lined champagne gold foil presentation boxes. Designed for weddings, festive ceremonies, and heartfelt spiritual offerings.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-charcoal">
                <span className="text-brand-gold">Explore Gift Sets →</span>
                <span className="text-[10px] bg-brand-peach/20 px-2.5 py-0.5 rounded-full">Section 5</span>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURED BEST SELLERS */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-brand-cream/15 text-brand-charcoal">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
              Hand-Poured Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Cherished Sanctuary Editions
            </h2>
            <div className="gold-divider mx-auto w-28" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCandles.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 shadow-md"
            >
              <span>View All Candles with Section Filters</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SENSORY SCENT QUIZ TEASER SECTION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#05182d] to-brand-charcoal text-white relative overflow-hidden border-t border-b border-brand-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="p-3 bg-brand-gold/20 rounded-full w-12 h-12 mx-auto flex items-center justify-center text-brand-peach">
            <Compass size={22} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-peach block">
            The Sensory Matchmaker
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
            Not Sure Which Candle Speaks to You?
          </h2>

          <p className="text-xs sm:text-sm text-brand-cream/70 max-w-lg mx-auto leading-relaxed font-light">
            Take our 60-second interactive fragrance quiz. We analyze your desired atmosphere, room setting, and scent preferences to reveal your soul candle.
          </p>

          <div className="pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-peach text-brand-charcoal rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl"
            >
              <span>Begin Scent Quiz</span>
              <Sparkles size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* HERITAGE CHAPTER TEASER */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-brand-cream/25 text-brand-charcoal border-b border-brand-peach/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="relative aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden border border-brand-peach/30 shadow-xl bg-white">
              <img
                src="/gift_set.png"
                alt="Radharaman Candle Crafting"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Our Sacred Heritage</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal leading-tight">
                An Ode to Vrindavan Light & Devotion
              </h2>
              <div className="h-0.5 w-16 bg-brand-gold" />

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                Every candle is hand-poured in small, custom batches inside our boutique workshop. We combine pure, food-grade soybean waxes with natural essential oils sourced sustainably from their geographic origins.
              </p>

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                From the calming cedar of the high Himalayas to the night-blooming jasmines of ancient gardens, we formulate fragrance oils that burn cleanly, leave a gentle throwing scent, and respect the air you breathe.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold border-b-2 border-brand-gold pb-1 transition-colors"
                >
                  <span>Read Our Full Story & Rituals</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CUSTOMER REVIEWS */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white text-brand-charcoal">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Customer Stories</span>
            <h2 className="font-serif text-3xl font-bold">Whispers of Devotion</h2>
            <div className="gold-divider mx-auto w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/15 shadow-xs space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                &ldquo;The Vrindavan Jasmine candle is absolutely magical. The throw is gentle yet fills my entire living space with the exact aroma of blooming night jasmines. Hands down the highest quality candle I own.&rdquo;
              </p>
              <div className="border-t border-brand-peach/10 pt-3">
                <span className="text-xs font-bold block text-brand-charcoal">Aishwarya R.</span>
                <span className="text-[9px] text-brand-charcoal/50 block">Verified Purchaser</span>
              </div>
            </div>

            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/15 shadow-xs space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                &ldquo;Mystic Oudh has completely changed my meditation routine. It has a beautiful grounding quality that is rich, deep, and not artificial at all. The wooden wick crackles softly, which is soothing.&rdquo;
              </p>
              <div className="border-t border-brand-peach/10 pt-3">
                <span className="text-xs font-bold block text-brand-charcoal">Vikram K.</span>
                <span className="text-[9px] text-brand-charcoal/50 block">Verified Purchaser</span>
              </div>
            </div>

            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/15 shadow-xs space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                &ldquo;Bought the Imperial Gift Set for my mother and she was in tears. The packaging alone feels like royalty, wrapped in gold and velvet. Each candle burns cleanly. Will purchase again!&rdquo;
              </p>
              <div className="border-t border-brand-peach/10 pt-3">
                <span className="text-xs font-bold block text-brand-charcoal">Meera S.</span>
                <span className="text-[9px] text-brand-charcoal/50 block">Verified Purchaser</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequireLogin={() => {}}
      />

    </div>
  );
}
