"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;
const line = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang].hero;
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex h-[calc(100svh-2.25rem)] max-h-[980px] min-h-[640px] items-end overflow-hidden bg-burgundy-ink text-ivory lg:items-center"
    >
      <motion.div className="absolute inset-0 -z-10" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease: EASE }}>
        <Image
          src={images.hero.src}
          alt={images.hero.alt[lang]}
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[58%_center] lg:object-center"
        />
      </motion.div>
      {/* Lighter, warm veil so the jewellery stays bright while text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-burgundy-ink/90 via-burgundy-ink/40 to-transparent lg:bg-gradient-to-r lg:from-burgundy-ink/80 lg:via-burgundy-ink/25 lg:to-transparent"
      />

      <div className="container-lux pt-[calc(var(--header-h)+2rem)] pb-20 lg:pb-0">
        <div className="max-w-[42rem]">
          <motion.p {...line(0.3)} className="eyebrow flex items-center gap-4 text-gold-soft">
            <span aria-hidden className="h-px w-10" style={{ background: "var(--gold-shine)" }} />
            {t.eyebrow}
          </motion.p>
          <motion.h1 id="hero-title" {...line(0.45)} className="mt-5 text-[3rem] font-semibold drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-[5.75rem]">
            {t.titleLead} <em className="text-shine">{t.titleAccent}</em>
          </motion.h1>
          <motion.p {...line(0.6)} className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/90 sm:text-xl">
            {t.description}
          </motion.p>
          <motion.div {...line(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="#collections" variant="gold" arrow>
              {t.primary}
            </Button>
            <Button href="#store" variant="outline-light">
              {t.secondary}
            </Button>
          </motion.div>
          <motion.p {...line(0.9)} className="mt-9 hidden text-lg text-gold-soft/90 sm:block">
            {t.altLine}
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-sm text-ivory/70 transition-colors hover:text-ivory lg:flex"
      >
        {t.scroll}
        <ChevronDown className="size-4" strokeWidth={1.5} aria-hidden />
      </motion.a>
    </section>
  );
}
