import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import router from "./router";
import { setLocales, en as validationEn } from "robust-validator";
import { setConfig, interceptors } from "axe-api-client";
import ErrorMessageComponent from "./components/messages/ErrorMessage";
import SuccessMessage from "./components/messages/SuccessMessage";

setLocales(validationEn);
setConfig({
  baseURL: "http://localhost:3005/api/v1",
});

interceptors.addRequest((request: RequestInit) => {
  // It should send the cookies on each requests
  request.credentials = "include";

  return request;
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

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ErrorMessageComponent />
    <SuccessMessage />
  </>,
);
