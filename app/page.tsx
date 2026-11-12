import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import FeaturedJewellery from "@/components/sections/FeaturedJewellery";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BridalCollection from "@/components/sections/BridalCollection";
import StoreLocation from "@/components/sections/StoreLocation";
import Contact from "@/components/sections/Contact";
import StructuredData from "@/components/StructuredData";
import SkipLink from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Collections />
        <FeaturedJewellery />
        <WhyChooseUs />
        <BridalCollection />
        <StoreLocation />
        <Contact />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
