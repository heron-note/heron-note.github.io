import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { WorkItem } from "@/mocks/works";

interface Props {
  work: WorkItem;
  align?: "left" | "right";
}

export default function WorkRow({ work, align = "left" }: Props) {
  const { t } = useTranslation();
  const isRight = align === "right";
  const title = t(`works.${work.contentKey}.title`);
  const summary = t(`works.${work.contentKey}.summary`);
  const seriesLabel = t(`series.items.${work.seriesId}.title`);
  const formatLabel = t(`formats.${work.formatKey}`);

  return (
    <Link
      to={`/work/${work.slug}`}
      className="group block"
      aria-label={t("work.openAria", { title })}
    >
      <article
        className={`flex flex-col ${
          isRight ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-stretch gap-6 md:gap-10 lg:gap-14`}
      >
        {/* Horizontal image */}
        <div className="lg:w-[64%]">
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-sand">
            <img
              src={work.image}
              alt={`${title} — ${seriesLabel}`}
              title={`${title} ${seriesLabel}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
          </div>
        </div>

        {/* Meta column */}
        <div
          className={`lg:w-[36%] flex flex-col justify-between py-1 md:py-2 ${
            isRight ? "lg:pr-2" : "lg:pl-2"
          }`}
        >
          <div>
            <div className="flex items-baseline gap-3 mb-3 md:mb-5">
              <span className="text-xs md:text-sm font-mono-label text-ink/50">
                {work.index}
              </span>
              <span className="h-px flex-1 bg-ink/20" />
              <span className="text-xs md:text-sm font-mono-label text-ink/50">
                {seriesLabel}
              </span>
            </div>

            <h4 className="font-display font-bold tracking-tight text-3xl md:text-4xl leading-[1.1] mb-3 md:mb-4">
              <span className="cursor-pointer block">{title}</span>
            </h4>

            <p className="text-[13px] md:text-sm font-mono-label text-ink/55">
              {formatLabel}
            </p>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed mt-4 max-w-md">
              {summary}
            </p>
          </div>

          <div className="mt-6 md:mt-8 flex items-center justify-end gap-4">
            <span className="inline-flex items-center gap-2 text-[13px] md:text-sm border border-ink rounded-full px-4 py-2 whitespace-nowrap transition-all duration-300 group-hover:bg-ink group-hover:text-linen cursor-pointer">
              {t("common.see")}
              <i className="ri-arrow-right-up-line text-base" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}