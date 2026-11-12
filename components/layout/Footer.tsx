"use client";

import Link from "next/link";
import { categoryHref } from "@/data/categories";
import { MapPin, Phone, Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import InstagramIcon, { FacebookIcon } from "@/components/ui/Instagram";
import { mainNav } from "@/data/navigation";
import { collections } from "@/data/collections";
import { content } from "@/data/content";
import { business, addressText, whatsappLink, phoneLink, TBC, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

const footerCat: Record<string, string> = { bridal: "wedding", maharashtrian: "traditional" };

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang].footer;
  const tbc = TBC[lang];
  const socials = [
    { label: "Instagram", href: business.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: business.facebook, Icon: FacebookIcon },
    { label: "WhatsApp", href: business.whatsapp ? whatsappLink(content[lang].wa.general) : "", Icon: WhatsAppIcon },
  ];

  return (
    <footer className="bg-wine-glow relative overflow-hidden text-ivory/85">
      <div aria-hidden className="h-1 w-full" style={{ background: "var(--gold-shine)" }} />

      <div className="container-lux grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm leading-relaxed text-ivory/80">{t.about}</p>
          <p className="text-shine mt-4 text-lg font-semibold">{t.altTagline}</p>
          <ul className="mt-8 flex gap-3" aria-label={t.social}>
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...extProps(href)}
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-gold-soft/60 text-gold-soft transition-colors duration-500 hover:bg-gold-soft hover:text-burgundy-ink"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : (
                  <span
                    title={`${label}: ${tbc}`}
                    aria-label={`${label}: ${tbc}`}
                    className="grid size-11 cursor-default place-items-center rounded-full border border-gold-soft/25 text-gold-soft/45"
                  >
                    <Icon className="size-4" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="eyebrow text-gold-soft">{t.explore}</h3>
          <ul className="mt-6 space-y-3.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold-soft">
                  {item.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-gold-soft">{t.collections}</h3>
          <ul className="mt-6 grid gap-3.5">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(footerCat[c.slug] ?? c.slug)} className="transition-colors hover:text-gold-soft">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h3 className="eyebrow text-gold-soft">{t.contact}</h3>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold-soft" strokeWidth={1.6} aria-hidden />
              <span>
                {business.name[lang]}
                <br />
                {addressText(lang)}
                {!business.streetAddress[lang] && (
                  <span className="block text-sm text-ivory/55">
                    {t.street}: {tbc}
                  </span>
                )}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-gold-soft" strokeWidth={1.6} aria-hidden />
              {business.phone ? (
                <a href={phoneLink()} className="hover:text-gold-soft">
                  {business.phone}
                </a>
              ) : (
                <span>
                  {t.phone}: {tbc}
                </span>
              )}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-gold-soft" strokeWidth={1.6} aria-hidden />
              <span>{business.openingHours[lang] || `${t.hours}: ${tbc}`}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold-soft/15">
        <div className="container-lux flex flex-col gap-2 py-6 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {business.name[lang]}. {t.rights}
          </p>
          <p>{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
