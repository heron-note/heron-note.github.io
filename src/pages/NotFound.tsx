import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-oat text-ink">
      <h1 className="absolute bottom-6 text-9xl md:text-[12rem] font-display font-bold text-ink/5 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <p className="text-xs font-mono-label text-ink/50 mb-4">{t("notFound.code")}</p>
        <h1 className="font-display font-bold text-2xl md:text-4xl tracking-tight">
          {t("notFound.title")}
        </h1>
        <p className="mt-3 text-sm md:text-base text-ink/60 font-mono-label">{location.pathname}</p>
        <p className="mt-5 text-base md:text-lg text-ink/70 max-w-md">
          {t("notFound.text")}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-ink text-linen rounded-full px-6 py-3 text-sm hover:bg-clay transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-home-4-line text-base" />
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
}