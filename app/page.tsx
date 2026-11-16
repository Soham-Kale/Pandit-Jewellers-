import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import FeaturedJewellery from "@/components/sections/FeaturedJewellery";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BridalCollection from "@/components/sections/BridalCollection";
import StoreLocation from "@/components/sections/StoreLocation";
import Contact from "@/components/sections/Contact";
import { CollectionsMosaic, PromoBanners } from "@/components/sections/HomeMosaics";
import StructuredData from "@/components/StructuredData";

/**
 * Homepage journey: who and where (banner + highlights) → browse (signature
 * collections, every category) → be inspired (bridal, occasions) → trust
 * (promise, featured pieces, about) → visit and contact.
 */
export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Highlights />
      <CollectionsMosaic />
      <Collections initialCategory="all" />
      <BridalCollection />
      <PromoBanners />
      <WhyChooseUs />
      <FeaturedJewellery />
      <About />
      <StoreLocation />
      <Contact />
      <StructuredData />
    </SiteShell>
  );
}
