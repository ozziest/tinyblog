import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { validate } from "robust-validator";
import { isBefore } from "date-fns";
import { captureError } from "../Services/ErrorService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const validation = await validate(req.body, {
      secret: "required",
      code: "required",
    });

    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const { secret, code } = req.body;
    const db = (await IoCService.use("Database")) as Knex;

    const confirmation = await db
      .table("confirmations")
      .where("confirmation_secret", secret)
      .first();

    if (!confirmation) {
      return res.status(404).json({
        error: "Invalid confirmation - 1",
      });
    }

    if (confirmation.confirmation_code !== code) {
      return res.status(404).json({
        error: "Invalid confirmation - 2",
      });
    }

    const expiresAt = new Date(confirmation.expires_at);
    if (isBefore(expiresAt, new Date())) {
      return res.status(404).json({
        error: "Invalid confirmation - 3",
      });
    }

    // Confirmation done!
    await db.table("users").where("id", confirmation.user_id).update({
      is_email_confirmed: true,
    });

    // Deleting the confirmation record
    await db
      .table("confirmations")
      .where("confirmation_secret", secret)
      .delete();

    return res.json({});
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
