import { IBeforeDeleteContext } from "axe-api";

export default async ({ query, req, res }: IBeforeDeleteContext) => {
  if (!req.original.auth) {
    return res.status(401).json({ error: "It is not permitted" });
  }

  query.where("follower_id", req.original.auth.userId);
};
