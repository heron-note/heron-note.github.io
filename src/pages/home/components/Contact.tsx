import { useState } from "react";
import { useTranslation } from "react-i18next";

const NOTE_URL = "https://note.com/nifty_sheep7386";
const FORM_ENDPOINT = "https://readdy.ai/api/form/dars05p5p1p9qir6kiqg";

interface ParsedResponse {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
}

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const topics = t("contact.topics", { returnObjects: true }) as string[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — silently ignore bots
    const honeypot = String(formData.get("website_alt") || "").trim();
    if (honeypot) {
      setStatus("success");
      setMessage(t("contact.success"));
      form.reset();
      return;
    }

    const textarea = formData.get("message");
    if (typeof textarea === "string" && textarea.length > 500) {
      setStatus("error");
      setMessage(t("contact.tooLong"));
      return;
    }

    formData.delete("website_alt");

    setStatus("submitting");
    setMessage("");

    try {
      const body = new URLSearchParams();
      formData.forEach((v, k) => body.append(k, v.toString()));

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const responseText = await res.text();
      let parsed: ParsedResponse | null = null;
      try {
        parsed = JSON.parse(responseText) as ParsedResponse;
      } catch {
        parsed = null;
      }

      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;
      const isSpam =
        typeof serverMsg === "string" && serverMsg.toLowerCase().includes("spam");
      const isOk = res.ok && parsed?.code === "OK" && !isSpam;

      if (isOk) {
        setStatus("success");
        setMessage(t("contact.success"));
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          typeof serverMsg === "string" && serverMsg && !isSpam
            ? serverMsg
            : t("contact.errorGeneric")
        );
      }
    } catch {
      setStatus("error");
      setMessage(t("contact.networkError"));
    }
  };

  return (
    <section id="contact" className="relative bg-ink text-linen py-20 md:py-28 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-5">
          <span className="text-xs md:text-sm font-mono-label text-linen/60">{t("contact.index")}</span>
          <h3 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.05] mt-3">
            {t("contact.titleLine1")}
            <br />
            {t("contact.titleLine2")}
          </h3>
          <p className="mt-6 max-w-md text-linen/70 text-sm md:text-base leading-relaxed">
            {t("contact.lead")}
          </p>

          <div className="mt-8 space-y-3 text-sm md:text-base">
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <i className="ri-article-line text-lg" /> {t("contact.noteLink")}
            </a>
            <p className="flex items-center gap-3 text-linen/80">
              <i className="ri-home-4-line text-lg" /> {t("contact.place")}
            </p>
            <p className="flex items-center gap-3 text-linen/80">
              <i className="ri-time-line text-lg" /> {t("contact.reply")}
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            id="heron-contact-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            <div className="flex flex-col">
              <label htmlFor="heron-name" className="text-xs font-mono-label text-linen/60 mb-2">
                {t("contact.name")}
              </label>
              <input
                id="heron-name"
                type="text"
                name="name"
                required
                placeholder={t("contact.namePlaceholder")}
                className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm placeholder:text-linen/30"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="heron-email" className="text-xs font-mono-label text-linen/60 mb-2">
                {t("contact.email")}
              </label>
              <input
                id="heron-email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm placeholder:text-linen/30"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="heron-topic" className="text-xs font-mono-label text-linen/60 mb-2">
                {t("contact.topic")}
              </label>
              <select
                id="heron-topic"
                name="topic"
                required
                defaultValue=""
                className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm appearance-none"
              >
                <option value="" disabled className="bg-ink">{t("contact.topicPlaceholder")}</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic} className="bg-ink">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="heron-message" className="text-xs font-mono-label text-linen/60 mb-2">
                {t("contact.message")}
              </label>
              <textarea
                id="heron-message"
                name="message"
                required
                maxLength={500}
                rows={5}
                placeholder={t("contact.messagePlaceholder")}
                className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm placeholder:text-linen/30 resize-none"
              />
              <span className="text-xs text-linen/50 mt-1 font-mono-label">{t("contact.messageLimit")}</span>
            </div>

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="website_alt"
              className="hp-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              readOnly
            />

            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-linen text-ink px-6 py-3 rounded-full text-sm hover:bg-linen/85 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {status === "submitting" ? t("contact.submitting") : t("contact.submit")}
                <i className="ri-arrow-right-up-line" />
              </button>
              {message && (
                <p className={`text-sm ${status === "success" ? "text-sage" : "text-clay"}`}>
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}