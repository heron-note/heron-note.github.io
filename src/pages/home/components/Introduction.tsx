import { useTranslation } from "react-i18next";

const NOTE_URL = "https://note.com/nifty_sheep7386/m/maa584642dc87";

const PROMISE_ICONS = ["ri-pencil-line", "ri-check-double-line", "ri-time-line"];

interface PromiseItem {
  title: string;
  body: string;
}

interface SpecItem {
  k: string;
  v: string;
}

export default function Introduction() {
  const { t } = useTranslation();

  const manifesto = t("intro.manifesto", { returnObjects: true }) as string[];
  const promises = t("intro.promises", { returnObjects: true }) as PromiseItem[];
  const spec = t("intro.spec", { returnObjects: true }) as SpecItem[];

  return (
    <section
      id="main-series"
      className="relative bg-ink text-linen py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* faint cosmic field — the inside of the head */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 12%, rgba(201,122,95,0.22), transparent 52%), radial-gradient(circle at 14% 82%, rgba(143,160,143,0.16), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          { top: "12%", left: "8%", s: "5px" },
          { top: "22%", left: "88%", s: "7px" },
          { top: "46%", left: "16%", s: "4px" },
          { top: "60%", left: "74%", s: "6px" },
          { top: "82%", left: "40%", s: "4px" },
          { top: "34%", left: "52%", s: "3px" },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-linen/30"
            style={{ top: d.top, left: d.left, width: d.s, height: d.s }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Header row */}
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-mono-label text-linen/60">
            {t("intro.kicker")}
          </span>
          <span className="text-xs md:text-sm font-mono-label text-linen/60 hidden md:block">
            {t("intro.reading")}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold text-[13vw] md:text-[10vw] leading-[1] tracking-tight">
          {t("intro.title")}
        </h2>
        <p className="mt-5 md:mt-7 text-base md:text-xl text-linen/75 max-w-2xl leading-relaxed">
          {t("intro.lead")}
        </p>

        {/* Manifesto — the five lines, big */}
        <div className="mt-12 md:mt-20 max-w-4xl">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`font-display text-2xl sm:text-3xl md:text-5xl leading-[1.25] tracking-tight border-t border-linen/15 py-4 md:py-6 ${
                i === 2 ? "text-clay" : "text-linen"
              }`}
            >
              <span className="font-mono-label text-xs md:text-sm text-linen/40 mr-3 md:mr-5 align-middle">
                0{i + 1}
              </span>
              {line}
            </p>
          ))}
          <div className="border-t border-linen/15" />
        </div>

        {/* Two column: promises + spec */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-14 md:mt-20">
          <div className="md:col-span-7">
            <p className="text-xs md:text-sm font-mono-label text-linen/60 mb-6">
              {t("intro.promisesKicker")}
            </p>
            <div className="flex flex-col gap-5 md:gap-6">
              {promises.map((p, i) => (
                <article key={p.title} className="flex gap-4 md:gap-6">
                  <span className="shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-linen/25 text-linen">
                    <i className={`${PROMISE_ICONS[i]} text-xl`} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg md:text-2xl tracking-tight">{p.title}</h3>
                    <p className="text-sm md:text-base text-linen/70 mt-2 leading-relaxed max-w-lg">
                      {p.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-lg border border-linen/20 bg-linen/5 p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs md:text-sm font-mono-label text-linen/60 mb-5">
                <i className="ri-sticky-note-line" />
                <span>{t("intro.specKicker")}</span>
              </div>
              <dl className="flex flex-col">
                {spec.map((s) => (
                  <div
                    key={s.k}
                    className="flex items-center justify-between gap-4 border-b border-linen/10 py-3 last:border-b-0"
                  >
                    <dt className="text-xs md:text-sm text-linen/50 font-mono-label">{s.k}</dt>
                    <dd className="text-sm md:text-base text-linen text-right">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={NOTE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex w-full items-center justify-between gap-3 bg-linen text-ink rounded-full px-6 py-4 text-sm md:text-base hover:bg-linen/85 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="font-display">{t("intro.cta")}</span>
              <i className="ri-arrow-right-up-line text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}