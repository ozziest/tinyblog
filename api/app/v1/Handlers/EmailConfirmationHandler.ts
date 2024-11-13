import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { Knex } from "knex";
import { validate } from "robust-validator";
import { subMinutes } from "date-fns";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const validation = await validate(req.body, {
      code: "required|min:6|max:6",
    });
    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const { id } = req.params;
    const db = await IoCService.use<Knex>("Database");
    const last5Minutes = subMinutes(new Date(), 5);

    const registration = await db
      .table("registrations")
      .where("id", id)
      .where("agent_id", req.original.agentId)
      .where("created_at", ">", last5Minutes)
      .first();

    if (!registration) {
      return res.status(400).json({
        error: "The registration is not acceptable.",
      });
    }

    if (registration.confirmation_code !== req.body.code) {
      return res.status(400).json({
        error: "The code is not correct.",
      });
    }

    // Let's update the code
    await db
      .table("registrations")
      .where("id", id)
      .where("agent_id", req.original.agentId)
      .update({
        confirmation_code: null,
      });

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
