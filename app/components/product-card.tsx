"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Eye, ShoppingCart, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart, openLoginModal } from "../store/cartSlice";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onRequireLogin?: (message: string) => void;
}

export default function ProductCard({ product, onQuickView, onRequireLogin }: ProductCardProps) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.cart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      if (onRequireLogin) {
        onRequireLogin("Please log in to add items to your personal sanctuary cart.");
      } else {
        dispatch(openLoginModal("Please log in to add items to your personal sanctuary cart."));
      }
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

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-peach/25 bg-white/70 p-4 transition-all duration-300 hover:shadow-xl hover:border-brand-gold/50 hover:-translate-y-1">
      {/* Product Image Wrapper */}
      <Link 
        href={`/shop/${product.id}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-brand-cream/60 cursor-pointer block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-106"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 hover:bg-brand-peach text-brand-charcoal transition-all duration-200 shadow-md hover:scale-110 cursor-pointer"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye size={17} />
            </button>
          )}
          <span className="bg-brand-charcoal/85 backdrop-blur-xs text-brand-cream text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-md">
            View Details
          </span>
        </div>

        {/* Burn Time Badge */}
        <div className="absolute top-2.5 left-2.5 bg-brand-charcoal/80 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider border border-white/20">
          {product.burnTime}
        </div>

        {/* Best seller or new badge */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 bg-brand-gold text-brand-charcoal px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase shadow-xs">
            Best Seller
          </div>
        )}
        {!product.isBestSeller && product.isNew && (
          <div className="absolute top-2.5 right-2.5 bg-brand-blue text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase shadow-xs">
            Artisanal New
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 pt-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-brand-charcoal/60 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
            {product.category.replace("-", " ")}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-[10px] font-medium text-brand-charcoal/70">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Name */}
        <Link 
          href={`/shop/${product.id}`}
          className="font-serif text-lg font-bold text-brand-charcoal hover:text-brand-gold transition-colors duration-200 line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Fragrance Note Preview */}
        <p className="text-[11px] text-brand-charcoal/60 font-medium italic mt-0.5 mb-3 line-clamp-1">
          {product.fragranceNotes.top} • {product.fragranceNotes.middle}
        </p>

        {/* Wax & Wick Specs micro note */}
        <div className="text-[9px] text-brand-charcoal/50 mb-3 flex items-center gap-2">
          <span>{product.size}</span>
          <span>•</span>
          <span className="truncate">{product.waxType}</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-brand-peach/15">
          <div className="flex flex-col">
            <span className="text-base font-bold text-brand-charcoal">
              ${product.price}.00
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-xs ${
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
