/** Headings and labels for the homepage sections (Marathi + English). */
import type { L } from "@/lib/i18n";

export const home = {
  collections: {
    title: { mr: "पंडित कलेक्शन्स", en: "Pandit Collections" },
    sub: { mr: "आमचे खास सोन्याचे संग्रह पाहा", en: "Explore our signature gold collections" },
  },
  categories: {
    title: { mr: "तुमच्या पसंतीचे सोने शोधा", en: "Find Your Kind of Gold" },
    sub: { mr: "प्रकारानुसार पाहा", en: "Shop by category" },
    count: { mr: "प्रकार निवडीसाठी", en: "Categories to choose from" },
    viewAll: { mr: "सर्व पाहा", en: "View all" },
  },
  featured: {
    title: { mr: "खास निवड", en: "Picked For You" },
    sub: { mr: "आठवणींचा भाग होणारे दागिने", en: "Jewellery that becomes part of your story" },
  },
  world: {
    title: { mr: "पंडितचे विश्व", en: "The World of Pandit" },
    sub: { mr: "प्रत्येक प्रसंगासाठी सोबती", en: "Gold for every occasion" },
  },
  promise: {
    lead: { mr: "पंडितचे", en: "The Pandit" },
    accent: { mr: "वचन", en: "Promise" },
    sub: { mr: "काळजीपूर्वक निवडलेले, तुम्ही जपलेले", en: "Chosen with care, cherished by you" },
  },
  experience: {
    title: { mr: "पंडितचा अनुभव", en: "The Pandit Experience" },
    sub: { mr: "दालनाला भेट द्या किंवा आमच्याशी बोला", en: "Visit the showroom or talk to us" },
    visit: { mr: "दालनाला भेट द्या", en: "Visit our store" },
    whatsapp: { mr: "व्हॉट्सॲपवर विचारा", en: "Ask on WhatsApp" },
    call: { mr: "आम्हाला कॉल करा", en: "Talk to us" },
  },
  slide: {
    prev: { mr: "मागील", en: "Previous slide" },
    next: { mr: "पुढील", en: "Next slide" },
    go: { mr: "स्लाइड", en: "Go to slide" },
  },
} satisfies Record<string, Record<string, L>>;
