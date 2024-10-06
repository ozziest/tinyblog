import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";
import { DEFAULT_RATE_LIMITTER_WINDOW } from "../../../consts";

const getIdentifier = (
  name: string,
  maxRequests: number,
  req: IncomingMessage
): IRateLimitIdentifier => {
  const userId = req.auth?.userId.toString() || "";
  const clientKey = `${name}:${userId}`;

  return {
    name,
    clientKey,
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests,
    windowInSeconds: DEFAULT_RATE_LIMITTER_WINDOW,
  };
};

export default (name: string, maxRequests: number) =>
  (req: IncomingMessage, res: ServerResponse, next: any) => {
    if (!req.auth) {
      return next();
    }

    createRateLimitter(getIdentifier(name, maxRequests, req), req, res, next);
  };
