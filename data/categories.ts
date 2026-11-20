import type { L } from "@/lib/lang";
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
  /** [page banner, mega-menu photo 1, mega-menu photo 2]. Every photo on the site is used once. */
  images: [string, string, string];
};

export const categoryHref = (id: string) => (id === "all" ? "/collections" : `/collections/${id}`);

const s = (id: string, mr: string, en: string, tmr: string, ten: string) => ({ id, label: { mr, en }, text: { mr: tmr, en: ten } });

export const categories: Category[] = [
  {
    id: "all",
    label: { mr: "सर्व दागिने", en: "All Jewellery" },
    icon: "all",
    blurb: {
      mr: "हार, कानातले, बांगड्या, अंगठ्या, मंगळसूत्र आणि वधूचे दागिने: आमचा संपूर्ण संग्रह एकाच ठिकाणी.",
      en: "Necklaces, earrings, bangles, rings, mangalsutra and bridal jewellery: our full collection in one place.",
    },
    matches: () => true,
    styles: [],
    images: ["/assets/gallery/bridal-necklace-jhumka.jpg", "/assets/gallery/pendant-gift-box.jpg", "/assets/gallery/jewelled-kada.jpg"],
  },
  {
    id: "necklaces",
    label: { mr: "हार", en: "Necklaces" },
    icon: "necklace",
    blurb: { mr: "रोज घालता येतील अशा नाजूक हारांपासून समारंभासाठीच्या भरगच्च सेटपर्यंत.", en: "From delicate everyday pieces to statement sets for celebrations." },
    matches: (c) => c.slug === "necklaces",
    styles: [
      s("temple", "टेम्पल हार", "Temple Necklaces", "मंदिरशिल्पांतील नक्षीकामावर आधारित पारंपरिक रचना.", "Traditional designs inspired by temple motifs."),
      s("choker", "चोकर", "Chokers", "गळ्यालगत बसणारे, समारंभांसाठी खास हार.", "Close-fitting pieces made for occasions."),
      s("long", "लांब हार", "Long Necklaces", "राणीहार आणि थरदार लांब हार.", "Rani haar and layered long necklaces."),
      s("pendant", "पेंडंट सेट", "Pendant Sets", "रोजच्या वापरासाठी हलके, सुबक पेंडंट.", "Light pendants for everyday wear."),
      s("thushi", "ठुशी", "Thushi", "महाराष्ट्राचा पारंपरिक गळ्यालगतचा दागिना.", "Maharashtra's classic close-set necklace."),
    ],
    images: ["/assets/gallery/lakshmi-temple-necklace.jpg", "/assets/gallery/leaf-stone-necklace.jpg", "/assets/gallery/infinity-necklace.jpg"],
  },
  {
    id: "earrings",
    label: { mr: "कानातले", en: "Earrings" },
    icon: "earring",
    blurb: { mr: "झुमक्यांपासून नाजूक टॉप्सपर्यंत, प्रत्येक पेहरावाला शोभणारे कानातले.", en: "From jhumkas to delicate studs, earrings for every look." },
    matches: (c) => c.slug === "earrings",
    styles: [
      s("jhumka", "झुमके", "Jhumkas", "घुंगरू आणि नक्षीकामाने सजलेले पारंपरिक झुमके.", "Traditional bell-shaped jhumkas."),
      s("studs", "टॉप्स", "Studs", "रोज घालता येतील असे साधे, सुबक टॉप्स.", "Simple, elegant studs for every day."),
      s("drops", "लटकन डूल", "Drops", "चेहऱ्याला शोभा देणारे लटकन डूल.", "Graceful drops that frame the face."),
      s("bugadi", "बुगडी", "Bugadi", "कानाच्या वरच्या पाळीत घालायची मराठमोळी बुगडी.", "Maharashtrian upper-ear jewellery."),
    ],
    images: ["/assets/gallery/ruby-jhumka.jpg", "/assets/gallery/temple-pearl-jhumka.jpg", "/assets/gallery/red-teardrop-earrings.jpg"],
  },
  {
    id: "bangles",
    label: { mr: "बांगड्या", en: "Bangles" },
    icon: "bangle",
    blurb: { mr: "पाटल्या, कडे आणि बांगड्या: हातांची शोभा वाढवणारे पारंपरिक दागिने.", en: "Patlya, kadas and bangles: traditional gold for your wrists." },
    matches: (c) => c.slug === "bangles",
    styles: [
      s("plain", "साध्या बांगड्या", "Classic Bangles", "रोज घालता येतील अशा साध्या, सुबक बांगड्या.", "Everyday bangles with a classic finish."),
      s("kada", "कडे", "Kadas", "भरीव आणि ठसठशीत कडे.", "Bold single kadas."),
      s("patlya", "पाटल्या", "Patlya", "मराठमोळ्या नववधूची ओळख असलेल्या पाटल्या.", "The Maharashtrian bride's signature bangles."),
      s("antique", "अँटिक बांगड्या", "Antique Bangles", "जुन्या काळाचा रुबाब जपणाऱ्या रचना.", "Designs with an antique finish."),
    ],
    images: ["/assets/gallery/banner-choker-bangles.jpg", "/assets/gallery/filigree-red-bangle.jpg", "/assets/gallery/flower-filigree-bangle.jpg"],
  },
  {
    id: "rings",
    label: { mr: "अंगठ्या", en: "Rings" },
    icon: "ring",
    blurb: { mr: "साखरपुड्यापासून रोजच्या वापरापर्यंत, प्रत्येक वचनासाठी खास अंगठी.", en: "From engagements to every day, a ring for every promise." },
    matches: (c) => c.slug === "rings",
    styles: [
      s("everyday", "रोजच्या अंगठ्या", "Everyday Rings", "हलक्या आणि घालायला सोप्या अंगठ्या.", "Light, comfortable rings."),
      s("engagement", "साखरपुड्याच्या अंगठ्या", "Engagement Rings", "आयुष्यभराच्या साथीचे प्रतीक.", "For a lifelong promise."),
      s("mens", "पुरुषांच्या अंगठ्या", "Men's Rings", "भरीव आणि रुबाबदार रचना.", "Bold designs for men."),
      s("stone", "खड्यांच्या अंगठ्या", "Stone Rings", "रंगीत खड्यांसह सोन्याच्या अंगठ्या.", "Gold rings set with coloured stones."),
    ],
    images: ["/assets/gallery/gold-rings.jpg", "/assets/gallery/red-sunflower-ring.jpg", "/assets/gallery/red-halo-ring.jpg"],
  },
  {
    id: "mangalsutra",
    label: { mr: "मंगळसूत्र", en: "Mangalsutra" },
    icon: "mangalsutra",
    blurb: { mr: "पारंपरिक वाटीपासून आधुनिक पेंडंटपर्यंत, सौभाग्याचे पवित्र लेणे.", en: "From traditional vati to modern pendants, a sacred symbol." },
    matches: (c) => c.slug === "mangalsutra",
    styles: [
      s("short", "छोटे मंगळसूत्र", "Short Mangalsutra", "रोजच्या वापरासाठी नाजूक रचना.", "Delicate pieces for daily wear."),
      s("long", "लांब मंगळसूत्र", "Long Mangalsutra", "काळ्या मण्यांचे पारंपरिक लांब मंगळसूत्र.", "Traditional long mangalsutra."),
      s("vati", "वाटीचे मंगळसूत्र", "Vati Mangalsutra", "दोन वाट्यांची खास महाराष्ट्रीय रचना.", "The Maharashtrian two-vati design."),
      s("pendant", "पेंडंट मंगळसूत्र", "Pendant Mangalsutra", "आधुनिक पेंडंट असलेली रचना.", "With a modern pendant."),
    ],
    images: ["/assets/gallery/mangalsutra.jpg", "/assets/gallery/wing-mangalsutra.jpg", "/assets/gallery/floral-mangalsutra.jpg"],
  },
  {
    id: "chains",
    label: { mr: "चेन", en: "Chains" },
    icon: "chain",
    blurb: { mr: "रोजच्या वापरासाठी सुबक आणि देखण्या चेन.", en: "Durable, beautiful chains for every day." },
    matches: (c) => c.slug === "chains",
    styles: [
      s("ladies", "महिलांच्या चेन", "Ladies' Chains", "नाजूक आणि सुबक रचना.", "Fine and graceful."),
      s("mens", "पुरुषांच्या चेन", "Men's Chains", "भरीव आणि रुबाबदार रचना.", "Bold and sturdy."),
      s("beads", "मण्यांच्या चेन", "Bead Chains", "सोन्याच्या मण्यांच्या पारंपरिक माळा.", "Traditional gold bead chains."),
      s("kids", "लहान मुलांच्या चेन", "Kids' Chains", "हलक्या आणि नाजूक रचना.", "Light, comfortable designs."),
    ],
    images: ["/assets/gallery/flower-pendant-chain.jpg", "/assets/gallery/red-circle-pendant.jpg", "/assets/gallery/swirl-stone-pendant.jpg"],
  },
  {
    id: "daily",
    label: { mr: "रोजच्या वापरासाठी", en: "Daily Wear" },
    icon: "daily",
    blurb: { mr: "रोज घालता येतील असे हलके, सुटसुटीत सोन्याचे दागिने.", en: "Light, comfortable gold you can wear every day." },
    matches: (c) => c.tags.includes("daily"),
    styles: [],
    images: ["/assets/gallery/banner-pendant-worn.jpg", "/assets/gallery/stone-hoops.jpg", "/assets/gallery/bead-charm-bracelet.jpg"],
  },
  {
    id: "wedding",
    label: { mr: "लग्नसराई", en: "Wedding" },
    icon: "wedding",
    blurb: { mr: "नववधूसाठी आणि संपूर्ण कुटुंबासाठी लग्नसराईचे दागिने.", en: "Wedding jewellery for the bride and the whole family." },
    matches: (c) => c.tags.includes("wedding"),
    styles: [],
    images: ["/assets/gallery/kundan-pearl-necklace-set.jpg", "/assets/gallery/pearl-red-jhumka.jpg", "/assets/gallery/red-filigree-bracelet.jpg"],
  },
  {
    id: "traditional",
    label: { mr: "पारंपरिक", en: "Traditional" },
    icon: "traditional",
    blurb: { mr: "नथ, ठुशी, बुगडी आणि कोल्हापुरी साज: महाराष्ट्राचा अस्सल वारसा.", en: "Nath, thushi, bugadi and Kolhapuri saaj: Maharashtra's heritage." },
    matches: (c) => c.tags.includes("traditional"),
    styles: [
      s("nath", "नथ", "Nath", "मोत्यांनी सजलेली पारंपरिक मराठमोळी नथ.", "The Maharashtrian nose ring."),
      s("thushi", "ठुशी", "Thushi", "गळ्यालगतचा पारंपरिक दागिना.", "The classic close-set necklace."),
      s("saaj", "कोल्हापुरी साज", "Kolhapuri Saaj", "कोल्हापूरची खास ओळख असलेला पारंपरिक साज.", "Kolhapur's signature necklace."),
      s("bugadi", "बुगडी", "Bugadi", "कानाच्या वरच्या पाळीसाठी पारंपरिक दागिना.", "Upper-ear jewellery."),
    ],
    images: ["/assets/gallery/temple-peacock-necklace-jhumka.jpg", "/assets/gallery/double-strand-mangalsutra.jpg", "/assets/gallery/red-flower-jhumka.jpg"],
  },
];

/** Occasion shortcuts shown in every mega-menu. */
export const occasionIds = ["daily", "wedding", "traditional"] as const;

/** Page-section links shown under "More". */
export const moreLinks: MenuLink[] = [
  { label: { mr: "आमच्याविषयी", en: "About Us" }, href: "/#about" },
  { label: { mr: "पंडितचे वचन", en: "Our Craft" }, href: "/#craft" },
  { label: { mr: "दुकानाला भेट द्या", en: "Visit Our Store" }, href: "/#store" },
  { label: { mr: "संपर्क साधा", en: "Contact" }, href: "/#contact" },
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
