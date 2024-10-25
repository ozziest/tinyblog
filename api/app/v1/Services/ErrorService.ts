import * as Sentry from "@sentry/node";

export const captureError = (error: any, data: any = {}) => {
  Sentry.captureException(error);
  console.log(data);
};
