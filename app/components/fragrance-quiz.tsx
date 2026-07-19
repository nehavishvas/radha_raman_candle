"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, RotateCcw, ShoppingBag, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Product, products } from "../data/products";

interface QuizQuestion {
  question: string;
  options: {
    text: string;
    value: string; // matches product ID
    description: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which atmosphere represents your ideal evening?",
    options: [
      {
        text: "Exotic Night Bloom",
        value: "vrindavan-jasmine",
        description: "Walking through fresh flower gardens under a glowing full moon."
      },
      {
        text: "Sacred Meditation",
        value: "mystic-oudh",
        description: "Cozy library, ancient scriptures, and warm incense smoke."
      },
      {
        text: "Alpine Retreat",
        value: "himalayan-cedar",
        description: "Crisp pine air, high mountain valleys, and clean wooden logs."
      },
      {
        text: "Royal Courtyard",
        value: "rose-cardamom",
        description: "Velvet roses, warm spices, and sharing sweet chai tea."
      }
    ]
  },
  {
    question: "What fragrance notes do you naturally seek out?",
    options: [
      {
        text: "Sweet Floral & Sandalwood",
        value: "vrindavan-jasmine",
        description: "Intoxicating jasmine, neroli, and creamy sandalwood base."
      },
      {
        text: "Smoky Vanilla & Resin",
        value: "mystic-oudh",
        description: "Dark agarwood (oudh), golden amber, and vanilla musk."
      },
      {
        text: "Fresh Pines & Herbs",
        value: "himalayan-cedar",
        description: "Pine needles, bracing juniper berries, and wild cedarwood."
      },
      {
        text: "Spicy Florals & Musk",
        value: "rose-cardamom",
        description: "Damask roses, warming green cardamom, and pink pepper."
      }
    ]
  },
  {
    question: "What energy would you like to invite into your home?",
    options: [
      {
        text: "Serenity & Peace",
        value: "vrindavan-jasmine",
        description: "Calm the mind, invite romance, and encourage relaxation."
      },
      {
        text: "Grounding & Reflection",
        value: "mystic-oudh",
        description: "Deep centering, meditation, and quiet comfort."
      },
      {
        text: "Clarity & Rejuvenation",
        value: "himalayan-cedar",
        description: "Refreshing vitality, crisp thoughts, and focus."
      },
      {
        text: "Indulgence & Cozy Warmth",
        value: "rose-cardamom",
        description: "Inviting conversation, warm hospitality, and creative spark."
      }
    ]
  }
];

interface FragranceQuizProps {
  onQuickView: (product: Product) => void;
}

export default function FragranceQuiz({ onQuickView }: FragranceQuizProps) {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultProduct, setResultProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectOption = (value: string) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result: Find the most frequent product ID in the answers
      const frequencyMap = updatedAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      let bestMatch = updatedAnswers[updatedAnswers.length - 1]; // fallback to last answer
      let maxCount = 0;

      Object.entries(frequencyMap).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestMatch = id;
        }
      });

      const matchedProduct = products.find(p => p.id === bestMatch) || products[0];
      setResultProduct(matchedProduct);
      setCurrentStep(quizQuestions.length); // go to result step
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultProduct(null);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    if (!resultProduct) return;
    dispatch(
      addToCart({
        id: resultProduct.id,
        name: resultProduct.name,
        price: resultProduct.price,
        image: resultProduct.image,
        size: resultProduct.size,
        fragranceNotes: [
          resultProduct.fragranceNotes.top,
          resultProduct.fragranceNotes.middle,
          resultProduct.fragranceNotes.base
        ]
      })
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div id="fragrance-quiz" className="scroll-mt-24 w-full glass-panel border border-brand-peach/20 rounded-2xl p-6 sm:p-10 shadow-lg text-brand-charcoal">
      
      {/* Step Progress */}
      {currentStep < quizQuestions.length && (
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            <span>Scent Finder Quiz</span>
            <span>Question {currentStep + 1} of {quizQuestions.length}</span>
          </div>
          <div className="w-full bg-brand-peach/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-gold h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Quiz Body */}
      {currentStep < quizQuestions.length ? (
        <div className="space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
            {quizQuestions[currentStep].question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizQuestions[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.value)}
                className="group text-left p-5 rounded-xl border border-brand-peach/20 bg-brand-cream/30 hover:border-brand-gold hover:bg-brand-peach/10 transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif font-bold text-base text-brand-charcoal group-hover:text-brand-gold transition-colors duration-200">
                    {option.text}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-brand-gold" />
                </div>
                <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        resultProduct && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
            {/* Image */}
            <div className="relative w-full md:w-2/5 aspect-square rounded-xl overflow-hidden border border-brand-peach/20 bg-brand-cream">
              <Image
                src={resultProduct.image}
                alt={resultProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-brand-charcoal text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles size={10} className="text-brand-gold" />
                Your Ideal Match
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between py-2 text-center md:text-left">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase">
                  Scent Profile: {resultProduct.fragranceNotes.top.split(",")[0]}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 mb-3">
                  {resultProduct.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed mb-4">
                  Based on your preferences, we recommend <strong>{resultProduct.name}</strong>. {resultProduct.description}
                </p>

                {/* Scent notes block */}
                <div className="inline-flex flex-col items-center md:items-start text-xs border-l-2 border-brand-gold/60 pl-4 py-1 mb-6 text-brand-charcoal/85">
                  <span className="font-semibold text-brand-gold uppercase tracking-wider text-[10px] mb-1">Olfactory Profile</span>
                  <span>Top: {resultProduct.fragranceNotes.top}</span>
                  <span>Heart: {resultProduct.fragranceNotes.middle}</span>
                  <span>Base: {resultProduct.fragranceNotes.base}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 border-t border-brand-peach/10 pt-5">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal"
                  }`}
                >
                  {isAdded ? (
                    <>Added to Cart ✓</>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>Add Match to Cart — ${resultProduct.price}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onQuickView(resultProduct)}
                  className="px-5 py-3 border border-brand-peach/30 rounded-full hover:border-brand-gold/50 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide transition-all duration-200"
                >
                  <Eye size={14} />
                  <span>Quick View</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-3 text-brand-charcoal/60 hover:text-brand-charcoal flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                >
                  <RotateCcw size={13} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
