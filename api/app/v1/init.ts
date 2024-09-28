import { App, AxeRequest, AxeResponse } from "axe-api";
import cors from "cors";
import LoginHandler from "./Handlers/LoginHandler";
import { prepareTemplates } from "./Services/TemplateService";
import ProfileCheckHandler from "./Handlers/ProfileCheckHandler";
import ConfirmHandler from "./Handlers/ConfirmHandler";
import ConfirmResetHandler from "./Handlers/ConfirmResetHandler";
import { en, setLocales } from "robust-validator";
import PasswordResetHandler from "./Handlers/PasswordResetHandler";

const CORS_WHITE_LIST = ["http://localhost:5173", "http://localhost:3005"];

const onBeforeInit = async (app: App) => {
  // Setting the default locale
  setLocales(en);

  // Prepare the templates
  prepareTemplates();

  // Setting CORS
  app.use(
    cors({
      origin: function (url, callback) {
        if (!url) {
          return callback(null, true);
        }

        if (CORS_WHITE_LIST.indexOf(url || "") !== -1) {
          return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
      },
    })
  );
  app.post("/api/v1/login", LoginHandler);
  app.post("/api/v1/profileCheck", ProfileCheckHandler);
  app.post("/api/v1/confirm", ConfirmHandler);
  app.post("/api/v1/confirmReset", ConfirmResetHandler);
  app.post("/api/v1/passwordReset", PasswordResetHandler);
};

const onAfterInit = async (app: App) => {};

export { onBeforeInit, onAfterInit };
