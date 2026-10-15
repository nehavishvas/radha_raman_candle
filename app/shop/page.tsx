"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Search, 
  Sparkles, 
  Layers, 
  Grid, 
  Flame, 
  Tag, 
  RotateCcw, 
  ChevronDown, 
  ChevronRight,
  Check
} from "lucide-react";
import ProductCard from "../components/product-card";
import ProductDetailModal from "../components/product-detail-modal";
import { products, Product, CATEGORIES, SCENT_FAMILIES } from "../data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedScentFamily, setSelectedScentFamily] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedBurnDuration, setSelectedBurnDuration] = useState<string>("all");
  const [selectedWickWax, setSelectedWickWax] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // View Mode: 'sections' (Category Shelves) vs 'grid' (All Products Grid)
  const [viewMode, setViewMode] = useState<"grid" | "sections">("grid");

  // UI state for mobile drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Section collapse states for filter sidebar
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    category: false,
    scent: false,
    price: false,
    burnTime: false,
    craft: false,
  });

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients.some((i) => i.toLowerCase().includes(query));
        const matchesNotes =
          product.fragranceNotes.top.toLowerCase().includes(query) ||
          product.fragranceNotes.middle.toLowerCase().includes(query) ||
          product.fragranceNotes.base.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesNotes) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // 3. Scent Family filter
      if (selectedScentFamily !== "all" && product.scentFamily !== selectedScentFamily) {
        return false;
      }

      // 4. Price Range filter
      if (selectedPriceRange === "under-30" && product.price >= 30) return false;
      if (selectedPriceRange === "30-40" && (product.price < 30 || product.price > 40)) return false;
      if (selectedPriceRange === "40-50" && (product.price < 40 || product.price > 50)) return false;
      if (selectedPriceRange === "over-50" && product.price <= 50) return false;

      // 5. Burn Duration filter
      if (selectedBurnDuration === "quick" && product.burnHours >= 45) return false;
      if (selectedBurnDuration === "medium" && (product.burnHours < 45 || product.burnHours > 58)) return false;
      if (selectedBurnDuration === "long" && product.burnHours < 59) return false;

      // 6. Wick & Wax Craft filter
      if (selectedWickWax === "wooden-wick" && !product.wickType.toLowerCase().includes("wooden")) return false;
      if (selectedWickWax === "cotton-wick" && !product.wickType.toLowerCase().includes("cotton")) return false;
      if (selectedWickWax === "100-soy" && !product.waxType.toLowerCase().includes("100% pure")) return false;
      if (selectedWickWax === "beeswax" && !product.waxType.toLowerCase().includes("beeswax")) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedScentFamily,
    selectedPriceRange,
    selectedBurnDuration,
    selectedWickWax,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      case "burn-time":
        return list.sort((a, b) => b.burnHours - a.burnHours);
      case "featured":
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Group products by category for "Section-wise / Category Shelves" mode
  const sectionedProducts = useMemo(() => {
    return CATEGORIES.filter((cat) => cat.id !== "all")
      .map((cat) => {
        const items = sortedProducts.filter((p) => p.category === cat.id);
        return {
          category: cat,
          items,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [sortedProducts]);

  // Count active filters
  const activeFilterCount = [
    selectedCategory !== "all",
    selectedScentFamily !== "all",
    selectedPriceRange !== "all",
    selectedBurnDuration !== "all",
    selectedWickWax !== "all",
    Boolean(searchQuery.trim()),
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedScentFamily("all");
    setSelectedPriceRange("all");
    setSelectedBurnDuration("all");
    setSelectedWickWax("all");
    setSortBy("featured");
  };

  // Helper count badges for each category
  const getCategoryCount = (catId: string) => {
    if (catId === "all") return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal min-h-screen">
      
      {/* Editorial Header Banner (Light Luxury Background) */}
      <section className="bg-[#faf8f5] text-brand-charcoal py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-brand-peach/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(232,197,175,0.40),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-[10px] uppercase font-bold tracking-[0.25em] shadow-xs">
            <Sparkles size={12} className="text-brand-gold" />
            <span>Artisanal Sanctuary Boutique</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-brand-charcoal">
            The Complete Candle Collection
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-brand-charcoal/75 font-light leading-relaxed">
            Discover 100% natural soy wax, sacred Vrindavan botanicals, crackling wooden wicks, and hand-molded devotional designs. Filter by olfactory family, burn duration, wax formulation, or browse section by section.
          </p>

          {/* Quick Breadcrumbs */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Boutique Shop</span>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Top Control Bar: Search, View Mode Toggle, Sort By, and Mobile Filter Button */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-brand-peach/25 p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Live Search input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by scent notes, wax, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-cream/40 text-xs px-4 py-2.5 pl-9 rounded-full border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal"
            />
            <Search className="absolute left-3 top-3 text-brand-charcoal/40" size={15} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-brand-charcoal/40 hover:text-brand-charcoal"
              >
                ×
              </button>
            )}
          </div>

          {/* Middle: Mode View Switcher (All Grid vs Category Shelves) */}
          <div className="flex items-center gap-2 bg-brand-cream/60 p-1 rounded-xl border border-brand-peach/20 text-xs font-semibold">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-brand-charcoal text-white shadow-xs"
                  : "text-brand-charcoal/70 hover:text-brand-charcoal"
              }`}
            >
              <Grid size={13} />
              <span>Catalog Grid</span>
            </button>
            <button
              onClick={() => setViewMode("sections")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "sections"
                  ? "bg-brand-charcoal text-white shadow-xs"
                  : "text-brand-charcoal/70 hover:text-brand-charcoal"
              }`}
            >
              <Layers size={13} />
              <span>Browse by Section</span>
            </button>
          </div>

          {/* Right: Mobile Filter Button & Sort Dropdown */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white rounded-full text-xs font-semibold cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>Section Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-charcoal/60 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-brand-peach/30 text-xs font-medium px-3 py-2 rounded-full focus:outline-none focus:border-brand-gold text-brand-charcoal cursor-pointer"
              >
                <option value="featured">Featured & Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="burn-time">Longest Burn Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-2">
            <span className="text-xs text-brand-charcoal/60 font-semibold mr-1">Active Filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-brand-charcoal text-white text-[11px] font-medium px-3 py-1 rounded-full">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button onClick={() => setSearchQuery("")} className="hover:text-brand-peach cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-charcoal border border-brand-gold/40 text-[11px] font-semibold px-3 py-1 rounded-full">
                <span>Collection: {selectedCategory.replace("-", " ")}</span>
                <button onClick={() => setSelectedCategory("all")} className="hover:text-brand-gold-dark cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedScentFamily !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-brand-peach/25 text-brand-charcoal border border-brand-peach/40 text-[11px] font-semibold px-3 py-1 rounded-full">
                <span>Scent: {selectedScentFamily}</span>
                <button onClick={() => setSelectedScentFamily("all")} className="hover:text-red-600 cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedPriceRange !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-brand-peach/25 text-brand-charcoal border border-brand-peach/40 text-[11px] font-semibold px-3 py-1 rounded-full">
                <span>Price: {selectedPriceRange}</span>
                <button onClick={() => setSelectedPriceRange("all")} className="hover:text-red-600 cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedBurnDuration !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-brand-peach/25 text-brand-charcoal border border-brand-peach/40 text-[11px] font-semibold px-3 py-1 rounded-full">
                <span>Burn: {selectedBurnDuration}</span>
                <button onClick={() => setSelectedBurnDuration("all")} className="hover:text-red-600 cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedWickWax !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-brand-peach/25 text-brand-charcoal border border-brand-peach/40 text-[11px] font-semibold px-3 py-1 rounded-full">
                <span>Craft: {selectedWickWax.replace("-", " ")}</span>
                <button onClick={() => setSelectedWickWax("all")} className="hover:text-red-600 cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-brand-blue hover:underline font-bold flex items-center gap-1 ml-2 cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Grid with Left Section-Wise Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ======================================================= */}
          {/* DESKTOP SECTION-WISE FILTER SIDEBAR */}
          {/* ======================================================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-brand-peach/25 p-5 shadow-sm sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between border-b border-brand-peach/15 pb-3">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold">Filter Sanctuary</h3>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-brand-blue hover:underline font-semibold"
                  >
                    Reset ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* ---------------- SECTION 1: CATEGORY / COLLECTIONS ---------------- */}
              <div className="border-b border-brand-peach/15 pb-4">
                <button
                  onClick={() => toggleSection("category")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3 hover:text-brand-gold"
                >
                  <span>1. Collections & Categories</span>
                  <ChevronDown size={14} className={`transition-transform ${collapsedSections.category ? "-rotate-90" : ""}`} />
                </button>

                {!collapsedSections.category && (
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? "bg-brand-charcoal text-white font-bold shadow-xs"
                            : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-charcoal"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-brand-peach/15 text-brand-charcoal/60"
                        }`}>
                          {getCategoryCount(cat.id)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------- SECTION 2: SCENT FAMILY / NOTES ---------------- */}
              <div className="border-b border-brand-peach/15 pb-4">
                <button
                  onClick={() => toggleSection("scent")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3 hover:text-brand-gold"
                >
                  <span>2. Scent Family Profile</span>
                  <ChevronDown size={14} className={`transition-transform ${collapsedSections.scent ? "-rotate-90" : ""}`} />
                </button>

                {!collapsedSections.scent && (
                  <div className="space-y-1.5">
                    {SCENT_FAMILIES.map((scent) => (
                      <button
                        key={scent.id}
                        onClick={() => setSelectedScentFamily(scent.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                          selectedScentFamily === scent.id
                            ? "bg-brand-gold/25 font-bold text-brand-charcoal border border-brand-gold/40"
                            : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-charcoal"
                        }`}
                      >
                        <span>{scent.name}</span>
                        {selectedScentFamily === scent.id && <Check size={13} className="text-brand-charcoal" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------- SECTION 3: PRICE RANGE ---------------- */}
              <div className="border-b border-brand-peach/15 pb-4">
                <button
                  onClick={() => toggleSection("price")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3 hover:text-brand-gold"
                >
                  <span>3. Price Tier</span>
                  <ChevronDown size={14} className={`transition-transform ${collapsedSections.price ? "-rotate-90" : ""}`} />
                </button>

                {!collapsedSections.price && (
                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: "all", label: "All Price Points" },
                      { id: "under-30", label: "Under $30 (Artisanal Shapes)" },
                      { id: "30-40", label: "$30 – $40 (Core Sanctuary)" },
                      { id: "40-50", label: "$40 – $50 (Precious Oudh & Sandalwood)" },
                      { id: "over-50", label: "$50+ (Curated Luxury Sets)" },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedPriceRange(tier.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                          selectedPriceRange === tier.id
                            ? "bg-brand-gold/25 font-bold text-brand-charcoal border border-brand-gold/40"
                            : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-charcoal"
                        }`}
                      >
                        <span>{tier.label}</span>
                        {selectedPriceRange === tier.id && <Check size={13} className="text-brand-charcoal" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------- SECTION 4: BURN DURATION ---------------- */}
              <div className="border-b border-brand-peach/15 pb-4">
                <button
                  onClick={() => toggleSection("burnTime")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3 hover:text-brand-gold"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame size={12} className="text-brand-gold" />
                    4. Burn Duration
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${collapsedSections.burnTime ? "-rotate-90" : ""}`} />
                </button>

                {!collapsedSections.burnTime && (
                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: "all", label: "All Durations" },
                      { id: "quick", label: "Quick Burn (30–35 Hours)" },
                      { id: "medium", label: "Medium Burn (50–55 Hours)" },
                      { id: "long", label: "Long Clean Burn (60–75+ Hours)" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBurnDuration(b.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                          selectedBurnDuration === b.id
                            ? "bg-brand-gold/25 font-bold text-brand-charcoal border border-brand-gold/40"
                            : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-charcoal"
                        }`}
                      >
                        <span>{b.label}</span>
                        {selectedBurnDuration === b.id && <Check size={13} className="text-brand-charcoal" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------- SECTION 5: WAX & WICK CRAFT ---------------- */}
              <div>
                <button
                  onClick={() => toggleSection("craft")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3 hover:text-brand-gold"
                >
                  <span>5. Wax & Wick Craft</span>
                  <ChevronDown size={14} className={`transition-transform ${collapsedSections.craft ? "-rotate-90" : ""}`} />
                </button>

                {!collapsedSections.craft && (
                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: "all", label: "All Formulations" },
                      { id: "wooden-wick", label: "Crackling Wooden Wick" },
                      { id: "cotton-wick", label: "Organic Braided Cotton Wick" },
                      { id: "100-soy", label: "100% Pure Soy Wax" },
                      { id: "beeswax", label: "Soy & Beeswax Blend" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedWickWax(c.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                          selectedWickWax === c.id
                            ? "bg-brand-gold/25 font-bold text-brand-charcoal border border-brand-gold/40"
                            : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-charcoal"
                        }`}
                      >
                        <span>{c.label}</span>
                        {selectedWickWax === c.id && <Check size={13} className="text-brand-charcoal" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* ======================================================= */}
          {/* RIGHT PRODUCTS DISPLAY AREA */}
          {/* ======================================================= */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Results counter & active description */}
            <div className="flex items-center justify-between text-xs text-brand-charcoal/70 border-b border-brand-peach/15 pb-3">
              <span>
                Showing <strong>{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "candle" : "candles"}
                {selectedCategory !== "all" && ` in ${selectedCategory.replace("-", " ")}`}
              </span>
              <span className="text-[11px] text-brand-gold font-semibold uppercase tracking-wider">
                Small-Batch Hand Poured
              </span>
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 px-6 bg-white/70 rounded-2xl border border-dashed border-brand-peach/40 space-y-4">
                <div className="p-4 bg-brand-peach/15 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-brand-charcoal">
                  <Flame size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold">No Sanctuary Candles Match</h3>
                <p className="text-xs text-brand-charcoal/60 max-w-sm mx-auto">
                  We could not find any candles matching your current combination of section filters. Try clearing some filters to see our collection.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-charcoal transition-all cursor-pointer"
                >
                  Reset All Section Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              
              /* =================================================== */
              /* 1. CATALOG GRID VIEW */
              /* =================================================== */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProductForQuickView}
                  />
                ))}
              </div>

            ) : (

              /* =================================================== */
              /* 2. SECTION-WISE CATEGORY SHELVES VIEW */
              /* =================================================== */
              <div className="space-y-16">
                {sectionedProducts.map((section) => (
                  <div key={section.category.id} className="space-y-6">
                    {/* Section Shelf Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-brand-gold/30 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">
                          Collection Shelf
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                          {section.category.name}
                        </h2>
                        <p className="text-xs text-brand-charcoal/65 mt-0.5">
                          {section.category.description}
                        </p>
                      </div>
                      <span className="text-xs font-semibold bg-brand-gold/15 text-brand-charcoal border border-brand-gold/30 px-3 py-1 rounded-full w-fit">
                        {section.items.length} {section.items.length === 1 ? "edition" : "editions"}
                      </span>
                    </div>

                    {/* Section Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onQuickView={setSelectedProductForQuickView}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            )}

          </main>
        </div>

      </div>

      {/* ======================================================= */}
      {/* MOBILE SECTION FILTERS DRAWER */}
      {/* ======================================================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col h-full text-brand-charcoal">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-peach/20 bg-brand-cream/40">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold">Section Filters</h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-peach/20"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body (Scrollable filters) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                
                {/* 1. Category */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    1. Collections
                  </h4>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg ${
                          selectedCategory === cat.id ? "bg-brand-charcoal text-white font-bold" : "text-brand-charcoal/70"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-70">({getCategoryCount(cat.id)})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Scent Family */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    2. Scent Family
                  </h4>
                  <div className="space-y-1">
                    {SCENT_FAMILIES.map((scent) => (
                      <button
                        key={scent.id}
                        onClick={() => setSelectedScentFamily(scent.id)}
                        className={`w-full text-left p-2 rounded-lg ${
                          selectedScentFamily === scent.id ? "bg-brand-gold/30 font-bold" : "text-brand-charcoal/70"
                        }`}
                      >
                        {scent.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Price Tier */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    3. Price Tier
                  </h4>
                  <div className="space-y-1">
                    {[
                      { id: "all", label: "All Prices" },
                      { id: "under-30", label: "Under $30" },
                      { id: "30-40", label: "$30 – $40" },
                      { id: "40-50", label: "$40 – $50" },
                      { id: "over-50", label: "$50+" },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedPriceRange(tier.id)}
                        className={`w-full text-left p-2 rounded-lg ${
                          selectedPriceRange === tier.id ? "bg-brand-gold/30 font-bold" : "text-brand-charcoal/70"
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Burn Duration */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    4. Burn Duration
                  </h4>
                  <div className="space-y-1">
                    {[
                      { id: "all", label: "All Durations" },
                      { id: "quick", label: "Quick Burn (30–35h)" },
                      { id: "medium", label: "Medium Burn (50–55h)" },
                      { id: "long", label: "Long Burn (60–75+h)" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBurnDuration(b.id)}
                        className={`w-full text-left p-2 rounded-lg ${
                          selectedBurnDuration === b.id ? "bg-brand-gold/30 font-bold" : "text-brand-charcoal/70"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Craft */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    5. Wick & Wax Craft
                  </h4>
                  <div className="space-y-1">
                    {[
                      { id: "all", label: "All Craft" },
                      { id: "wooden-wick", label: "Crackling Wooden Wick" },
                      { id: "cotton-wick", label: "Organic Cotton Wick" },
                      { id: "100-soy", label: "100% Pure Soy Wax" },
                      { id: "beeswax", label: "Soy & Beeswax Blend" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedWickWax(c.id)}
                        className={`w-full text-left p-2 rounded-lg ${
                          selectedWickWax === c.id ? "bg-brand-gold/30 font-bold" : "text-brand-charcoal/70"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-brand-peach/20 bg-brand-cream/30 flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="w-1/3 py-2.5 border border-brand-charcoal/30 rounded-full font-bold text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-2/3 py-2.5 bg-brand-charcoal text-white rounded-full font-bold text-xs"
                >
                  Apply ({sortedProducts.length})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
        onRequireLogin={() => {}}
      />

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-gold border-r-transparent align-[-0.125em]" />
        <p className="mt-4 text-xs font-semibold text-brand-charcoal/60">Loading Sanctuary Collection...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
