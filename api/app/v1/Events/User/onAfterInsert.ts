import { IBeforeInsertContext } from "axe-api";
import { sendEmail } from "../../Services/MailService";
import { captureError } from "../../Services/ErrorService";
import { getTemplate } from "../../Services/TemplateService";
import { EmailTemplates } from "../../../enums";
import { nanoid, customAlphabet } from "nanoid";
import { addMinutes } from "date-fns";

export default async ({ database, item }: IBeforeInsertContext) => {
  try {
    const { id, email, name } = item;
    const codeGenerator = customAlphabet("1234567890", 6);

    const secret = nanoid(32);
    const code = codeGenerator();

    const data = {
      user_id: id,
      confirmation_type: "email",
      confirmation_secret: secret,
      confirmation_code: code,
      expires_at: addMinutes(new Date(), 30),
      created_at: new Date(),
      updated_at: new Date(),
    };

    await database.table("confirmations").insert(data);

    const LINK = `${process.env.DOMAIN}/confirm/email/${secret}/${code}`;

    const html = getTemplate(EmailTemplates.EmailConfirmation)
      .replace("{NAME}", name)
      .replace("{LINK}", LINK)
      .replace("{LINK}", LINK);

    await sendEmail(email, "E-mail confirmation", html);
  } catch (error) {
    captureError(error);
  }
};
