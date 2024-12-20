import { IBeforePatchQueryContext } from "axe-api";

export default async ({ query, req, res }: IBeforePatchQueryContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  query.where("id", req.original.auth.userId);
};
