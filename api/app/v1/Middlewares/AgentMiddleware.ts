import { IncomingMessage, ServerResponse } from "http";
import { NextFunction, rateLimit } from "axe-api";
import UserService from "../Services/UserService";
import HTTPService from "../Services/HTTPService";

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const cookies = HTTPService.parseCookies(req);

  let agentId = cookies["agentId"];

  if (!agentId) {
    agentId = UserService.getNewAgentId();
    res.setHeader("Set-Cookie", agentId);
  }

  req.agentId = agentId;

  next();
};
