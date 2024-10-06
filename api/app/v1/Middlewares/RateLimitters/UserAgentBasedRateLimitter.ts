import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";

const getIdentifier = (req: IncomingMessage): IRateLimitIdentifier => {
  return {
    name: "UserAgent",
    clientKey: req.agentId,
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests: 1200,
    windowInSeconds: 15 * 60,
  };
};

export default (req: IncomingMessage, res: ServerResponse, next: any) =>
  createRateLimitter(getIdentifier(req), req, res, next);
