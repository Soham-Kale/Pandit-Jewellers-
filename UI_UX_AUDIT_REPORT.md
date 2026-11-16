# UI/UX Audit & Redesign Report — पंडित ज्वेलर्स, श्रीगोंदा

Scope: full visual and UX redesign of the Marathi-only site, keeping the existing stack (Next.js 16, React 19, Tailwind v4, framer-motion, lucide-react), routes, SEO metadata, structured data, filter/search logic, logo, the purple + gold palette and the single Anek Devanagari font. No new dependencies were added and no photos were swapped.

## 1. Audit findings (before)

- **No type system.** Headings used ad-hoc sizes (`text-3xl`, `text-5xl sm:text-6xl`, …) so the same level looked different from section to section.
- **Uneven rhythm.** Vertical padding and heading-to-content gaps varied per section; some sections felt cramped, others empty.
- **Too many competing treatments.** Gold frames, shine borders, heavy shadows, badges and ornaments appeared on almost every block, so nothing stood out.
- **Hero was static** and the strongest selling points (shop location, hours, WhatsApp) sat far down the page.
- **Product cards had no direct action**: visitors could not enquire about a piece from the card.
- **Store section had no map**, and the contact block repeated the same buttons as the store block.
- **Header** cast a permanent shadow and its category bar overflowed by ~118px at 1024px width (horizontal page scroll on small laptops/tablets in landscape).
- **Footer** was an inset rounded card that broke the full-width rhythm of the page.

## 2. Design system added (`app/globals.css`)

| Token / class | Use |
|---|---|
| `.t-display` | Hero and banner headlines (fluid 2.25 → 4.25rem) |
| `.t-h2` | Section titles (1.9 → 2.85rem) |
| `.t-h3` / `.t-h4` | Card titles / list titles |
| `.t-lead`, `.t-body`, `.t-caption` | Intro text, body copy (1.0625rem / 1.8 line-height for Devanagari), captions |
| `.kicker` | Small gold label with a hairline, above every section title |
| `.section-y`, `.section-tight`, `.head-gap` | One fluid spacing scale for sections, bands and heading → content gaps |
| `.zoom-img` | Shared slow image zoom on card hover |
| `--color-mist` (#f6f2fa) | Soft lavender section background used to alternate with white |

Image ratios are now consistent: 4:5 for product and category cards, 3:4 for occasion cards, 16:10 for secondary mosaic tiles.

Buttons (`components/ui/Button.tsx`) were reduced to five clear variants (gold, purple, light, outline-light, outline-dark), all 48px tall for comfortable tapping.

## 3. Sections redesigned

Home page order: Hero → Highlights → Featured collections mosaic → All categories → Bridal banner → Shop by occasion → Our promise → Featured jewellery → About → Visit the shop (map) → Contact → Footer. Backgrounds alternate dark / mist / white so each section reads as its own chapter.

| Section | What changed |
|---|---|
| **Header** | Glassy white bar; shadow appears only after scrolling; desktop bar compacts slightly on scroll; softer gold hairline; category bar fits at 1024px (icons show from 1280px). |
| **Hero** (`Hero.tsx`) | Full-bleed three-slide carousel using the site's own photos: (1) collection, (2) Maharashtrian traditional, (3) visit the shop. Gold primary CTA + WhatsApp CTA, progress lines with Marathi numerals, arrows, pauses on hover/focus. Only one `h1` on the page. |
| **Highlights** (new) | Strip directly under the hero: address, hours, WhatsApp number, traditional jewellery. Each links to the right place. |
| **Collections mosaic** | One tall feature (हार) with two stacked tiles (बांगड्या, मंगळसूत्र), each with name, one-line description and arrow. |
| **All categories** (`Collections.tsx`) | Left-aligned heading, filter chips, uniform 4:5 cards with title, arrow and description, a dark "view all" card. Search/filter logic unchanged. |
| **Bridal banner** | Kept as the single dark cinematic moment mid-page, cleaner gradient and type. |
| **Shop by occasion** | Four 3:4 cards (लग्नसराई, पारंपरिक, रोजच्या वापरासाठी, सर्व दागिने) with short descriptions. |
| **Our promise** (`WhyChooseUs.tsx`) | Title + intro on the left, four values as a quiet hairline-ruled list on the right. Wording unchanged from the content audit. |
| **Featured jewellery** | Product cards now have a **"व्हॉट्सॲपवर चौकशी"** button that opens WhatsApp with the piece's name pre-filled. Swipe row on phones, 4-column grid on desktop. |
| **About** | Portrait with offset gold frame, story, three numbered pillars, link to the promise section. Removed the decorative badge. |
| **Visit the shop** (`StoreLocation.tsx`) | Address, hours and both phone numbers (tap to call) beside an embedded Google Map (lazy-loaded), with Directions and WhatsApp buttons. |
| **Contact** | Four clean cards (address, phone, WhatsApp, email); on narrow phones they become compact icon-left rows. One clear WhatsApp CTA. |
| **Floating WhatsApp** (new) | Round purple button appears after the visitor scrolls past the hero; on desktop it expands to show its label on hover. |
| **Footer** | Full-width dark purple with a gold hairline, same content, better line-height. |
| **Category pages** (`CategoryView.tsx`) | Banner uses the type scale with a readable gradient on phones; style cards are clean white cards on mist with an enquire link; related categories as simple tiles; closing CTA band in mist instead of a second dark block next to the footer. |
| **Mega menu** | Second image tile now reads "{category} पाहा" instead of a bare "पाहा". |

The "Experience" section was removed from the home page (its role is now covered by the hero, highlights and store sections). Its file was deleted; the unused `experience` text in `data/home.ts` is harmless and was left in place.

## 4. Interactions & animation

- Scroll reveals (fade + 18px rise, 0.85s) and staggered card entrances via the existing framer-motion `Reveal` helpers.
- Slow image zoom on card hover, arrow nudge on links, colour fills on outline buttons and icon rings.
- Hero: crossfade with a gentle 7s "push-in" on the image, animated progress line, autoplay that pauses on hover/focus.
- **Reduced motion respected**: `MotionConfig reducedMotion="user"` plus a global CSS rule that stops keyframe animations; the hero carousel does not autoplay when the visitor prefers reduced motion (verified).

## 5. Responsive testing

Tested home, `/collections` and a category page at **360, 390, 768, 1024 and 1440px** with Playwright:

- No horizontal page overflow at any width (the 1024px header overflow found in the audit is fixed).
- Swipe row for featured jewellery snaps with the page gutter.
- Highlights become a 2×2 grid on phones (icons hidden to give the text room).
- Mobile menu, mega menu and search verified working.
- **No console errors** on any tested page.

## 6. Performance notes

- All images still go through `next/image` with explicit `sizes`, so phones download smaller files.
- Map iframe uses `loading="lazy"`; nothing heavy loads above the fold except the first hero image.
- Hero animations are CSS keyframes (GPU-friendly transform/opacity only).
- No new packages; one component removed. `tsc`, `eslint` and `next build` all pass.

## 7. Remaining limitations / needs from the shop

1. **Photos**: most images are still the placeholder/stock photos listed in `CREDITS.md`. Real photos of the shop's own jewellery and storefront will make the biggest difference to how premium the site feels. Keep them roughly 4:5 for products.
2. **Map pin**: the embedded map searches by address text, so the pin may be approximate. Pasting the shop's exact Google Maps "Embed a map" link into `data/business.ts` will fix it.
3. **Instagram / Facebook links** are still pending, so those footer icons show as inactive.
4. **WhatsApp number** uses +91 98815 38938; please confirm this is the WhatsApp number.
5. **Silver** jewellery is not shown anywhere; add a category if the shop sells it.
6. No prices, purity claims, hallmark claims, years in business, awards or testimonials were added, as none were provided.
