"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { collections } from "@/data/collections";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

export default function Collections() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section id="collections" aria-labelledby="collections-title" className="section-y bg-surface">
      <div className="container-lux">
        <SectionHeading id="collections-title" eyebrow={t.collections.eyebrow} title={t.collections.title} intro={t.collections.intro} />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12"
        >
          {collections.map((c) => {
            const name = c.name[lang];
            const href = whatsappLink(t.wa.collection(name));
            return (
              <motion.li key={c.slug} variants={staggerChild}>
                <a href={href} {...extProps(href)} aria-label={t.collections.exploreAria(name)} className="group block">
                  <div className="frame-shine relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ivory-deep shadow-[0_24px_50px_-30px_rgba(122,28,44,0.55)] transition-shadow duration-700 group-hover:shadow-[0_30px_60px_-28px_rgba(122,28,44,0.75)]">
                    <Image
                      src={c.image}
                      alt={c.alt[lang]}
                      fill
                      quality={80}
                      sizes="(min-width: 1024px) 24vw, 48vw"
                      className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.07]"
                    />
                    {/* light sheen that sweeps across on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.2s] ease-luxe group-hover:translate-x-full"
                    />
                    <span className="bg-shine absolute right-3 bottom-3 grid size-10 place-items-center rounded-full text-burgundy-ink opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100 sm:right-4 sm:bottom-4">
                      <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-burgundy sm:text-2xl">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{c.description[lang]}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-colors group-hover:text-burgundy">
                    {t.collections.explore}
                    <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
