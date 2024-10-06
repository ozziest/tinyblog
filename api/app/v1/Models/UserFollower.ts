import { HandlerTypes, Model } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class UserFollower extends Model {
  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.DELETE];
  }

  get middlewares() {
    return [
      SessionMiddleware,
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.INSERT, HandlerTypes.DELETE],
        middleware: SessionRateLimitter("UserFollower", 100),
      },
    ];
  }
}

export default UserFollower;
