import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { validate } from "robust-validator";
import { nanoid, customAlphabet } from "nanoid";
import { addMinutes } from "date-fns";
import {
  getConfirmationLink,
  getPasswordResetLink,
} from "../Services/ConfirmationService";
import { getTemplate } from "../Services/TemplateService";
import { EmailTemplates } from "../../enums";
import { sendEmail } from "../Services/MailService";

const SUCCESS_MESSAGE =
  "The password reset link has been send to the e-mail address.";

export default async (req: AxeRequest, res: AxeResponse) => {
  const validation = await validate(req.body, {
    email: "required|email",
  });

  if (validation.isInvalid) {
    return res.status(400).json(validation);
  }

  const { email } = req.body;
  const db = (await IoCService.use("Database")) as Knex;

  const user = await db
    .table("users")
    .where("email", email)
    .where("is_email_confirmed", true)
    .first();

  console.log(user);

  // We shouldn't give too much information to the users
  if (!user) {
    return res.json({});
  }

  // Create secret and code
  const secret = nanoid(32);
  const codeGenerator = customAlphabet("1234567890", 6);
  const confirmation_code = codeGenerator();

  // Delete old reset-password links
  await db
    .table("confirmations")
    .where("user_id", user.id)
    .where("confirmation_type", "password-reset")
    .delete();

  // Add new confirmation code to the db
  const data = {
    user_id: user.id,
    confirmation_type: "password-reset",
    confirmation_secret: secret,
    confirmation_code,
    expires_at: addMinutes(new Date(), 30),
    created_at: new Date(),
    updated_at: new Date(),
  };
  await db.table("confirmations").insert(data);

  // Send the confirmation link as e-mail
  const LINK = getPasswordResetLink(secret, confirmation_code);
  const html = getTemplate(EmailTemplates.PasswordReset)
    .replace("{NAME}", user.name)
    .replace("{LINK}", LINK)
    .replace("{LINK}", LINK);

  await sendEmail(user.email, "Password reset", html);

  return res.json({});
};
