import { LogService } from "axe-api/build/src/Services";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
  url: process.env.MAILGUN_URL,
});

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (process.env.NODE_ENV === "development") {
    LogService.warn(`EMAIL: ${to}`);
    LogService.warn(html);
    return;
  }

  await client.messages.create(MAILGUN_DOMAIN, {
    from: `tinyblog.space <${process.env.MAILGUN_SENDER}>`,
    to: [to],
    subject: subject,
    html,
  });
};
