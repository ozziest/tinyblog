import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserAvatar } from "../Services/UserService";

export default async (req: AxeRequest, res: AxeResponse) => {
  const db = (await IoCService.use("Database")) as Knex;

  const user = await db
    .table("users")
    .where("id", req.original.auth?.userId)
    .first();

  if (!user) {
    return res.status(404).json({ error: "The user not found!" });
  }

  return res.json({
    username: user.username,
    name: user.name,
    post: user.stats_post,
    follower: user.stats_follower,
    following: user.stats_following,
    avatar: getUserAvatar(user.email),
  });
};