export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  image: string;
  category: "scented" | "aromatherapy" | "gift-sets" | "soy-wax" | "artisanal-shapes";
  scentFamily: "floral" | "woody" | "fresh" | "amber" | "spicy";
  rating: number;
  reviewsCount: number;
  description: string;
  longDescription?: string;
  size: string;
  dimensions?: string;
  burnTime: string;
  burnHours: number;
  waxType: string;
  wickType: string;
  featured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  fragranceNotes: {
    top: string;
    middle: string;
    base: string;
  };
  ingredients: string[];
  careTips?: string[];
}

export const CATEGORIES = [
  { id: "all", name: "All Collections", description: "Explore our full catalog of hand-poured sanctuary candles." },
  { id: "scented", name: "Scented Candles", description: "Lush botanical bouquets and royal imperial blossoms for ambient living." },
  { id: "soy-wax", name: "Soy Wax Bases", description: "100% clean-burning, slow-cured vegetable waxes for meditative warmth." },
  { id: "aromatherapy", name: "Aromatherapy", description: "Pure therapeutic essential oils to restore clarity, calmness, and breath." },
  { id: "artisanal-shapes", name: "Artisanal Shapes", description: "Hand-sculpted devotional shapes cast in natural wax blends." },
  { id: "gift-sets", name: "Curated Gift Sets", description: "Presented in champagne gold foil and velvet-lined luxury gift boxes." },
] as const;

export const SCENT_FAMILIES = [
  { id: "all", name: "All Scents" },
  { id: "floral", name: "Floral & Jasmine" },
  { id: "woody", name: "Woody & Oudh" },
  { id: "fresh", name: "Fresh & Mountain Pine" },
  { id: "amber", name: "Warm Amber & Honey" },
  { id: "spicy", name: "Spicy & Herbal" },
] as const;

export const products: Product[] = [
  {
    id: "vrindavan-jasmine",
    name: "Vrindavan Jasmine",
    subtitle: "Sacred Night Blossom",
    price: 36,
    image: "/jasmine_candle.png",
    category: "scented",
    scentFamily: "floral",
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    isBestSeller: true,
    description: "An enchanting olfactory journey to the sacred groves of Vrindavan. Hand-poured with night-blooming jasmine blossoms, layered with hints of golden saffron and warm sandalwood to create an atmosphere of pure serenity.",
    longDescription: "Inspired by the celestial gardens of Braj, our Vrindavan Jasmine candle is an artisanal masterpiece. Hand-blended using steam-distilled night jasmine picked at dusk when its aroma is most intoxicating, this candle diffuses an ethereal sweetness balanced by grounding Australian sandalwood and rare Kashmiri saffron stamens. Perfect for evening prayer, quiet reading, or welcoming esteemed guests.",
    size: "280g / 9.8 oz",
    dimensions: "3.5\" D x 4.2\" H",
    burnTime: "60 Hours",
    burnHours: 60,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Organic Braided Cotton Wick",
    fragranceNotes: {
      top: "Night Jasmine, Neroli Blossom",
      middle: "Kashmiri Saffron, Velvet Damask Rose",
      base: "Creamy Sandalwood, Golden Ambergris"
    },
    ingredients: ["100% Natural Soy Wax", "Jasmine Grandiflorum Absolute", "Sandalwood Essential Oil", "Saffron Flower Infusion", "Lead-Free Cotton Wick"],
    careTips: [
      "Allow wax to melt to the edges of the jar on first lighting (approx. 3-4 hours) to prevent tunneling.",
      "Trim wick to 1/4 inch before every subsequent burn for a smoke-free flame.",
      "Store in a cool, dry place away from direct sunlight."
    ]
  },
  {
    id: "mystic-oudh",
    name: "Mystic Oudh",
    subtitle: "Smoky Golden Resins",
    price: 42,
    image: "/oudh_candle.png",
    category: "soy-wax",
    scentFamily: "woody",
    rating: 4.8,
    reviewsCount: 98,
    featured: true,
    isBestSeller: true,
    description: "A deep, warm, and meditative blend featuring precious agarwood (Oudh). Balanced masterfully with golden amber and rich, smoky vanilla, it provides an grounding, luxurious warmth perfect for reflective evenings.",
    longDescription: "Rich, profound, and deeply contemplative, Mystic Oudh captures the majesty of temple incense and sacred resin rituals. Wild-harvested Assam agarwood is aged with smoky bourbon vanilla and dark amber crystals, filling your quarters with a velvety warmth and soothing wooden wick crackle.",
    size: "280g / 9.8 oz",
    dimensions: "3.5\" D x 4.2\" H",
    burnTime: "60 Hours",
    burnHours: 60,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Crackling Natural Wooden Wick",
    fragranceNotes: {
      top: "Calabrian Bergamot, Dark Labdanum",
      middle: "Assam Agarwood (Oudh), Indonesian Patchouli",
      base: "Smoky Bourbon Vanilla, Crystalline Amber"
    },
    ingredients: ["100% Natural Soy Wax", "Assam Agarwood Extract", "Patchouli Leaf Oil", "Amber Resin Extract", "Sustainably Sourced Wooden Wick"],
    careTips: [
      "Keep the crackling wooden wick trimmed to 1/8 inch before each burn.",
      "Do not burn for longer than 4 hours continuously.",
      "Place on a heat-resistant marble or brass coaster."
    ]
  },
  {
    id: "himalayan-cedar",
    name: "Himalayan Cedar",
    subtitle: "High Mountain Tranquility",
    price: 34,
    image: "/cedar_candle.png",
    category: "aromatherapy",
    scentFamily: "fresh",
    rating: 4.7,
    reviewsCount: 76,
    featured: true,
    isNew: false,
    description: "Evoke the crisp, clean air of the Himalayan high lands. A calming combination of wild Himalayan pine needles, robust cedarwood bark, and a subtle whisper of organic wild honey.",
    longDescription: "Formulated for deep breathing and mental clarity, Himalayan Cedar draws you into towering subalpine forests after a morning rain. Pine needle terpenes invigorate the senses while robust Deodar cedarwood anchors the nervous system.",
    size: "280g / 9.8 oz",
    dimensions: "3.5\" D x 4.2\" H",
    burnTime: "55 Hours",
    burnHours: 55,
    waxType: "Soy & Virgin Coconut Wax Blend",
    wickType: "Crackling Natural Wooden Wick",
    fragranceNotes: {
      top: "Himalayan Pine, Crisp Eucalyptus",
      middle: "Deodar Cedarwood, Wild Juniper Berry",
      base: "Organic Wild Honey, Earthy Vetiver"
    },
    ingredients: ["Natural Soy & Coconut Wax Blend", "Himalayan Cedar Essential Oil", "Pine Bark Oleoresin", "Wild Honey Note", "Wooden Wick"],
    careTips: [
      "Optimal for morning yoga, breathwork sessions, and home study desks.",
      "Trim the wick by snapping off charred wood tips between fingers before lighting."
    ]
  },
  {
    id: "rose-cardamom",
    name: "Rose & Cardamom",
    subtitle: "Imperial Botanical Harmony",
    price: 38,
    image: "/rose_candle.png",
    category: "scented",
    scentFamily: "floral",
    rating: 4.9,
    reviewsCount: 114,
    featured: true,
    isBestSeller: false,
    description: "A majestic fusion inspired by classic imperial gardens. Delicate, hand-harvested damask rose petals are accented by the spicy, warming aroma of fresh cardamom and finished with clean white musk.",
    longDescription: "A romantic and opulent celebration of royal perfumery. Hand-harvested Damask rose petals from Kannauj are distilled with crushed green cardamom pods from the Western Ghats, yielding an aroma that is both soothingly floral and gently invigorating.",
    size: "280g / 9.8 oz",
    dimensions: "3.5\" D x 4.2\" H",
    burnTime: "60 Hours",
    burnHours: 60,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Organic Braided Cotton Wick",
    fragranceNotes: {
      top: "Green Cardamom Pods, White Silver Needle Tea",
      middle: "Kannauj Damask Rose, Pink Peppercorn",
      base: "Soft Cashmere Musk, Warm Blossom Honey"
    },
    ingredients: ["100% Natural Soy Wax", "Rose Centifolia Absolute", "Cardamom Seed Essential Oil", "White Tea Extract", "Cotton Wick"],
    careTips: [
      "Center the wick after extinguishing to ensure a clean, even burn across the jar.",
      "Never leave a burning candle unattended."
    ]
  },
  {
    id: "imperial-gift-set",
    name: "The Imperial Gift Set",
    subtitle: "Trio of Sacred Aromas",
    price: 85,
    image: "/gift_set.png",
    category: "gift-sets",
    scentFamily: "floral",
    rating: 5.0,
    reviewsCount: 53,
    featured: true,
    isBestSeller: true,
    description: "The ultimate token of luxury. This beautifully curated gift set features travel-sized editions of Vrindavan Jasmine, Mystic Oudh, and Himalayan Cedar, nestled together in a velvet-lined champagne-gold gift box.",
    longDescription: "Curated for weddings, housewarmings, spiritual ceremonies, and discerning connoisseurs. Contains three individually poured luxury candles, each highlighting a distinct olfactory sanctuary profile, complete with brass candle snuffer and signature gold-stamped matches.",
    size: "3 x 100g / 3.5 oz",
    dimensions: "10.5\" L x 4.5\" W x 3.5\" H (Box)",
    burnTime: "3 x 25 Hours (75h Total)",
    burnHours: 75,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Organic Cotton Wicks",
    fragranceNotes: {
      top: "Night Jasmine, Pine Needle, Italian Bergamot",
      middle: "Kashmiri Saffron, Deodar Cedar, Assam Oudh",
      base: "Mysore Sandalwood, Bourbon Vanilla, Amber"
    },
    ingredients: ["Natural Soy Wax", "Curated Therapeutic Essential Oils", "Cotton Wicks", "Velvet-Lined Gold Foil Presentation Box"],
    careTips: [
      "Enjoy candles sequentially across rooms or light simultaneously for an olfactory symphony.",
      "Keep jars as keepsake jewelry containers after wax is consumed."
    ]
  },
  {
    id: "sacred-heart",
    name: "Sacred Heart Candle",
    subtitle: "Hand-Molded Devotion",
    price: 28,
    image: "/heart_candle.png",
    category: "artisanal-shapes",
    scentFamily: "amber",
    rating: 4.9,
    reviewsCount: 42,
    featured: false,
    isNew: true,
    description: "A beautiful, hand-molded heart-shaped candle representing love and spiritual devotion. Emits a warm, comforting blend of pure Madagascar vanilla pods, soft rose petals, and a touch of wild honey.",
    longDescription: "Sculpted individually by hand using artisanal silicone molds, the Sacred Heart candle is a statement piece for your bedside table, dressing vanity, or prayer sanctuary. Infused with sweet vanilla bean and subtle floral accords.",
    size: "150g / 5.3 oz",
    dimensions: "3.2\" W x 3.0\" H x 2.4\" D",
    burnTime: "35 Hours",
    burnHours: 35,
    waxType: "Soy & Pure Golden Beeswax Blend",
    wickType: "Organic Braided Cotton Wick",
    fragranceNotes: {
      top: "Sugared Rose Petals, Sweet Almond Milk",
      middle: "Madagascar Vanilla Bean, Heliotrope",
      base: "Warm Golden Honey, Gentle Amber Musk"
    },
    ingredients: ["Natural Soy & Beeswax Blend", "Madagascar Vanilla Extract", "Rose Petal Extract", "Organic Cotton Wick"],
    careTips: [
      "Always place shaped pillar candles on a dish with a raised rim to catch dripping wax.",
      "Burn for 2-3 hours at a time for optimal shape retention."
    ]
  },
  {
    id: "golden-lotus",
    name: "Golden Lotus Candle",
    subtitle: "Sculpted Purity & Light",
    price: 26,
    image: "/lotus_candle.png",
    category: "artisanal-shapes",
    scentFamily: "spicy",
    rating: 4.8,
    reviewsCount: 31,
    featured: false,
    isNew: true,
    description: "Inspired by the sacred lotus flower. Crafted as a stunning decorative blooming lotus, this candle is infused with therapeutic white tea leaves, refreshing ginger, and sacred tulsi (holy basil) oils.",
    longDescription: "The lotus represents spiritual rising and untainted purity. Hand-poured petal by petal, this decorative bloom infuses your atmosphere with crisp white tea and sacred holy basil, bringing positive vibrational energy to any room.",
    size: "140g / 4.9 oz",
    dimensions: "3.8\" Diameter x 2.2\" H",
    burnTime: "30 Hours",
    burnHours: 30,
    waxType: "Soy & Pure Golden Beeswax Blend",
    wickType: "Organic Cotton Wick",
    fragranceNotes: {
      top: "Fresh Pressed Ginger, Zesty Lemon Peel",
      middle: "White Silver Needle Tea, Sacred Tulsi (Holy Basil)",
      base: "Warm Golden Amber, Whispering Light Vetiver"
    },
    ingredients: ["Natural Soy & Beeswax Blend", "White Tea Scent Oil", "Tulsi Leaf Essential Oil", "Cotton Wick"],
    careTips: [
      "Burn atop a ceramic or glass tray to preserve table surfaces.",
      "Can also be used as a stunning unlit fragrant decorative centerpiece."
    ]
  },
  {
    id: "royal-sandalwood",
    name: "Royal Sandalwood Temple",
    subtitle: "Ancient Altar Sanctum",
    price: 44,
    image: "/oudh_candle.png",
    category: "soy-wax",
    scentFamily: "woody",
    rating: 4.9,
    reviewsCount: 68,
    featured: true,
    isBestSeller: false,
    description: "An authentic tribute to sacred sandalwood altars. Blended with aged Mysore sandalwood, frankincense tear drops, and warm tonka bean for transcendent grounding.",
    longDescription: "For millennia, sandalwood has been revered in Vrindavan and across the sacred subcontinent as the scent of the divine. This formulation incorporates authentic aged Mysore sandalwood oil with royal frankincense tears to foster peace and meditative focus.",
    size: "300g / 10.5 oz",
    dimensions: "3.6\" D x 4.4\" H",
    burnTime: "65 Hours",
    burnHours: 65,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Crackling Natural Wooden Wick",
    fragranceNotes: {
      top: "Cardamom Bark, Dried Orange Peel",
      middle: "Mysore Sandalwood Heart, Frankincense Tears",
      base: "Smoky Tonka Bean, Golden Cedarwood"
    },
    ingredients: ["100% Natural Soy Wax", "Sandalwood Essential Oil", "Boswellia Frankincense Extract", "Tonka Bean Resin", "Wooden Wick"],
    careTips: [
      "Ideal for evening rituals, chanting, or meditation.",
      "Trim the wooden wick to 1/8 inch before every lighting."
    ]
  },
  {
    id: "ayurvedic-serenity-trio",
    name: "Ayurvedic Serenity Gift Trio",
    subtitle: "Mind, Body & Spirit Collection",
    price: 78,
    image: "/gift_set.png",
    category: "gift-sets",
    scentFamily: "fresh",
    rating: 4.9,
    reviewsCount: 39,
    featured: false,
    isNew: true,
    description: "A harmonious trio designed around Ayurvedic doshas: calming Vata (Jasmine & Sandalwood), cooling Pitta (Rose & Cardamom), and energizing Kapha (Cedar & Pine).",
    longDescription: "Balance the elements of air, fire, and earth within your dwelling. Hand-boxed in our peacock-crested champagne case, this trio serves as a daily wellness companion for modern living rooted in timeless wisdom.",
    size: "3 x 95g / 3.3 oz",
    dimensions: "10.0\" L x 4.2\" W x 3.2\" H",
    burnTime: "3 x 24 Hours (72h Total)",
    burnHours: 72,
    waxType: "100% Pure Natural Soy Wax",
    wickType: "Organic Cotton Wicks",
    fragranceNotes: {
      top: "Night Jasmine, Cardamom Seed, Siberian Fir",
      middle: "Damask Rose, Pink Pepper, Deodar Cedar",
      base: "White Musk, Warm Sandalwood, Wild Honey"
    },
    ingredients: ["Natural Soy Wax", "Essential Oil Blends", "Cotton Wicks", "Embossed Rigid Keepsake Box"],
    careTips: [
      "Select a candle each day based on your current physical and emotional rhythm.",
      "Follow standard 3-hour initial burn recommendations."
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  const current = getProductById(currentId);
  if (!current) return products.slice(0, limit);
  
  // Prefer same category or scent family
  const related = products.filter(
    (p) => p.id !== currentId && (p.category === current.category || p.scentFamily === current.scentFamily)
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // Fallback with other products
  const others = products.filter((p) => p.id !== currentId && !related.includes(p));
  return [...related, ...others].slice(0, limit);
}
