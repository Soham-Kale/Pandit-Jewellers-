import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "@/components/SkipLink";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
