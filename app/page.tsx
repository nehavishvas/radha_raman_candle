"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Leaf, Flame, Shield, ArrowRight, Check, Send, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./components/header";
import ProductCard from "./components/product-card";
import ProductDetailModal from "./components/product-detail-modal";
import CartSidebar from "./components/cart-sidebar";
import FragranceQuiz from "./components/fragrance-quiz";
import CheckoutModal from "./components/checkout-modal";
import LoginModal from "./components/login-modal";
import { products, Product } from "./data/products";

const heroSlides = [
  {
    subtitle: "Illuminate Every Moment",
    title: "Vrindavan Jasmine",
    description: "An enchanting olfactory journey to the sacred groves. Hand-poured with night-blooming jasmine blossoms, golden saffron, and warm sandalwood.",
    image: "/jasmine_candle.png",
    productId: "vrindavan-jasmine",
    bgGradient: "from-[#061830] via-[#0d2a4a] to-[#081d33]",
  },
  {
    subtitle: "Meditative Warmth",
    title: "Mystic Oudh",
    description: "A deep, warm, and meditative blend featuring precious agarwood (Oudh), balanced masterfully with golden amber and rich, smoky vanilla.",
    image: "/oudh_candle.png",
    productId: "mystic-oudh",
    bgGradient: "from-[#06080c] via-[#121620] to-[#090b10]",
  },
  {
    subtitle: "Crisp Mountain Vitality",
    title: "Himalayan Cedar",
    description: "Evoke the clean, fresh air of pine forests. A calming combination of wild Himalayan pine needles, robust cedarwood bark, and wild honey.",
    image: "/cedar_candle.png",
    productId: "himalayan-cedar",
    bgGradient: "from-[#021114] via-[#0a282c] to-[#04161a]",
  },
  {
    subtitle: "Majestic Imperial Gardens",
    title: "Rose & Cardamom",
    description: "A majestic fusion of delicate damask rose petals, accented by the warming aroma of fresh cardamom and finished with clean white musk.",
    image: "/rose_candle.png",
    productId: "rose-cardamom",
    bgGradient: "from-[#11060b] via-[#22101b] to-[#150a11]",
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  // Login States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleRequireLogin = (msg: string) => {
    setLoginMessage(msg);
    setIsLoginOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fragranceNotes.top.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fragranceNotes.middle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fragranceNotes.base.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollToSection={scrollToSection}
        onLoginClick={() => handleRequireLogin("Log in to access your private VIP sanctuary account.")}
      />

      <main className="flex-1 flex flex-col">
        {/* HERO SLIDER SECTION */}
        <section className={`relative overflow-hidden text-white py-20 sm:py-28 border-b border-brand-gold/15 min-h-[550px] flex items-center bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} transition-all duration-1000`}>
          {/* Background overlay and glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,197,175,0.12),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,93,158,0.1),transparent_40%)]" />

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 z-20 p-2.5 rounded-full border border-white/10 hover:border-brand-peach/40 bg-black/20 hover:bg-brand-charcoal/80 text-white hover:text-brand-peach transition-all cursor-pointer hidden md:block"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 z-20 p-2.5 rounded-full border border-white/10 hover:border-brand-peach/40 bg-black/20 hover:bg-brand-charcoal/80 text-white hover:text-brand-peach transition-all cursor-pointer hidden md:block"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Slide Loop */}
            {heroSlides.map((slide, index) => {
              if (index !== currentSlide) return null;

              return (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                  {/* Left Content (Animated Text) */}
                  <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-brand-peach fade-in-up">
                      {slide.subtitle}
                    </span>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide text-brand-cream fade-in-up delay-100">
                      {slide.title}
                    </h1>

                    <p className="max-w-xl text-sm sm:text-base text-brand-cream/70 leading-relaxed font-light fade-in-up delay-200">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2 fade-in-up delay-300">
                      <button
                        onClick={() => {
                          const prod = products.find(p => p.id === slide.productId);
                          if (prod) setSelectedProduct(prod);
                        }}
                        className="px-8 py-3.5 bg-brand-peach text-brand-charcoal hover:bg-brand-cream transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-peach/10 cursor-pointer"
                      >
                        Quick View Details
                      </button>
                      <button
                        onClick={() => scrollToSection("collection")}
                        className="px-8 py-3.5 border border-brand-peach/40 text-brand-peach hover:border-brand-cream hover:text-white transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Right Content (Animated Image Card) */}
                  <div className="lg:col-span-5 flex justify-center items-center relative scale-95 md:scale-100 fade-in-up delay-100 mx-auto w-full max-w-[400px]">
                    {/* Glowing background aura */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-peach/30 to-brand-blue/20 rounded-2xl blur-2xl -z-10 animate-pulse" />

                    {/* Main Image Container */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl bg-brand-charcoal/20 backdrop-blur-xs flex items-center justify-center group">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="object-cover w-full h-full scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Top Overlay Badge */}
                      <div className="absolute top-4 left-4 bg-brand-charcoal/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-brand-peach uppercase border border-brand-peach/25 shadow-md">
                        100% Hand-Poured
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Slide indicators dots */}
            <div className="flex justify-center gap-2 mt-8 md:mt-12">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide ? "w-6 bg-brand-peach" : "w-1.5 bg-brand-peach/30 hover:bg-brand-peach/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* VALUE PROPOSITIONS */}
        <section className="bg-brand-cream py-10 border-b border-brand-peach/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-brand-charcoal">

              <div className="flex flex-col items-center space-y-2 p-3">
                <div className="p-3 bg-brand-peach/10 text-brand-gold rounded-full">
                  <Leaf size={20} className="stroke-[1.5]" />
                </div>
                <span className="font-serif text-sm font-bold">100% Soy Wax</span>
                <span className="text-[10px] text-brand-charcoal/60">Toxin-free, renewable burn</span>
              </div>

              <div className="flex flex-col items-center space-y-2 p-3">
                <div className="p-3 bg-brand-peach/10 text-brand-gold rounded-full">
                  <Flame size={20} className="stroke-[1.5]" />
                </div>
                <span className="font-serif text-sm font-bold">60-Hour Clean Burn</span>
                <span className="text-[10px] text-brand-charcoal/60">Slow, long-lasting aroma</span>
              </div>

              <div className="flex flex-col items-center space-y-2 p-3">
                <div className="p-3 bg-brand-peach/10 text-brand-gold rounded-full">
                  <Sparkles size={20} className="stroke-[1.5]" />
                </div>
                <span className="font-serif text-sm font-bold">Rare Essential Oils</span>
                <span className="text-[10px] text-brand-charcoal/60">Hand-curated scent layers</span>
              </div>

              <div className="flex flex-col items-center space-y-2 p-3">
                <div className="p-3 bg-brand-peach/10 text-brand-gold rounded-full">
                  <Shield size={20} className="stroke-[1.5]" />
                </div>
                <span className="font-serif text-sm font-bold">Hand-Poured Quality</span>
                <span className="text-[10px] text-brand-charcoal/60">Rigorous small-batch focus</span>
              </div>

            </div>
          </div>
        </section>

        {/* PRODUCTS CATALOG SECTION */}
        <section id="collection" className="scroll-mt-24 py-16 sm:py-24 bg-brand-cream/15 text-brand-charcoal">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

            {/* Header */}
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                The Artisanal Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Shop Our Fragrance Collection
              </h2>
              <div className="gold-divider mx-auto w-32" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { label: "All Scent Profiles", id: "all" },
                { label: "Scented", id: "scented" },
                { label: "Soy Wax Base", id: "soy-wax" },
                { label: "Aromatherapy", id: "aromatherapy" },
                { label: "Artisanal Shapes", id: "artisanal-shapes" },
                { label: "Curated Sets", id: "gift-sets" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-semibold tracking-wide ${selectedCategory === cat.id
                      ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm scale-102"
                      : "bg-white text-brand-charcoal/70 border-brand-peach/25 hover:border-brand-gold hover:text-brand-charcoal"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search status */}
            {searchQuery && (
              <p className="text-xs text-center text-brand-charcoal/60 italic">
                Showing results for &ldquo;{searchQuery}&rdquo; ({filteredProducts.length} items found)
              </p>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-brand-cream/30 border border-dashed border-brand-peach/20 rounded-2xl">
                <p className="text-sm font-semibold text-brand-charcoal/60">No candles match your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-5 py-2 bg-brand-charcoal text-white rounded-full text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onRequireLogin={handleRequireLogin}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* INTERACTIVE SCENT FINDER QUIZ SECTION */}
        <section className="py-16 sm:py-20 bg-brand-cream/30 border-t border-b border-brand-peach/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center space-y-3 mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Sensory Matchmaker
              </span>
              <h2 className="font-serif text-3xl font-bold">
                Find Your Signature Candle
              </h2>
              <p className="text-xs text-brand-charcoal/60 max-w-sm mx-auto">
                Answer three simple sensory questions to reveal the candle tailored to your mood and aesthetic preferences.
              </p>
              <div className="gold-divider mx-auto w-24" />
            </div>

            <FragranceQuiz onQuickView={setSelectedProduct} />
          </div>
        </section>

        {/* BRAND HERITAGE SECTION */}
        <section id="our-story" className="scroll-mt-24 py-16 sm:py-24 bg-brand-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,197,175,0.07),transparent_50%)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Image Grid */}
              <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-brand-gold/25 shadow-xl bg-brand-cream/5 min-h-[300px]">
                <img
                  src="/gift_set.png"
                  alt="Radharaman Candles Heritage Crafting"
                  className="object-cover w-full h-full opacity-90"
                />
              </div>

              {/* Text */}
              <div className="space-y-6 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-peach">Our Heritage</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
                  Crafted by Hand, Guided by Tradition
                </h2>
                <div className="h-0.5 w-16 bg-brand-gold" />

                <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed font-light">
                  The name **Radharaman** is an ode to timeless beauty, grace, and spiritual light. Every single candle is hand-poured in small, custom batches inside our boutique workshop. We combine pure, food-grade soybean waxes with natural essential oils sourced sustainably from their geographic origins.
                </p>

                <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed font-light">
                  From the calming cedar of the high Himalayas to the night-blooming jasmines of ancient gardens, we formulate fragrance oils that burn cleanly, leave a gentle throwing scent, and respect the air you breathe. Experience design that elevates and scent that restores.
                </p>

                <div className="pt-2">
                  <div className="flex items-center gap-3 text-xs text-brand-peach font-bold italic">
                    <span>— Hand-Poured with Love & Devotion</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TESTIMONIALS / CUSTOMER REVIEW CAROUSEL */}
        <section className="py-16 sm:py-24 bg-brand-cream/15 text-brand-charcoal border-b border-brand-peach/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Customer Stories</span>
              <h2 className="font-serif text-3xl font-bold">Whispers of Devotion</h2>
              <div className="gold-divider mx-auto w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="p-6 bg-white rounded-2xl border border-brand-peach/15 shadow-sm space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
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

              <div className="p-6 bg-white rounded-2xl border border-brand-peach/15 shadow-sm space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                  &ldquo;Mystic Oudh has completely changed my meditation routine. It has a beautiful grounding quality that is rich, deep, and not artificial at all. The wooden wick crackles softly, which is incredibly soothing.&rdquo;
                </p>
                <div className="border-t border-brand-peach/10 pt-3">
                  <span className="text-xs font-bold block text-brand-charcoal">Vikram K.</span>
                  <span className="text-[9px] text-brand-charcoal/50 block">Verified Purchaser</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-brand-peach/15 shadow-sm space-y-4 hover:border-brand-gold/40 transition-colors duration-300">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                  &ldquo;Bought the Imperial Gift Set for my mother and she was in tears. The packaging alone feels like royalty, wrapped in gold and velvet. Each mini candle burns beautifully. Will purchase again!&rdquo;
                </p>
                <div className="border-t border-brand-peach/10 pt-3">
                  <span className="text-xs font-bold block text-brand-charcoal">Meera S.</span>
                  <span className="text-[9px] text-brand-charcoal/50 block">Verified Purchaser</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* NEWSLETTER SIGNUP */}
        <section className="py-16 sm:py-20 bg-brand-cream/40 text-brand-charcoal text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">Radharaman Circle</span>
              <h2 className="font-serif text-3xl font-bold">Unlock Access to Small Batches</h2>
              <p className="text-xs text-brand-charcoal/65 max-w-sm mx-auto">
                Subscribe to receive early releases of private blends, exclusive invitations, and 10% off your initial sanctuary order.
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 max-w-xs mx-auto py-2.5 px-4 rounded-full border border-emerald-200">
                <Check size={14} />
                <span>Subscription successful! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter email for VIP access"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white text-xs px-5 py-3 rounded-full border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <span>Join List</span>
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-charcoal text-white/70 py-12 border-t border-brand-gold/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-8">

            {/* Left Brand info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-widest text-white">RADHARAMAN</span>
                <span className="text-[8px] bg-brand-gold/20 text-brand-peach px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Luxury Candles</span>
              </div>
              <p className="text-[10px] text-white/50 max-w-xs leading-relaxed">
                Handcrafted spaces of serenity, illumination, and quiet comfort. Crafted in compliance with strict organic standards.
              </p>
            </div>

            {/* Right Quick Links */}
            <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-wider">
              <button onClick={() => scrollToSection("collection")} className="hover:text-brand-peach transition-colors">Shop</button>
              <button onClick={() => scrollToSection("fragrance-quiz")} className="hover:text-brand-peach transition-colors">Quiz</button>
              <button onClick={() => scrollToSection("our-story")} className="hover:text-brand-peach transition-colors">Story</button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/45 gap-4 text-center">
            <span>© {new Date().getFullYear()} Radharaman Luxury Candles. All Rights Reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-peach">Privacy Policy</a>
              <a href="#" className="hover:text-brand-peach">Terms of Use</a>
              <a href="#" className="hover:text-brand-peach">Shipping & Returns</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SIDEBARS & MODALS OVERLAYS */}
      <CartSidebar 
        onCheckout={() => setIsCheckoutOpen(true)} 
        onRequireLogin={handleRequireLogin}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequireLogin={handleRequireLogin}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        message={loginMessage}
      />
    </div>
  );
}
