import { IBeforeUpdateContext } from "axe-api";

export default async ({ res, req, query }: IBeforeUpdateContext) => {
  if (!req.original.auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  query.where("user_id", req.original.auth.userId);
};
