"use client";

import { announcement } from "@/data/navigation";
import { useLang } from "@/lib/i18n";

export default function AnnouncementBar() {
  const { lang } = useLang();
  return (
    <div className="relative z-[60] bg-wine-glow text-gold-soft">
      <p className="container-lux flex h-9 items-center justify-center gap-3 text-center text-[0.72rem] font-medium tracking-[0.14em] uppercase sm:text-[0.8rem] sm:tracking-[0.22em]">
        <span aria-hidden className="hidden h-px w-10 bg-gradient-to-r from-transparent to-gold sm:block" />
        <span className="truncate">{announcement[lang]}</span>
        <span aria-hidden className="hidden h-px w-10 bg-gradient-to-l from-transparent to-gold sm:block" />
      </p>
    </div>
  );
}
