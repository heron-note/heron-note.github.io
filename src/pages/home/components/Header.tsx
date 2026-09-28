import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NOTE_URL = "https://note.com/nifty_sheep7386";

const navItems = [
  { key: "home", href: "/", number: "00" },
  { key: "mainSeries", href: "/#main-series", number: "01" },
  { key: "series", href: "/#series", number: "02" },
  { key: "work", href: "/work", number: "03" },
  { key: "about", href: "/#about", number: "04" },
  { key: "contact", href: "/contact", number: "05" },
];

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToHash = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        scrollToHash(id);
      } else {
        navigate("/");
        window.setTimeout(() => scrollToHash(id), 220);
      }
      return;
    }
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-ink focus:text-linen focus:px-4 focus:py-2 focus:rounded-md focus:text-sm cursor-pointer"
      >
        {t("common.skip")}
      </a>

      <div id="top-of-page" aria-label={t("common.pageTop")} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? "bg-ink/95 backdrop-blur" : "bg-ink"
        }`}
      >
        <div className="relative flex items-center justify-between px-6 md:px-10 h-14 md:h-16 border-b border-white/10">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="text-linen text-[17px] tracking-tight cursor-pointer whitespace-nowrap hover:opacity-70 transition-opacity font-display"
          >
            へろん
          </a>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 text-linen/50 text-xs tracking-[0.15em]">
            {t("header.tagline")}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden sm:inline-flex items-center gap-2 text-linen text-[13px] md:text-[14px] whitespace-nowrap pl-3 pr-3 py-1.5 rounded-full border border-linen/20 hover:border-linen/60 transition-colors cursor-pointer"
            >
              <i className="ri-article-line" />
              {t("header.note")}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-label={t("header.menu")}
              className="group flex items-center gap-3 text-linen text-[15px] cursor-pointer whitespace-nowrap pl-3 pr-2 py-1.5 rounded-full border border-linen/20 hover:border-linen/60 transition-colors"
            >
              <span className="tracking-tight">
                {menuOpen ? t("header.close") : t("header.menu")}
              </span>
              <span className="relative w-6 h-6 flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-px w-5 bg-linen transition-transform duration-300 origin-center ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-linen transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-linen transition-transform duration-300 origin-center ${
                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("header.siteMenu")}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-ink text-linen transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full pt-20 md:pt-24 px-6 md:px-10 pb-10 flex flex-col">
          <nav className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
            <ul className="flex flex-col gap-1 md:gap-2">
              {navItems.map((item, i) => (
                <li
                  key={item.key}
                  className={`overflow-hidden transition-all duration-700 ${
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="group flex items-baseline gap-5 md:gap-8 py-2.5 md:py-4 border-b border-linen/10 hover:border-linen/40 transition-colors cursor-pointer"
                  >
                    <span className="text-linen/40 text-xs md:text-sm font-mono-label">
                      {item.number}
                    </span>
                    <span className="font-display text-[30px] md:text-[60px] leading-[1.15] tracking-tight group-hover:translate-x-3 transition-transform duration-300 inline-block">
                      {t(`header.nav.${item.key}`)}
                    </span>
                    <span className="ml-auto text-linen/30 group-hover:text-linen/80 transition-colors w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                      <i className="ri-arrow-right-up-line text-xl md:text-2xl" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-linen/10 text-sm transition-opacity duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
          >
            <div>
              <p className="text-linen/40 text-xs font-mono-label mb-2">
                {t("header.overlay.baseLabel")}
              </p>
              <p className="text-linen/90 leading-relaxed">
                {t("header.overlay.baseText1")}
                <br />
                {t("header.overlay.baseText2")}
              </p>
            </div>
            <div>
              <p className="text-linen/40 text-xs font-mono-label mb-2">
                {t("header.overlay.favoriteLabel")}
              </p>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-linen/90 hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center gap-2"
              >
                <i className="ri-article-line" /> {t("header.overlay.readNote")}
              </a>
            </div>
            <div>
              <p className="text-linen/40 text-xs font-mono-label mb-2">
                {t("header.overlay.wordsLabel")}
              </p>
              <p className="text-linen/90 font-display text-lg leading-relaxed">
                {t("header.overlay.wordsText1")}
                <br />
                {t("header.overlay.wordsText2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}