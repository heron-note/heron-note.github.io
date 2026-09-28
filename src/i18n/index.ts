import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

const SUPPORTED = ['ja', 'en', 'zh-TW', 'zh-CN', 'ko'];

const normalizeLanguage = (lng: string): string => {
  if (!lng) return 'ja';
  const l = lng.toLowerCase();
  if (l.startsWith('zh')) {
    if (
      l.includes('hant') ||
      l.includes('tw') ||
      l.includes('hk') ||
      l.includes('mo')
    ) {
      return 'zh-TW';
    }
    return 'zh-CN';
  }
  if (l.startsWith('ko')) return 'ko';
  if (l.startsWith('en')) return 'en';
  if (l.startsWith('ja')) return 'ja';
  return 'ja';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED,
    fallbackLng: 'ja',
    load: 'currentOnly',
    debug: false,
    resources: messages,
    detection: {
      order: ['navigator'],
      caches: [],
      convertDetectedLanguage: (lng) => normalizeLanguage(lng),
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;