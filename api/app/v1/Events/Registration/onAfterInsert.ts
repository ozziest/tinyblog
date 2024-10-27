import { IBeforeInsertContext } from "axe-api";
import { sendEmail } from "../../Services/MailService";
import { captureError } from "../../Services/ErrorService";
import { getTemplate } from "../../Services/TemplateService";
import { EmailTemplates } from "../../../enums";

export default async ({ item }: IBeforeInsertContext) => {
  try {
    const { email, confirmation_code } = item;

    const html = getTemplate(EmailTemplates.EmailConfirmation).replace(
      "{CODE}",
      confirmation_code
    );

    await sendEmail(email, "E-mail confirmation", html);
  } catch (error) {
    captureError(error);
  }
};
