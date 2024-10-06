import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";
import { DEFAULT_RATE_LIMITTER_WINDOW } from "../../../consts";

const getIdentifier = (req: IncomingMessage): IRateLimitIdentifier => {
  const userId = req.auth?.userId.toString() || "";
  const clientKey = `UserBased:${userId}`;

  return {
    name: "UserBased",
    clientKey,
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests: 800,
    windowInSeconds: DEFAULT_RATE_LIMITTER_WINDOW,
  };
};

export default (req: IncomingMessage, res: ServerResponse, next: any) => {
  if (!req.auth) {
    return next();
  }

  createRateLimitter(getIdentifier(req), req, res, next);
};
