"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Sparkles, 
  ChevronDown, 
  Gift, 
  Building2, 
  HeartHandshake 
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "wedding",
    quantity: "50-100",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "wedding",
        quantity: "50-100",
        message: "",
      });
    }, 5000);
  };

  const faqs = [
    {
      q: "How long does delivery take for standard candle orders?",
      a: "Orders are prepared and securely dispatched within 24 to 48 hours. Domestic delivery takes 2–4 business days with complimentary tracked insured shipping on all orders over $50."
    },
    {
      q: "Can we order custom scented candles for weddings and ceremonial celebrations?",
      a: "Yes. Our bespoke atelier crafts customized favors including personalized gold-foil calligraphy stamping, custom wax seals, and bespoke fragrance blending for orders of 25 units or more."
    },
    {
      q: "Why is 100% natural soy wax superior to paraffin wax?",
      a: "Commercial candles commonly use petroleum paraffin, which releases toxic petrochemical benzene and toluene soot. Our 100% pure food-grade soy wax burns clean, non-toxic, and up to 50% slower, producing a smooth melt pool and pure fragrance throw."
    },
    {
      q: "How do I care for the crackling wooden wicks?",
      a: "Before every lighting, simply snap off the charred black wood tip with your fingertips (leaving approx. 1/8 inch of fresh wood). This allows the flame to easily catch and maintain a soothing crackle."
    },
    {
      q: "What is your return & satisfaction policy?",
      a: "We want your sanctuary to be perfectly illuminated. If for any reason an unburned candle does not resonate with your aesthetic or scent preference, we offer complimentary exchanges and refunds within 30 days."
    }
  ];

  return (
    <div className="flex-1 bg-brand-cream/15 text-brand-charcoal min-h-screen">
      
      {/* Banner (Light Luxury Background) */}
      <section className="bg-[#faf8f5] text-brand-charcoal py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-peach/25 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(232,197,175,0.40),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(197,168,128,0.25),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-[10px] uppercase font-bold tracking-[0.25em] shadow-xs">
            <Sparkles size={12} className="text-brand-gold" />
            <span>Concierge & Bespoke Inquiries</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-brand-charcoal">
            Connect With Our Atelier
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-brand-charcoal/75 font-light leading-relaxed">
            From custom wedding gifting to boutique wholesale collaborations and personal scent recommendations, our dedicated concierge is at your service.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Contact & Gifting</span>
          </div>
        </div>
      </section>

      {/* Main Form & Atelier Details */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact & Bespoke Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-peach/30 p-6 sm:p-10 shadow-xl space-y-6">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Personal Assistance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Send an Inquiry to Our Curators
              </h2>
              <p className="text-xs text-brand-charcoal/60">
                Please share your details below. Our boutique concierge will respond within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-scaleIn">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-emerald-900">Inquiry Received with Warmth</h3>
                <p className="text-xs text-emerald-800/80 max-w-md mx-auto">
                  Thank you for connecting with Radharaman Luxury Candles. Our atelier team has received your message and will reach out with customized curation proposals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-charcoal">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-charcoal">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@sanctuary.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-charcoal">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-charcoal">Inquiry Category *</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal cursor-pointer"
                    >
                      <option value="wedding">Wedding & Ceremony Favors</option>
                      <option value="corporate">Corporate Luxury Gifting</option>
                      <option value="wholesale">Boutique Wholesale Inquiry</option>
                      <option value="custom">Custom Scent Formulation</option>
                      <option value="general">Order Status & General Inquiry</option>
                    </select>
                  </div>
                </div>

                {formData.inquiryType !== "general" && (
                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-charcoal">Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal cursor-pointer"
                    >
                      <option value="25-50">25 – 50 Units (Intimate Gathering)</option>
                      <option value="50-100">50 – 100 Units (Mid-size Celebration)</option>
                      <option value="100-300">100 – 300 Units (Grand Wedding)</option>
                      <option value="300+">300+ Units (Enterprise / Bulk Wholesale)</option>
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-charcoal">How can we assist you? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your event date, scent desires, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-cream/40 p-3 rounded-xl border border-brand-peach/30 focus:outline-none focus:border-brand-gold text-brand-charcoal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send size={14} />
                  <span>Transmit Inquiry to Concierge</span>
                </button>

              </form>
            )}

          </div>

          {/* Right: Atelier Details & Bespoke Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Info Box */}
            <div className="bg-white rounded-3xl border border-brand-peach/30 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold border-b border-brand-peach/15 pb-3">
                Atelier Sanctuary
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-charcoal">Boutique Pouring Lab</strong>
                    <span className="text-brand-charcoal/70">Sacred Grove District, Vrindavan, UP 281121</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-charcoal">Concierge Email</strong>
                    <span className="text-brand-charcoal/70">concierge@radharaman-candles.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-charcoal">Atelier Hours</strong>
                    <span className="text-brand-charcoal/70">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bespoke Perks */}
            <div className="bg-gradient-to-br from-brand-charcoal to-[#0a1f33] text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-brand-gold/25 shadow-xl">
              <span className="text-[10px] font-bold tracking-[0.25em] text-brand-peach uppercase">
                Bespoke Benefits
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-cream">
                Custom Ceremonial Gifting
              </h3>

              <div className="space-y-3 text-xs text-white/80 font-light">
                <div className="flex items-center gap-2">
                  <Gift size={14} className="text-brand-gold" />
                  <span>Personalized gold-embossed couple or brand monograms.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-gold" />
                  <span>Custom scent formulations tailored to wedding themes.</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake size={14} className="text-brand-gold" />
                  <span>Complimentary sample discovery boxes for event planners.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="bg-white py-16 sm:py-20 border-t border-brand-peach/15">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
              Questions Answered
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              Everything you need to know about our hand-poured process, ordering, and delivery.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-brand-peach/25 bg-brand-cream/30 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-base font-bold text-brand-charcoal cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`text-brand-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-brand-charcoal/75 leading-relaxed font-light border-t border-brand-peach/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
