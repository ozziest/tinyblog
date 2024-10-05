import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import jwt from "jsonwebtoken";
import { IAuth } from "../../interfaces";
import UserService from "../Services/UserService";
import HTTPService from "../Services/HTTPService";

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const cookies = HTTPService.parseCookies(req);
  const token = cookies["token"];

  if (!token) {
    res.statusCode = 401;
    res.write(
      JSON.stringify({
        error: "Unauthorized",
      })
    );
    res.end();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string);
    req.auth = decoded as IAuth;
    res.setHeader("Set-Cookie", UserService.getCookieContent(token));
  } catch (error) {
    res.statusCode = 401;
    res.write(
      JSON.stringify({
        error: "Unauthorized",
      })
    );
    res.end();
    return;
  }

  next();
};
