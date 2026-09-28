import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/pages/home/components/Header";
import Footer from "@/pages/home/components/Footer";
import { works } from "@/mocks/works";
import type { WorkFormatKey } from "@/mocks/works";
import { series } from "@/mocks/series";

interface StepItem {
  n: string;
  t: string;
  b: string;
}

export default function WorkPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "index">("grid");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo<string[]>(
    () => ["all", ...Array.from(new Set(works.map((w) => w.formatKey)))],
    []
  );

  const filtered = useMemo(() => {
    if (filter === "all") return works;
    return works.filter((w) => w.formatKey === filter);
  }, [filter]);

  const steps = t("workPage.steps", { returnObjects: true }) as StepItem[];

  const stats = [
    { v: String(works.length).padStart(2, "0"), k: t("workPage.statWorks") },
    { v: String(series.length).padStart(2, "0"), k: t("workPage.statSeries") },
    { v: t("workPage.statEssayValue"), k: t("workPage.statEssay") },
    { v: t("workPage.statPlaceValue"), k: t("workPage.statPlace") },
  ];

  const formatLabel = (key: string) =>
    key === "all" ? t("workPage.filterAll") : t(`formats.${key as WorkFormatKey}`);

  return (
    <div className="min-h-screen bg-oat text-ink overflow-x-hidden">
      <Header />
      <main id="main-content" className="pt-14 md:pt-16">
        {/* Page intro */}
        <section className="relative bg-oat px-6 md:px-10 pt-10 md:pt-14 pb-6 md:pb-10">
          <div className="absolute inset-y-0 left-1/3 w-px bg-ink/10 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-ink/10 pointer-events-none hidden md:block" />

          <div className="flex items-center gap-3 mb-6 text-xs md:text-sm font-mono-label text-ink/60">
            <Link to="/" className="hover:opacity-60 transition-opacity cursor-pointer">{t("workPage.breadcrumbHome")}</Link>
            <span>/</span>
            <span>{t("workPage.breadcrumb")}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 relative items-end">
            <div className="md:col-span-7">
              <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("workPage.kicker")}</span>
              <h1 className="font-display font-bold text-[16vw] md:text-[10vw] leading-[0.95] tracking-tight mt-3">
                {t("workPage.title")}
              </h1>
            </div>
            <div className="md:col-span-5 md:pb-8">
              <p className="text-base md:text-lg leading-relaxed max-w-md">
                {t("workPage.lead")}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16">
            {stats.map((s) => (
              <div key={s.k} className="border-t border-ink pt-3">
                <p className="font-display text-2xl md:text-4xl tracking-tight">{s.v}</p>
                <p className="text-xs font-mono-label text-ink/60 mt-1">{s.k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filter + View controls */}
        <section className="sticky top-14 md:top-16 z-30 bg-oat/95 backdrop-blur border-y border-ink/10 px-6 md:px-10 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`text-xs md:text-sm font-mono-label px-4 py-2 rounded-full border whitespace-nowrap transition-colors cursor-pointer ${
                    filter === c
                      ? "bg-ink text-linen border-ink"
                      : "bg-transparent text-ink border-ink/20 hover:border-ink/60"
                  }`}
                >
                  {formatLabel(c)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-mono-label text-ink/60 mr-2">
                {t("workPage.count", { count: filtered.length })}
              </span>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label={t("workPage.gridView")}
                className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
                  view === "grid" ? "bg-ink text-linen border-ink" : "border-ink/20 hover:border-ink/60"
                }`}
              >
                <i className="ri-layout-grid-line text-base" />
              </button>
              <button
                type="button"
                onClick={() => setView("index")}
                aria-label={t("workPage.listView")}
                className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
                  view === "index" ? "bg-ink text-linen border-ink" : "border-ink/20 hover:border-ink/60"
                }`}
              >
                <i className="ri-list-check-2 text-base" />
              </button>
            </div>
          </div>
        </section>

        {/* Items */}
        {view === "grid" ? (
          <section className="px-6 md:px-10 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((w, i) => {
                const title = t(`works.${w.contentKey}.title`);
                const seriesLabel = t(`series.items.${w.seriesId}.title`);
                return (
                  <Link key={w.id} to={`/work/${w.slug}`} className="group block">
                    <div className="relative bg-sand/40 rounded-lg overflow-hidden aspect-[4/5]">
                      <img
                        src={w.image}
                        alt={`${title} — ${seriesLabel}`}
                        title={`${title} ${seriesLabel}`}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <span className="bg-linen/95 text-ink text-[10px] md:text-xs font-mono-label px-2.5 py-1 rounded-full">
                          {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                        </span>
                        <span className="bg-ink text-linen text-[10px] md:text-xs font-mono-label px-2.5 py-1 rounded-full max-w-[60%] truncate">
                          {seriesLabel}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-mono-label text-ink/60">{t(`formats.${w.formatKey}`)}</p>
                        <h3 className="font-display font-bold text-lg md:text-xl tracking-tight mt-1 group-hover:opacity-70 transition-opacity">
                          {title}
                        </h3>
                        <p className="text-xs md:text-sm text-ink/60 mt-1 max-w-[240px]">
                          {t(`works.${w.contentKey}.summary`)}
                        </p>
                      </div>
                      <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 group-hover:bg-ink group-hover:text-linen group-hover:border-ink transition-colors">
                        <i className="ri-arrow-right-up-line text-base" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="px-6 md:px-10 py-8 md:py-12">
            <div className="border-t border-ink">
              {filtered.map((w, i) => (
                <Link
                  key={w.id}
                  to={`/work/${w.slug}`}
                  className="group grid grid-cols-12 gap-4 md:gap-6 items-center border-b border-ink py-4 md:py-5 hover:bg-ink hover:text-linen transition-colors duration-300 px-1 md:px-2"
                >
                  <span className="col-span-2 md:col-span-1 text-xs md:text-sm font-mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-7 md:col-span-5 font-display font-bold text-base md:text-2xl tracking-tight">
                    {t(`works.${w.contentKey}.title`)}
                  </span>
                  <span className="hidden md:inline col-span-3 text-sm font-mono-label opacity-70">
                    {t(`formats.${w.formatKey}`)}
                  </span>
                  <span className="col-span-2 md:col-span-2 text-xs md:text-sm font-mono-label text-right md:text-left">
                    {t(`series.items.${w.seriesId}.title`)}
                  </span>
                  <span className="col-span-1 flex justify-end w-8 h-8 items-center">
                    <i className="ri-arrow-right-up-line text-xl" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Process strip */}
        <section className="relative bg-ink text-linen px-6 md:px-10 py-20 md:py-28">
          <div className="flex items-baseline gap-3 md:gap-5 mb-10 md:mb-14">
            <span className="text-xs md:text-sm font-mono-label text-linen/60">{t("workPage.processKicker")}</span>
            <h3 className="font-display font-bold text-2xl md:text-4xl tracking-tight">
              {t("workPage.processTitle")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-linen/30 pt-4">
                <span className="text-xs font-mono-label text-linen/50">{s.n}</span>
                <h4 className="font-display font-bold text-xl md:text-2xl tracking-tight mt-2">
                  {s.t}
                </h4>
                <p className="text-sm md:text-base text-linen/70 mt-3 leading-relaxed">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}