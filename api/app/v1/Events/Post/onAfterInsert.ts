import { IBeforeInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";

export default async ({ database, item }: IBeforeInsertContext) => {
  try {
    await database
      .table("users")
      .where("id", item.user_id)
      .increment({ stats_post: 1 });
  } catch (error) {
    captureError(error, { userId: item.user_id });
  }
};
