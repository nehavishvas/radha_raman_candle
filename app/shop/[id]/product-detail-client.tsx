"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  Flame, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Leaf, 
  HelpCircle,
  Check,
  ChevronRight
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToCart, openLoginModal } from "../../store/cartSlice";
import { Product } from "../../data/products";
import ProductCard from "../../components/product-card";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"pyramid" | "care" | "ingredients">("pyramid");

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal("Please log in to add items to your personal sanctuary cart."));
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        fragranceNotes: [product.fragranceNotes.top, product.fragranceNotes.middle, product.fragranceNotes.base],
        quantity: quantity,
      })
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal">
      
      {/* Breadcrumbs */}
      <nav className="border-b border-brand-peach/15 bg-white/60 py-3.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-brand-charcoal/60">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link 
            href={`/shop?category=${product.category}`} 
            className="hover:text-brand-gold transition-colors capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight size={12} />
          <span className="text-brand-charcoal font-semibold truncate">{product.name}</span>
        </div>
      </nav>

      {/* Main Product Showcase Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-brand-peach/30 shadow-xl bg-white flex items-center justify-center group">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full scale-100 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-brand-charcoal/90 text-brand-peach backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-brand-gold/30 shadow-md">
                  100% Hand-Poured
                </span>
                <span className="bg-white/90 text-brand-charcoal px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border border-brand-peach/30 shadow-xs">
                  {product.burnTime} Clean Burn
                </span>
              </div>

              {product.isBestSeller && (
                <div className="absolute top-4 right-4 bg-brand-gold text-brand-charcoal px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
                  Best Seller
                </div>
              )}
            </div>

            {/* Micro guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-brand-charcoal/70">
              <div className="p-3 bg-white/70 rounded-xl border border-brand-peach/15">
                <Leaf size={16} className="text-brand-gold mx-auto mb-1" />
                <span className="font-semibold block text-brand-charcoal">Clean Soy Wax</span>
                <span className="text-[10px] text-brand-charcoal/50">Toxin & Paraben Free</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-brand-peach/15">
                <Flame size={16} className="text-brand-gold mx-auto mb-1" />
                <span className="font-semibold block text-brand-charcoal">Slow Cured</span>
                <span className="text-[10px] text-brand-charcoal/50">Even, clean burn</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-brand-peach/15">
                <ShieldCheck size={16} className="text-brand-gold mx-auto mb-1" />
                <span className="font-semibold block text-brand-charcoal">Sacred Botanicals</span>
                <span className="text-[10px] text-brand-charcoal/50">Steam-distilled oils</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Narrative & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Scent Family Tags */}
            <div className="flex items-center gap-3">
              <Link 
                href={`/shop?category=${product.category}`}
                className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase hover:underline"
              >
                {product.category.replace("-", " ")}
              </Link>
              <span className="text-brand-peach">•</span>
              <span className="text-[10px] font-bold tracking-wider text-brand-charcoal/60 uppercase">
                {product.scentFamily} Scent Profile
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-sm font-serif italic text-brand-gold-dark mt-1">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Reviews & Pricing */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-peach/15 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-charcoal">
                  {product.rating} ({product.reviewsCount} verified sanctuary reviews)
                </span>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-bold text-brand-charcoal">
                  ${product.price}.00
                </span>
                <span className="block text-[10px] text-emerald-700 font-semibold">
                  Complimentary luxury delivery
                </span>
              </div>
            </div>

            {/* Evocative Description */}
            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
              {product.longDescription || product.description}
            </p>

            {/* Tabs: Olfactory Pyramid / Care / Ingredients */}
            <div className="bg-white/80 rounded-2xl border border-brand-peach/20 p-5 shadow-sm space-y-4">
              <div className="flex gap-2 border-b border-brand-peach/15 pb-3 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("pyramid")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "pyramid"
                      ? "bg-brand-charcoal text-white"
                      : "text-brand-charcoal/60 hover:text-brand-charcoal"
                  }`}
                >
                  Olfactory Pyramid
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "care"
                      ? "bg-brand-charcoal text-white"
                      : "text-brand-charcoal/60 hover:text-brand-charcoal"
                  }`}
                >
                  Candle Care Ritual
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "ingredients"
                      ? "bg-brand-charcoal text-white"
                      : "text-brand-charcoal/60 hover:text-brand-charcoal"
                  }`}
                >
                  Pure Ingredients
                </button>
              </div>

              {/* Tab 1: Olfactory Pyramid */}
              {activeTab === "pyramid" && (
                <div className="space-y-3 text-xs animate-fadeIn">
                  <div className="flex justify-between items-center py-1.5 border-b border-brand-peach/10">
                    <span className="font-bold text-brand-charcoal/70 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-brand-gold" />
                      Top Notes (Initial Throw):
                    </span>
                    <span className="text-brand-charcoal font-medium text-right">{product.fragranceNotes.top}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-brand-peach/10">
                    <span className="font-bold text-brand-charcoal/70 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-brand-gold" />
                      Heart Notes (The Sacred Core):
                    </span>
                    <span className="text-brand-charcoal font-medium text-right">{product.fragranceNotes.middle}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="font-bold text-brand-charcoal/70 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-brand-gold" />
                      Base Notes (Lingering Serenity):
                    </span>
                    <span className="text-brand-charcoal font-medium text-right">{product.fragranceNotes.base}</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Care Ritual */}
              {activeTab === "care" && (
                <div className="space-y-2 text-xs text-brand-charcoal/75 animate-fadeIn">
                  {product.careTips ? (
                    product.careTips.map((tip, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span className="text-brand-gold font-bold">•</span>
                        <span>{tip}</span>
                      </p>
                    ))
                  ) : (
                    <>
                      <p>• <strong>The Memory Burn:</strong> Allow wax to liquefy to the edges of the jar on first light (3-4 hours) to prevent tunneling.</p>
                      <p>• <strong>Trim the Wick:</strong> Keep wick trimmed to 1/4 inch before each lighting for a clean, flicker-free burn.</p>
                      <p>• <strong>Extinguish:</strong> Gently dip wick into melted wax with a snuffer rather than blowing to eliminate smoke.</p>
                    </>
                  )}
                </div>
              )}

              {/* Tab 3: Ingredients */}
              {activeTab === "ingredients" && (
                <div className="flex flex-wrap gap-2 text-xs animate-fadeIn">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-brand-peach/15 border border-brand-peach/25 text-brand-charcoal font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-brand-cream/50 p-4 rounded-2xl border border-brand-peach/15 text-xs">
              <div>
                <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider block">Net Weight</span>
                <strong className="text-brand-charcoal">{product.size}</strong>
              </div>
              <div>
                <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider block">Burn Duration</span>
                <strong className="text-brand-charcoal">{product.burnTime}</strong>
              </div>
              <div>
                <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider block">Wick</span>
                <strong className="text-brand-charcoal truncate block">{product.wickType}</strong>
              </div>
              <div>
                <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider block">Wax Base</span>
                <strong className="text-brand-charcoal truncate block">{product.waxType}</strong>
              </div>
            </div>

            {/* Add to Cart Stepper & CTA */}
            <div className="flex items-center gap-4 pt-4">
              {/* Stepper */}
              <div className="flex items-center border border-brand-peach/40 rounded-full px-4 py-2 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-base font-bold text-brand-charcoal/70 hover:text-brand-charcoal px-2 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold select-none text-brand-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-base font-bold text-brand-charcoal/70 hover:text-brand-charcoal px-2 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal shadow-brand-charcoal/10"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Sanctuary Bag ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Sanctuary Bag — ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Devotional Reviews Section */}
      <section className="bg-white py-14 sm:py-18 border-t border-b border-brand-peach/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
              Sanctuary Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Voices of Illumination
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/20 space-y-3">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/80 italic leading-relaxed">
                &ldquo;The olfactory pyramid on {product.name} is sublime. As soon as you light it, the top notes envelop the room softly, without being overwhelming. Best artisan candle I have ever burned.&rdquo;
              </p>
              <div className="pt-2 border-t border-brand-peach/10">
                <span className="text-xs font-bold block text-brand-charcoal">Shalini M.</span>
                <span className="text-[10px] text-brand-charcoal/50">Verified Sanctuary Patron</span>
              </div>
            </div>

            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/20 space-y-3">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/80 italic leading-relaxed">
                &ldquo;Pure soy wax makes a world of difference. No soot, no headache, just an enchanting clean aroma that lingered hours after putting out the flame. The packaging alone is worthy of royalty.&rdquo;
              </p>
              <div className="pt-2 border-t border-brand-peach/10">
                <span className="text-xs font-bold block text-brand-charcoal">Devanand R.</span>
                <span className="text-[10px] text-brand-charcoal/50">Verified Sanctuary Patron</span>
              </div>
            </div>

            <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-peach/20 space-y-3">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p className="text-xs text-brand-charcoal/80 italic leading-relaxed">
                &ldquo;Ordered this for our home meditation altar and it has transformed our space into a serene Vrindavan garden. Truly hand-poured with love.&rdquo;
              </p>
              <div className="pt-2 border-t border-brand-peach/10">
                <span className="text-xs font-bold block text-brand-charcoal">Ananya P.</span>
                <span className="text-[10px] text-brand-charcoal/50">Verified Sanctuary Patron</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Shelf */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-peach/20 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Harmonious Pairings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                You May Also Cherish
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-brand-charcoal hover:text-brand-gold flex items-center gap-1"
            >
              <span>Explore All Candles</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
