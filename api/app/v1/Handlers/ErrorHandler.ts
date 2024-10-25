import { IncomingMessage, ServerResponse } from "http";
import { NextFunction } from "axe-api";
import "dotenv/config";
import { captureError } from "../Services/ErrorService";

const ErrorHandler = (
  err: any,
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => {
  let error = {
    ...err,
    message: err.message,
    date: Date.now(),
  };

  if (process.env.NODE_ENV === "production") {
    captureError(error);
    error = {
      message: "An error occurred!",
    };
  }

  res.statusCode = 500;
  res.write(JSON.stringify(error));
  res.end();
  next();
};

export default ErrorHandler;
