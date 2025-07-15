// import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18n } from "next-i18next";


i18n
.use(LanguageDetector)
.use(initReactI18next) // passes i18n down to react-i18next
.init({
    debug: true,
    lng:"en",
  resources: {
    en: {
      translation: {
        greeting : "Application to view ERM dashbord"
      }
    },
    fr: {
      translation: {
        greeting: "Application pour visualiser le tableau de bord ERM"
      }
    },
    es: {
      translation: {
        greeting: "Aplicación para ver el panel de control ERM"
      }
    },
    supportedLngs: ["en", "fr", "es"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
}});