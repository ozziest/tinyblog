import { createRoot } from "react-dom/client";
import "./index.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import { setLocales, en as validationEn } from "robust-validator";
import { setConfig } from "axe-api-client";
import App from "./App";
import { env } from "./env";

setLocales(validationEn);
setConfig({
  baseURL: env("ApiURL"),
});

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")!).render(<App />);
