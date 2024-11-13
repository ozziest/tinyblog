import { IBeforeDeleteQueryContext } from "axe-api";

export default async ({ req, res, query }: IBeforeDeleteQueryContext) => {
  if (!req.original.auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  query.where("user_id", req.original.auth.userId);
};
