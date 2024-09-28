import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import router from "./router";
import { setLocales, en as validationEn } from "robust-validator";
import { setConfig } from "axe-api-client";

setLocales(validationEn);
setConfig({
  baseURL: "http://localhost:3005/api/v1",
});

axios.interceptors.request.use(
  function (config) {
    config.baseURL = "http://localhost:3005/api/v1";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
