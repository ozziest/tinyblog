import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import jwt from "jsonwebtoken";
import { IAuth } from "../../interfaces";

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
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
    const decoded = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.APP_SECRET as string
    );
    req.auth = decoded as IAuth;
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
