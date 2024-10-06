import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";
import { DEFAULT_RATE_LIMITTER_WINDOW } from "../../../consts";

const getIdentifier = (
  name: string,
  maxRequests: number,
  windowInSeconds: number,
  req: IncomingMessage
): IRateLimitIdentifier => {
  const userId = req.auth?.userId.toString() || "";
  const clientKey = `${name}:${userId}`;

  return {
    name,
    clientKey,
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests,
    windowInSeconds,
  };
};

export default (
    name: string,
    maxRequests: number,
    windowInSeconds = DEFAULT_RATE_LIMITTER_WINDOW
  ) =>
  (req: IncomingMessage, res: ServerResponse, next: any) => {
    if (!req.auth) {
      return next();
    }

    createRateLimitter(
      getIdentifier(name, maxRequests, windowInSeconds, req),
      req,
      res,
      next
    );
  };
