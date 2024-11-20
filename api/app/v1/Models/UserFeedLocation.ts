import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class UserFeedLocation extends Model {
  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.DELETE];
  }

  get fillable() {
    return ["location"];
  }

  get validations() {
    return {
      location: "required|min:2|max:2",
    };
  }

  get middlewares(): ModelMiddleware {
    return [LoginRequireMiddleware, DefaultSessionRateLimitter];
  }
}

export default UserFeedLocation;
