import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { Knex } from "knex";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(404).send("The link not found");
    }

    const db = await IoCService.use<Knex>("Database");
    const item = await db.table("links").where("code", code).first();

    if (!item) {
      return res.status(404).send("The link not found");
    }

    await db.table("links").where("id", item.id).increment({ count: 1 });

    res.original.writeHead(302, { Location: item.link });
    res.original.end();
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
