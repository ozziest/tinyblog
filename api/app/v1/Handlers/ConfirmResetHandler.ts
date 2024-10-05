import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { validate } from "robust-validator";
import { nanoid, customAlphabet } from "nanoid";
import { addMinutes } from "date-fns";
import { getConfirmationLink } from "../Services/ConfirmationService";
import { getTemplate } from "../Services/TemplateService";
import { EmailTemplates } from "../../enums";
import { sendEmail } from "../Services/MailService";
import { captureError } from "../Services/ErrorService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
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
      .where("is_email_confirmed", false)
      .first();

    if (!user) {
      return res.status(404).json({
        error:
          "The e-mail is not found, or it is alredy confirmed. Please check your email address. You can go to the login page if it looks good.",
      });
    }

    // Delete old confirmation email links
    await db
      .table("confirmations")
      .where("user_id", user.id)
      .where("confirmation_type", "email")
      .delete();

    // Create secret and code
    const secret = nanoid(32);
    const codeGenerator = customAlphabet("1234567890", 6);
    const confirmation_code = codeGenerator();

    // Add new confirmation code to the db
    const data = {
      user_id: user.id,
      confirmation_type: "email",
      confirmation_secret: secret,
      confirmation_code,
      expires_at: addMinutes(new Date(), 30),
      created_at: new Date(),
      updated_at: new Date(),
    };
    await db.table("confirmations").insert(data);

    // Send the confirmation link as e-mail
    const LINK = getConfirmationLink(secret, confirmation_code);
    const html = getTemplate(EmailTemplates.EmailConfirmation)
      .replace("{NAME}", user.name)
      .replace("{LINK}", LINK)
      .replace("{LINK}", LINK);

    await sendEmail(user.email, "E-mail confirmation", html);

    return res.json({});
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
