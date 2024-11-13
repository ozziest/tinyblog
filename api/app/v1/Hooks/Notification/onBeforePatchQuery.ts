import { IBeforePatchQueryContext } from "axe-api";

export default async ({ res, req, query }: IBeforePatchQueryContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  query.where("user_id", req.original.auth.userId);
};
