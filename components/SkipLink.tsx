"use client";

import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";

export default function SkipLink() {
  const { lang } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-burgundy focus:px-4 focus:py-2 focus:text-ivory"
    >
      {content[lang].skip}
    </a>
  );
}
