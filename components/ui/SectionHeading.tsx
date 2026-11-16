import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

type Props = {
  /** Small gold label above the title. */
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  id?: string;
  /** Optional text link shown at the right of a left-aligned heading (below it on phones). */
  action?: { href: string; label: string };
};

/** Section heading: kicker, title and intro line, with an optional "view all" link. */
export default function SectionHeading({ eyebrow, title, accent, intro, align = "left", tone = "dark", id, action }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Reveal
      className={
        center
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
      }
    >
      <div className={center ? "" : "max-w-2xl"}>
        {eyebrow && <p className={`kicker ${light ? "!text-gold-soft" : ""}`}>{eyebrow}</p>}
        <h2 id={id} className={`t-h2 ${eyebrow ? "mt-3" : ""} ${light ? "text-white" : "text-burgundy-ink"}`}>
          {title}
          {accent && (
            <>
              {" "}
              <em className={light ? "text-gold-soft" : "text-burgundy"}>{accent}</em>
            </>
          )}
        </h2>
        {intro && <p className={`t-lead mt-3 text-pretty ${light ? "text-white/80" : "text-muted"} ${center ? "mx-auto max-w-2xl" : ""}`}>{intro}</p>}
      </div>
      {action && !center && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-gold/60 pb-1 font-semibold text-burgundy transition-colors hover:border-burgundy sm:self-auto"
        >
          {action.label}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={1.75} />
        </Link>
      )}
    </Reveal>
  );
}
