/** Headings and labels for the homepage sections (Marathi shown; English kept for reference only). */
import type { L } from "@/lib/i18n";

export const home = {
  collections: {
    title: { mr: "पंडितचे खास संग्रह", en: "Pandit Collections" },
    sub: { mr: "आमच्या निवडक सोन्याच्या दागिन्यांवर एक नजर", en: "Explore our signature gold collections" },
  },
  categories: {
    title: { mr: "तुमच्या आवडीचा दागिना निवडा", en: "Find Your Kind of Gold" },
    sub: { mr: "हार, कानातले, बांगड्यांपासून मंगळसूत्रापर्यंत", en: "Shop by category" },
    count: { mr: "दागिन्यांचे प्रकार", en: "Categories to choose from" },
    viewAll: { mr: "सर्व दागिने पाहा", en: "View all" },
  },
  featured: {
    title: { mr: "खास तुमच्यासाठी", en: "Picked For You" },
    sub: { mr: "आठवणींचा भाग होणारे दागिने", en: "Jewellery that becomes part of your story" },
  },
  world: {
    title: { mr: "प्रसंगानुसार दागिने", en: "The World of Pandit" },
    sub: { mr: "सण, समारंभ आणि रोजच्या दिवसासाठी", en: "Gold for every occasion" },
  },
  promise: {
    lead: { mr: "पंडितचे", en: "The Pandit" },
    accent: { mr: "वचन", en: "Promise" },
    sub: { mr: "आम्ही काळजीपूर्वक निवडतो, तुम्ही मनापासून जपता", en: "Chosen with care, cherished by you" },
  },
  experience: {
    title: { mr: "आमच्याशी जोडले जा", en: "The Pandit Experience" },
    sub: { mr: "दुकानात या, व्हॉट्सॲपवर विचारा किंवा थेट फोन करा", en: "Visit the showroom or talk to us" },
    visit: { mr: "दुकानाला भेट द्या", en: "Visit our store" },
    whatsapp: { mr: "व्हॉट्सॲपवर विचारा", en: "Ask on WhatsApp" },
    call: { mr: "आम्हाला फोन करा", en: "Talk to us" },
  },
  slide: {
    prev: { mr: "मागील चित्र", en: "Previous slide" },
    next: { mr: "पुढील चित्र", en: "Next slide" },
    go: { mr: "चित्र क्रमांक", en: "Go to slide" },
  },
} satisfies Record<string, Record<string, L>>;
