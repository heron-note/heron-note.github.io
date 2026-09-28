import { useTranslation } from "react-i18next";
import { series } from "@/mocks/series";
import type { SeriesItem } from "@/mocks/series";

const accentMap: Record<
  SeriesItem["accent"],
  { text: string; border: string; bg: string; chip: string }
> = {
  clay: { text: "text-clay", border: "border-clay", bg: "bg-clay", chip: "bg-clay/10 text-clay border-clay/30" },
  sage: { text: "text-sageDeep", border: "border-sageDeep", bg: "bg-sageDeep", chip: "bg-sageDeep/10 text-sageDeep border-sageDeep/30" },
  ink: { text: "text-ink", border: "border-ink", bg: "bg-ink", chip: "bg-ink/10 text-ink border-ink/30" },
  charcoal: { text: "text-charcoal", border: "border-charcoal", bg: "bg-charcoal", chip: "bg-charcoal/10 text-charcoal border-charcoal/30" },
  stone: { text: "text-stone", border: "border-stone", bg: "bg-stone", chip: "bg-stone/15 text-charcoal border-stone/40" },
};

interface SeriesText {
  title: string;
  reading: string;
  tagline: string;
  description: string;
  status: string;
  features: string[];
}

export default function SeriesSection() {
  const { t } = useTranslation();
  const main = series.find((s) => s.isMain);
  const rest = series.filter((s) => !s.isMain);

  const mainText = main
    ? (t(`series.items.${main.id}`, { returnObjects: true }) as SeriesText)
    : null;

  return (
    <section
      id="series"
      className="relative bg-oat py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-1/3 w-px bg-ink/10 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 left-2/3 w-px bg-ink/10 pointer-events-none hidden md:block" />

      {/* Header */}
      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("series.index")}</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            {t("series.title")}
          </h2>
        </div>
        <p className="text-sm md:text-base text-ink/70 max-w-md md:text-right">
          {t("series.lead")}
        </p>
      </div>

      {/* Main series feature */}
      {main && mainText && (
        <article className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 border border-ink/15 rounded-lg p-6 md:p-10 bg-linen/70 mb-6 md:mb-8">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-ink text-linen">
                <i className={`${main.icon} text-xl`} />
              </span>
              <div className="flex items-center gap-2 text-xs md:text-sm font-mono-label text-ink/60">
                <span>{main.index}</span>
                <span className="px-2 py-0.5 rounded-full bg-clay text-linen text-[10px] md:text-[11px]">
                  {t("series.mainBadge")}
                </span>
              </div>
            </div>
            <h3 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-none">
              {mainText.title}
            </h3>
            <p className="text-xs md:text-sm font-mono-label text-ink/50 mt-3">{mainText.reading}</p>
            <p className={`font-display text-xl md:text-2xl mt-5 ${accentMap[main.accent].text}`}>
              {mainText.tagline}
            </p>
            <p className="text-sm md:text-base text-ink/75 leading-relaxed mt-5 max-w-xl">
              {mainText.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {mainText.features.map((f) => (
                <span
                  key={f}
                  className={`text-[11px] md:text-xs font-mono-label px-3 py-1 rounded-full border ${accentMap[main.accent].chip}`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 md:border-l md:border-ink/15 md:pl-10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs md:text-sm font-mono-label text-ink/50 mb-2">
                {t("series.nowLabel")}
              </p>
              <p className="text-sm md:text-base text-ink">{mainText.status}</p>
            </div>
            <a
              href={main.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-between gap-3 bg-ink text-linen rounded-full px-5 py-3.5 text-sm md:text-base hover:bg-clay transition-colors cursor-pointer whitespace-nowrap w-full"
            >
              <span className="font-display">{t("series.readOnNote")}</span>
              <i className="ri-arrow-right-up-line text-lg" />
            </a>
          </div>
        </article>
      )}

      {/* Rest grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {rest.map((s) => {
          const a = accentMap[s.accent];
          const text = t(`series.items.${s.id}`, { returnObjects: true }) as SeriesText;
          return (
            <article
              key={s.id}
              className="group relative border border-ink/15 rounded-lg p-6 md:p-8 bg-linen/50 hover:bg-linen transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-10 h-10 flex items-center justify-center rounded-full ${a.bg} text-linen`}>
                  <i className={`${s.icon} text-lg`} />
                </span>
                <span className="text-xs md:text-sm font-mono-label text-ink/50">{s.index}</span>
              </div>

              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-tight">
                {text.title}
              </h3>
              <p className="text-[11px] md:text-xs font-mono-label text-ink/45 mt-1.5">{text.reading}</p>

              <p className={`font-display text-base md:text-lg mt-4 ${a.text}`}>{text.tagline}</p>
              <p className="text-sm text-ink/70 leading-relaxed mt-3 flex-1">{text.description}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {text.features.map((f) => (
                  <span
                    key={f}
                    className={`text-[10px] md:text-[11px] font-mono-label px-2.5 py-1 rounded-full border ${a.chip}`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-ink/10">
                <span className="text-[11px] md:text-xs font-mono-label text-ink/50">{text.status}</span>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[12px] md:text-sm border border-ink rounded-full px-4 py-2 hover:bg-ink hover:text-linen transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t("series.open")}
                  <i className="ri-arrow-right-up-line" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}