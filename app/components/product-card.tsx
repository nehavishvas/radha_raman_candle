"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onRequireLogin: (message: string) => void;
}

export default function ProductCard({ product, onQuickView, onRequireLogin }: ProductCardProps) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.cart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
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
      })
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-peach/20 bg-brand-cream/40 p-4 transition-all duration-300 hover:shadow-md hover:border-brand-gold/40 hover:-translate-y-1">
      {/* Product Image Wrapper */}
      <div 
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-brand-cream cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-brand-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-cream hover:bg-brand-peach text-brand-charcoal transition-all duration-200 shadow-sm"
            aria-label="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Burn Time Badge */}
        <div className="absolute top-2 left-2 bg-brand-cream/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide border border-brand-peach/30 text-brand-charcoal">
          {product.burnTime} Burn
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 pt-4">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-brand-charcoal/60 mb-2">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium">{product.rating} ({product.reviewsCount})</span>
        </div>

        {/* Name */}
        <h3 
          className="font-serif text-lg font-bold text-brand-charcoal hover:text-brand-gold cursor-pointer transition-colors duration-200"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Fragrance Note Preview */}
        <p className="text-[11px] text-brand-charcoal/50 font-medium italic mt-1 mb-3 line-clamp-1">
          Notes: {product.fragranceNotes.top} • {product.fragranceNotes.middle}
        </p>

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-brand-peach/10">
          <span className="text-base font-bold text-brand-charcoal">
            ${product.price}.00
          </span>
          
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              isAdded
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal"
            }`}
          >
            {isAdded ? (
              <>Added ✓</>
            ) : (
              <>
                <ShoppingCart size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
