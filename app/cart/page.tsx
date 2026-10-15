"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Check, 
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  openCheckoutModal, 
  openLoginModal 
} from "../store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, isLoggedIn } = useSelector((state: RootState) => state.cart);

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shippingThreshold = 50;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingAmount = isFreeShipping || subtotal === 0 ? 0 : 8.0;
  const total = subtotal - discountAmount + shippingAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "WELCOME10") {
      setAppliedDiscount(10);
      setPromoSuccess("10% Welcome Blessing Discount applied!");
      setPromoError("");
    } else if (code === "ILLUMINATE") {
      setAppliedDiscount(15);
      setPromoSuccess("15% Illumination Discount applied!");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Use WELCOME10 or ILLUMINATE");
      setPromoSuccess("");
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal("Please log in to finalize your complimentary sanctuary delivery details."));
      return;
    }
    dispatch(openCheckoutModal());
  };

  return (
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal min-h-screen">
      
      {/* Banner (Light Luxury Background) */}
      <section className="bg-[#faf8f5] text-brand-charcoal py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-brand-peach/25 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(232,197,175,0.40),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-2xl relative z-10 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold-dark block">
            Your Personal Sanctuary Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-brand-charcoal">
            Review Your Shopping Bag
          </h1>
          <div className="flex items-center justify-center gap-2 text-[11px] text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Cart</span>
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {cartItems.length === 0 ? (
          
          /* Empty Basket State */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-brand-peach/30 shadow-md space-y-5 animate-fadeIn">
            <div className="p-4 bg-brand-peach/15 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-brand-charcoal">
              <ShoppingBag size={28} className="stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Your Sanctuary Bag is Empty</h2>
            <p className="text-xs text-brand-charcoal/65 leading-relaxed font-light">
              No handcrafted candles have been selected yet. Explore our artisanal fragrance profiles and small-batch editions.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-all shadow-md"
            >
              <span>Explore Boutique Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        ) : (

          /* Cart Items & Summary Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 8 Cols: Cart Line Items */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Shipping Progress Meter */}
              <div className="bg-white p-5 rounded-2xl border border-brand-peach/25 shadow-xs space-y-2">
                <div className="flex justify-between text-xs font-semibold text-brand-charcoal">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-brand-gold" />
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-bold">You unlocked Complimentary Luxury Delivery!</span>
                    ) : (
                      <span>Add ${(shippingThreshold - subtotal).toFixed(2)} more for Free Insured Delivery</span>
                    )}
                  </span>
                  <span>${shippingThreshold}.00 Threshold</span>
                </div>
                <div className="w-full bg-brand-cream h-2 rounded-full overflow-hidden border border-brand-peach/20">
                  <div
                    className="bg-brand-gold h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-brand-peach/25 shadow-sm divide-y divide-brand-peach/15 overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                    
                    {/* Thumbnail */}
                    <Link 
                      href={`/shop/${item.id}`}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-brand-cream shrink-0 border border-brand-peach/20 group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <Link 
                        href={`/shop/${item.id}`}
                        className="font-serif text-lg font-bold text-brand-charcoal hover:text-brand-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-brand-charcoal/50">Size: {item.size}</p>
                      {item.fragranceNotes && (
                        <p className="text-[11px] text-brand-charcoal/60 italic">
                          Notes: {item.fragranceNotes.slice(0, 2).join(" • ")}
                        </p>
                      )}
                      <span className="text-sm font-bold text-brand-charcoal block sm:hidden pt-1">
                        ${item.price}.00 each
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-brand-peach/30 rounded-full px-3 py-1 bg-brand-cream/40">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="px-2 font-bold text-sm text-brand-charcoal/60 hover:text-brand-charcoal cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-brand-charcoal select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="px-2 font-bold text-sm text-brand-charcoal/60 hover:text-brand-charcoal cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="text-right space-y-1 min-w-[90px]">
                      <span className="font-bold text-base text-brand-charcoal block">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Trash2 size={12} />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Clear Cart / Continue Shopping Row */}
              <div className="flex items-center justify-between text-xs pt-2">
                <Link
                  href="/shop"
                  className="text-brand-charcoal/70 hover:text-brand-gold font-semibold flex items-center gap-1.5"
                >
                  <span>← Continue Exploring Candles</span>
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-red-500/80 hover:text-red-700 font-semibold cursor-pointer"
                >
                  Empty Cart
                </button>
              </div>

            </div>

            {/* Right 4 Cols: Order Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-brand-peach/30 p-6 sm:p-8 shadow-md space-y-6">
                <h3 className="font-serif text-xl font-bold border-b border-brand-peach/15 pb-3">
                  Order Summary
                </h3>

                {/* Subtotal, Discount, Shipping */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-brand-charcoal/80">
                    <span>Bag Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-bold text-brand-charcoal">${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Voucher Discount ({appliedDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-charcoal/80">
                    <span>Luxury Insured Delivery</span>
                    <span>
                      {isFreeShipping ? (
                        <span className="text-emerald-700 font-bold">Complimentary</span>
                      ) : (
                        `$${shippingAmount.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-brand-peach/15 pt-3 flex justify-between text-base font-bold text-brand-charcoal">
                    <span>Estimated Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2 border-t border-brand-peach/15 pt-4">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60 block">
                    Sanctuary Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-brand-cream/50 text-xs px-3.5 py-2.5 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold uppercase text-brand-charcoal"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-charcoal transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check size={12} />
                      <span>{promoSuccess}</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}
                </form>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ShieldCheck size={16} />
                  <span>Secure Sanctuary Checkout</span>
                </button>

                {/* Guarantees */}
                <div className="space-y-2 text-[11px] text-brand-charcoal/60 pt-2 border-t border-brand-peach/10">
                  <p className="flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-600" />
                    <span>Complimentary gift wrapping & devotional matches</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-600" />
                    <span>30-Day Serenity Return Guarantee</span>
                  </p>
                </div>

              </div>

            </div>

          </div>

        )}

      </section>

    </div>
  );
}
