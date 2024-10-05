import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { nanoid } from "nanoid";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const redis = await IoCService.use<RedisAdaptor>("Redis");
    if (redis.isReady() === false) {
      await redis.connect();
    }

    const csrf = nanoid(40);
    redis.set(`LastCSRF:${req.original.agentId}`, csrf, 60 * 10);
    res.status(200).json({ csrf });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
