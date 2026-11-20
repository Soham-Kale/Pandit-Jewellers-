import type { Metadata, Viewport } from "next";
import { Anek_Devanagari } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";
import MotionProvider from "@/components/ui/MotionProvider";
import { LanguageProvider } from "@/lib/i18n";

// The only typeface on the site.
const anek = Anek_Devanagari({
  variable: "--font-anek",
  subsets: ["devanagari", "latin"],
  display: "swap",
  axes: ["wdth"],
});


const title = `${business.name.mr} (${business.name.en}) | ${business.city.mr} येथील सोन्याचे दागिने`;
const description = `${business.city.mr} येथील ${business.name.mr} हे पारंपरिक सोन्याच्या दागिन्यांचे दुकान आहे. सोन्याचे हार, मंगळसूत्र, बांगड्या, कानातले, अंगठ्या आणि वधूचे दागिने प्रत्यक्ष पाहण्यासाठी श्री संत रोहिदास चौक येथील दुकानाला भेट द्या.`;

/** Search Console / Bing Webmaster verification codes, set as env vars on the host. */
const verification: Metadata["verification"] = {
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  applicationName: business.name.en,
  authors: [{ name: business.name.en, url: business.siteUrl }],
  creator: business.name.en,
  publisher: business.name.en,
  category: "shopping",
  verification,
  other: {
    "geo.region": "IN-MH",
    "geo.placename": business.city.en,
  },
  keywords: [
    "Pandit Jewellers Shrigonda",
    "jewellers in Shrigonda",
    "gold jewellery Shrigonda",
    "Shrigonda jewellery shop",
    "bridal jewellery Shrigonda",
    "mangalsutra Shrigonda",
    "श्रीगोंदा सोन्याचे दागिने",
    "श्रीगोंदा ज्वेलर्स",
    "श्रीगोंदा सराफ",
    "पंडित ज्वेलर्स श्रीगोंदा",
    "सोन्याचे मंगळसूत्र",
    "वधूचे दागिने",
    "पारंपरिक महाराष्ट्रीय दागिने",
    "ठुशी नथ बुगडी",
    "सोन्याच्या बांगड्या",
    "gold jewellery shop in Shrigonda",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: "/",
    siteName: business.name.mr,
    title,
    description,
    images: [{ url: "/assets/social/share.jpg", width: 1200, height: 630, alt: `${business.name.mr}, ${business.city.mr}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social/share.jpg"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#6A2A86",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mr" className={`${anek.variable} font-sans antialiased`}>
      <body className="min-h-dvh">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
