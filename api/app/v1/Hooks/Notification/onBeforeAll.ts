import { IBeforeAllContext } from "axe-api";
import { FEED_ITEMS_PER_PAGE } from "../../../consts";

export default async ({ query, req, res }: IBeforeAllContext) => {
  if (!req.original.auth) {
    return res.status(401).json({ error: "Authentication error" });
  }

  query.where("user_id", req.original.auth.userId);

  // Clients can not fetch all items. We have to apply a limit all the time.
  // But we can not allow clients decide the limit via frontend queries due to
  // performance concern.
  query.limit(FEED_ITEMS_PER_PAGE);
};
