import { HandlerTypes, Model } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import MaxRequestRateLimitter from "../Middlewares/RateLimitters/MaxRequestRateLimitter";

class UserFollower extends Model {
  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.DELETE];
  }

  get middlewares() {
    return [
      {
        handler: [HandlerTypes.PAGINATE],
        middleware: SessionMiddleware,
      },
      {
        handler: [HandlerTypes.INSERT],
        middleware: MaxRequestRateLimitter("UserFollower", 100),
      },
    ];
  }
}

export default UserFollower;
