import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NOTE_URL = "https://note.com/nifty_sheep7386";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-linen border-t border-white/10">
      <div className="px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6">
          <Link to="/" className="font-display font-bold text-4xl md:text-6xl tracking-tight cursor-pointer">
            へろん
          </Link>
          <p className="text-linen/60 text-sm md:text-base mt-4 max-w-sm leading-relaxed">
            {t("footer.desc")}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3 text-sm">
          <p className="text-xs font-mono-label text-linen/45 mb-1">{t("footer.toc")}</p>
          <Link to="/" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.home")}</Link>
          <a href="/#main-series" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.mainSeries")}</a>
          <a href="/#series" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.series")}</a>
          <Link to="/work" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.work")}</Link>
          <a href="/#about" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.about")}</a>
          <Link to="/contact" className="hover:opacity-60 transition-opacity cursor-pointer w-fit">{t("footer.links.contact")}</Link>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3 text-sm">
          <p className="text-xs font-mono-label text-linen/45 mb-1">{t("footer.elsewhere")}</p>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:opacity-60 transition-opacity cursor-pointer w-fit inline-flex items-center gap-2"
          >
            <i className="ri-article-line" /> {t("footer.note")}
          </a>
          <p className="text-linen/50 leading-relaxed">
            {t("footer.noteText")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-linen/50">
        <p>{t("footer.copyright")}</p>
        <p className="font-mono-label">{t("footer.slogan")}</p>
      </div>
    </footer>
  );
}