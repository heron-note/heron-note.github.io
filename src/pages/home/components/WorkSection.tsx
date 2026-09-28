import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { works } from "@/mocks/works";
import WorkRow from "./WorkRow";

export default function WorkSection() {
  const { t } = useTranslation();

  return (
    <section
      id="work"
      className="relative bg-linen py-20 md:py-32 px-6 md:px-10 lg:px-16 border-t border-b border-ink/10"
    >
      {/* Header */}
      <div className="relative flex items-end justify-between mb-14 md:mb-24 max-w-[1600px] mx-auto">
        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="text-xs md:text-sm font-mono-label text-ink/55">
            {t("work.index")}
          </span>
          <h3 className="font-display font-bold text-2xl md:text-4xl tracking-tight">
            {t("work.title")}
          </h3>
        </div>
        <div className="text-xs md:text-sm text-right text-ink/55 font-mono-label hidden sm:block">
          <p>{t("work.meta1")}</p>
          <p>{t("work.meta2")}</p>
        </div>
      </div>

      {/* Staggered works grid */}
      <div className="relative max-w-[1600px] mx-auto space-y-20 md:space-y-32">
        {works.map((w, i) => (
          <WorkRow key={w.id} work={w} align={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>

      {/* Bottom divider */}
      <div className="max-w-[1600px] mx-auto mt-20 md:mt-28 pt-8 border-t border-ink/25 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs md:text-sm font-mono-label text-ink/70">
        <span>{t("work.end")}</span>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap"
        >
          {t("common.viewAllWorks")}
          <i className="ri-arrow-right-up-line" />
        </Link>
      </div>
    </section>
  );
}