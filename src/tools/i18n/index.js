// src/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./language/en.json";
import es from "./language/es.json";
import pt from "./language/pt.json";
import fr from "./language/fr.json";
import hi from "./language/hi.json";
import ar from "./language/ar.json";

const resources = {
  es: {translation: es},
  en: {translation: en},
  pt: {translation: pt},
  fr: {translation: fr},
  hi: {translation: hi},
  ar: {translation: ar},
};

const getLanguageCode = () => {
  try {
    // Ejemplo:
    // "es-PE"
    // "en-US"
    const browserLanguage = navigator.language || "en";

    // "es-PE" -> "es"
    const code = browserLanguage.split("-")[0];

    return code in resources ? code : "en";
  } catch {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources,

  lng: getLanguageCode(),

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
