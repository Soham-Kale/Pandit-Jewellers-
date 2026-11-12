"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import LanguageToggle from "@/components/ui/LanguageToggle";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import MobileMenu from "./MobileMenu";
import { mainNav } from "@/data/navigation";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

export default function Header() {
  const { lang } = useLang();
  const t = content[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const wa = whatsappLink(t.wa.general);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: solid ? "rgba(255,248,238,0.97)" : "rgba(255,248,238,0)",
          boxShadow: solid ? "0 8px 30px -18px rgba(122,28,44,0.35)" : "0 1px 0 rgba(255,248,238,0.18)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 -mb-[var(--header-h)] h-[var(--header-h)] ${solid ? "backdrop-blur-md" : ""}`}
      >
        {/* thin metallic line under the solid header */}
        <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} style={{ background: "var(--gold-shine)" }} />
        <div className="container-lux flex h-full items-center justify-between gap-4">
          <a href="#home" aria-label={t.header.home} className="shrink-0">
            <Logo tone={solid ? "dark" : "light"} />
          </a>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`group relative py-2 text-[0.95rem] font-medium tracking-[0.06em] transition-colors duration-300 ${
                      solid ? "text-charcoal hover:text-burgundy" : "text-ivory/95 hover:text-gold-soft"
                    }`}
                  >
                    {item.label[lang]}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full transition-transform duration-500 ease-luxe group-hover:scale-x-100"
                      style={{ background: "var(--gold-shine)" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle tone={solid ? "dark" : "light"} className="hidden sm:inline-flex" />
            <a
              href={wa}
              {...extProps(wa)}
              aria-label={t.header.whatsapp}
              className={`hidden size-11 items-center justify-center rounded-full border transition-colors duration-300 md:inline-flex ${
                solid ? "border-gold/60 text-burgundy hover:bg-burgundy hover:text-ivory" : "border-gold-soft/50 text-ivory hover:bg-ivory hover:text-burgundy"
              }`}
            >
              <WhatsAppIcon className="size-[1.15rem]" />
            </a>
            <a
              href="#store"
              className={`hidden min-h-11 items-center gap-2 rounded-full px-5 text-[0.82rem] font-semibold tracking-[0.1em] uppercase transition-all duration-500 ease-luxe lg:inline-flex ${
                solid ? "bg-burgundy text-ivory hover:bg-burgundy-deep" : "bg-shine text-burgundy-ink"
              }`}
            >
              <MapPin className="size-4" strokeWidth={1.75} aria-hidden />
              {t.header.visit}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.header.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid size-11 place-items-center xl:hidden ${solid ? "text-burgundy" : "text-ivory"}`}
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
