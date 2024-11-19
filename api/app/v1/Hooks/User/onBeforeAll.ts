import { IBeforeAllContext } from "axe-api";
import { USER_ITEMS_PER_PAGE } from "../../../consts";

export default async ({ query }: IBeforeAllContext) => {
  // Clients can not fetch all items. We have to apply a limit all the time.
  // But we can not allow clients decide the limit via frontend queries due to
  // performance concern.
  query.limit(USER_ITEMS_PER_PAGE);
};
