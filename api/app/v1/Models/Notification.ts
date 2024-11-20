import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class Notification extends Model {
  get handlers() {
    return [HandlerTypes.ALL, HandlerTypes.PATCH];
  }

  get fillable() {
    return ["is_read"];
  }

  get validations() {
    return {
      is_read: "numeric|min:1|max:1",
    };
  }

  get middlewares(): ModelMiddleware {
    return [LoginRequireMiddleware, DefaultSessionRateLimitter];
  }

  post() {
    return this.hasOne("Post", "id", "post_id");
  }

  reply() {
    return this.hasOne("Post", "id", "reply_id");
  }
}

export default Notification;
