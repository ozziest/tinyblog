import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { validate } from "robust-validator";
import bcrypt from "bcrypt";
import { nanoid, customAlphabet } from "nanoid";
import { addMinutes, isBefore } from "date-fns";
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
    secret: "required",
    code: "required",
    password: "required|min:8|max:50",
  });

  if (validation.isInvalid) {
    return res.status(400).json(validation);
  }

  const { secret, code, password } = req.body;
  const db = (await IoCService.use("Database")) as Knex;

  const confirmation = await db
    .table("confirmations")
    .where("confirmation_secret", secret)
    .first();

  if (!confirmation) {
    return res.status(404).json({
      error: "Invalid code - 1",
    });
  }

  if (confirmation.confirmation_code !== code) {
    return res.status(404).json({
      error: "Invalid code - 2",
    });
  }

  const expiresAt = new Date(confirmation.expires_at);
  if (isBefore(expiresAt, new Date())) {
    return res.status(404).json({
      error: "Invalid code - 3",
    });
  }

  const user = await db
    .table("users")
    .where("id", confirmation.user_id)
    .first();

  if (!user) {
    return res.status(404).json({
      error: "Invalid code - 4",
    });
  }

  // Update the password
  const passwordHash = bcrypt.hashSync(password, 10);
  await db.table("users").where("id", confirmation.user_id).update({
    password: passwordHash,
    updated_at: new Date(),
  });

  // Delete old reset-password links
  await db
    .table("confirmations")
    .where("user_id", user.id)
    .where("confirmation_type", "password-reset")
    .delete();

  return res.json({});
};