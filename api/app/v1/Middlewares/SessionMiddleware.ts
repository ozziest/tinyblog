import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import jwt from "jsonwebtoken";
import { IAuth } from "../../interfaces";
import UserService from "../Services/UserService";

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const cookieHeader = req.headers.cookie; // Get the 'cookie' header from the request
  const cookies: Record<string, string> = {}; // Create an empty object to store cookies

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("="); // Split each cookie into name and value
      cookies[name.trim()] = decodeURIComponent(value?.trim()); // Store the cookie in the object
    });
  }

  return cookies;
}

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const cookies = parseCookies(req);
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
