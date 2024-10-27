import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { captureError } from "../Services/ErrorService";
import { validate } from "robust-validator";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const validation = await validate(req.body, {
      email: "email",
      username: "string",
    });

    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const { email, username } = req.body;
    const db = (await IoCService.use("Database")) as Knex;

    const query = db.table("users");

    if (email) {
      query.where("email", email.trim().toLowerCase());
    }

    if (username) {
      query.where("username", username.trim().toLowerCase());
    }

    const users = await query.limit(1);

    const isEmailFound = users.some((item) => item.email === email);
    const isUsernameFound = users.some((item) => item.username === username);

    return res.json({
      email: isEmailFound,
      username: isUsernameFound,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
