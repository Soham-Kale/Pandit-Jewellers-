"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { business, whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

/** Small WhatsApp button in the corner. It appears only after the banner, so it never covers the first view. */
export default function FloatingWhatsApp() {
  const { lang } = useLang();
  const t = content[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!business.whatsapp) return null;
  const href = whatsappLink(t.wa.general);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          {...extProps(href)}
          aria-label={t.ui.floatingWhatsapp}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-burgundy p-3.5 text-white shadow-[0_14px_30px_-12px_rgba(34,16,58,0.7)] ring-1 ring-gold/50 transition-colors hover:bg-burgundy-deep sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-6" strokeWidth={1.6} />
          <span className="hidden max-w-0 overflow-hidden font-semibold whitespace-nowrap transition-[max-width,padding] duration-500 ease-luxe group-hover:max-w-[12rem] group-hover:pr-1.5 lg:inline">
            {t.ui.floatingWhatsapp}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
