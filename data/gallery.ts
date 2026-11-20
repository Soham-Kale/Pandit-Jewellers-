/**
 * Jewellery photo gallery, tagged by category so it can be filtered.
 *
 * `categories` uses the ids from data/categories.ts (necklaces, earrings,
 * bangles, rings, mangalsutra, chains, daily, wedding, traditional). A photo
 * can belong to several. To add one: put it in /public/assets/gallery/ and add
 * an entry here; it appears automatically under every listed category.
 *
 * ⚠️ Every photo is used exactly once across the site. Photos already used as
 *    a banner, menu tile, card or section image (data/images.ts,
 *    data/categories.ts, data/collections.ts) must not be repeated here;
 *    `npm test` fails if one is.
 * ⚠️ Descriptions avoid unverified claims (carat, real diamonds or rubies, weight).
 */
import type { L } from "@/lib/lang";

export type GalleryItem = {
  src: string;
  title: L;
  alt: L;
  categories: string[];
  /** Wide banner photos span two columns on large screens. */
  wide?: boolean;
};

const g = (src: string, mr: string, en: string, altMr: string, altEn: string, categories: string[]): GalleryItem => ({
  src,
  title: { mr, en },
  alt: { mr: altMr, en: altEn },
  categories,
});

export const gallery: GalleryItem[] = [
  // Necklace sets
  g("/assets/gallery/ruby-emerald-necklace-set.jpg", "लाल-हिरव्या खड्यांचा हार सेट", "Red and Green Stone Necklace Set", "लाल आणि हिरव्या खड्यांचा सोन्याचा हार आणि कानातले", "Gold necklace and earrings set with red and green stones", ["necklaces", "earrings", "traditional", "wedding"]),
  g("/assets/gallery/gold-choker.jpg", "जाळीदार सोन्याचा चोकर", "Filigree Gold Choker", "फुलांच्या नक्षीचा आणि मण्यांच्या लटकनांचा जाळीदार सोन्याचा चोकर", "Filigree gold choker with flower motifs and bead drops", ["necklaces", "wedding", "traditional"]),
  g("/assets/gallery/gold-leaf-necklace-set.jpg", "पानांच्या नक्षीचा हार सेट", "Leaf Necklace Set", "पानांच्या आकारातील चमकदार खड्यांचा सोन्याचा हार आणि कानातले", "Gold necklace with leaf-shaped sparkling stones and matching earrings", ["necklaces", "earrings", "daily", "wedding"]),
  g("/assets/gallery/floral-diamond-necklace-set.jpg", "फुलांच्या नक्षीचा पांढरा हार सेट", "Floral White-Finish Set", "फुलांच्या नक्षीचा पांढऱ्या झळाळीचा खड्यांचा हार आणि कानातले", "White-finish floral necklace set with sparkling stones", ["necklaces", "earrings", "wedding"]),
  g("/assets/gallery/leaf-diamond-necklace-set.jpg", "पानांच्या नक्षीचा पांढरा हार सेट", "Leaf White-Finish Set", "पानांच्या नक्षीचा पांढऱ्या झळाळीचा नाजूक हार आणि कानातले", "Delicate white-finish leaf necklace with drop earrings", ["necklaces", "earrings", "daily"]),

  // Earrings
  g("/assets/gallery/round-top-jhumka.jpg", "गोल टॉपचे झुमके", "Round-Top Jhumkas", "खड्यांच्या गोल टॉपचे आणि मण्यांच्या घुंगरांचे सोन्याचे झुमके", "Gold jhumkas with round stone-set tops and bead fringe", ["earrings", "traditional"]),
  g("/assets/gallery/drop-earrings-ring.jpg", "लटकन कानातले आणि अंगठी", "Drop Earrings and Ring", "चमकदार खड्यांचे जाळीदार लटकन कानातले आणि जुळणारी अंगठी", "Filigree gold drop earrings with sparkling stones and a matching ring", ["earrings", "rings", "wedding"]),
  g("/assets/gallery/red-drop-earrings.jpg", "लाल खड्याचे लटकन कानातले", "Red Stone Drop Earrings", "फुलांच्या टॉपसह लाल खड्याचे सोन्याचे लटकन कानातले", "Gold drop earrings with a red stone and flower tops", ["earrings", "daily"]),
  g("/assets/gallery/red-leaf-drop-earrings.jpg", "पानांच्या नक्षीचे लटकन कानातले", "Leaf Drop Earrings", "पानांच्या नक्षीचे आणि लाल खड्याच्या लटकनाचे सोन्याचे कानातले", "Leaf-pattern gold earrings with a red stone drop", ["earrings", "daily", "wedding"]),
  g("/assets/gallery/filigree-drop-earrings.jpg", "जाळीदार लटकन कानातले", "Filigree Drop Earrings", "फुलांच्या टॉपचे जाळीदार सोन्याचे लटकन कानातले", "Filigree gold drop earrings with flower tops", ["earrings", "daily"]),
  g("/assets/gallery/double-row-hoops.jpg", "दुहेरी खड्यांच्या बाळ्या", "Double-Row Hoops", "दोन ओळी चमकदार खड्यांच्या सोन्याच्या बाळ्या", "Gold hoop earrings with two rows of sparkling stones", ["earrings", "daily"]),
  g("/assets/gallery/red-stone-hoops.jpg", "लाल खड्यांच्या बाळ्या", "Red Stone Hoops", "लाल आणि पांढऱ्या खड्यांच्या सोन्याच्या बाळ्या", "Gold hoop earrings with red and white stones", ["earrings", "daily"]),

  // Rings
  g("/assets/gallery/red-flower-ring.jpg", "लाल खड्याची फुलांची अंगठी", "Red Flower Ring", "मध्यभागी लाल खडा असलेली फुलांच्या नक्षीची सोन्याची अंगठी", "Gold flower ring with a red stone at the centre", ["rings", "daily"]),
  g("/assets/gallery/red-petal-ring.jpg", "पाकळ्यांची लाल खड्याची अंगठी", "Red Petal Ring", "चमकदार पाकळ्या आणि लाल खड्याची सोन्याची अंगठी", "Gold ring with sparkling petals around a red stone", ["rings", "wedding"]),
  g("/assets/gallery/red-lotus-ring.jpg", "कमळ नक्षीची लाल खड्याची अंगठी", "Red Lotus Ring", "कमळाच्या आकारातील लाल खड्याची सोन्याची अंगठी", "Lotus-shaped gold ring with a red stone", ["rings", "wedding"]),
  g("/assets/gallery/red-swirl-ring.jpg", "वळणदार लाल खड्याची अंगठी", "Red Swirl Ring", "खड्यांच्या वळणदार रचनेची लाल खड्याची सोन्याची अंगठी", "Swirl-design gold ring with stones and a red centre", ["rings", "daily"]),
  g("/assets/gallery/stone-flower-ring.jpg", "खड्यांची फुलांची अंगठी", "Stone Flower Ring", "चमकदार खड्यांच्या फुलाची सोन्याची अंगठी", "Gold ring with a flower of sparkling stones", ["rings", "daily"]),
  g("/assets/gallery/flower-wave-ring.jpg", "फुलांची वळणदार अंगठी", "Flower Wave Ring", "फुलाच्या नक्षीची आणि खड्यांच्या लहरीची सोन्याची अंगठी", "Gold ring with a stone flower and a wave of stones", ["rings", "daily"]),
  g("/assets/gallery/flower-band-ring.jpg", "नाजूक फुलांची अंगठी", "Dainty Flower Band", "बाजूला खडे असलेली नाजूक फुलांची सोन्याची अंगठी", "Slim gold band with a stone flower and side stones", ["rings", "daily"]),
  g("/assets/gallery/textured-stone-band.jpg", "नक्षीदार खड्यांची बँड अंगठी", "Textured Stone Band", "जाळीदार पोताची आणि खड्यांची सोन्याची बँड अंगठी", "Textured gold band set with small stones", ["rings", "daily"]),
  g("/assets/collections/rings.jpg", "सोन्याच्या अंगठ्यांची जोडी", "Pair of Gold Rings", "कापडावर ठेवलेल्या दोन सोन्याच्या अंगठ्या", "Two gold rings on cream fabric", ["rings", "wedding"]),

  // Bangles and bracelets
  g("/assets/gallery/bead-flower-bangle.jpg", "मण्यांची फुलांची बांगडी", "Bead Flower Bangle", "सोन्याच्या मण्यांची आणि खड्यांच्या फुलाची बांगडी", "Gold bead bangle with a stone-set flower", ["bangles", "traditional", "wedding"]),
  g("/assets/gallery/leaf-flower-bangle.jpg", "पानाफुलांची नाजूक बांगडी", "Leaf and Flower Bangle", "पाने आणि खड्यांच्या फुलाची नाजूक सोन्याची बांगडी", "Slim gold bangle with leaves and a stone flower", ["bangles", "daily"]),
  g("/assets/gallery/gold-bead-bracelet.jpg", "सोन्याच्या मण्यांचे ब्रेसलेट", "Gold Bead Bracelet", "जाळीदार आणि गुळगुळीत सोन्याच्या मण्यांचे ब्रेसलेट", "Bracelet of filigree and polished gold beads", ["bangles", "daily"]),
  g("/assets/gallery/marquise-stone-bracelet.jpg", "नेत्राकृती खड्यांचे ब्रेसलेट", "Marquise Stone Bracelet", "नेत्राकृती दुव्यांचे खड्यांनी सजलेले सोन्याचे ब्रेसलेट", "Gold bracelet with marquise-shaped stone-set links", ["bangles", "daily"]),
  g("/assets/gallery/stone-link-bracelet.jpg", "खड्यांच्या कड्यांचे ब्रेसलेट", "Stone Link Bracelet", "गोल कड्यांमध्ये खडे बसवलेले सोन्याचे ब्रेसलेट", "Gold bracelet of round links set with stones", ["bangles", "daily"]),
  g("/assets/gallery/stone-charm-bracelet.jpg", "खड्यांच्या लटकनांचे ब्रेसलेट", "Stone Charm Bracelet", "लहान खड्यांच्या लटकनांचे नाजूक सोन्याचे ब्रेसलेट", "Delicate gold bracelet with small stone charms", ["bangles", "daily"]),

  // Mangalsutra
  g("/assets/gallery/swirl-mangalsutra.jpg", "नक्षीदार मंगळसूत्र", "Swirl Mangalsutra", "हिरव्या खड्याच्या लटकनाचे वळणदार नक्षीचे मंगळसूत्र", "Mangalsutra with a swirl design and a green stone drop", ["mangalsutra", "daily"]),
  g("/assets/gallery/bead-mangalsutra.jpg", "सोन्याच्या मण्यांचे मंगळसूत्र", "Gold Bead Mangalsutra", "सोन्याचे मणी, काळे मणी आणि हिरव्या खड्याचे पेंडंट असलेले मंगळसूत्र", "Mangalsutra with gold beads, black beads and a green stone pendant", ["mangalsutra", "traditional", "daily"]),

  // Pendants and chains
  g("/assets/gallery/gold-chain.jpg", "सोन्याची चेन", "Gold Chain", "रोज घालता येईल अशी सोन्याची चेन", "Gold chain for everyday wear", ["chains", "daily"]),
  g("/assets/gallery/red-flower-pendant.jpg", "लाल खड्याचे फुलांचे पेंडंट", "Red Flower Pendant", "लाल खड्याचे फुलांच्या आकाराचे पेंडंट आणि चेन", "Flower-shaped red stone pendant on a gold chain", ["chains", "daily", "wedding"]),
  g("/assets/gallery/red-swirl-pendant.jpg", "लाल खड्याचे वळणदार पेंडंट", "Red Swirl Pendant", "वळणदार नक्षीचे लाल खड्याचे पेंडंट आणि चेन", "Swirl-design red stone pendant on a gold chain", ["chains", "daily"]),
  g("/assets/gallery/red-flame-pendant.jpg", "ज्योत आकाराचे पेंडंट", "Flame Pendant", "ज्योतीच्या आकाराचे लाल खड्याचे पेंडंट आणि चेन", "Flame-shaped red stone pendant on a gold chain", ["chains", "daily"]),
  g("/assets/gallery/infinity-pendant-worn.jpg", "इन्फिनिटी पेंडंट", "Infinity Pendant", "इन्फिनिटी आकाराचे पेंडंट आणि बाळी परिधान केलेली स्त्री", "Woman wearing an infinity pendant chain and hoop earrings", ["chains", "earrings", "daily"]),
  g("/assets/gallery/heart-pendant-daily-set.jpg", "हार्ट पेंडंट सेट", "Heart Pendant Set", "हृदयाकृती पेंडंट चेन, फुलांचे टॉप्स, अंगठी आणि ब्रेसलेट", "Heart pendant chain, flower studs, a ring and a bracelet", ["daily", "chains", "earrings", "rings"]),
  g("/assets/gallery/flower-pendant-daily-set.jpg", "फुलांचा पेंडंट सेट", "Flower Pendant Set", "फुलांचे पेंडंट, टॉप्स आणि ब्रेसलेट यांचा सोन्याचा सेट", "Gold flower pendant, studs and bracelet set", ["daily", "chains", "earrings", "bangles"]),

  // Traditional
  g("/assets/gallery/gold-anklet.jpg", "सोन्याचे पैंजण", "Gold Anklet", "घुंगरांच्या लटकनांचे सोन्याचे पैंजण", "Gold anklet with clustered bead drops", ["traditional", "daily"]),
];

export const galleryFor = (categoryId: string) =>
  categoryId === "all" ? gallery : gallery.filter((p) => p.categories.includes(categoryId));
