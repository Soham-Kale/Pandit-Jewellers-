import type { L } from "@/lib/i18n";
import { collections, type Collection } from "./collections";

export type CategoryIcon =
  | "all" | "necklace" | "earring" | "bangle" | "ring" | "mangalsutra" | "chain" | "daily" | "wedding" | "traditional" | "more";

export type MenuLink = { label: L; href: string };
export type MenuImage = { src: string; caption: L; href: string };

export type Category = {
  id: string;
  label: L;
  icon: CategoryIcon;
  /** Short introduction shown in the menu and on the category page. */
  blurb: L;
  matches: (c: Collection) => boolean;
  /**
   * Styles shown in the mega-menu and as sections on the category page.
   * ⚠️ EDITABLE: these are common styles to enquire about, not a stock list.
   *    Adjust them to what the showroom actually carries.
   */
  styles: { id: string; label: L; text: L }[];
  images: [string, string];
};

export const categoryHref = (id: string) => (id === "all" ? "/collections" : `/collections/${id}`);

const s = (id: string, mr: string, en: string, tmr: string, ten: string) => ({ id, label: { mr, en }, text: { mr: tmr, en: ten } });

export const categories: Category[] = [
  {
    id: "all",
    label: { mr: "सर्व दागिने", en: "All Jewellery" },
    icon: "all",
    blurb: {
      mr: "हार, कानातले, बांगड्या, अंगठ्या, मंगळसूत्र आणि वधूचे दागिने: आमचा संपूर्ण संग्रह एका ठिकाणी.",
      en: "Necklaces, earrings, bangles, rings, mangalsutra and bridal jewellery: our full collection in one place.",
    },
    matches: () => true,
    styles: [],
    images: ["/assets/hero/hero.jpg", "/assets/featured/featured-3.jpg"],
  },
  {
    id: "necklaces",
    label: { mr: "हार", en: "Necklaces" },
    icon: "necklace",
    blurb: { mr: "रोजच्या नाजूक हारांपासून ते समारंभासाठीच्या भरगच्च सेटपर्यंत.", en: "From delicate everyday pieces to statement sets for celebrations." },
    matches: (c) => c.slug === "necklaces",
    styles: [
      s("temple", "टेम्पल हार", "Temple Necklaces", "देवळांच्या नक्षीतून प्रेरित पारंपरिक रचना.", "Traditional designs inspired by temple motifs."),
      s("choker", "चोकर", "Chokers", "गळ्याला बसणारे, समारंभांसाठी खास.", "Close-fitting pieces made for occasions."),
      s("long", "लांब हार", "Long Necklaces", "राणीहार आणि थरदार लांब हार.", "Rani haar and layered long necklaces."),
      s("pendant", "पेंडंट सेट", "Pendant Sets", "रोजच्या वापरासाठी हलके पेंडंट.", "Light pendants for everyday wear."),
      s("thushi", "ठुशी", "Thushi", "महाराष्ट्राचा पारंपरिक गळ्यालगतचा दागिना.", "Maharashtra's classic close-set necklace."),
    ],
    images: ["/assets/collections/necklaces.jpg", "/assets/featured/featured-1.jpg"],
  },
  {
    id: "earrings",
    label: { mr: "कानातले", en: "Earrings" },
    icon: "earring",
    blurb: { mr: "झुमक्यांपासून नाजूक टॉप्सपर्यंत, प्रत्येक लुकसाठी कानातले.", en: "From jhumkas to delicate studs, earrings for every look." },
    matches: (c) => c.slug === "earrings",
    styles: [
      s("jhumka", "झुमके", "Jhumkas", "घुंगरू आणि नक्षीकाम असलेले पारंपरिक झुमके.", "Traditional bell-shaped jhumkas."),
      s("studs", "टॉप्स", "Studs", "रोजच्या वापरासाठी साधे, सुबक टॉप्स.", "Simple, elegant studs for every day."),
      s("drops", "लटकन डूल", "Drops", "चेहऱ्याला शोभा देणारे लटकन डूल.", "Graceful drops that frame the face."),
      s("bugadi", "बुगडी", "Bugadi", "कानाच्या वरच्या भागासाठी महाराष्ट्रीय बुगडी.", "Maharashtrian upper-ear jewellery."),
    ],
    images: ["/assets/collections/earrings.jpg", "/assets/featured/featured-2.jpg"],
  },
  {
    id: "bangles",
    label: { mr: "बांगड्या", en: "Bangles" },
    icon: "bangle",
    blurb: { mr: "पाटल्या, कडे आणि बांगड्या: हातांना शोभा देणारे पारंपरिक सोने.", en: "Patlya, kadas and bangles: traditional gold for your wrists." },
    matches: (c) => c.slug === "bangles",
    styles: [
      s("plain", "साध्या बांगड्या", "Classic Bangles", "रोज घालता येतील अशा साध्या बांगड्या.", "Everyday bangles with a classic finish."),
      s("kada", "कडे", "Kadas", "एकच भरीव, ठसठशीत कडे.", "Bold single kadas."),
      s("patlya", "पाटल्या", "Patlya", "महाराष्ट्रीय नववधूची ओळख असलेल्या पाटल्या.", "The Maharashtrian bride's signature bangles."),
      s("antique", "अँटिक बांगड्या", "Antique Bangles", "जुन्या काळाचा रुबाब असलेली रचना.", "Designs with an antique finish."),
    ],
    images: ["/assets/collections/bangles.jpg", "/assets/about/about.jpg"],
  },
  {
    id: "rings",
    label: { mr: "अंगठ्या", en: "Rings" },
    icon: "ring",
    blurb: { mr: "साखरपुड्यापासून रोजच्या वापरापर्यंत, प्रत्येक वचनासाठी अंगठी.", en: "From engagements to every day, a ring for every promise." },
    matches: (c) => c.slug === "rings",
    styles: [
      s("everyday", "रोजच्या अंगठ्या", "Everyday Rings", "हलक्या, आरामदायी अंगठ्या.", "Light, comfortable rings."),
      s("engagement", "साखरपुड्याच्या अंगठ्या", "Engagement Rings", "आयुष्यभराच्या वचनासाठी.", "For a lifelong promise."),
      s("mens", "पुरुषांच्या अंगठ्या", "Men's Rings", "भरीव, रुबाबदार रचना.", "Bold designs for men."),
      s("stone", "खड्यांच्या अंगठ्या", "Stone Rings", "रंगीत खड्यांसह सोन्याच्या अंगठ्या.", "Gold rings set with coloured stones."),
    ],
    images: ["/assets/collections/rings.jpg", "/assets/store/store.jpg"],
  },
  {
    id: "mangalsutra",
    label: { mr: "मंगळसूत्र", en: "Mangalsutra" },
    icon: "mangalsutra",
    blurb: { mr: "पारंपरिक वाटीपासून आधुनिक पेंडंटपर्यंत, पवित्र बंधनाचे प्रतीक.", en: "From traditional vati to modern pendants, a sacred symbol." },
    matches: (c) => c.slug === "mangalsutra",
    styles: [
      s("short", "छोटे मंगळसूत्र", "Short Mangalsutra", "रोजच्या वापरासाठी नाजूक.", "Delicate pieces for daily wear."),
      s("long", "लांब मंगळसूत्र", "Long Mangalsutra", "पारंपरिक लांब मंगळसूत्र.", "Traditional long mangalsutra."),
      s("vati", "वाटीचे मंगळसूत्र", "Vati Mangalsutra", "महाराष्ट्रीय दोन वाट्यांची रचना.", "The Maharashtrian two-vati design."),
      s("pendant", "पेंडंट मंगळसूत्र", "Pendant Mangalsutra", "आधुनिक पेंडंटसह.", "With a modern pendant."),
    ],
    images: ["/assets/collections/mangalsutra.jpg", "/assets/collections/bridal.jpg"],
  },
  {
    id: "chains",
    label: { mr: "चेन", en: "Chains" },
    icon: "chain",
    blurb: { mr: "रोजच्या वापरासाठी टिकाऊ आणि सुंदर चेन.", en: "Durable, beautiful chains for every day." },
    matches: (c) => c.slug === "chains",
    styles: [
      s("ladies", "महिलांच्या चेन", "Ladies' Chains", "नाजूक आणि सुबक.", "Fine and graceful."),
      s("mens", "पुरुषांच्या चेन", "Men's Chains", "भरीव आणि मजबूत.", "Bold and sturdy."),
      s("beads", "मण्यांच्या चेन", "Bead Chains", "सोन्याच्या मण्यांच्या पारंपरिक माळा.", "Traditional gold bead chains."),
      s("kids", "लहान मुलांच्या चेन", "Kids' Chains", "हलक्या, सुरक्षित रचना.", "Light, comfortable designs."),
    ],
    images: ["/assets/collections/chains.jpg", "/assets/featured/featured-3.jpg"],
  },
  {
    id: "daily",
    label: { mr: "रोजच्या वापरासाठी", en: "Daily Wear" },
    icon: "daily",
    blurb: { mr: "रोज घालता येतील असे हलके, आरामदायी सोन्याचे दागिने.", en: "Light, comfortable gold you can wear every day." },
    matches: (c) => c.tags.includes("daily"),
    styles: [],
    images: ["/assets/collections/chains.jpg", "/assets/collections/rings.jpg"],
  },
  {
    id: "wedding",
    label: { mr: "लग्नसराई", en: "Wedding" },
    icon: "wedding",
    blurb: { mr: "वधूसाठी आणि संपूर्ण कुटुंबासाठी लग्नसराईचे दागिने.", en: "Wedding jewellery for the bride and the whole family." },
    matches: (c) => c.tags.includes("wedding"),
    styles: [],
    images: ["/assets/collections/bridal.jpg", "/assets/bridal/bridal-banner.jpg"],
  },
  {
    id: "traditional",
    label: { mr: "पारंपरिक", en: "Traditional" },
    icon: "traditional",
    blurb: { mr: "नथ, ठुशी, बुगडी आणि कोल्हापुरी साज: महाराष्ट्राचा अस्सल वारसा.", en: "Nath, thushi, bugadi and Kolhapuri saaj: Maharashtra's heritage." },
    matches: (c) => c.tags.includes("traditional"),
    styles: [
      s("nath", "नथ", "Nath", "महाराष्ट्रीय नथ, पारंपरिक मोत्यांसह.", "The Maharashtrian nose ring."),
      s("thushi", "ठुशी", "Thushi", "गळ्यालगतचा पारंपरिक दागिना.", "The classic close-set necklace."),
      s("saaj", "कोल्हापुरी साज", "Kolhapuri Saaj", "कोल्हापूरची खास ओळख.", "Kolhapur's signature necklace."),
      s("bugadi", "बुगडी", "Bugadi", "कानाच्या वरच्या भागासाठी.", "Upper-ear jewellery."),
    ],
    images: ["/assets/collections/maharashtrian.jpg", "/assets/featured/featured-4.jpg"],
  },
];

/** Occasion shortcuts shown in every mega-menu. */
export const occasionIds = ["daily", "wedding", "traditional"] as const;

/** Page-section links shown under "More". */
export const moreLinks: MenuLink[] = [
  { label: { mr: "आमच्याविषयी", en: "About Us" }, href: "/#about" },
  { label: { mr: "आमची कला", en: "Our Craft" }, href: "/#craft" },
  { label: { mr: "दुकानाला भेट द्या", en: "Visit Our Store" }, href: "/#store" },
  { label: { mr: "संपर्क", en: "Contact" }, href: "/#contact" },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const collectionsFor = (cat: Category) => collections.filter(cat.matches);

export const searchHints: L[] = [
  { mr: "सोन्याचा हार शोधा", en: "Search for gold necklace" },
  { mr: "मंगळसूत्र शोधा", en: "Search for mangalsutra" },
  { mr: "झुमके शोधा", en: "Search for jhumkas" },
  { mr: "वधूचे दागिने शोधा", en: "Search for bridal jewellery" },
];

/** Extra search words so common queries (in either language) find the right collection. */
export const searchAliases: Record<string, string[]> = {
  necklaces: ["necklace", "haar", "har", "हार", "नेकलेस", "pendant", "पेंडंट", "thushi", "ठुशी", "choker", "चोकर", "temple", "टेम्पल"],
  earrings: ["earring", "jhumka", "jhumki", "झुमके", "झुमका", "कानातले", "studs", "टॉप्स", "डूल", "bugadi", "बुगडी"],
  bangles: ["bangle", "kada", "kangan", "बांगडी", "बांगड्या", "कडे", "patli", "patlya", "पाटल्या"],
  rings: ["ring", "angthi", "अंगठी", "अंगठ्या", "engagement", "साखरपुडा"],
  mangalsutra: ["mangalsutra", "मंगळसूत्र", "mangalsootra", "black beads", "वाटी", "vati"],
  bridal: ["bridal", "wedding", "bride", "dulhan", "वधू", "लग्न", "नवरी", "set", "सेट"],
  maharashtrian: ["maharashtrian", "marathi", "nath", "नथ", "thushi", "ठुशी", "kolhapuri", "कोल्हापुरी", "saaj", "साज", "traditional", "पारंपरिक"],
  chains: ["chain", "चेन", "साखळी", "sakhli"],
};
