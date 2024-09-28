import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";

export default async (req: AxeRequest, res: AxeResponse) => {
  const { email, username } = req.body;
  const db = (await IoCService.use("Database")) as Knex;

  const users = await db
    .table("users")
    .where("email", email.trim().toLowerCase())
    .orWhere("username", username.trim().toLowerCase())
    .limit(10);

  const isEmailFound = users.some((item) => item.email === email);
  const isUsernameFound = users.some((item) => item.username === username);

  return res.json({
    email: isEmailFound,
    username: isUsernameFound,
  });
};
