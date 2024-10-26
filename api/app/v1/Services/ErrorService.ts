import * as Sentry from "@sentry/node";

export const captureError = (error: any, data: any = {}) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error);
    return;
  }

  throw error;
};
