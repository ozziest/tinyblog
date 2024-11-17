import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { Knex } from "knex";
import { subMinutes } from "date-fns";
import { validate } from "robust-validator";
import * as Sentry from "@sentry/node";
import { IncomingMessage } from "http";

const getClientInfo = (req: IncomingMessage) => {
  // Get User-Agent
  const userAgent = req.headers["user-agent"] || "Unknown";

  // Get IP Address
  let ip: string | null = req.headers["cf-connecting-ip"] as string;
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"] as string;
    ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
  }

  if (!ip) {
    ip = req.socket.remoteAddress || "Unknown";
  }

  return { ip, userAgent };
};

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const { id: registerId } = req.params;
    const db = await IoCService.use<Knex>("Database");
    const last10Minutes = subMinutes(new Date(), 10);

    const registration = await db
      .table("registrations")
      .where("id", registerId)
      .where("agent_id", req.original.agentId)
      .where("created_at", ">", last10Minutes)
      .whereNull("confirmation_code")
      .first();

    if (!registration) {
      return res.status(400).json({
        error: "The registration is not acceptable.",
      });
    }

    const validation = await validate(registration, {
      email: "required|email|max:320",
      username: "required|alpha_dash|min:3|max:30",
      password: "required",
      name: "required|min:3|max:50",
      bio: "max:240",
      location: "required|min:2|max:2",
    });
    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const tinyblogUsername = `tinyblog_${registration.location.toLowerCase()}`;
    const tinyblogUser = await db
      .table("users")
      .where("username", tinyblogUsername)
      .first();
    if (!tinyblogUser) {
      Sentry.captureException(
        `Tinyblog account not found: ${tinyblogUsername}`
      );
    }

    const [id] = await db.table("users").insert({
      email: registration.email,
      username: registration.username,
      password: registration.password,
      name: registration.name,
      bio: registration.bio,
      location: registration.location,
      stats_post: 0,
      stats_follower: 0,
      stats_following: tinyblogUser ? 1 : 0,
      is_email_confirmed: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Let's create a new follower of tinyblog account
    if (tinyblogUser) {
      await db.table("user_followers").insert({
        user_id: tinyblogUser.id,
        follower_id: id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const { ip, userAgent } = getClientInfo(req.original);

    await db.table("user_confirmations").insert({
      user_id: id,
      version: "1",
      ip_address: ip,
      user_agent: userAgent,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Let's delete the dummy data
    await db.table("registrations").where("id", registerId).delete();

    res.status(200).json({ status: true });
  } catch (error) {
    captureError(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
