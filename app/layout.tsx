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


const title = `${business.name.mr} | ${business.city.mr} येथील सोन्याचे दागिने`;
const description = `${business.name.mr}, ${business.city.mr} (${business.state.mr}) येथील पारंपरिक सोन्याच्या दागिन्यांचे दालन: सोन्याचे हार, बांगड्या, कानातले, मंगळसूत्र आणि वधूचे दागिने.`;

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
    url: "/",
    siteName: business.name.mr,
    title,
    description,
    images: [{ url: "/assets/hero/hero.jpg", alt: `${business.name.mr}, ${business.city.mr}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/hero/hero.jpg"] },
  robots: { index: true, follow: true },
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
