"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CreditCard, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearCart } from "../store/cartSlice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // States
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + tax;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingInfo.name) newErrors.name = "Required";
    if (!shippingInfo.email || !/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = "Invalid email";
    if (!shippingInfo.address) newErrors.address = "Required";
    if (!shippingInfo.city) newErrors.city = "Required";
    if (!shippingInfo.zip) newErrors.zip = "Required";
    if (!cardInfo.number || cardInfo.number.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Invalid card number";
    if (!cardInfo.expiry) newErrors.expiry = "Required";
    if (!cardInfo.cvv) newErrors.cvv = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    // Simulate transaction
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleComplete = () => {
    dispatch(clearCart());
    setIsSuccess(false);
    setShippingInfo({ name: "", email: "", address: "", city: "", zip: "" });
    setCardInfo({ number: "", expiry: "", cvv: "" });
    onClose();
  };

  // Format credit card input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardInfo({ ...cardInfo, number: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    const formatted = value.length >= 2 ? `${value.substring(0, 2)}/${value.substring(2, 4)}` : value;
    setCardInfo({ ...cardInfo, expiry: formatted });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-sm p-4 animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel shadow-2xl p-6 sm:p-8 text-brand-charcoal animate-scaleIn">
        
        {/* Close Button */}
        {!isProcessing && !isSuccess && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-brand-peach/10 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        {isSuccess ? (
          /* Transaction Success State */
          <div className="text-center py-10 space-y-6 animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle size={36} className="stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">Payment Confirmed</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">Your Space Will Soon Glow</h2>
              <p className="text-xs text-brand-charcoal/65 max-w-sm mx-auto">
                Thank you for your order. We are packaging your hand-poured Radharaman candles in our signature champagne gold gift boxes.
              </p>
            </div>

            <div className="max-w-xs mx-auto bg-brand-cream/60 rounded-xl p-4 border border-brand-peach/10 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold text-brand-charcoal/70">Order ID:</span>
                <span className="font-mono text-brand-charcoal font-bold">RR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-brand-charcoal/70">Estimated Delivery:</span>
                <span className="text-brand-charcoal">3-5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-brand-charcoal/70">Shipping Type:</span>
                <span className="text-brand-charcoal">Luxury Complimentary</span>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : isProcessing ? (
          /* Processing/Loading State */
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 size={48} className="animate-spin text-brand-gold stroke-[1.2]" />
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">Authorizing Transaction</h3>
            <p className="text-xs text-brand-charcoal/50">Securing your custom fragrance experience...</p>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePay} className="space-y-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-1">Luxury Checkout</h2>
              <p className="text-xs text-brand-charcoal/60">Fill in details to place your secure complimentary shipping order.</p>
            </div>

            {/* Split Shipping Details and Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Shipping Info */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-brand-peach/10 pb-1.5">
                  Shipping Destination
                </h3>
                
                {/* Name */}
                <div className="text-left">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                  />
                </div>

                {/* Email */}
                <div className="text-left">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                  />
                </div>

                {/* Address */}
                <div className="text-left">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.address ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                  />
                </div>

                {/* City & Zip */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.city ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.zip ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Details */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-brand-peach/10 pb-1.5">
                  Secure Checkout
                </h3>

                {/* Card Number */}
                <div className="text-left">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1 flex items-center gap-1">
                    <CreditCard size={10} /> Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardInfo.number}
                    onChange={handleCardNumberChange}
                    className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.cardNumber ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={handleExpiryChange}
                      className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.expiry ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1">CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, "") })}
                      className={`w-full bg-white/60 text-xs px-3 py-2 rounded-md border ${errors.cvv ? 'border-red-500' : 'border-brand-peach/20'} focus:outline-none focus:border-brand-gold`}
                    />
                  </div>
                </div>

                {/* Order Summary calculations */}
                <div className="bg-brand-cream/60 border border-brand-peach/10 rounded-xl p-4 text-xs space-y-1.5 mt-4">
                  <div className="flex justify-between text-brand-charcoal/70">
                    <span>Order Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-charcoal/70">
                    <span>Sales Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-charcoal border-t border-brand-peach/10 pt-1.5 mt-1">
                    <span>Total Due:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-peach/15 pt-5 mt-6">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-charcoal/60">
                <ShieldCheck size={14} className="text-brand-gold" />
                <span>SSL Encrypted transaction. Secure details.</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-brand-peach/30 rounded-full text-xs font-semibold hover:bg-brand-peach/10 transition-colors duration-200 w-1/2 sm:w-auto text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex-1 sm:flex-initial"
                >
                  Authorize — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
