import { IAfterAllContext } from "axe-api";
import UserSerialization from "../../Serialization/User";

export default async ({ result, database }: IAfterAllContext) => {
  const notificationIds = result.map((item: any) => item.id);

  const triggers = await database
    .table("notifications_triggers")
    .select("notifications_triggers.notification_id", "users.*")
    .whereIn("notifications_triggers.notification_id", notificationIds)
    .leftJoin("users", "users.id", "notifications_triggers.trigger_user_id");

  for (const item of result) {
    const users = triggers.filter(
      (trigger) => trigger.notification_id === item.id
    );
    // TODO: This doesn't work. Because still we have hidden fields on the output!
    item.users = users.map((user) => UserSerialization(user));
  }
};
