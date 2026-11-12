import Reveal from "./Reveal";
import Ornament from "./Ornament";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  id?: string;
};

export default function SectionHeading({ eyebrow, title, accent, intro, align = "center", tone = "dark", id }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className={`eyebrow ${light ? "text-gold-soft" : "text-gold-deep"} ${center ? "" : "flex items-center gap-4"}`}>
        {!center && <span aria-hidden className="h-px w-10 bg-gold" />}
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-[2.3rem] font-semibold text-balance sm:text-5xl lg:text-[3.5rem] ${light ? "text-ivory" : "text-burgundy"}`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className={light ? "text-shine" : "text-shine-deep"}>{accent}</em>
          </>
        )}
      </h2>
      {center && <Ornament className="mx-auto mt-5" tone={tone} />}
      {intro && (
        <p className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${light ? "text-ivory/80" : "text-muted"} ${center ? "mx-auto max-w-2xl" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
