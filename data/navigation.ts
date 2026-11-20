import type { L } from "@/lib/lang";

export type NavItem = { label: L; href: string };

export const mainNav: NavItem[] = [
  { label: { mr: "मुख्यपृष्ठ", en: "Home" }, href: "/#home" },
  { label: { mr: "आमच्याविषयी", en: "About Us" }, href: "/#about" },
  { label: { mr: "संग्रह", en: "Collections" }, href: "/#collections" },
  { label: { mr: "पंडितचे वचन", en: "Our Craft" }, href: "/#craft" },
  { label: { mr: "संपर्क साधा", en: "Contact" }, href: "/#contact" },
];

export const announcement: L = {
  mr: "पंडित ज्वेलर्स, श्रीगोंदा: परंपरेचा साज, विश्वासाचे सोने",
  en: "Discover Timeless Gold Jewellery at Pandit Jewellers",
};
