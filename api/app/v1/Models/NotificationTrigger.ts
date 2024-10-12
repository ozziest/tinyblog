import { Model } from "axe-api";

class NotificationTrigger extends Model {
  get table() {
    return "notifications_triggers";
  }

  get handlers() {
    return [];
  }

  user() {
    return this.hasOne("User", "id", "trigger_user_id");
  }
}

export default NotificationTrigger;
