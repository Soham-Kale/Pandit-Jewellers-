import type { Metadata, Viewport } from "next";
import { Anek_Devanagari } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";
import MotionProvider from "@/components/ui/MotionProvider";
import { LanguageProvider } from "@/lib/i18n";

const anek = Anek_Devanagari({
  variable: "--font-anek",
  subsets: ["devanagari", "latin"],
  display: "swap",
  axes: ["wdth"],
});

const title = `${business.name.mr} | ${business.city.mr} येथील सोन्याचे दागिने · ${business.name.en} | Gold Jewellery in ${business.city.en}`;
const description = `${business.name.mr}, ${business.city.mr} (${business.state.mr}) येथील पारंपरिक सोन्याच्या दागिन्यांचे दालन. ${business.name.en} is a traditional gold jewellery shop in ${business.city.en}, ${business.state.en}: gold necklaces, bangles, earrings, mangalsutra and bridal jewellery.`;

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  keywords: [
    "gold jewellery shop in Shrigonda",
    "jewellery shop in Shrigonda",
    "traditional gold jewellery",
    "bridal jewellery in Shrigonda",
    "gold bangles and necklaces",
    "श्रीगोंदा सोन्याचे दागिने",
    "श्रीगोंदा ज्वेलर्स",
    "मंगळसूत्र",
    "वधूचे दागिने",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    alternateLocale: ["en_IN"],
    url: "/",
    siteName: business.name.en,
    title,
    description,
    images: [{ url: "/assets/hero/hero.jpg", alt: `${business.name.en}, ${business.city.en}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/hero/hero.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#7A1C2C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mr" className={`${anek.variable} antialiased`}>
      <body className="min-h-dvh">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
