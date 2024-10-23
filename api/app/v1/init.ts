import { App, IoCService, RedisAdaptor } from "axe-api";
import cors from "cors";
import { Knex } from "knex";
import LoginHandler from "./Handlers/LoginHandler";
import { prepareTemplates } from "./Services/TemplateService";
import ProfileCheckHandler from "./Handlers/ProfileCheckHandler";
import ConfirmHandler from "./Handlers/ConfirmHandler";
import ConfirmResetHandler from "./Handlers/ConfirmResetHandler";
import { en, setLocales } from "robust-validator";
import PasswordResetHandler from "./Handlers/PasswordResetHandler";
import ChangePasswordHandler from "./Handlers/ChangePasswordHandler";
import MeHandler from "./Handlers/MeHandler";
import SessionMiddleware from "./Middlewares/SessionMiddleware";
import ShareHandler from "./Handlers/ShareHandler";
import UnshareHandler from "./Handlers/UnshareHandler";
import CaptchaHandler from "./Handlers/CaptchaHandler";
import AgentMiddleware from "./Middlewares/AgentMiddleware";
import CSRFHandler from "./Handlers/CSRFHandler";
import { LogService } from "axe-api/build/src/Services";
import DefaultSessionRateLimitter from "./Middlewares/RateLimitters/DefaultSessionRateLimitter";
import UserAgentRateLimitter from "./Middlewares/RateLimitters/UserAgentRateLimitter";
import HashtagReportHandler from "./Handlers/HashtagReportHandler";

const CORS_WHITE_LIST = [
  "http://localhost:5173",
  "http://localhost:3005",
  "https://staging.tinyblog.space",
];

const onBeforeInit = async (app: App) => {
  const database = await IoCService.use<Knex>("Database");

  database.on("query", (queryData) => {
    // console.log(`Executing query: ${queryData.sql}`, queryData.bindings);
  });

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
      credentials: true,
    })
  );

  app.use(AgentMiddleware);
  app.use(UserAgentRateLimitter("UserAgent", 1000));

  app.post("/api/v1/login", LoginHandler);
  app.post("/api/v1/profileCheck", ProfileCheckHandler);
  app.post("/api/v1/confirm", ConfirmHandler);
  app.post("/api/v1/confirmReset", ConfirmResetHandler);
  app.post("/api/v1/passwordReset", PasswordResetHandler);
  app.post("/api/v1/changePassword", ChangePasswordHandler);
  app.get(
    "/api/v1/me",
    SessionMiddleware,
    DefaultSessionRateLimitter,
    MeHandler
  );
  app.post(
    "/api/v1/posts/:postId/shares",
    SessionMiddleware,
    DefaultSessionRateLimitter,
    ShareHandler
  );
  app.post(
    "/api/v1/posts/:postId/unshares",
    SessionMiddleware,
    DefaultSessionRateLimitter,
    UnshareHandler
  );
  app.get(
    "/api/v1/hashtags/report",
    SessionMiddleware,
    DefaultSessionRateLimitter,
    HashtagReportHandler
  );
  app.get(
    "/api/v1/captcha",
    UserAgentRateLimitter("CaptchaCreation", 10),
    CaptchaHandler
  );
  app.get("/api/v1/csrf", UserAgentRateLimitter("CSRF", 100), CSRFHandler);
};

const onAfterInit = async (app: App) => {
  const redis = await IoCService.use<RedisAdaptor>("Redis");
  if (!redis.isReady()) {
    await redis.connect();
    LogService.info("Redis connection in done!");
  }
};

export { onBeforeInit, onAfterInit };
