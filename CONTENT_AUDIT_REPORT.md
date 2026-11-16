# Content Audit Report: Pandit Jewellers website (Marathi)

**Date:** 16 November 2026 (updated: "दुकान" used throughout, at the owner's request)
**Scope:** every page and every visible string, plus image alt text, screen-reader labels and SEO metadata.
**Result:** 17 files updated. The site builds without errors, has no type or lint errors, and has no horizontal overflow on desktop (1440px) or mobile (390px).

Design, layout, colours, font, URLs and functionality are unchanged. Only text, plus the way numbers are written (see section 4), was changed.

---

## 1. Pages and sections reviewed

| Area | Where the text lives |
|---|---|
| Header (search, quick links, category bar) | `data/content.ts` → `header`, `data/categories.ts` → `searchHints` |
| Mega menu (desktop category menu) | `data/content.ts` → `menu`, `data/categories.ts` |
| Mobile menu | `data/content.ts` → `mobile`, `components/layout/MobileMenu.tsx` |
| Homepage hero slider (3 slides) | `data/content.ts` → `hero`, `bridal`, `store` |
| "Pandit's collections" mosaic | `data/home.ts` → `collections`, `data/collections.ts` |
| Category filter + collection grid + search results / empty state | `data/home.ts` → `categories`, `data/content.ts` → `collections` |
| Picked for you | `data/home.ts` → `featured`, `data/content.ts` → `featured` |
| Jewellery by occasion | `data/home.ts` → `world` |
| Bridal banner | `data/content.ts` → `bridal` |
| Pandit's promise (why choose us) | `data/home.ts` → `promise`, `data/content.ts` → `craft` |
| About us | `data/content.ts` → `about` |
| Get in touch (visit / WhatsApp / phone tiles) | `data/home.ts` → `experience` |
| Showroom / store location | `data/content.ts` → `store` |
| Contact cards | `data/content.ts` → `contact` |
| Footer | `data/content.ts` → `footer`, `components/layout/Footer.tsx` |
| All-jewellery page `/collections` | `app/collections/page.tsx`, `components/pages/CategoryView.tsx` |
| 9 category pages `/collections/[id]` (necklaces, earrings, bangles, rings, mangalsutra, chains, daily wear, wedding, traditional) | `data/categories.ts`, `data/content.ts` → `categoryPage` |
| WhatsApp pre-filled messages | `data/content.ts` → `wa`, `categoryPage.enquireMsg` |
| Image alt text | `data/images.ts`, `data/collections.ts` |
| Page titles, meta descriptions, keywords | `app/layout.tsx`, `app/collections/page.tsx`, `app/collections/[id]/page.tsx` |

**Not on the site:** there are no forms, pop-ups, loading spinners or form validation messages. The only "empty state" is the search with no results, which is covered above. There is no silver jewellery section, and I did not add one, because the site gives no information that the shop sells silver (see section 8).

---

## 2. Grammar and sentence-structure fixes

| Before | After | Why |
|---|---|---|
| …दागिन्यांचे एक आपुलकीचे ठिकाण आहे, **अशा कुटुंबांसाठी जे** सौंदर्याइतकीच परंपरेलाही किंमत देतात. | सौंदर्याइतकेच परंपरेलाही महत्त्व देणाऱ्या कुटुंबांसाठी आम्ही… | The English relative-clause structure ("for families who…") is not natural in Marathi. It is now a participle phrase. |
| …सौंदर्य अनुभवा, **जिथे** शाश्वत परंपरा आणि उत्कृष्ट कारागिरी एकत्र येतात. | परंपरेचा साज आणि सुबक कारागिरीचा मेळ असलेले सोन्याचे दागिने, तुमच्या प्रत्येक खास क्षणासाठी. | A word-for-word English pattern ("where…") was rewritten as a natural Marathi phrase. |
| आधी आम्ही ऐकतो, म्हणजे तुम्ही दबावाशिवाय आत्मविश्वासाने निवड करू शकता. | आधी तुमची आवड समजून घेतो, म्हणजे दागिना निवडताना कोणतीही घाई किंवा दडपण नसते. | The original read as a direct translation. |
| भारतीय परंपरेतून **प्रेरित** दागिन्यांसह…प्रसंग साजरे करा. | लग्नाच्या प्रत्येक विधीला शोभेल असा पारंपरिक साज, तुमच्या आयुष्यातील सर्वात सुंदर दिवसासाठी. | "Inspired by" is a translated expression. The new line speaks directly to the wedding. |
| यापैकी कोणत्याही प्रकाराबद्दल विचारा. | **यांपैकी** कोणताही प्रकार आवडला तर आम्हाला नक्की विचारा. | Plural form "यांपैकी" (there are several styles). The CTA is also more welcoming. |
| `${name}: प्रकार` (e.g. "हार: प्रकार") | `${name}: निवडक प्रकार` | The heading was incomplete. |
| `"xyz" साठी निकाल` | `"xyz" साठीचे निकाल` | Correct possessive form. |
| आधुनिक पेंडंटसह. / नाजूक आणि सुबक. / भरीव आणि मजबूत. | आधुनिक पेंडंट असलेली रचना. / नाजूक आणि सुबक रचना. / भरीव आणि रुबाबदार रचना. | Sentence fragments were completed. |
| मला "${style}" (${cat}) बद्दल माहिती हवी आहे. | मला "${style}" (${cat}) या प्रकाराबद्दल माहिती हवी आहे. | The WhatsApp message reads properly now. |

## 3. Spelling (शुद्धलेखन) and punctuation

- I found no misspelled words in the existing copy. Spellings were checked, including व्हॉट्सॲप, पिढ्यानपिढ्या, घडणावळ, ठसठशीत, साखरपुडा, बारकावे, राणीहार and मंगळसूत्र.
- Terminal punctuation is now consistent. Full sentences end with a full stop (`.`); headings and labels do not. The deliberate full stop in the hero headlines ("परंपरा.", "क्षणांसाठी.") was kept as a style choice.
- The colon is used consistently for "list: description" lines, e.g. "पाटल्या, कडे आणि बांगड्या: …".

## 4. Consistent terminology (style guide)

| Concept | Use this | Replaced / avoided |
|---|---|---|
| Shop / showroom | **दुकान** (दुकानाला भेट द्या), chosen by the owner | दुकान (the two words were mixed before; दुकान is now used everywhere) |
| Phone call | **फोन करा** | कॉल करा (English) |
| Collection | **संग्रह** / दागिन्यांचा संग्रह | कलेक्शन्स ("पंडित कलेक्शन्स") |
| Bridal | **वधूचे दागिने** | वधू संग्रह / वधू-दागिने (was mixed) |
| Contact | **संपर्क साधा** (nav and CTA) | संपर्क (bare) |
| Directions | **नकाशावर मार्ग पाहा** / गूगल नकाशावर पत्ता पाहा | दिशा मिळवा (literal "get directions"), गूगल मॅप्समध्ये उघडा |
| Opening hours | **दुकानाची वेळ** | उघडण्याची वेळ (literal "opening time") |
| Finish / polish | **झळाळी, सफाई** | फिनिश (English) |
| Look | **पेहराव** | लुक (English) |
| Maharashtrian (warm) | **मराठमोळा / महाराष्ट्रीय** | (used in context) |
| Why-choose-us section | **पंडितचे वचन** (heading, nav link and About CTA now match) | "आमची कला" in nav pointed to a section titled "पंडितचे वचन" |

**Numbers:** Marathi (Devanagari) digits are used in running text, so the postal code is ४१३७०१, the list numbers are ०१, ०२, ०३, the category count is ९+ and the hours are १०:०० ते ६:००. Before this, ASCII and Devanagari digits were mixed on the same card. **Phone numbers stay in 0–9** so phones can recognise and dial them. A small helper `mrDigits()` was added in `lib/i18n.tsx` for this.

**English words kept on purpose:** टेम्पल, चोकर, पेंडंट, टॉप्स, अँटिक, चेन, ईमेल, व्हॉट्सॲप, इन्स्टाग्राम, सोशल मीडिया. These are the words customers in Maharashtra actually use in a jewellery shop, and the pure-Marathi alternatives would sound bookish.

## 5. Content rewritten

**Homepage**
- **Hero slide 1:** the description was rewritten (see section 2). The CTA changed from "संग्रह पाहा" to **"दागिन्यांचा संग्रह पाहा"**.
- **Hero slide 2 (bridal):** the description was rewritten. The CTA is now **"वधूचे दागिने पाहा"**.
- **Hero slide 3 / showroom:** "…पाहिल्यावरच खऱ्या कळतात" became "…पाहिल्यावरच **खऱ्या अर्थाने** कळतात". I removed the repeated "संग्रह पाहा" and the CTA now reads "…मनासारखा दागिना **निवडा**".
- **Section headings:**
  - "पंडित कलेक्शन्स" → **"पंडितचे खास संग्रह"**, with sub-line "आमच्या निवडक सोन्याच्या दागिन्यांवर एक नजर"
  - "तुमच्या पसंतीचे सोने शोधा" → **"तुमच्या आवडीचा दागिना निवडा"**. Its sub-line used to repeat the filter label ("प्रकारानुसार पाहा" appeared twice in a row) and is now "हार, कानातले, बांगड्यांपासून मंगळसूत्रापर्यंत".
  - "खास निवड" → **"खास तुमच्यासाठी"**
  - "पंडितचे विश्व / प्रत्येक प्रसंगासाठी सोबती" → **"प्रसंगानुसार दागिने / सण, समारंभ आणि रोजच्या दिवसासाठी"** (the section shows occasions)
  - "पंडितचा अनुभव" → **"आमच्याशी जोडले जा"**, with sub-line "दुकानात या, व्हॉट्सॲपवर विचारा किंवा थेट फोन करा"
- **Pandit's promise:**
  - "ग्राहककेंद्रित सेवा" (bookish) → **"मनापासून सेवा"**
  - "पारदर्शक किंमत" → **"किमतीविषयी स्पष्टता"**. The meaning is unchanged; see section 8.
  - Sub-line: "आम्ही काळजीपूर्वक निवडतो, तुम्ही मनापासून जपता"
- **About:**
  - Title: "परंपरेची अभिव्यक्ती. विश्वासाचे वचन." (stiff) → **"परंपरेची जपणूक, विश्वासाचे नाते."**
  - Both paragraphs were rewritten for natural flow.
  - Pillars: "शाश्वत रचना" → **"कालातीत रचना"**, and "दीर्घकालीन नाती" → **"विश्वासाचे नाते"**.
  - The CTA said "आमची कहाणी जाणून घ्या" but linked to the promise section, so it is now **"पंडितचे वचन जाणून घ्या"**.
- **Footer:** the about line was rewritten. The second tagline "सोन्यात घडलेली परंपरा" duplicated the hero headline and is now **"विश्वासाचे सोने, परंपरेचा साज"**. The "दुवे" heading is now **"झटपट दुवे"**.
- **Repetition removed:** "शाश्वत" appeared 6 times, "आपुलकी" 4 times and "बारकावे आणि झळाळी" twice. Each now appears at most once or twice, with different wording in each section.

**Category pages**
- I polished all 9 category intros and the 32 style descriptions. Examples:
  - Temple: "देवळांच्या नक्षीतून प्रेरित" → "मंदिरशिल्पांतील नक्षीकामावर आधारित"
  - Earrings: "प्रत्येक लुकसाठी" → "प्रत्येक पेहरावाला शोभणारे"
  - Mangalsutra: "पवित्र बंधनाचे प्रतीक" → "सौभाग्याचे पवित्र लेणे"
  - Bugadi: "कानाच्या वरच्या भागासाठी" → "कानाच्या वरच्या पाळीत घालायची मराठमोळी बुगडी"
  - Nath: "मोत्यांनी सजलेली पारंपरिक मराठमोळी नथ"
- Collection name: "पारंपरिक महाराष्ट्रीय" (an adjective with no noun) → **"महाराष्ट्रीय पारंपरिक दागिने"**.

## 6. CTA and UX microcopy

| Element | Before | After |
|---|---|---|
| Header / mobile quick link | दुकानाला भेट द्या / दुकानाला भेट | दुकानाला भेट द्या (same wording everywhere) |
| Phone CTA (header, mobile, contact card, tile) | कॉल करा / आम्हाला कॉल करा | फोन करा / आम्हाला फोन करा |
| Mobile WhatsApp | व्हॉट्सॲप चौकशी | व्हॉट्सॲपवर विचारा |
| Category grid "view all" | सर्व पाहा | सर्व दागिने पाहा |
| Filter label | प्रकारानुसार पाहा | प्रकारानुसार निवडा |
| Search empty state | या शोधासाठी संग्रह सापडला नाही. आम्हाला संदेश पाठवा, आम्ही दुकानातील दागिने दाखवू. | तुम्ही शोधलेला दागिना इथे सापडला नाही. व्हॉट्सॲपवर आम्हाला विचारा, दुकानात असलेले पर्याय आम्ही नक्की दाखवू. |
| Category page "related" | इतर प्रकार पाहा | इतर प्रकारही पाहा |
| Store directions button | दिशा मिळवा | नकाशावर मार्ग पाहा |
| Contact maps button | गूगल मॅप्समध्ये उघडा | गूगल नकाशावर पत्ता पाहा |
| Contact first card label | भेट द्या | दुकानाला भेट द्या |
| Nav / footer contact | संपर्क | संपर्क साधा |
| Bridal WhatsApp message | …तुमच्या वधू-दागिन्यांच्या संग्रहाबद्दल… | …वधूच्या दागिन्यांबद्दल… |
| Slider buttons (screen reader) | मागील / पुढील / स्लाइड 1 | मागील चित्र / पुढील चित्र / चित्र क्रमांक १ |
| Mobile menu (screen reader) | "Menu", "Mobile" (English) | मेनू, मोबाइल मेनू |

## 7. SEO improvements

- **Homepage title:** पंडित ज्वेलर्स | श्रीगोंदा येथील सोन्याचे दागिने (unchanged; already good).
- **Homepage description:** rewritten to name the products and the real address: "श्रीगोंदा येथील पंडित ज्वेलर्स हे पारंपरिक सोन्याच्या दागिन्यांचे दुकान आहे. सोन्याचे हार, मंगळसूत्र, बांगड्या, कानातले, अंगठ्या आणि वधूचे दागिने प्रत्यक्ष पाहण्यासाठी श्री संत रोहिदास चौक येथील दुकानाला भेट द्या."
- **Keywords:** Marathi search phrases now lead: श्रीगोंदा सोन्याचे दागिने, श्रीगोंदा ज्वेलर्स, **श्रीगोंदा सराफ**, पंडित ज्वेलर्स श्रीगोंदा, सोन्याचे मंगळसूत्र, वधूचे दागिने, पारंपरिक महाराष्ट्रीय दागिने, ठुशी नथ बुगडी, सोन्याच्या बांगड्या. One English phrase was kept for English-language searches.
- **`/collections` page:** the title was mixed Marathi and English ("सर्व दागिने · All Jewellery | …") and is now Marathi only: **"सर्व दागिने | पंडित ज्वेलर्स, श्रीगोंदा"**. The description was English and is now Marathi.
- **9 category pages:** the titles were mixed Marathi and English ("हार · Necklaces | पंडित ज्वेलर्स · Pandit Jewellers, Shrigonda") and are now e.g. **"हार | पंडित ज्वेलर्स, श्रीगोंदा"**. Each description is the Marathi intro plus "श्रीगोंदा येथील पंडित ज्वेलर्समध्ये प्रत्यक्ष पाहा." The social-share description is now Marathi.
- **Image alt text:** 9 alt texts were made more descriptive, for example "लाल पेहरावात पारंपरिक सोन्याचे दागिने परिधान केलेली वधू" and "दुकानात मांडलेली सोन्याची कडी आणि कानातले".
- **Heading structure:** each page has a single `h1`, and sections use `h2` and `h3`. This was checked and is unchanged. URLs are unchanged.

## 8. Business information to verify (flagged, not changed or invented)

1. **"किमतीविषयी स्पष्टता: किमतीबद्दल मोकळा संवाद…"** This was already on the site as "पारदर्शक किंमत". It is a promise about how the shop talks about prices, not a price or a policy. I kept it, worded softly. Please confirm the owner is happy making this promise.
2. **Bridal / traditional style lists** (e.g. टेम्पल हार, कोल्हापुरी साज, अँटिक बांगड्या, पुरुषांच्या चेन, लहान मुलांच्या चेन). The code notes say these are "common styles to enquire about, not a stock list". Please confirm the showroom actually carries each style.
3. **Durability and safety wording removed:** "टिकाऊ" (durable) on chains and "सुरक्षित" (safe) on kids' chains were product claims, so I replaced them with descriptive words (सुबक, नाजूक). Please confirm before adding them back.
4. **Silver jewellery:** nothing on the site says the shop sells silver, so no silver section or copy was added. If the shop does sell silver, please share details and I'll add a category.
5. **Brand story:** the About section stays deliberately general. It gives no founding year, no family history and no awards, because none were provided. Please send the real story if you want it on the site.
6. **WhatsApp number:** the site sends WhatsApp to +91 98815 38938, which is assumed to be the main number. Please confirm.
7. **Instagram / Facebook links:** these are still empty. The Instagram card is hidden and the footer icons are inactive until real profile links are added in `data/business.ts`.

No claims were added about BIS/hallmark, purity, prices, making charges, warranties, returns/exchange, years in business, testimonials or awards.

## 9. Remaining items for manual review

- **Native-speaker read-through:** please have one native Marathi reader from the shop go through the homepage once on a phone. Taste in tone (e.g. "मराठमोळा", "साज") is personal.
- **Photo captions:** the "खास तुमच्यासाठी" captions (वारसा संग्रह, थरदार हार, बारकाव्यांतील कलाकुसर) describe the stock photos. If you replace the photos with the shop's own, update the captions and alt text in `data/images.ts` and `data/content.ts → featured.captions`.
- **Repeated heading:** "सौंदर्य प्रत्यक्ष अनुभवा." appears both as hero slide 3 and as the showroom section title. This is because the slide reuses the section's text by design. If you want them to differ, give hero slide 3 its own text in `components/sections/Hero.tsx`.
- **English values behind the scenes:** `en` values remain in the data files. They are never shown, but they are used for Google's business data and the Maps search. They can be ignored when editing copy.
