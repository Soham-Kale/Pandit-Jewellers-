import type { L } from "@/lib/lang";

export type Collection = {
  slug: string;
  name: L;
  description: L;
  image: string;
  alt: L;
  /** Groups used by the header filters (e.g. daily wear, wedding, traditional). */
  tags: string[];
};

export const collections: Collection[] = [
  {
    slug: "necklaces",
    tags: ["wedding", "traditional"],
    name: { mr: "सोन्याचे हार", en: "Gold Necklaces" },
    description: { mr: "रोजच्या वापरापासून खास प्रसंगांपर्यंत, प्रत्येक वेळी शोभणारे हार.", en: "Statement pieces and delicate everyday designs." },
    image: "/assets/gallery/lakshmi-coin-necklace.jpg",
    alt: { mr: "लक्ष्मी नक्षीच्या नाण्यांचा आणि मण्यांचा सोन्याचा हार", en: "Gold necklace with Lakshmi coin motifs and bead drops" },
  },
  {
    slug: "earrings",
    tags: ["daily", "traditional"],
    name: { mr: "सोन्याचे कानातले", en: "Gold Earrings" },
    description: { mr: "झुमके, टॉप्स आणि नाजूक लटकन डूल.", en: "Jhumkas, studs and drops with graceful detail." },
    image: "/assets/gallery/flower-top-jhumka.jpg",
    alt: { mr: "फुलांच्या टॉपचे सोन्याचे झुमके", en: "Gold jhumkas with flower-shaped tops" },
  },
  {
    slug: "bangles",
    tags: ["wedding", "traditional"],
    name: { mr: "सोन्याच्या बांगड्या", en: "Gold Bangles" },
    description: { mr: "प्रत्येक प्रसंगाला साजेशा बांगड्या आणि कडे.", en: "Classic bangles and kadas for every occasion." },
    image: "/assets/gallery/flower-bangle.jpg",
    alt: { mr: "मध्यभागी फुलांची नक्षी असलेली सोन्याची बांगडी", en: "Gold bangle with a stone-set flower at the centre" },
  },
  {
    slug: "rings",
    tags: ["daily", "wedding"],
    name: { mr: "सोन्याच्या अंगठ्या", en: "Gold Rings" },
    description: { mr: "लहान-मोठ्या वचनांची सुंदर आठवण.", en: "Rings to celebrate promises, big and small." },
    image: "/assets/gallery/red-star-ring.jpg",
    alt: { mr: "लाल खडा आणि चमकदार पाकळ्यांची सोन्याची अंगठी", en: "Gold ring with a red stone and sparkling petals" },
  },
  {
    slug: "mangalsutra",
    tags: ["daily", "wedding"],
    name: { mr: "मंगळसूत्र", en: "Mangalsutra" },
    description: { mr: "पारंपरिक आणि आधुनिक रचनांतील मंगळसूत्र.", en: "Sacred designs, traditional and contemporary." },
    image: "/assets/gallery/halo-mangalsutra.jpg",
    alt: { mr: "हिरव्या खड्याच्या पेंडंटचे काळ्या मण्यांचे मंगळसूत्र", en: "Black bead mangalsutra with a green stone pendant" },
  },
  {
    slug: "bridal",
    tags: ["wedding"],
    name: { mr: "वधूचे दागिने", en: "Bridal Jewellery" },
    description: { mr: "आयुष्यातील सर्वात खास दिवसासाठी वारसा जपणारे सेट.", en: "Heirloom sets for the most special day." },
    image: "/assets/gallery/antique-gold-necklace.jpg",
    alt: { mr: "फुलांच्या नक्षीचा अँटिक सोन्याचा वधूचा हार", en: "Antique-finish gold bridal necklace with floral carving" },
  },
  {
    slug: "maharashtrian",
    tags: ["traditional", "wedding"],
    name: { mr: "महाराष्ट्रीय पारंपरिक दागिने", en: "Traditional Maharashtrian" },
    description: { mr: "ठुशी, नथ आणि मराठमोळा अस्सल वारसा.", en: "Thushi, nath and timeless regional heritage." },
    image: "/assets/gallery/gold-nose-pins.jpg",
    alt: { mr: "फुलांच्या नक्षीच्या सोन्याच्या चमकी आणि नथ", en: "Floral gold nose pins and a small nath" },
  },
  {
    slug: "chains",
    tags: ["daily"],
    name: { mr: "सोन्याच्या चेन", en: "Gold Chains" },
    description: { mr: "रोजच्या वापरासाठी नाजूक, सुबक चेन.", en: "Fine chains with lasting, everyday elegance." },
    image: "/assets/gallery/pearl-flower-pendant.jpg",
    alt: { mr: "मोत्याच्या लटकनासह फुलांचे पेंडंट आणि चेन", en: "Gold chain with a flower pendant and pearl drop" },
  },
];
