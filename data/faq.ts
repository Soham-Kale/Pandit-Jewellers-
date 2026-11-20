/**
 * Frequently asked questions — shown on the homepage and published as
 * FAQPage structured data so Google and AI assistants can quote direct answers.
 *
 * Every answer is built from verified details in data/business.ts. Founder and
 * founding-year answers appear only once those fields are filled in.
 */
import type { L } from "@/lib/lang";
import { business, addressText, hasFounder } from "./business";
import { categories } from "./categories";

export type Faq = { q: L; a: L };

/** Product types only (not occasion groupings like "daily" or "wedding"). */
const PRODUCT_TYPES = new Set(["necklaces", "earrings", "bangles", "rings", "mangalsutra", "chains"]);

const kinds = (lang: "mr" | "en") =>
  categories
    .filter((c) => PRODUCT_TYPES.has(c.id))
    .map((c) => c.label[lang])
    .join(", ");

export function getFaqs(): Faq[] {
  const b = business;
  const faqs: Faq[] = [
    {
      q: { mr: `${b.name.mr} कुठे आहे?`, en: `Where is ${b.name.en} located?` },
      a: {
        mr: `${b.name.mr} हे दुकान ${addressText("mr")} येथे आहे.`,
        en: `${b.name.en} is at ${b.streetAddress.en}, ${b.city.en}, ${b.state.en} ${b.postalCode}, India.`,
      },
    },
    {
      q: { mr: "दुकानाची वेळ काय आहे?", en: `What are ${b.name.en}'s opening hours?` },
      a: { mr: `दुकान ${b.openingHours.mr} उघडे असते.`, en: `The shop is open ${b.openingHours.en}.` },
    },
    {
      q: { mr: "दुकानात कोणते दागिने मिळतात?", en: `What jewellery does ${b.name.en} sell?` },
      a: {
        mr: `${b.name.mr}मध्ये सोन्याचे दागिने मिळतात: ${kinds("mr")}. ठुशी, नथ, बुगडी आणि कोल्हापुरी साज असे पारंपरिक महाराष्ट्रीय दागिनेही पाहता येतात.`,
        en: `${b.name.en} sells gold jewellery: ${kinds("en")}, including traditional Maharashtrian pieces such as thushi, nath, bugadi and Kolhapuri saaj.`,
      },
    },
    {
      q: { mr: "लग्नासाठी वधूचे दागिने मिळतात का?", en: `Does ${b.name.en} have bridal jewellery?` },
      a: {
        mr: "हो. लग्नाच्या प्रत्येक विधीसाठी पारंपरिक वधूचा साज, मंगळसूत्र, हार आणि बांगड्या दुकानात प्रत्यक्ष पाहता येतात.",
        en: "Yes. Traditional bridal sets, mangalsutra, necklaces and bangles for every wedding ritual can be seen in person at the shop.",
      },
    },
    {
      q: { mr: "दागिन्यांबद्दल चौकशी कशी करावी?", en: `How can I contact ${b.name.en}?` },
      a: {
        mr: `फोन ${b.phone}${b.phoneAlt ? ` किंवा ${b.phoneAlt}` : ""} वर संपर्क साधा, व्हॉट्सॲपवर संदेश पाठवा${b.email ? ` किंवा ${b.email} वर ईमेल करा` : ""}. दागिने प्रत्यक्ष पाहून निवडण्यासाठी दुकानाला भेट द्या.`,
        en: `Call ${b.phone}${b.phoneAlt ? ` or ${b.phoneAlt}` : ""}, send a WhatsApp message${b.email ? `, or email ${b.email}` : ""}. Visit the shop to see the jewellery in person.`,
      },
    },
  ];

  if (hasFounder()) {
    const f = b.founder;
    const since = b.foundingYear;
    faqs.unshift({
      q: { mr: `${b.name.mr}चे ${f.role.mr} कोण आहेत?`, en: `Who is the ${f.role.en.toLowerCase()} of ${b.name.en}?` },
      a: {
        mr: `${f.name.mr || f.name.en} हे ${b.city.mr} येथील ${b.name.mr}चे ${f.role.mr} आहेत.${since ? ` हे दुकान ${since} पासून सुरू आहे.` : ""}${f.bio.mr ? ` ${f.bio.mr}` : ""}`,
        en: `${f.name.en || f.name.mr} is the ${f.role.en.toLowerCase()} of ${b.name.en}, ${b.city.en}.${since ? ` The shop has been open since ${since}.` : ""}${f.bio.en ? ` ${f.bio.en}` : ""}`,
      },
    });
  } else if (b.foundingYear) {
    faqs.unshift({
      q: { mr: `${b.name.mr} कधी सुरू झाले?`, en: `When was ${b.name.en} founded?` },
      a: { mr: `${b.name.mr} ${b.foundingYear} मध्ये सुरू झाले.`, en: `${b.name.en} was founded in ${b.foundingYear}.` },
    });
  }

  return faqs;
}
