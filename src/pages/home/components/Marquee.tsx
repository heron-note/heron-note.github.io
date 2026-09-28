import { useTranslation } from "react-i18next";

export default function Marquee() {
  const { t } = useTranslation();
  const words = t("marquee.words", { returnObjects: true }) as string[];
  const items = [...words, ...words];

  return (
    <section className="bg-sand border-y border-ink/10 py-6 md:py-8 overflow-hidden">
      <div className="flex marquee-track gap-10 md:gap-16 w-max">
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-16 whitespace-nowrap">
            <span className="text-ink font-display font-bold text-2xl md:text-4xl tracking-tight">
              {w}
            </span>
            <span className="text-clay text-xl md:text-2xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}