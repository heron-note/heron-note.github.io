import { useState } from "react";
import { useTranslation } from "react-i18next";

type ModeId = "room" | "brain";

const MODES: {
  id: ModeId;
  labelKey: string;
  captionKey: string;
  color: string;
}[] = [
  {
    id: "room",
    labelKey: "hero.modeRoomLabel",
    captionKey: "hero.modeRoomCaption",
    color: "#5E7060",
  },
  {
    id: "brain",
    labelKey: "hero.modeBrainLabel",
    captionKey: "hero.modeBrainCaption",
    color: "#C97A5F",
  },
];

const heroWorks = [
  {
    src: "https://storage.helloreaddy.io/project_files/3469d354-c35e-4af8-9b92-128c470600e7/a9b0fd6f-4777-4438-8c4c-ef61ecdb71e2_compressed_living_720x894.webp",
    labelKey: "hero.workNounai",
    typeKey: "hero.workNounaiType",
  },
  {
    src: "https://readdy.ai/api/search-image?query=Retro%20CRT%20television%20on%20a%20low%20wooden%20shelf%20beside%20a%20classic%20game%20controller%20with%20a%20coiled%20cable%2C%20warm%20cream%20room%2C%20faint%20pixel%20glow%20on%20the%20screen%2C%20calm%20Nordic%20editorial%20still%20life%20photography%2C%20oat%20beige%20tones%2C%20soft%20natural%20window%20light%2C%20no%20people%2C%20no%20readable%20text&width=720&height=900&seq=hero-herocon-01&orientation=portrait",
    labelKey: "hero.workHerocon",
    typeKey: "hero.workHeroconType",
  },
  {
    src: "https://readdy.ai/api/search-image?query=Playful%20minimal%20kitchen%20counter%20with%20a%20laptop%2C%20ceramic%20mug%2C%20chopping%20board%20and%20a%20few%20vegetable%20scraps%20arranged%20like%20a%20digital%20recipe%20experiment%2C%20warm%20cream%20palette%2C%20calm%20editorial%20still%20life%20photography%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=720&height=900&seq=hero-gemini-01&orientation=portrait",
    labelKey: "hero.workGemini",
    typeKey: "hero.workGeminiType",
  },
];

const NOTE_URL = "https://note.com/nifty_sheep7386";

export default function Hero() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ModeId>("brain");
  const active = MODES.find((m) => m.id === mode) ?? MODES[1];
  const isBrain = mode === "brain";

  const renderLine = (text: string, emphasized: boolean, delayBase: number) => (
    <span className="block whitespace-nowrap">
      {text.split("").map((ch, i) => (
        <span key={`${mode}-${text}-${i}`} className="letter-mask">
          <span className="letter-rise" style={{ animationDelay: `${delayBase + 0.05 * i}s` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );

  const catch1 = t("hero.catch1");
  const catch2 = t("hero.catch2");

  return (
    <section className="relative bg-oat pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      {/* Vertical guide lines */}
      <div className="absolute inset-y-0 left-1/3 w-px bg-ink/10 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 left-2/3 w-px bg-ink/10 pointer-events-none hidden md:block" />

      {/* Brain-mode cosmic glow — very light, keeps the page bright */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isBrain ? 1 : 0,
          background:
            "radial-gradient(circle at 62% 30%, rgba(201,122,95,0.16), transparent 55%), radial-gradient(circle at 22% 68%, rgba(143,160,143,0.14), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700"
        style={{ opacity: isBrain ? 0.7 : 0 }}
        aria-hidden="true"
      >
        <div className="star-layer absolute inset-x-0 -top-10 bottom-0">
          {[
            { top: "16%", left: "12%", s: "6px" },
            { top: "28%", left: "84%", s: "4px" },
            { top: "54%", left: "30%", s: "5px" },
            { top: "62%", left: "70%", s: "7px" },
            { top: "78%", left: "48%", s: "4px" },
            { top: "38%", left: "56%", s: "3px" },
          ].map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-clay/50"
              style={{ top: d.top, left: d.left, width: d.s, height: d.s }}
            />
          ))}
        </div>
      </div>

      <div className="relative px-6 md:px-10">
        {/* Mode switch — the 部屋 ⇄ 脳内 toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 md:mb-7">
          <div className="flex items-center gap-2 md:gap-3 text-[11px] md:text-xs font-mono-label text-ink/55">
            <span className="hidden md:inline">{t("hero.toggle")}</span>
            <span className="w-6 h-px bg-ink/25 hidden md:inline-block" />
            <div className="flex items-center gap-1.5 md:gap-2">
              {MODES.map((m) => {
                const isActive = m.id === mode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    aria-pressed={isActive}
                    className={`cursor-pointer whitespace-nowrap rounded-full border px-3 md:px-4 py-1.5 transition-colors duration-300 ${
                      isActive
                        ? "border-ink text-ink bg-linen"
                        : "border-ink/20 text-ink/55 hover:text-ink hover:border-ink/50"
                    }`}
                    style={isActive ? { color: m.color, borderColor: m.color } : undefined}
                  >
                    {t(m.labelKey)}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] md:text-xs font-mono-label text-ink/55">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full transition-colors duration-500"
              style={{ backgroundColor: active.color }}
            />
            <span>{isBrain ? t("hero.statusBrain") : t("hero.statusRoom")}</span>
          </div>
        </div>

        {/* Giant catch copy */}
        <h1
          className="leading-[1.12] text-[10.5vw] md:text-[6.6vw] font-display font-bold text-ink"
          aria-label={`${catch1} ${catch2}`}
        >
          <span
            className={isBrain ? "text-outline" : ""}
            style={isBrain ? undefined : { color: active.color }}
          >
            {renderLine(catch1, !isBrain, 0.05)}
          </span>
          <span
            className={isBrain ? "" : "text-outline"}
            style={isBrain ? { color: active.color } : undefined}
          >
            {renderLine(catch2, isBrain, 0.25)}
          </span>
        </h1>

        {/* Mode caption */}
        <div className="mt-5 md:mt-6 flex items-center gap-3 text-[12px] md:text-sm text-ink/70 font-mono-label">
          <span className="block h-px w-8 bg-ink/30" />
          <span key={mode} className="fade-up">{t(active.captionKey)}</span>
        </div>

        {/* Three column meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-10">
          <div className="text-[14px] md:text-[15px] text-ink leading-relaxed max-w-[280px]">
            {t("hero.desc")}
          </div>
          <div className="font-display text-[15px] md:text-[19px] leading-tight tracking-tight text-ink text-center">
            {t("hero.name")}
            <br />
            {t("hero.role1")}
            {t("hero.role2")}
          </div>
          <div className="text-[14px] md:text-[15px] text-ink leading-relaxed md:text-right">
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer"
            >
              <i className="ri-article-line" /> {t("common.noteRead")}
            </a>
            <p className="opacity-60 mt-1">{t("hero.noteSub")}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-between mt-10 md:mt-14 mb-6 md:mb-10 text-[11px] md:text-xs font-mono-label text-ink/55">
          <span>{t("hero.seriesNote")}</span>
          <span className="hidden md:inline">{t("hero.hint")}</span>
          <span>{t("hero.scroll")}</span>
        </div>

        {/* Gallery row — one image per series */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {heroWorks.map((w, i) => {
            const label = t(w.labelKey);
            const type = t(w.typeKey);
            return (
              <div key={w.labelKey} className="relative">
                <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden rounded-sm bg-sand group">
                  <img
                    src={w.src}
                    alt={`${label} — ${type}`}
                    title={`${label} ${type}`}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                      isBrain ? "grayscale-0 opacity-100" : "grayscale opacity-70"
                    }`}
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 text-[10px] md:text-[11px] font-mono-label tracking-[0.2em] bg-ink/35 backdrop-blur text-linen/95 px-2 py-1 rounded-sm">
                    0{i + 1}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 md:p-4 bg-gradient-to-t from-ink/70 to-transparent">
                    <p className="text-linen text-[13px] md:text-sm font-display">{label}</p>
                    <p className="text-linen/70 text-[10px] md:text-[11px] font-mono-label mt-0.5">
                      {type}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}