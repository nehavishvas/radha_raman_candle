import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Leaf, Flame, Shield, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Heritage & Craft | Radharaman Luxury Candles",
  description: "Learn the story of Radharaman Luxury Candles: hand-poured in small batches using 100% soy wax, steam-distilled botanicals, and guided by ancient Vrindavan traditions.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal">
      
      {/* Hero Header (Light Luxury Background) */}
      <section className="relative bg-[#faf8f5] text-brand-charcoal py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-brand-peach/25 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(232,197,175,0.40),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-[10px] uppercase font-bold tracking-[0.25em] shadow-xs">
            <Sparkles size={12} className="text-brand-gold" />
            <span>The Sacred Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wide text-brand-charcoal">
            Crafted by Hand, Guided by Devotion
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-base text-brand-charcoal/75 font-light leading-relaxed">
            Every Radharaman candle is an ode to timeless beauty, spiritual illumination, and quiet comfort. Discover the heritage behind our sacred aromas.
          </p>

          {/* Official Brand Insignia Seal */}
          <div className="pt-4 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/40 bg-white p-2 group hover:scale-102 transition-transform duration-500">
              <img
                src="/logo.jpg"
                alt="Radharaman Luxury Candles Official Insignia"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold-dark mt-3 block">
              Official Insignia of Illumination
            </span>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Devotional Inspiration */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden border border-brand-peach/30 shadow-2xl bg-white">
            <img
              src="/jasmine_candle.png"
              alt="Hand-poured Vrindavan Jasmine"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-brand-charcoal/85 backdrop-blur-md p-4 rounded-2xl border border-brand-gold/30 text-white">
              <span className="text-[10px] font-bold tracking-widest text-brand-peach uppercase block">Sanctuary Atelier</span>
              <p className="text-xs text-white/80 font-light mt-1">Small batches poured at precise curing temperatures in boutique vessels.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Chapter I</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal leading-tight">
              The Sacred Light of Vrindavan
            </h2>
            <div className="h-0.5 w-16 bg-brand-gold" />

            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
              The name <strong>Radharaman</strong> carries deep spiritual resonance — honoring eternal grace, divine radiance, and inner peace. We began our journey with a profound realization: modern living often strips our homes of quiet reverence and grounding aroma.
            </p>

            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
              Inspired by the sacred groves of Braj, where night-blooming jasmines unfurl under silver moonlight and ancient sandalwood paste cools marble sanctums, we sought to translate timeless botanicals into the cleanest artisanal candles in the world.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="font-serif text-3xl font-bold text-brand-charcoal block">100%</span>
                <span className="text-[11px] text-brand-charcoal/60 uppercase tracking-wider font-semibold">Soy Wax Base</span>
              </div>
              <div className="h-8 w-px bg-brand-peach/30" />
              <div>
                <span className="font-serif text-3xl font-bold text-brand-charcoal block">60+</span>
                <span className="text-[11px] text-brand-charcoal/60 uppercase tracking-wider font-semibold">Hours Burn Time</span>
              </div>
              <div className="h-8 w-px bg-brand-peach/30" />
              <div>
                <span className="font-serif text-3xl font-bold text-brand-charcoal block">Zero</span>
                <span className="text-[11px] text-brand-charcoal/60 uppercase tracking-wider font-semibold">Toxins & Paraffin</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Chapter 2: The Art of Small Batch Pouring */}
      <section className="bg-white py-16 sm:py-24 border-t border-b border-brand-peach/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 lg:order-1">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Chapter II</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal leading-tight">
                Pure Soy, Slow Cured, No Shortcuts
              </h2>
              <div className="h-0.5 w-16 bg-brand-gold" />

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                Unlike commercial mass-market candles made with petroleum paraffin, every single Radharaman candle is poured with pure, food-grade soybean waxes blended with cold-pressed botanical essences.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-peach/15 rounded-lg text-brand-gold mt-0.5">
                    <Leaf size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal">Clean, Soot-Free Flame</h4>
                    <p className="text-[11px] text-brand-charcoal/70">Burns up to 50% longer than paraffin wax without releasing carcinogenic airborne soot into your home.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-peach/15 rounded-lg text-brand-gold mt-0.5">
                    <Flame size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal">Artisanal Wicks</h4>
                    <p className="text-[11px] text-brand-charcoal/70">Fitted with natural crackling FSC-certified cedar wood wicks or organic lead-free braided cotton wicks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-peach/15 rounded-lg text-brand-gold mt-0.5">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal">Ethical Harvesters</h4>
                    <p className="text-[11px] text-brand-charcoal/70">We source our Jasmine from Tamil Nadu, Cedar from Himachal, and Oudh responsibly from sustainable plantations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden border border-brand-peach/30 shadow-2xl bg-white lg:order-2">
              <img
                src="/gift_set.png"
                alt="Imperial Gift Set Curation"
                className="object-cover w-full h-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Sacred Ritual Guidelines */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-12">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
            The Burning Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            How to Nurture Your Candle
          </h2>
          <p className="text-xs text-brand-charcoal/65">
            Follow three ancient tips to preserve the pure flame and maximize your candle&apos;s fragrance throw.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-white rounded-3xl border border-brand-peach/20 shadow-sm space-y-4">
            <span className="text-3xl font-serif font-bold text-brand-gold">01</span>
            <h3 className="font-serif text-lg font-bold">The Memory Melt Pool</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
              Soy wax possesses a remarkable memory. On your initial burn, let the candle burn for 3 to 4 continuous hours until the molten pool reaches the very edges of the glass jar. This ensures even burning down to the last drop.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-brand-peach/20 shadow-sm space-y-4">
            <span className="text-3xl font-serif font-bold text-brand-gold">02</span>
            <h3 className="font-serif text-lg font-bold">Trim the Sacred Wick</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
              Before relighting, always trim your cotton wick to 1/4 inch (or gently snap the charred tip of your wooden wick). A trimmed wick creates a calm, steady teardrop flame with zero black smoke.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-brand-peach/20 shadow-sm space-y-4">
            <span className="text-3xl font-serif font-bold text-brand-gold">03</span>
            <h3 className="font-serif text-lg font-bold">Extinguish with Reverence</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
              Rather than blowing on the flame, use a brass candle snuffer or gently dip the wick into the wax pool with a dipper. This seals the wick for your next light and prevents lingering smoke.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-all shadow-lg"
          >
            <span>Explore The Collection</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
