import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import hiCommon from '../public/locales/hi/common.json';
import arCommon from '../public/locales/ar/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { common: enCommon },
      fr: { common: frCommon },
      hi: { common: hiCommon },
      ar: { common: arCommon }
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;