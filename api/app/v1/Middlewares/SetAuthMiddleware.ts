import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import jwt from "jsonwebtoken";
import { IAuth } from "../../interfaces";
import HTTPService from "../Services/HTTPService";

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const cookies = HTTPService.parseCookies(req);
  const token = cookies["token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET as string);
      req.auth = decoded as IAuth;
    } catch (error) {}
  }

  next();
};
