import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/pages/home/components/Header";
import Footer from "@/pages/home/components/Footer";

const NOTE_URL = "https://note.com/nifty_sheep7386";
const FORM_ENDPOINT = "https://readdy.ai/api/form/dars05p5p1p9qir6kiqg";

const INQUIRY_ICONS = [
  "ri-quill-pen-line",
  "ri-question-line",
  "ri-hand-heart-line",
  "ri-gamepad-line",
];

interface ParsedResponse {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
}

interface InquiryType {
  title: string;
  body: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export default function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get("company_alt") || "").trim();
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

    formData.delete("company_alt");

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

  const inquiryTypes = t("contactPage.inquiryTypes", { returnObjects: true }) as InquiryType[];
  const faqs = t("contactPage.faqs", { returnObjects: true }) as FaqItem[];
  const topics = t("contact.topics", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-oat text-ink overflow-x-hidden">
      <Header />
      <main id="main-content" className="pt-14 md:pt-16">
        {/* Hero */}
        <section className="relative bg-oat px-6 md:px-10 pt-10 md:pt-14 pb-8 md:pb-12">
          <div className="absolute inset-y-0 left-1/3 w-px bg-ink/10 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-ink/10 pointer-events-none hidden md:block" />

          <div className="flex items-center gap-3 mb-6 text-xs md:text-sm font-mono-label text-ink/60">
            <Link to="/" className="hover:opacity-60 transition-opacity cursor-pointer">{t("contactPage.breadcrumbHome")}</Link>
            <span>/</span>
            <span>{t("contactPage.breadcrumb")}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="md:col-span-8">
              <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("contactPage.kicker")}</span>
              <h1 className="font-display font-bold text-[16vw] md:text-[9vw] leading-[0.95] tracking-tight mt-3">
                {t("contactPage.titleLine1")}
                <br />
                {t("contactPage.titleLine2")}
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-6">
              <p className="text-base md:text-lg leading-relaxed">
                {t("contactPage.lead")}
              </p>
            </div>
          </div>
        </section>

        {/* Inquiry types */}
        <section className="relative bg-oat px-6 md:px-10 pb-16 md:pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15 rounded-lg overflow-hidden">
            {inquiryTypes.map((item, i) => (
              <div key={item.title} className="bg-oat p-7 md:p-8 hover:bg-linen transition-colors cursor-default">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-ink text-linen">
                  <i className={`${INQUIRY_ICONS[i]} text-lg`} />
                </span>
                <h4 className="font-display font-bold text-lg md:text-xl tracking-tight mt-5">
                  {item.title}
                </h4>
                <p className="text-sm mt-3 leading-relaxed text-ink/75">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form + info */}
        <section className="relative bg-ink text-linen py-20 md:py-28 px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-5">
              <span className="text-xs md:text-sm font-mono-label text-linen/60">{t("contactPage.formKicker")}</span>
              <h3 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.1] mt-3">
                {t("contactPage.formTitle1")}
                <br />
                {t("contactPage.formTitle2")}
              </h3>

              <div className="mt-10 space-y-5 text-sm md:text-base">
                <div>
                  <p className="text-xs font-mono-label text-linen/50 mb-1">{t("contactPage.fastest")}</p>
                  <a
                    href={NOTE_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center gap-2"
                  >
                    <i className="ri-article-line" /> note
                  </a>
                </div>
                <div>
                  <p className="text-xs font-mono-label text-linen/50 mb-1">{t("contactPage.place")}</p>
                  <p>{t("contactPage.placeValue")}</p>
                </div>
                <div>
                  <p className="text-xs font-mono-label text-linen/50 mb-1">{t("contactPage.reply")}</p>
                  <p>{t("contactPage.replyValue")}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <form
                id="heron-contact-page-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
              >
                <div className="flex flex-col">
                  <label htmlFor="cp-name" className="text-xs font-mono-label text-linen/60 mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    id="cp-name"
                    type="text"
                    name="name"
                    required
                    placeholder={t("contact.namePlaceholder")}
                    className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm placeholder:text-linen/30"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cp-email" className="text-xs font-mono-label text-linen/60 mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    id="cp-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="bg-transparent border-b border-linen/40 focus:border-linen outline-none py-3 text-sm placeholder:text-linen/30"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="cp-topic" className="text-xs font-mono-label text-linen/60 mb-2">
                    {t("contact.topic")}
                  </label>
                  <select
                    id="cp-topic"
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
                  <label htmlFor="cp-message" className="text-xs font-mono-label text-linen/60 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="cp-message"
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
                  name="company_alt"
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

        {/* Note CTA (no fake address) */}
        <section className="relative bg-oat px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center border border-ink/15 rounded-lg p-8 md:p-12 bg-linen/60">
            <div className="md:col-span-8">
              <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("contactPage.noteCtaKicker")}</span>
              <h3 className="font-display font-bold text-3xl md:text-5xl tracking-tight mt-3 leading-tight">
                {t("contactPage.noteCtaTitle")}
              </h3>
              <p className="mt-5 text-base md:text-lg leading-relaxed max-w-xl text-ink/75">
                {t("contactPage.noteCtaBody")}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 bg-ink text-linen rounded-full px-6 py-3.5 text-sm md:text-base hover:bg-clay transition-colors cursor-pointer whitespace-nowrap"
              >
                {t("contactPage.noteCtaButton")}
                <i className="ri-arrow-right-up-line" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-linen py-20 md:py-28 px-6 md:px-10 border-t border-ink/10">
          <div className="flex items-baseline gap-3 md:gap-5 mb-10 md:mb-14 flex-wrap">
            <span className="text-xs md:text-sm font-mono-label text-ink/60">{t("contactPage.faqKicker")}</span>
            <h3 className="font-display font-bold text-2xl md:text-4xl tracking-tight">
              {t("contactPage.faqTitle")}
            </h3>
          </div>

          <div className="max-w-3xl">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border-t border-ink py-5 md:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-6 cursor-pointer text-left"
                  >
                    <span className="font-display font-bold text-lg md:text-2xl tracking-tight">
                      {f.q}
                    </span>
                    <span className={`shrink-0 w-8 h-8 flex items-center justify-center text-ink transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                      <i className="ri-add-line text-2xl" />
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 mt-4" : "max-h-0"}`}>
                    <p className="text-sm md:text-base leading-relaxed max-w-2xl text-ink/75">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-ink" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}