import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

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
}

export default Notification;
