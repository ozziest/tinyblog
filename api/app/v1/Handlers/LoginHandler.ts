import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService, { getUserAvatar } from "../Services/UserService";

export default async (req: AxeRequest, res: AxeResponse) => {
  const { email, password } = req.body;
  const db = (await IoCService.use("Database")) as Knex;

  const user = await db
    .table("users")
    .where("email", email.trim().toLowerCase())
    .orWhere("username", email.trim().toLowerCase())
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

  if (user.is_email_confirmed === 0) {
    return res.status(404).json({
      error: "The e-mail address it not confirmed!",
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string);
  res.header("Set-Cookie", UserService.getCookieContent(token));

  return res.json({
    user: {
      username: user.username,
      name: user.name,
      bio: user.bio,
      stats_post: user.stats_post,
      stats_follower: user.stats_follower,
      stats_following: user.stats_following,
      avatar: getUserAvatar(user.email),
    },
  });
};
