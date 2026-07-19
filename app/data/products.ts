export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "scented" | "aromatherapy" | "gift-sets" | "soy-wax" | "artisanal-shapes";
  rating: number;
  reviewsCount: number;
  description: string;
  size: string;
  burnTime: string;
  fragranceNotes: {
    top: string;
    middle: string;
    base: string;
  };
  ingredients: string[];
}

export const products: Product[] = [
  {
    id: "vrindavan-jasmine",
    name: "Vrindavan Jasmine",
    price: 36,
    image: "/jasmine_candle.png",
    category: "scented",
    rating: 4.9,
    reviewsCount: 142,
    description: "An enchanting olfactory journey to the sacred groves of Vrindavan. This candle is hand-poured with night-blooming jasmine blossoms, layered with hints of golden saffron and warm sandalwood to create an atmosphere of pure serenity.",
    size: "280g / 9.8 oz",
    burnTime: "60 Hours",
    fragranceNotes: {
      top: "Night Jasmine, Neroli",
      middle: "Saffron, Velvet Rose",
      base: "Sandalwood, Ambergris"
    },
    ingredients: ["100% Natural Soy Wax", "Jasmine Essential Oil", "Sandalwood Extract", "Organic Cotton Wick"]
  },
  {
    id: "mystic-oudh",
    name: "Mystic Oudh",
    price: 42,
    image: "/oudh_candle.png",
    category: "soy-wax",
    rating: 4.8,
    reviewsCount: 98,
    description: "A deep, warm, and meditative blend featuring precious agarwood (Oudh). Balanced masterfully with golden amber and rich, smoky vanilla, it provides an grounding, luxurious warmth perfect for reflective evenings.",
    size: "280g / 9.8 oz",
    burnTime: "60 Hours",
    fragranceNotes: {
      top: "Bergamot, Labdanum",
      middle: "Agarwood (Oudh), Patchouli",
      base: "Smoky Vanilla, Golden Amber"
    },
    ingredients: ["100% Natural Soy Wax", "Oudh Absolute", "Amber Resin Extract", "Organic Cotton Wick"]
  },
  {
    id: "himalayan-cedar",
    name: "Himalayan Cedar",
    price: 34,
    image: "/cedar_candle.png",
    category: "aromatherapy",
    rating: 4.7,
    reviewsCount: 76,
    description: "Evoke the crisp, clean air of the Himalayan high lands. A calming combination of wild Himalayan pine needles, robust cedarwood bark, and a subtle whisper of organic wild honey.",
    size: "280g / 9.8 oz",
    burnTime: "55 Hours",
    fragranceNotes: {
      top: "Himalayan Pine, Eucalyptus",
      middle: "Cedarwood, Juniper Berry",
      base: "Wild Honey, Vetiver"
    },
    ingredients: ["100% Natural Soy & Coconut Wax Blend", "Himalayan Cedar Essential Oil", "Pine Bark Resin", "Wooden Wick"]
  },
  {
    id: "rose-cardamom",
    name: "Rose & Cardamom",
    price: 38,
    image: "/rose_candle.png",
    category: "scented",
    rating: 4.9,
    reviewsCount: 114,
    description: "A majestic fusion inspired by classic imperial gardens. Delicate, hand-harvested damask rose petals are accented by the spicy, warming aroma of fresh cardamom and finished with clean white musk.",
    size: "280g / 9.8 oz",
    burnTime: "60 Hours",
    fragranceNotes: {
      top: "Green Cardamom, White Tea",
      middle: "Damask Rose, Pink Pepper",
      base: "White Musk, Warm Honey"
    },
    ingredients: ["100% Natural Soy Wax", "Rose Centifolia Absolute", "Cardamom Seed Oil", "Organic Cotton Wick"]
  },
  {
    id: "imperial-gift-set",
    name: "The Imperial Gift Set",
    price: 85,
    image: "/gift_set.png",
    category: "gift-sets",
    rating: 5.0,
    reviewsCount: 53,
    description: "The ultimate token of luxury. This beautifully curated gift set features travel-sized editions of Vrindavan Jasmine, Mystic Oudh, and Himalayan Cedar, nestled together in a velvet-lined champagne-gold gift box.",
    size: "3 x 100g / 3.5 oz",
    burnTime: "3 x 25 Hours",
    fragranceNotes: {
      top: "Jasmine, Pine, Bergamot",
      middle: "Saffron, Cedar, Oudh",
      base: "Sandalwood, Amber, Vanilla"
    },
    ingredients: ["Natural Soy Wax", "Curated Luxury Essential Oils", "Cotton Wicks", "Velvet-Lined Gold Foil Presentation Box"]
  },
  {
    id: "sacred-heart",
    name: "Sacred Heart Candle",
    price: 28,
    image: "/heart_candle.png",
    category: "artisanal-shapes",
    rating: 4.9,
    reviewsCount: 42,
    description: "A beautiful, hand-molded heart-shaped candle representing love and spiritual devotion. Emits a warm, comforting blend of pure Madagascar vanilla pods, soft rose petals, and a touch of wild honey.",
    size: "150g / 5.3 oz",
    burnTime: "35 Hours",
    fragranceNotes: {
      top: "Sugared Rose, Almond",
      middle: "Vanilla Bean, Heliotrope",
      base: "Warm Honey, Amber Musk"
    },
    ingredients: ["Natural Soy & Beeswax Blend", "Vanilla Essential Oil", "Rose Petal Extract", "Cotton Wick"]
  },
  {
    id: "golden-lotus",
    name: "Golden Lotus Candle",
    price: 26,
    image: "/lotus_candle.png",
    category: "artisanal-shapes",
    rating: 4.8,
    reviewsCount: 31,
    description: "Inspired by the sacred lotus flower. Crafted as a stunning decorative blooming lotus, this candle is infused with therapeutic white tea leaves, refreshing ginger, and sacred tulsi (holy basil) oils.",
    size: "140g / 4.9 oz",
    burnTime: "30 Hours",
    fragranceNotes: {
      top: "Fresh Ginger, Lemon Peel",
      middle: "White Tea, Holy Basil (Tulsi)",
      base: "Warm Amber, Light Vetiver"
    },
    ingredients: ["Natural Soy & Beeswax Blend", "White Tea Scent Oil", "Tulsi Leaf Essential Oil", "Cotton Wick"]
  }
];
