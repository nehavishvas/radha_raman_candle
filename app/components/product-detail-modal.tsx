"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Flame, ShieldAlert, Sparkles, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { Product } from "../data/products";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequireLogin: (message: string) => void;
}

export default function ProductDetailModal({ product, onClose, onRequireLogin }: ProductDetailModalProps) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      onRequireLogin("Please log in to add items to your personal sanctuary cart.");
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
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 animate-fadeIn">
      {/* Modal Wrapper */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel shadow-2xl animate-scaleIn flex flex-col md:flex-row text-brand-charcoal">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-brand-cream/80 hover:bg-brand-peach text-brand-charcoal transition-colors duration-200 border border-brand-peach/20"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Left: Product Image */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[450px] bg-brand-cream">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Title & Category */}
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase">
              {product.category.replace("-", " ")}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 mb-2">
              {product.name}
            </h2>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-4 border-b border-brand-peach/10 pb-4">
              <span className="text-xl font-bold">${product.price}.00</span>
              <div className="flex items-center gap-1.5 text-sm text-brand-charcoal/70">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-medium text-xs">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Olfactory Pyramid (Fragrance Notes) */}
            <div className="bg-brand-cream/60 rounded-xl p-4 border border-brand-peach/10 mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-1">
                <Sparkles size={12} />
                Olfactory Pyramid
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-brand-peach/5 pb-1">
                  <span className="font-semibold text-brand-charcoal/70">Top Notes</span>
                  <span className="text-brand-charcoal/90">{product.fragranceNotes.top}</span>
                </div>
                <div className="flex justify-between border-b border-brand-peach/5 pb-1">
                  <span className="font-semibold text-brand-charcoal/70">Heart Notes</span>
                  <span className="text-brand-charcoal/90">{product.fragranceNotes.middle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-brand-charcoal/70">Base Notes</span>
                  <span className="text-brand-charcoal/90">{product.fragranceNotes.base}</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6 text-brand-charcoal/80">
              <div className="flex items-center gap-2">
                <Flame size={14} className="text-brand-gold" />
                <span>Burn time: <strong>{product.burnTime}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-brand-gold" />
                <span>Size: <strong>{product.size}</strong></span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">Ingredients</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="text-[10px] bg-brand-peach/10 border border-brand-peach/10 px-2 py-0.5 rounded-full font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Add Actions */}
          <div className="flex items-center gap-4 border-t border-brand-peach/15 pt-4 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center border border-brand-peach/30 rounded-full px-3 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-brand-charcoal/60 hover:text-brand-charcoal font-bold text-sm"
              >
                -
              </button>
              <span className="px-4 text-sm font-semibold select-none">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-brand-charcoal/60 hover:text-brand-charcoal font-bold text-sm"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal"
              }`}
            >
              {isAdded ? (
                <>Added Successfully ✓</>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
