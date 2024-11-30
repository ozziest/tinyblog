import { App, IoCService, RedisAdaptor } from "axe-api";
import cors from "cors";
import { Knex } from "knex";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import LoginHandler from "./Handlers/LoginHandler";
import { prepareTemplates } from "./Services/TemplateService";
import ProfileCheckHandler from "./Handlers/ProfileCheckHandler";
import { en, setLocales } from "robust-validator";
import PasswordResetHandler from "./Handlers/PasswordResetHandler";
import ChangePasswordHandler from "./Handlers/ChangePasswordHandler";
import MeHandler from "./Handlers/MeHandler";
import LoginRequireMiddleware from "./Middlewares/LoginRequireMiddleware";
import ShareHandler from "./Handlers/ShareHandler";
import UnshareHandler from "./Handlers/UnshareHandler";
import CaptchaHandler from "./Handlers/CaptchaHandler";
import AgentMiddleware from "./Middlewares/AgentMiddleware";
import CSRFHandler from "./Handlers/CSRFHandler";
import DefaultSessionRateLimitter from "./Middlewares/RateLimitters/DefaultSessionRateLimitter";
import UserAgentRateLimitter from "./Middlewares/RateLimitters/UserAgentRateLimitter";
import HashtagReportHandler from "./Handlers/HashtagReportHandler";
import LogoutHandler from "./Handlers/LogoutHandler";
import EmailConfirmationHandler from "./Handlers/EmailConfirmationHandler";
import RegistrationCompleteHandler from "./Handlers/RegistrationCompleteHandler";
import HealthCheckHandler from "./Handlers/HealthCheckHandler";
import RedirectHandler from "./Handlers/RedirectHandler";
import GetUserByNameHandler from "./Handlers/GetUserByNameHandler";
import SetAuthMiddleware from "./Middlewares/SetAuthMiddleware";
import SitemapHandler from "./Handlers/SitemapHandler";
import SitemapStaticHandler from "./Handlers/SitemapStaticHandler";
import SitemapUsersHandler from "./Handlers/SitemapUsersHandler";
import SitemapTagsHandler from "./Handlers/SitemapTagsHandler";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN_KEY,
    // integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 0.01,
    profilesSampleRate: 0.01,
  });
}

const CORS_WHITE_LIST = [
  "http://localhost:5173",
  "http://localhost:3005",
  "https://staging.tinyblog.space",
  "https://tinyblog.space",
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

  app.get("/sitemap.xml", SitemapHandler);
  app.get("/sitemap-static.xml", SitemapStaticHandler);
  app.get("/sitemap-users.xml", SitemapUsersHandler);
  app.get("/sitemap-tags.xml", SitemapTagsHandler);

  app.get("/health", HealthCheckHandler);

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
  app.use(SetAuthMiddleware);

  app.post("/api/v1/login", LoginHandler);
  app.get("/api/v1/logout", LoginRequireMiddleware, LogoutHandler);
  app.post("/api/v1/profileCheck", ProfileCheckHandler);
  app.post("/api/v1/passwordReset", PasswordResetHandler);
  app.post("/api/v1/changePassword", ChangePasswordHandler);
  app.get("/api/v1/redirect/:code", RedirectHandler);
  app.get(
    "/api/v1/me",
    LoginRequireMiddleware,
    DefaultSessionRateLimitter,
    MeHandler
  );
  app.post(
    "/api/v1/posts/:postId/shares",
    LoginRequireMiddleware,
    DefaultSessionRateLimitter,
    ShareHandler
  );
  app.post(
    "/api/v1/posts/:postId/unshares",
    LoginRequireMiddleware,
    DefaultSessionRateLimitter,
    UnshareHandler
  );
  app.get(
    "/api/v1/hashtags/report",
    DefaultSessionRateLimitter,
    HashtagReportHandler
  );

  app.get(
    "/api/v1/captcha",
    UserAgentRateLimitter("CaptchaCreation", 100),
    CaptchaHandler
  );
  app.get("/api/v1/csrf", UserAgentRateLimitter("CSRF", 100), CSRFHandler);
  app.patch(
    "/api/v1/registrations/:id/confirm",
    UserAgentRateLimitter("EmailConfirmation", 50),
    EmailConfirmationHandler
  );
  app.post(
    "/api/v1/registrations/:id/complete",
    UserAgentRateLimitter("RegistrationComplete", 10),
    RegistrationCompleteHandler
  );
};

const onAfterInit = async (app: App) => {
  app.get("/api/v1/users/:username", GetUserByNameHandler);

  const redis = await IoCService.use<RedisAdaptor>("Redis");
  if (!redis.isReady()) {
    await redis.connect();
  }
};

export { onBeforeInit, onAfterInit };
