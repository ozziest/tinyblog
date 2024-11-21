import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import UserService from "../Services/UserService";
import HTTPService from "../Services/HTTPService";

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const cookies = HTTPService.parseCookies(req);
  const token = cookies["token"];

  if (req.auth) {
    res.setHeader("Set-Cookie", UserService.getCookieContent(token));
    next();
    return;
  }

  res.statusCode = 401;
  res.write(
    JSON.stringify({
      error: "Unauthorized",
    })
  );
  res.end();
  return;
};
