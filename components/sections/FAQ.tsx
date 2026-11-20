import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Faq } from "@/data/faq";

/**
 * Visible FAQ (Marathi). Matches the FAQPage structured data on the homepage,
 * which search engines require to be shown on the page. Uses native <details>
 * so it works without JavaScript and every answer is in the HTML for crawlers.
 */
export default function FAQ({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-silk">
      <div className="container-lux">
        <SectionHeading
          id="faq-title"
          eyebrow="नेहमी विचारले जाणारे प्रश्न"
          title="तुमच्या प्रश्नांची उत्तरे"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-gold/40 border-y border-gold/40">
          {faqs.map((f, i) => (
            <details key={i} className="group py-5" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="t-h4 text-burgundy-ink">{f.q.mr}</h3>
                <ChevronDown
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-5 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="t-body mt-3 text-charcoal/85">{f.a.mr}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
