import Reveal from "./Reveal";

type Props = {
  /** Kept for callers; the heading style no longer shows an eyebrow. */
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  id?: string;
};

/** Section title with a lighter serif sub-line beneath it. */
export default function SectionHeading({ title, accent, intro, align = "center", tone = "dark", id }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <h2 id={id} className={`text-[2rem] text-balance sm:text-[2.5rem] ${light ? "text-white" : "text-burgundy-ink"}`}>
        {title}
        {accent && (
          <>
            {" "}
            <em className={light ? "text-gold-soft" : "text-burgundy"}>{accent}</em>
          </>
        )}
      </h2>
      {intro && <p className={`subhead mt-1.5 text-pretty ${light ? "text-white/80" : "text-muted"} ${center ? "mx-auto max-w-2xl" : ""}`}>{intro}</p>}
    </Reveal>
  );
}
