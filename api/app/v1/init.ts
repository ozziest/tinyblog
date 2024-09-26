import { App, AxeRequest, AxeResponse } from "axe-api";
import cors from "cors";
import LoginHandler from "./Handlers/LoginHandler";
import { prepareTemplates } from "./Services/TemplateService";

const CORS_WHITE_LIST = ["http://localhost:5173", "http://localhost:3005"];

const onBeforeInit = async (app: App) => {
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
};

const onAfterInit = async (app: App) => {};

export { onBeforeInit, onAfterInit };
