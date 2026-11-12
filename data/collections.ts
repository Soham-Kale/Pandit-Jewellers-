import type { L } from "@/lib/i18n";

export type Collection = {
  slug: string;
  name: L;
  description: L;
  image: string;
  alt: L;
};

export const collections: Collection[] = [
  {
    slug: "necklaces",
    name: { mr: "सोन्याचे हार", en: "Gold Necklaces" },
    description: { mr: "रोजच्या वापरापासून खास प्रसंगांपर्यंतचे हार.", en: "Statement pieces and delicate everyday designs." },
    image: "/assets/collections/necklaces.jpg",
    alt: { mr: "मोत्यांच्या लटकनांसह सोन्याचा हार", en: "Gold necklace with pearl drops on a red background" },
  },
  {
    slug: "earrings",
    name: { mr: "सोन्याचे कानातले", en: "Gold Earrings" },
    description: { mr: "झुमके, टॉप्स आणि नाजूक डूल.", en: "Jhumkas, studs and drops with graceful detail." },
    image: "/assets/collections/earrings.jpg",
    alt: { mr: "लाल खड्यांचे सोन्याचे झुमके", en: "Pair of gold jhumka earrings with red stones" },
  },
  {
    slug: "bangles",
    name: { mr: "सोन्याच्या बांगड्या", en: "Gold Bangles" },
    description: { mr: "प्रत्येक प्रसंगासाठी बांगड्या आणि कडे.", en: "Classic bangles and kadas for every occasion." },
    image: "/assets/collections/bangles.jpg",
    alt: { mr: "स्टँडवर मांडलेल्या सोन्याच्या बांगड्या", en: "Gold bangles stacked on a stand" },
  },
  {
    slug: "rings",
    name: { mr: "सोन्याच्या अंगठ्या", en: "Gold Rings" },
    description: { mr: "लहान-मोठ्या वचनांच्या आठवणीसाठी.", en: "Rings to celebrate promises, big and small." },
    image: "/assets/collections/rings.jpg",
    alt: { mr: "दोन सोन्याच्या अंगठ्या", en: "Two gold rings on cream fabric" },
  },
  {
    slug: "mangalsutra",
    name: { mr: "मंगळसूत्र", en: "Mangalsutra" },
    description: { mr: "पारंपरिक आणि आधुनिक पवित्र रचना.", en: "Sacred designs, traditional and contemporary." },
    image: "/assets/collections/mangalsutra.jpg",
    alt: { mr: "काळ्या मण्यांचे सोन्याचे मंगळसूत्र", en: "Gold mangalsutra with black beads" },
  },
  {
    slug: "bridal",
    name: { mr: "वधूचे दागिने", en: "Bridal Jewellery" },
    description: { mr: "सर्वात खास दिवसासाठी वारसा जपणारे सेट.", en: "Heirloom sets for the most special day." },
    image: "/assets/collections/bridal.jpg",
    alt: { mr: "पारंपरिक दागिने परिधान केलेली वधू", en: "Bride wearing a traditional bridal jewellery set" },
  },
  {
    slug: "maharashtrian",
    name: { mr: "पारंपरिक महाराष्ट्रीय", en: "Traditional Maharashtrian" },
    description: { mr: "ठुशी, नथ आणि अस्सल प्रादेशिक वारसा.", en: "Thushi, nath and timeless regional heritage." },
    image: "/assets/collections/maharashtrian.jpg",
    alt: {
      mr: "नथ आणि हिरव्या बांगड्यांसह पारंपरिक साडीतील महाराष्ट्रीय वधू",
      en: "Maharashtrian bride in a traditional saree with a nath and green bangles",
    },
  },
  {
    slug: "chains",
    name: { mr: "सोन्याच्या चेन", en: "Gold Chains" },
    description: { mr: "रोजच्या वापरासाठी नाजूक, टिकाऊ चेन.", en: "Fine chains with lasting, everyday elegance." },
    image: "/assets/collections/chains.jpg",
    alt: { mr: "पारंपरिक सोन्याच्या मण्यांच्या चेन", en: "Traditional gold bead chains" },
  },
];
