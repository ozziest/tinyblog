import { IAfterAllContext } from "axe-api";
import { getUserAvatar } from "../../Services/UserService";

export default async ({ result, database }: IAfterAllContext) => {
  for (const item of result) {
    const triggers = await database
      .table("notifications_triggers")
      .select(
        "notifications_triggers.id",
        "users.name",
        "users.email",
        "users.username"
      )
      .leftJoin("users", "users.id", "notifications_triggers.trigger_user_id")
      .where("notifications_triggers.notification_id", item.id)
      .orderBy("notifications_triggers.id", "desc")
      .limit(2);

    item.triggers = triggers.map((trigger) => {
      const email = trigger.email;
      return {
        id: trigger.id,
        user: {
          name: trigger.name,
          username: trigger.username,
          avatar: getUserAvatar(email),
        },
      };
    });
  }
};
