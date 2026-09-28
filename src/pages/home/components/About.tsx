import { useState } from "react";
import { useTranslation } from "react-i18next";

type WordKey = "state" | "making" | "playing";

interface PrincipleItem {
  n: string;
  t: string;
  b: string;
}

interface ConvertItem {
  room: string;
  time: string;
  brain: string;
}

interface FactItem {
  k: string;
  v: string;
}

export default function About() {
  const { t } = useTranslation();

  const words: Record<WordKey, string[]> = {
    state: t("about.state", { returnObjects: true }) as string[],
    making: t("about.making", { returnObjects: true }) as string[],
    playing: t("about.playing", { returnObjects: true }) as string[],
  };
  const principles = t("about.principles", { returnObjects: true }) as PrincipleItem[];
  const convert = t("about.convert", { returnObjects: true }) as ConvertItem[];
  const facts = t("about.facts", { returnObjects: true }) as FactItem[];

  const [wordIdx, setWordIdx] = useState<Record<WordKey, number>>({
    state: 0,
    making: 0,
    playing: 0,
  });
  const [pulsed, setPulsed] = useState<WordKey | null>(null);
  const [activeConvert, setActiveConvert] = useState<number>(0);

  const cycle = (k: WordKey) => {
    setWordIdx((s) => ({ ...s, [k]: (s[k] + 1) % words[k].length }));
    setPulsed(k);
    window.setTimeout(() => setPulsed((p) => (p === k ? null : p)), 450);
  };

  const renderSwap = (k: WordKey, accent = false) => {
    const text = words[k][wordIdx[k]];
    const isPulsed = pulsed === k;
    return (
      <button
        type="button"
        onClick={() => cycle(k)}
        aria-label={text}
        className={`relative inline-block align-baseline cursor-pointer group focus:outline-none ${
          accent ? "text-clay" : ""
        }`}
      >
        <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current opacity-40 group-hover:opacity-80 transition-opacity" />
        <span
          key={text}
          className={`inline-block fade-up ${isPulsed ? "-translate-y-1" : ""} transition-transform duration-300`}
        >
          {text}
        </span>
      </button>
    );
  };

  const current = convert[activeConvert];

  return (
    <section
      id="about"
      className="relative bg-oat py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-1/3 w-px bg-ink/10 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 left-2/3 w-px bg-ink/10 pointer-events-none hidden md:block" />

      {/* Section index */}
      <div className="relative flex items-baseline justify-between mb-10 md:mb-14">
        <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("about.index")}</span>
        <span className="text-xs md:text-sm font-mono-label text-ink/60 hidden md:block">
          {t("about.tag")}
        </span>
      </div>

      {/* Manifesto pull quote with interactive words */}
      <div className="relative max-w-5xl">
        <p className="font-display text-2xl sm:text-3xl md:text-5xl leading-[1.3] tracking-tight text-ink">
          {renderSwap("state")}
          {t("about.sentence.end1")}
          <br className="hidden md:block" />
          {t("about.sentence.pre2")}
          {renderSwap("making", true)}
          {t("about.sentence.mid2")}
          <br className="hidden md:block" />
          {renderSwap("playing")}
          {t("about.sentence.end3")}
        </p>

        <div className="mt-6 md:mt-8 flex items-center gap-3 text-[11px] md:text-xs font-mono-label text-ink/60">
          <span className="block h-px w-10 bg-ink/40" />
          <span>{t("about.hint")}</span>
        </div>
      </div>

      {/* CONVERTER — room event → brain adventure */}
      <div className="relative mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <span className="text-xs md:text-sm font-mono-label text-ink/60">
              {t("about.convertKicker")}
            </span>
            <h4 className="font-display font-bold text-xl md:text-3xl tracking-tight mt-1">
              <a href="#about" className="hover:opacity-70">
                {t("about.convertTitle")}
              </a>
            </h4>
          </div>
          <p className="text-xs md:text-sm text-ink/60">
            {t("about.convertHint")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* room events */}
          <div className="md:col-span-5 flex flex-col gap-2 md:gap-3">
            {convert.map((c, i) => {
              const isActive = i === activeConvert;
              return (
                <button
                  key={c.room}
                  type="button"
                  onClick={() => setActiveConvert(i)}
                  aria-pressed={isActive}
                  className={`flex items-center justify-between gap-4 text-left rounded-lg px-4 md:px-5 py-3.5 md:py-4 border transition-colors cursor-pointer ${
                    isActive
                      ? "bg-ink text-linen border-ink"
                      : "bg-linen/50 text-ink border-ink/15 hover:border-ink/50"
                  }`}
                >
                  <span className="font-display text-base md:text-xl">{c.room}</span>
                  <span className={`text-[11px] md:text-xs font-mono-label ${isActive ? "text-linen/60" : "text-ink/45"}`}>
                    {c.time}
                  </span>
                </button>
              );
            })}
          </div>

          {/* brain version */}
          <div className="md:col-span-7">
            <div className="relative h-full rounded-lg border border-ink/15 bg-linen/60 p-6 md:p-10 flex flex-col justify-center min-h-[220px] overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, rgba(201,122,95,0.14), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="text-xs md:text-sm font-mono-label text-ink/55 mb-4">
                  {t("about.brainLabel")}
                </p>
                <p key={activeConvert} className="fade-up font-display text-2xl md:text-4xl leading-[1.3] tracking-tight text-ink">
                  {current.brain}
                </p>
                <div className="mt-6 flex items-center gap-3 text-[11px] md:text-xs font-mono-label text-ink/55">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-home-4-line" /> {current.room}
                  </span>
                  <span className="block h-px w-8 bg-ink/30" />
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-flight-takeoff-line" /> {t("about.brainTag")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINCIPLES */}
      <div className="relative mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-ink/15 pt-10 md:pt-14">
        {principles.map((p) => (
          <article key={p.n} className="relative">
            <span className="absolute -top-2 right-0 text-[60px] md:text-[88px] leading-none font-display font-bold opacity-10 select-none">
              {p.n}
            </span>
            <p className="text-xs md:text-sm font-mono-label text-ink/60">
              {t("about.principleLabel", { n: p.n })}
            </p>
            <h4 className="font-display font-bold text-xl md:text-2xl tracking-tight mt-2">
              {p.t}
            </h4>
            <p className="mt-3 text-sm md:text-[15px] text-ink/75 leading-relaxed max-w-sm">
              {p.b}
            </p>
          </article>
        ))}
      </div>

      {/* Facts strip */}
      <div className="relative mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ink/15 pt-8 md:pt-10">
        {facts.map((f) => (
          <div key={f.k}>
            <p className="text-[10px] md:text-xs font-mono-label text-ink/55">{f.k}</p>
            <p className="text-sm md:text-base mt-1">{f.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}