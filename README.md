# Pundit Jewellers — brand website

A static, single-page brand website for Pundit Jewellers, a traditional gold
jewellery shop in Shrigonda, Maharashtra. Built with Next.js (App Router),
TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons. No backend,
database, auth or payments: all content lives in `data/`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
npm test         # SEO + smoke tests against the production build (run `npm run build` first)
npm run check    # lint + typecheck + build + test, all in one
```

Requires Node.js 20.9 or newer.

## Languages

The site is bilingual: **Marathi (default)** and English. Visitors switch with
the मराठी / EN toggle in the header (and mobile menu); their choice is
remembered in the browser. All copy lives in `data/content.ts` as `mr` and `en`
objects with the same shape, and names, captions and alt text elsewhere in
`data/` are `{ mr, en }` pairs. The whole site uses the Anek Devanagari font.

## Where to edit content

| What | File |
|---|---|
| Brand name, address, phone, WhatsApp, hours, social links, Google Maps link, domain | `data/business.ts` |
| Navigation and announcement bar text | `data/navigation.ts` |
| Jewellery categories (name, text, image) | `data/collections.ts` |
| Section headings and copy | `data/content.ts` |
| All other photographs and their alt text | `data/images.ts` |

To rename the brand (for example to "Pandit Jewellers"), change `name` and
`shortName` (both languages) in `data/business.ts`, plus the brand mentions in
`data/navigation.ts` and `data/content.ts`.

## ⚠️ Placeholders to replace before launch

Nothing below has been verified, so the site shows "To be confirmed" or falls
back gracefully until you fill it in (`data/business.ts`):

- **Street address and postal code** (`streetAddress`, `postalCode`)
- **Opening hours** (`openingHours`)
- **Phone number** (`phone`)
- **WhatsApp number** (`whatsapp`, digits with country code, e.g. `9198XXXXXXXX`).
  Until it is set, every WhatsApp button scrolls to the Contact section.
- **Instagram / Facebook links** (`instagram`, `facebook`)
- **Google Maps link** (`googleMapsUrl`). Until it is set, "Get Directions"
  opens a Google Maps search for "Pundit Jewellers Shrigonda Maharashtra".
- **Founder / owner and founding year** (`founder`, `foundingYear`). Lets Google
  and AI assistants answer "who founded Pandit Jewellers?". Adds a FAQ entry,
  a `Person` entity in structured data and a line in `/llms.txt` once filled.
- **Domain** (`siteUrl`, or set `NEXT_PUBLIC_SITE_URL`). Used for the canonical
  URL, sitemap, robots.txt, Open Graph and structured data.
- **Brand story copy** in `data/content.ts` (`about.paragraphs`) is general
  placeholder text. Do not add years, awards, certifications, hallmarking or
  exchange policies unless they are confirmed.

## SEO and AI search

- **Structured data** (`lib/seo.ts`): one linked graph of `JewelryStore`,
  `WebSite`, founder `Person`, `FAQPage`, and per-category `CollectionPage` +
  `BreadcrumbList`. Optional facts appear only once filled in `data/business.ts`.
- **FAQ** (`data/faq.ts`): shown on the homepage and published as `FAQPage`.
  Answers are generated from business data, so they never go stale.
- **`/llms.txt`**: plain-text summary for ChatGPT, Claude, Perplexity and Gemini.
- **`robots.txt`** explicitly allows search engines and AI crawlers;
  **`sitemap.xml`** lists every page with its images.
- Unknown URLs return a real HTTP 404 (`proxy.ts` + `app/not-found.tsx`).
- Search Console / Bing verification: set `GOOGLE_SITE_VERIFICATION` /
  `BING_SITE_VERIFICATION` env vars on the host.

**Off-site steps that matter most for local ranking** (no code can replace these):

1. Claim and complete the **Google Business Profile**: same name, address and
   phone as the site, category "Jeweler", photos, hours. Put its link in `googleMapsUrl`.
2. Submit `https://<domain>/sitemap.xml` in **Google Search Console** and **Bing Webmaster Tools**.
3. Ask happy customers for **Google reviews** and reply to them.
4. Add the website link to the Instagram/Facebook bios and fill `instagram`/`facebook`.
5. List the shop in Justdial, IndiaMART and Sulekha with the identical name/address/phone.

## Photography

All photos in `public/assets/` are stock images from Unsplash under the free
Unsplash License (commercial use allowed, no attribution required). Sources and
photographers are listed in `CREDITS.md`. Replace them with the shop's own
photography whenever possible, especially:

- `public/assets/store/store.jpg` (a jewellery display case, not the actual shop)
- `public/assets/about/about.jpg`
- `public/assets/collections/chains.jpg` (a modern chain style)

Keep the same file names, or update the paths in `data/images.ts` and
`data/collections.ts`.

## Structure

```
app/            layout (fonts, SEO metadata), page, sitemap.ts, robots.ts, globals.css
components/
  layout/       AnnouncementBar, Header, MobileMenu, Footer
  sections/     Hero, About, Collections, FeaturedJewellery, WhyChooseUs,
                BridalCollection, StoreLocation, Contact
  ui/           Button, SectionHeading, Reveal, Logo, Ornament, icons, MotionProvider
data/           business, navigation, collections, content, images
public/assets/  hero, about, collections, featured, bridal, store
```

Animations respect the visitor's "reduce motion" setting.

## Header mega-menu and category pages

- On desktop, hovering (or focusing) a category in the header opens a mega-menu: an intro with a "view all" link, the styles in that category, occasions, and two photo cards. "More" lists the page sections.
- On mobile, the menu lists every category; tap the arrow to expand its styles.
- Every category has its own page at `/collections/<id>` (and `/collections` for all jewellery), with a banner, style cards (each with a WhatsApp enquiry link), the filtered collection grid and related categories.
- Edit categories, their styles and their menu photos in `data/categories.ts`. The styles listed there are common examples, not a stock list; change them to match what the shop actually carries.

## Fonts and palette

- Marathi uses Anek Devanagari throughout. English headings use the serif Fraunces; English body text stays in Anek. Both are set in `app/layout.tsx`, and the heading rule is in `app/globals.css`.
- Colours (maroon, cream and gold) are the tokens at the top of `app/globals.css`.

## Homepage layout

The homepage follows a banner-led shop layout on a white background: a banner carousel, a three-tile collections mosaic, a category grid, three featured photo cards, a two-by-two occasion mosaic, a wide bridal banner, the shop's values, the about text, three contact tiles, the store details and the contact cards. Section headings and labels for these are in `data/home.ts`; English headings use the Fraunces serif.
