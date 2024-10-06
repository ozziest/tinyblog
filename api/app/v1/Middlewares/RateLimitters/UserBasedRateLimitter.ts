import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";

const getIdentifier = (req: IncomingMessage): IRateLimitIdentifier => {
  return {
    name: "User",
    clientKey: req.auth?.userId.toString() || "",
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests: 800,
    windowInSeconds: 15 * 60,
  };
};

export default (req: IncomingMessage, res: ServerResponse, next: any) => {
  if (!req.auth) {
    return next();
  }

  createRateLimitter(getIdentifier(req), req, res, next);
};
