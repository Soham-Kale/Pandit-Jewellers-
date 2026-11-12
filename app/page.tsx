import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import FeaturedJewellery from "@/components/sections/FeaturedJewellery";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BridalCollection from "@/components/sections/BridalCollection";
import StoreLocation from "@/components/sections/StoreLocation";
import Contact from "@/components/sections/Contact";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Collections initialCategory="all" />
      <FeaturedJewellery />
      <WhyChooseUs />
      <BridalCollection />
      <StoreLocation />
      <Contact />
      <StructuredData />
    </SiteShell>
  );
}
