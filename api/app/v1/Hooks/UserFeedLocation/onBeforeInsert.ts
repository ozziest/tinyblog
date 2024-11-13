import { IBeforeInsertContext } from "axe-api";

export default async ({
  req,
  res,
  formData,
  database,
}: IBeforeInsertContext) => {
  if (!req.original.auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  formData.user_id = req.original.auth.userId;

  const item = await database
    .table("user_feed_locations")
    .where("user_id", formData.user_id)
    .where("location", formData.location)
    .first();
  if (item) {
    return res.status(400).json({ error: "The location is already created!" });
  }
};
