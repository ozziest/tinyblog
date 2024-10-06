import { IncomingMessage, ServerResponse } from "http";
import { createRateLimitter, IRateLimitIdentifier } from "axe-api";
import { DEFAULT_RATE_LIMITTER_WINDOW } from "../../../consts";

const getIdentifier = (req: IncomingMessage): IRateLimitIdentifier => {
  const clientKey = `UserAgent:${req.agentId}`;

  return {
    name: "UserAgent",
    clientKey: clientKey,
    setResponseHeaders: process.env.NODE_ENV !== "production",
    maxRequests: 1200,
    windowInSeconds: DEFAULT_RATE_LIMITTER_WINDOW,
  };
};

export default (req: IncomingMessage, res: ServerResponse, next: any) =>
  createRateLimitter(getIdentifier(req), req, res, next);
