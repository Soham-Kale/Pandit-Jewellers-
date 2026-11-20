import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import Button from "@/components/ui/Button";
import { business, whatsappLink } from "@/data/business";

export const metadata: Metadata = {
  title: `पान सापडले नाही | ${business.name.mr}`,
  robots: { index: false, follow: true },
};

/** Branded 404 that keeps visitors on the site (served with HTTP 404). */
export default function NotFound() {
  return (
    <SiteShell>
      <section className="section-y bg-silk">
        <div className="container-lux mx-auto max-w-2xl text-center">
          <p className="kicker">४०४</p>
          <h1 className="t-h2 mt-3 text-burgundy-ink">तुम्ही शोधत असलेले पान सापडले नाही.</h1>
          <p className="t-body mt-5 text-charcoal/85">
            हे पान हलवले गेले असेल किंवा पत्ता चुकीचा असेल. आमचे सर्व दागिने पाहा किंवा व्हॉट्सॲपवर आम्हाला विचारा.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/collections" variant="burgundy" arrow>
              सर्व दागिने पाहा
            </Button>
            <Button href="/" variant="outline-dark">
              मुखपृष्ठावर जा
            </Button>
            <Button href={whatsappLink()} variant="outline-dark">
              व्हॉट्सॲपवर विचारा
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
