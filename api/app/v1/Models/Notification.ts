import { AxeRequest, HandlerTypes, Model, ModelMiddleware } from "axe-api";
import { Knex } from "knex";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

const onBeforeTriggerQuery = async (
  req: AxeRequest,
  query: Knex.QueryBuilder
) => {
  query.orderBy("id", "desc").limit(3);
};

class Notification extends Model {
  get handlers() {
    return [HandlerTypes.ALL];
  }

  get middlewares(): ModelMiddleware {
    return [SessionMiddleware, DefaultSessionRateLimitter];
  }

  post() {
    return this.hasOne("Post", "id", "post_id");
  }

  triggers() {
    return this.hasMany("NotificationTrigger", "id", "notification_id", {
      onBeforeQuery: onBeforeTriggerQuery,
    });
  }
}

export default Notification;
