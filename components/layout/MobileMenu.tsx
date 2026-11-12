"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Ornament from "@/components/ui/Ornament";
import LanguageToggle from "@/components/ui/LanguageToggle";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { mainNav } from "@/data/navigation";
import { content } from "@/data/content";
import { locationLine, whatsappLink, phoneLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const t = content[lang];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const wa = whatsappLink(t.wa.general);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ivory-glow xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="container-lux flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
            <a href="#home" onClick={onClose} aria-label={t.header.home}>
              <Logo />
            </a>
            <button type="button" onClick={onClose} aria-label={t.header.closeMenu} className="grid size-11 place-items-center text-burgundy">
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-lux flex-1 overflow-y-auto pt-6">
            <LanguageToggle className="mb-6" />
            <ul>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                  className="border-b border-line/80"
                >
                  <a href={item.href} onClick={onClose} className="flex items-baseline justify-between py-4 text-[1.9rem] leading-snug font-semibold text-burgundy">
                    {item.label[lang]}
                    <span className="text-sm text-gold-deep">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <Ornament className="mt-8" />
          </nav>

          <div className="container-lux grid shrink-0 gap-3 border-t border-line py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <a
              href={wa}
              onClick={onClose}
              {...extProps(wa)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-burgundy text-[0.85rem] font-semibold tracking-[0.12em] text-ivory uppercase"
            >
              <WhatsAppIcon /> {t.mobile.whatsapp}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#store"
                onClick={onClose}
                className="bg-shine flex min-h-12 items-center justify-center gap-2 rounded-full text-[0.82rem] font-semibold tracking-[0.1em] text-burgundy-ink uppercase"
              >
                <MapPin className="size-4" strokeWidth={1.75} aria-hidden /> {t.mobile.visit}
              </a>
              <a
                href={phoneLink()}
                onClick={onClose}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold text-[0.82rem] font-semibold tracking-[0.1em] text-burgundy uppercase"
              >
                <Phone className="size-4" strokeWidth={1.75} aria-hidden /> {t.mobile.call}
              </a>
            </div>
            <p className="text-center text-sm text-muted">{locationLine(lang)}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
