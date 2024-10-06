import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import UserBasedRateLimitter from "../Middlewares/RateLimitters/UserBasedRateLimitter";
import MaxRequestRateLimitter from "../Middlewares/RateLimitters/MaxRequestRateLimitter";

class PostLike extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get middlewares(): ModelMiddleware {
    return [
      SessionMiddleware,
      UserBasedRateLimitter,
      {
        handler: [HandlerTypes.INSERT],
        // 500 likes per day
        middleware: MaxRequestRateLimitter("PostLike", 500, 60 * 60 * 24),
      },
    ];
  }
}

export default PostLike;
