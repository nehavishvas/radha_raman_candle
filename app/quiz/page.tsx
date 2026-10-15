"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw, ShoppingBag, Eye, Check, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart, openLoginModal } from "../store/cartSlice";
import { Product, products } from "../data/products";
import ProductDetailModal from "../components/product-detail-modal";

interface QuizQuestion {
  question: string;
  subtitle: string;
  options: {
    text: string;
    value: string;
    description: string;
    icon: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which atmosphere represents your ideal evening?",
    subtitle: "Select the sanctuary aura that feels most restorative to your soul.",
    options: [
      {
        text: "Exotic Night Bloom",
        value: "vrindavan-jasmine",
        description: "Walking through moonlit jasmine gardens in ancient Braj with soft warm breezes.",
        icon: "🌸"
      },
      {
        text: "Sacred Deep Meditation",
        value: "mystic-oudh",
        description: "Cozy library, ancient temple resins, glowing candlelight, and warm agarwood smoke.",
        icon: "🕯️"
      },
      {
        text: "Alpine Mountain Retreat",
        value: "himalayan-cedar",
        description: "Crisp pine air, morning dew on cedarwood bark, and invigorating forest tranquility.",
        icon: "🌲"
      },
      {
        text: "Imperial Botanical Courtyard",
        value: "rose-cardamom",
        description: "Velvety damask rose petals accented by spicy green cardamom pods and warm white tea.",
        icon: "🌹"
      }
    ]
  },
  {
    question: "What scent notes do you instinctively gravitate toward?",
    subtitle: "Think about the aroma you love to wake up to or fall asleep with.",
    options: [
      {
        text: "Sweet Night Florals & Sandalwood",
        value: "vrindavan-jasmine",
        description: "Intoxicating jasmine grandiflorum, delicate neroli, and creamy Mysore sandalwood.",
        icon: "✨"
      },
      {
        text: "Dark Resins & Smoky Bourbon Vanilla",
        value: "mystic-oudh",
        description: "Aged Assam oudh, amber crystals, tonka bean, and contemplative incense notes.",
        icon: "🪵"
      },
      {
        text: "Bracing Conifers & Crisp Herbs",
        value: "himalayan-cedar",
        description: "Wild pine needle terpenes, crushed juniper berries, and wild honey undertones.",
        icon: "🍃"
      },
      {
        text: "Opulent Roses & Warm Chai Spices",
        value: "rose-cardamom",
        description: "Kannauj centifolia rose absolute, cracked green cardamom, and cashmere musk.",
        icon: "🌺"
      }
    ]
  },
  {
    question: "What energy would you like to cultivate in your home?",
    subtitle: "The intention set when striking your match.",
    options: [
      {
        text: "Serenity, Devotion & Soft Romance",
        value: "vrindavan-jasmine",
        description: "Soothe anxiety, welcome heartfelt conversations, and fill rooms with gentle radiance.",
        icon: "🕊️"
      },
      {
        text: "Deep Grounding & Inner Contemplation",
        value: "mystic-oudh",
        description: "Anchoring your nervous system after a long day of screen time and modern busyness.",
        icon: "🧘"
      },
      {
        text: "Clarity, Refreshment & Vital Breath",
        value: "himalayan-cedar",
        description: "Open the lungs, enhance focus during creative work, and cleanse stagnant room air.",
        icon: "🏔️"
      },
      {
        text: "Warmth, Hospitality & Imperial Elegance",
        value: "rose-cardamom",
        description: "Create an inviting, luxurious sanctuary for family gatherings and intimate celebrations.",
        icon: "👑"
      }
    ]
  },
  {
    question: "Where will this sacred flame primarily live?",
    subtitle: "The primary room placement for your candle.",
    options: [
      {
        text: "Bedside Sanctuary & Dressing Table",
        value: "vrindavan-jasmine",
        description: "A gentle throw that invites deep, restorative dreaming.",
        icon: "🛏️"
      },
      {
        text: "Meditation Altar & Study Desk",
        value: "mystic-oudh",
        description: "An evocative resin aroma with a soothing crackling wooden wick.",
        icon: "📿"
      },
      {
        text: "Living Lounge & Yoga Space",
        value: "himalayan-cedar",
        description: "Crisp and airy, ideal for stretching, deep breathing, and gathering.",
        icon: "🪴"
      },
      {
        text: "Entryway & Dining Setting",
        value: "rose-cardamom",
        description: "A welcoming, royal introduction to your home that delights arriving guests.",
        icon: "🚪"
      }
    ]
  }
];

export default function QuizPage() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.cart);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultProduct, setResultProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  const handleSelectOption = (value: string) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      const counts: Record<string, number> = {};
      updated.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });

      let topCandleId = updated[0];
      let maxCount = 0;
      Object.keys(counts).forEach((k) => {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          topCandleId = k;
        }
      });

      const matched = products.find((p) => p.id === topCandleId) || products[0];
      setResultProduct(matched);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultProduct(null);
    setIsAdded(false);
  };

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      dispatch(openLoginModal("Please log in to add your signature scent to your sanctuary bag."));
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
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal min-h-screen">
      
      {/* Banner (Light Luxury Background) */}
      <section className="bg-[#faf8f5] text-brand-charcoal py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-peach/25 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(232,197,175,0.40),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-[10px] uppercase font-bold tracking-[0.25em] shadow-xs">
            <Sparkles size={12} className="text-brand-gold" />
            <span>Interactive Sensory Matchmaker</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-brand-charcoal">
            Find Your Signature Candle
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-brand-charcoal/75 font-light leading-relaxed">
            Answer 4 simple sensory questions to uncover the exact botanical formulation, wax curing, and fragrance notes aligned with your spirit and living space.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Scent Quiz</span>
          </div>
        </div>
      </section>

      {/* Main Quiz Container */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {!resultProduct ? (
          
          /* IN PROGRESS QUESTION STEPPER */
          <div className="bg-white rounded-3xl border border-brand-peach/30 p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn">
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-brand-charcoal/60 font-semibold">
                <span>Question {currentStep + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}% Matched</span>
              </div>
              <div className="w-full bg-brand-cream h-2 rounded-full overflow-hidden border border-brand-peach/20">
                <div
                  className="bg-brand-gold h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                {quizQuestions[currentStep].question}
              </h2>
              <p className="text-xs text-brand-charcoal/60">
                {quizQuestions[currentStep].subtitle}
              </p>
            </div>

            {/* Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizQuestions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.value)}
                  className="p-5 rounded-2xl border border-brand-peach/25 bg-brand-cream/30 hover:bg-brand-peach/10 hover:border-brand-gold transition-all duration-300 text-left space-y-2 group cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="h-6 w-6 rounded-full border border-brand-peach/40 flex items-center justify-center text-xs font-bold text-brand-charcoal/50 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-colors">
                      →
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-charcoal group-hover:text-brand-gold-dark transition-colors">
                    {option.text}
                  </h3>
                  <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-light">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

          </div>

        ) : (

          /* RESULT CARD */
          <div className="bg-white rounded-3xl border border-brand-gold/40 p-6 sm:p-10 shadow-2xl space-y-8 animate-scaleIn">
            
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-widest">
                <Check size={12} />
                <span>99% Olfactory Resonance Match</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
                Your Soul Candle is {resultProduct.name}
              </h2>
              <p className="text-xs text-brand-charcoal/60 max-w-md mx-auto">
                Based on your sensory selections, this handcrafted blend provides the exact aromatic balance and peace your sanctuary calls for.
              </p>
            </div>

            {/* Product Feature Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-cream/40 p-6 rounded-2xl border border-brand-peach/20">
              
              <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-peach/30 shadow-md bg-white">
                <img
                  src={resultProduct.image}
                  alt={resultProduct.name}
                  className="object-cover w-full h-full"
                />
                <span className="absolute top-3 left-3 bg-brand-charcoal/90 text-brand-peach px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase">
                  {resultProduct.burnTime}
                </span>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    {resultProduct.category.replace("-", " ")}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                    {resultProduct.name}
                  </h3>
                  <span className="text-lg font-bold text-brand-charcoal block mt-0.5">
                    ${resultProduct.price}.00
                  </span>
                </div>

                <p className="text-xs text-brand-charcoal/75 leading-relaxed font-light">
                  {resultProduct.description}
                </p>

                {/* Fragrance Notes Box */}
                <div className="bg-white p-3.5 rounded-xl border border-brand-peach/20 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-charcoal/60">Top Notes:</span>
                    <span className="text-brand-charcoal font-medium">{resultProduct.fragranceNotes.top}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-charcoal/60">Heart Notes:</span>
                    <span className="text-brand-charcoal font-medium">{resultProduct.fragranceNotes.middle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-charcoal/60">Base Notes:</span>
                    <span className="text-brand-charcoal font-medium">{resultProduct.fragranceNotes.base}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleAddToCart(resultProduct)}
                    className={`flex-1 py-3 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal"
                    }`}
                  >
                    {isAdded ? (
                      <>Added ✓</>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Add To Bag — ${resultProduct.price}.00</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/shop/${resultProduct.id}`}
                    className="py-3 px-6 rounded-full text-xs font-bold tracking-widest uppercase border border-brand-peach/40 hover:border-brand-charcoal text-brand-charcoal transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Full Story</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

              </div>

            </div>

            {/* Retake Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-charcoal/60 hover:text-brand-gold transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Retake Scent Matchmaker Quiz</span>
              </button>
            </div>

          </div>

        )}

      </section>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
        onRequireLogin={() => {}}
      />

    </div>
  );
}
