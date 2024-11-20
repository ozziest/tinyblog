import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserService, { getUserAvatar } from "../Services/UserService";
import { captureError } from "../Services/ErrorService";
import HTTPService from "../Services/HTTPService";
import { validate } from "robust-validator";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const validation = await validate(req.body, {
      cfToken: "required",
      email: "required",
      password: "required",
    });

    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const { email, password, cfToken } = req.body;

    // Let's verify the user with CF
    const isVerifiedByCF = await HTTPService.verifyCFToken(
      cfToken,
      HTTPService.getIpAddress(req.original)
    );
    if (!isVerifiedByCF) {
      return res.status(400).json({
        error:
          "We couldn't verify that you are a real user. Please try again later.",
      });
    }

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

    const token = jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET as string
    );
    res.header("Set-Cookie", UserService.getCookieContent(token));

    const locations = await db
      .table("user_feed_locations")
      .where("user_id", user.id);

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        bio: user.bio,
        stats_post: user.stats_post,
        stats_follower: user.stats_follower,
        stats_following: user.stats_following,
        avatar: getUserAvatar(user.email),
        is_push_notification_on: user.is_push_notification_on === 1,
        account_visibility: user.account_visibility,
        locations,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
