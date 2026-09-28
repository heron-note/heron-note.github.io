import { useEffect, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { works } from "@/mocks/works";
import Header from "@/pages/home/components/Header";
import Footer from "@/pages/home/components/Footer";

export default function WorkDetail() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { work, prev, next } = useMemo(() => {
    const i = works.findIndex((w) => w.slug === slug);
    return {
      work: i >= 0 ? works[i] : null,
      prev: i >= 0 ? works[(i - 1 + works.length) % works.length] : null,
      next: i >= 0 ? works[(i + 1) % works.length] : null,
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!work) {
    return (
      <div className="min-h-screen bg-oat text-ink flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
          <p className="text-xs font-mono-label text-ink/60 mb-4">[ 404 ]</p>
          <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-6">
            {t("workDetail.notFound")}
          </h1>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm md:text-base bg-ink text-linen rounded-full px-5 md:px-6 py-3 md:py-3.5 hover:bg-clay transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line text-base" />
            {t("workDetail.backToWorks")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const title = t(`works.${work.contentKey}.title`);
  const summary = t(`works.${work.contentKey}.summary`);
  const description = t(`works.${work.contentKey}.description`);
  const seriesLabel = t(`series.items.${work.seriesId}.title`);
  const formatLabel = t(`formats.${work.formatKey}`);

  return (
    <div className="min-h-screen bg-oat text-ink overflow-x-hidden">
      <Header />

      <main id="main-content" className="bg-linen text-ink pt-14 md:pt-16">
        {/* Top bar: breadcrumbs + prev/next */}
        <div className="sticky top-14 md:top-16 z-30 bg-linen border-b border-ink">
          <div className="flex items-center justify-between px-6 md:px-10 h-14 md:h-16">
            <div className="flex items-center gap-4 md:gap-6 text-[13px] md:text-sm font-mono-label">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <i className="ri-arrow-left-line text-base" />
                <span>{t("workDetail.breadcrumbWorks")}</span>
              </Link>
              <span className="opacity-30">/</span>
              <span className="opacity-60">{work.index}</span>
              <span className="hidden md:inline opacity-60">{formatLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              {prev && (
                <Link
                  to={`/work/${prev.slug}`}
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-ink rounded-full hover:bg-ink hover:text-linen transition-colors cursor-pointer"
                  aria-label={t("workDetail.prevAria", { title: t(`works.${prev.contentKey}.title`) })}
                  title={t(`works.${prev.contentKey}.title`)}
                >
                  <i className="ri-arrow-left-line text-base" />
                </Link>
              )}
              {next && (
                <Link
                  to={`/work/${next.slug}`}
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-ink rounded-full hover:bg-ink hover:text-linen transition-colors cursor-pointer"
                  aria-label={t("workDetail.nextAria", { title: t(`works.${next.contentKey}.title`) })}
                  title={t(`works.${next.contentKey}.title`)}
                >
                  <i className="ri-arrow-right-line text-base" />
                </Link>
              )}
              <button
                type="button"
                onClick={() => navigate("/work")}
                className="ml-2 inline-flex items-center gap-2 text-[13px] md:text-sm border border-ink rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:bg-ink hover:text-linen transition-colors cursor-pointer whitespace-nowrap"
                aria-label={t("workDetail.close")}
              >
                {t("workDetail.close")}
                <i className="ri-close-line text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-ink">
          <div className="flex items-baseline gap-3 md:gap-5 mb-4 md:mb-6 flex-wrap">
            <span className="text-xs md:text-sm font-mono-label text-ink/60">{work.index}</span>
            <span className="text-xs md:text-sm font-mono-label text-ink/60">[ {formatLabel} ]</span>
            <span className="text-xs md:text-sm font-mono-label text-ink/60">[ {seriesLabel} ]</span>
          </div>
          <h1 className="font-display font-bold tracking-tight text-4xl md:text-[90px] leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-xl text-ink/70 max-w-2xl leading-relaxed">
            {summary}
          </p>
          <a
            href={work.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 md:mt-10 inline-flex items-center gap-3 bg-ink text-linen rounded-full px-6 md:px-7 py-3.5 md:py-4 text-sm md:text-base hover:bg-clay transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="font-display">{t("workDetail.openWork")}</span>
            <i className="ri-arrow-right-up-line text-lg" />
          </a>
        </section>

        {/* Meta grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-ink">
          <div className="md:col-span-4 p-6 md:p-8 md:border-r border-ink">
            <p className="text-xs font-mono-label text-ink/60 mb-2">{t("workDetail.labelSeries")}</p>
            <p className="text-base md:text-lg">{seriesLabel}</p>
          </div>
          <div className="md:col-span-4 p-6 md:p-8 md:border-r border-ink border-t md:border-t-0">
            <p className="text-xs font-mono-label text-ink/60 mb-2">{t("workDetail.labelFormat")}</p>
            <p className="text-base md:text-lg">{formatLabel}</p>
          </div>
          <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 border-ink">
            <p className="text-xs font-mono-label text-ink/60 mb-2">{t("workDetail.labelLink")}</p>
            <a
              href={work.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-[13px] md:text-sm border border-ink rounded-full px-4 py-2 hover:bg-ink hover:text-linen transition-colors cursor-pointer whitespace-nowrap"
            >
              {t("workDetail.openWorkShort")}
              <i className="ri-arrow-right-up-line" />
            </a>
          </div>
        </section>

        {/* Description + cover */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-ink">
          <div className="md:col-span-5 p-6 md:p-10 md:border-r border-ink">
            <p className="text-xs font-mono-label text-ink/60 mb-4">{t("workDetail.labelOverview")}</p>
            <p className="text-base md:text-lg leading-relaxed">{description}</p>
          </div>
          <div className="md:col-span-7 bg-sand">
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={work.image}
                alt={`${title} — ${seriesLabel}`}
                title={title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 md:px-10 py-12 md:py-16 border-b border-ink">
          <div className="flex items-baseline gap-3 md:gap-5 mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("workDetail.labelGallery")}</span>
            <h4 className="font-display font-bold tracking-tight text-2xl md:text-3xl">
              <span>{t("workDetail.galleryTitle")}</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {work.gallery.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden bg-sand ${i === 0 ? "aspect-[3/2]" : "aspect-[4/5]"}`}
              >
                <img
                  src={src}
                  alt={`${title} — ${i + 1}`}
                  title={`${title} ${i + 1}`}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Next project teaser */}
        {next && (
          <section className="border-b border-ink">
            <Link
              to={`/work/${next.slug}`}
              className="group grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-10 py-10 md:py-16 hover:bg-ink hover:text-linen transition-colors duration-300 cursor-pointer"
            >
              <div className="md:col-span-2">
                <p className="text-xs font-mono-label text-ink/60 group-hover:text-linen/60 mb-2">
                  {t("workDetail.labelNext")}
                </p>
                <p className="text-sm font-mono-label text-ink/60 group-hover:text-linen/60">
                  {next.index}
                </p>
              </div>
              <div className="md:col-span-8 mt-4 md:mt-0">
                <h4 className="font-display font-bold tracking-tight text-3xl md:text-6xl leading-tight">
                  {t(`works.${next.contentKey}.title`)}
                </h4>
                <p className="text-sm text-ink/60 group-hover:text-linen/60 mt-3">
                  {t(`series.items.${next.seriesId}.title`)} · {t(`formats.${next.formatKey}`)}
                </p>
              </div>
              <div className="md:col-span-2 flex md:justify-end mt-6 md:mt-0">
                <span className="inline-flex items-center gap-2 text-sm md:text-base border border-current rounded-full px-5 md:px-6 py-3 md:py-3.5 whitespace-nowrap transition-transform duration-300 group-hover:translate-x-2">
                  {t("workDetail.see")}
                  <i className="ri-arrow-right-up-line text-base" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Footer CTA */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-10 py-12 md:py-16">
          <div>
            <p className="text-xs font-mono-label text-ink/60 mb-2">{t("workDetail.labelOther")}</p>
            <p className="font-display font-bold text-2xl md:text-4xl tracking-tight">
              {t("workDetail.otherText")}
            </p>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm md:text-base bg-ink text-linen rounded-full px-5 md:px-6 py-3 md:py-3.5 hover:bg-clay border border-ink transition-colors cursor-pointer whitespace-nowrap"
          >
            {t("workDetail.viewAll")}
            <i className="ri-arrow-right-up-line text-base" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}