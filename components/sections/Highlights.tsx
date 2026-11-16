"use client";

import Link from "next/link";
import { MapPin, Clock, Gem } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { business, whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

/**
 * Strip under the banner that answers a first-time visitor's practical questions:
 * where is the shop, when is it open, how do I ask, what is it known for.
 * Every line comes from data/business.ts or the category data, nothing invented.
 */
export default function Highlights() {
  const { lang } = useLang();
  const t = content[lang];
  const h = t.highlights;
  const wa = whatsappLink(t.wa.general);
  const items = [
    { Icon: MapPin, title: h.store, text: `${business.streetAddress[lang]}, ${business.city[lang]}`, href: "/#store" },
    { Icon: Clock, title: h.hours, text: h.hoursShort, href: "/#store" },
    { Icon: WhatsAppIcon, title: h.enquire, text: business.phone, href: wa },
    { Icon: Gem, title: h.traditional, text: h.traditionalText, href: "/collections/traditional" },
  ];
  return (
    <section aria-label={h.label} className="border-b border-line bg-mist">
      <ul className="container-lux grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text, href }, i) => {
          const Comp = href.startsWith("http") ? "a" : Link;
          return (
            <li
              key={title}
              className={`border-line ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <Comp
                href={href}
                {...extProps(href)}
                className="group flex h-full items-start gap-3 px-3 py-5 transition-colors duration-500 hover:bg-white/70 sm:gap-4 sm:px-6 lg:py-7"
              >
                <span className="hidden size-10 shrink-0 place-items-center sm:grid rounded-full border border-gold/50 text-gold-deep transition-colors duration-500 group-hover:border-gold group-hover:bg-white">
                  <Icon className="size-[1.1rem]" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="t-h4 block text-burgundy-ink">{title}</span>
                  <span className="t-caption mt-0.5 block text-muted">{text}</span>
                </span>
              </Comp>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
