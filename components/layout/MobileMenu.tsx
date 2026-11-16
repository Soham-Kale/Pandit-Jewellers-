"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Phone, ChevronDown } from "lucide-react";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import { categories, categoryHref, collectionsFor } from "@/data/categories";
import Logo from "@/components/ui/Logo";
import Ornament from "@/components/ui/Ornament";
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
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ivory-glow lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="container-lux flex h-16 shrink-0 items-center justify-between border-b border-line">
            <Link href="/" onClick={onClose} aria-label={t.header.home}>
              <Logo />
            </Link>
            <button type="button" onClick={onClose} aria-label={t.header.closeMenu} className="grid size-11 place-items-center text-burgundy">
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-lux flex-1 overflow-y-auto pt-6">
            <p className="eyebrow text-gold-deep">{t.header.categories}</p>
            <ul className="mt-2">
              {categories.map((c) => {
                const subs =
                  c.styles.length > 0
                    ? c.styles.map((st) => ({ key: st.id, label: st.label[lang], href: `${categoryHref(c.id)}#style-${st.id}` }))
                    : c.id === "all"
                      ? []
                      : collectionsFor(c).map((col) => ({ key: col.slug, label: col.name[lang], href: categoryHref(c.id) }));
                const isOpen = expanded === c.id;
                const panelId = `m-cat-${c.id}`;
                return (
                  <li key={c.id} className="border-b border-line/80">
                    <div className="flex items-center">
                      <Link href={categoryHref(c.id)} onClick={onClose} className="flex flex-1 items-center gap-3 py-3.5 text-lg font-semibold text-burgundy">
                        <CategoryIconGlyph icon={c.icon} className="size-6 text-gold-deep" />
                        {c.label[lang]}
                      </Link>
                      {subs.length > 0 && (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          aria-label={`${c.label[lang]}: ${t.menu.styles}`}
                          onClick={() => setExpanded(isOpen ? null : c.id)}
                          className="grid size-11 place-items-center text-burgundy"
                        >
                          <ChevronDown className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.75} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden pl-9"
                        >
                          {subs.map((sub) => (
                            <li key={sub.key}>
                              <Link href={sub.href} onClick={onClose} className="block py-2.5 text-charcoal/85">
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-3">
                            <Link href={categoryHref(c.id)} onClick={onClose} className="block py-2.5 font-semibold text-gold-deep">
                              {t.menu.viewAll(c.label[lang])}
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <p className="eyebrow mt-8 text-gold-deep">{t.header.more}</p>
            <ul className="mt-2">
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-line/80">
                  <Link href={item.href} onClick={onClose} className="block py-3.5 text-lg font-semibold text-burgundy">
                    {item.label[lang]}
                  </Link>
                </li>
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
              <Link
                href="/#store"
                onClick={onClose}
                className="bg-shine flex min-h-12 items-center justify-center gap-2 rounded-full text-[0.82rem] font-semibold tracking-[0.1em] text-burgundy-ink uppercase"
              >
                <MapPin className="size-4" strokeWidth={1.75} aria-hidden /> {t.mobile.visit}
              </Link>
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
