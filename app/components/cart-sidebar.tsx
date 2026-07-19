"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateQuantity, removeFromCart, setCartOpen } from "../store/cartSlice";

interface CartSidebarProps {
  onCheckout: () => void;
  onRequireLogin: (message: string) => void;
}

export default function CartSidebar({ onCheckout, onRequireLogin }: CartSidebarProps) {
  const dispatch = useDispatch();
  const { items: cartItems, isCartOpen, isLoggedIn } = useSelector((state: RootState) => state.cart);
  
  // Mock Promo Code States
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // as percentage (e.g. 10 for 10%)
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = promoCode.trim().toUpperCase();
    if (normalizedCode === "WELCOME10") {
      setAppliedDiscount(10);
      setPromoSuccess("10% discount applied successfully!");
      setPromoError("");
    } else if (normalizedCode === "ILLUMINATE") {
      setAppliedDiscount(15);
      setPromoSuccess("15% discount applied successfully!");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try WELCOME10 or ILLUMINATE");
      setPromoSuccess("");
    }
  };

  const handleCheckoutClick = () => {
    dispatch(setCartOpen(false));
    if (!isLoggedIn) {
      onRequireLogin("Please log in to secure your complimentary luxury delivery details.");
      return;
    }
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-xs transition-opacity duration-500"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md glass-panel shadow-2xl flex flex-col h-full text-brand-charcoal animate-slideIn">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-peach/20">
            <h2 className="text-lg font-serif font-bold flex items-center gap-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              Shopping Bag
            </h2>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 rounded-full hover:bg-brand-peach/10 text-brand-charcoal transition-colors duration-200"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="p-4 rounded-full bg-brand-peach/10 text-brand-gold">
                  <ShoppingBag size={48} className="stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-lg font-bold">Your bag is empty</h3>
                <p className="text-xs text-brand-charcoal/60 max-w-xs">
                  Fill it with our premium handcrafted candles to illuminate your space.
                </p>
                <button
                  onClick={() => dispatch(setCartOpen(false))}
                  className="mt-2 px-6 py-2 bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal rounded-full text-xs font-semibold tracking-wider transition-colors duration-200"
                >
                  Shop Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 bg-brand-cream/60 border border-brand-peach/10 rounded-xl gap-4 hover:border-brand-gold/25 transition-all duration-200"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-brand-cream border border-brand-peach/15">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-brand-charcoal truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-brand-charcoal/40 hover:text-red-600 transition-colors duration-200 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    {/* Size and Scent */}
                    <p className="text-[10px] text-brand-charcoal/50 font-medium">
                      Size: {item.size}
                    </p>
                    {item.fragranceNotes && item.fragranceNotes.length > 0 && (
                      <p className="text-[10px] text-brand-gold font-medium truncate mt-0.5">
                        Notes: {item.fragranceNotes[0]}
                      </p>
                    )}

                    {/* Quantity Adjuster & Price */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-brand-peach/30 rounded-full px-2 py-0.5 scale-90 origin-left">
                        <button
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                          }
                          className="px-1.5 text-brand-charcoal/60 hover:text-brand-charcoal font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold select-none">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                          }
                          className="px-1.5 text-brand-charcoal/60 hover:text-brand-charcoal font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-brand-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations */}
          {cartItems.length > 0 && (
            <div className="border-t border-brand-peach/20 bg-brand-cream/80 px-4 py-6 sm:px-6 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Code (WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white text-xs px-3 py-2 pl-8 rounded-full border border-brand-peach/35 focus:outline-none focus:border-brand-gold uppercase text-brand-charcoal"
                  />
                  <Tag className="absolute left-2.5 top-2.5 text-brand-charcoal/40" size={12} />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal rounded-full text-xs font-semibold tracking-wider transition-colors duration-200"
                >
                  Apply
                </button>
              </form>
              
              {/* Promo Messages */}
              {promoError && <p className="text-[10px] text-red-600 font-semibold px-2">{promoError}</p>}
              {promoSuccess && <p className="text-[10px] text-emerald-600 font-semibold px-2">{promoSuccess}</p>}

              {/* Subtotal, Discount & Total */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Shipping</span>
                  <span className="italic">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-brand-peach/10 pt-2 text-brand-charcoal mt-2">
                  <span>Total Est.</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
              
              <p className="text-[9px] text-center text-brand-charcoal/50">
                Tax calculated at checkout. Complimentary luxury gift boxing included.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
