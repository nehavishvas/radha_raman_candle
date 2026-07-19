import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store/provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radharaman Luxury Candles | Illuminate Every Moment",
  description: "Exquisite hand-poured soy candles infused with rare essential oils. Explore Vrindavan Jasmine, Mystic Oudh, Himalayan Cedar, and more in our premium collection.",
  keywords: "luxury candles, soy wax candles, jasmine candle, oudh candle, cedarwood candle, aromatherapy, handmade gifts",
  authors: [{ name: "Radharaman" }],
  openGraph: {
    title: "Radharaman Luxury Candles | Illuminate Every Moment",
    description: "Exquisite hand-poured soy candles infused with rare essential oils.",
    url: "https://radharaman-candles.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream/20 text-brand-charcoal">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
