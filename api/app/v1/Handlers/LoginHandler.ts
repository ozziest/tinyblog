import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req: AxeRequest, res: AxeResponse) => {
  const { email, password } = req.body;
  const db = (await IoCService.use("Database")) as Knex;

  const user = await db
    .table("users")
    .where("email", email)
    .orWhere("username", email)
    .first();

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (bcrypt.compareSync(password, user.password) === false) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string);
  return res.json({
    token,
    username: user.username,
    name: user.name,
    post: user.stats_post,
    follower: user.stats_follower,
    following: user.stats_following,
  });
};
