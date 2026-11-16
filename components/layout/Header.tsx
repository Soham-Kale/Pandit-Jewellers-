"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Menu, MapPin, Phone, Search, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import MobileMenu from "./MobileMenu";
import MegaMenu from "./MegaMenu";
import { categories, categoryHref, searchHints } from "@/data/categories";
import { content } from "@/data/content";
import { whatsappLink, phoneLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";
import { showCollections, setFilter, useFilter } from "@/lib/filter";

const MORE_ID = "more";

function SearchBar({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const t = content[lang].header;
  const { query } = useFilter();
  const [hint, setHint] = useState(0);
  const inputId = useId();

  // Rotate the placeholder through a few example searches.
  useEffect(() => {
    const id = window.setInterval(
      () => setHint((h) => (h + 1) % searchHints.length),
      3500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        showCollections({ category: "all" });
      }}
      className={`group relative flex h-11 min-w-0 items-center rounded-full border border-line bg-surface shadow-[inset_0_1px_2px_rgba(34,16,58,0.06)] transition-colors focus-within:border-gold lg:h-12 ${className}`}
    >
      <Search
        aria-hidden
        className="ml-4 size-[1.1rem] shrink-0 text-gold-deep"
        strokeWidth={1.8}
      />
      <label htmlFor={inputId} className="sr-only">
        {t.search}
      </label>
      <input
        id={inputId}
        data-search
        type="search"
        value={query}
        onChange={(e) => setFilter({ query: e.target.value, category: "all" })}
        placeholder={searchHints[hint][lang]}
        autoComplete="off"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-[0.98rem] text-charcoal placeholder:text-muted/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          aria-label={t.clear}
          onClick={() => setFilter({ query: "" })}
          className="grid size-9 place-items-center text-muted hover:text-burgundy"
        >
          <X className="size-4" strokeWidth={1.8} />
        </button>
      )}
      <button
        type="submit"
        className="bg-shine mr-1 hidden h-9 items-center rounded-full px-4 text-sm font-semibold text-burgundy-ink sm:inline-flex lg:h-10 lg:px-5"
      >
        {t.searchButton}
      </button>
    </form>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...extProps(href)}
      aria-label={label}
      title={label}
      className="group flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-burgundy transition-colors hover:text-gold-deep"
    >
      <span className="grid size-6 place-items-center">{children}</span>
      <span className="hidden text-[0.72rem] font-medium whitespace-nowrap text-muted group-hover:text-gold-deep xl:block">
        {label}
      </span>
    </a>
  );
}

export default function Header() {
  const { lang } = useLang();
  const t = content[lang];
  const pathname = usePathname();
  const currentCat = pathname?.startsWith("/collections/")
    ? pathname.split("/")[2]
    : pathname === "/collections"
      ? "all"
      : "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  // Hover intent: open after a short pause, close after leaving the bar + panel.
  const openMenu = useCallback((id: string) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(id), 120);
  }, []);
  const closeMenu = useCallback((delay = 160) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(null), delay);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappLink(t.wa.general);

  return (
    <>
      <header
        id="site-header"
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-500 ${scrolled ? "shadow-[0_18px_32px_-22px_rgba(34,16,58,0.22)]" : ""}`}
      >
        {/* Row 1: logo · search · actions */}
        <div
          className={`container-lux flex h-16 items-center gap-3 transition-[height] duration-500 ease-luxe lg:gap-8 ${scrolled ? "lg:h-[4.25rem]" : "lg:h-20"}`}
        >
          <Link href="/" aria-label={t.header.home} className="flex shrink-0 items-center">
            <Logo />
          </Link>

          <SearchBar className="mx-auto hidden w-full max-w-xl md:flex" />

          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
            <div className="hidden items-center lg:flex">
              <IconLink href="/#store" label={t.header.visit}>
                <MapPin className="size-[1.3rem]" strokeWidth={1.5} />
              </IconLink>
              <IconLink href={phoneLink()} label={t.header.call}>
                <Phone className="size-[1.2rem]" strokeWidth={1.5} />
              </IconLink>
              <IconLink href={wa} label={t.header.whatsapp}>
                <WhatsAppIcon className="size-[1.3rem]" />
              </IconLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.header.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center text-burgundy lg:hidden"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile/tablet: the category bar collapses once the visitor scrolls (no search bar on phones) */}
        <div
          id="header-collapsible"
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-luxe lg:!grid-rows-[1fr] lg:!opacity-100 ${
            scrolled
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <div className="overflow-hidden lg:overflow-visible">

            {/* Row 2: category bar with icons. Desktop: hover opens a mega-menu; click opens the category page. */}
            <nav
              aria-label={t.header.categories}
              className="border-t border-line/80"
              onMouseLeave={() => closeMenu()}
            >
              <ul className="no-scrollbar container-lux flex h-12 items-center gap-1 overflow-x-auto lg:h-[3.25rem] lg:justify-between lg:gap-0 lg:overflow-visible">
                {[
                  ...categories.map((c) => ({
                    id: c.id,
                    icon: c.icon,
                    label: c.label[lang],
                    href: categoryHref(c.id),
                  })),
                  {
                    id: MORE_ID,
                    icon: "more" as const,
                    label: t.header.more,
                    href: "/#about",
                  },
                ].map((c) => {
                  const active = currentCat === c.id || menu === c.id;
                  return (
                    <li
                      key={c.id}
                      className="shrink-0"
                      onMouseEnter={() => openMenu(c.id)}
                      onFocus={() => setMenu(c.id)}
                    >
                      <Link
                        href={c.href}
                        onClick={() => setMenu(null)}
                        aria-expanded={menu === c.id}
                        aria-current={currentCat === c.id ? "page" : undefined}
                        className={`group relative flex h-10 items-center gap-2 rounded-full px-3 text-[0.92rem] lg:px-2 xl:px-3 font-medium whitespace-nowrap transition-colors duration-300 ${
                          active
                            ? "text-burgundy"
                            : "text-charcoal/85 hover:text-burgundy"
                        }`}
                      >
                        <CategoryIconGlyph
                          icon={c.icon}
                          className={`size-5 shrink-0 lg:hidden xl:block ${active ? "text-gold-deep" : "text-burgundy/80 group-hover:text-gold-deep"}`}
                        />
                        {c.label}
                        <span
                          aria-hidden
                          className={`absolute inset-x-3 -bottom-[3px] h-0.5 origin-center rounded-full transition-transform duration-500 ease-luxe ${
                            active
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                          style={{ background: "var(--gold-shine)" }}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div
                className="hidden lg:block"
                onMouseEnter={() => window.clearTimeout(timer.current)}
              >
                <AnimatePresence>
                  {menu && (
                    <MegaMenu
                      key={menu}
                      id={menu}
                      onNavigate={() => setMenu(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>
        </div>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px opacity-60"
          style={{ background: "var(--gold-shine)" }}
        />
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
