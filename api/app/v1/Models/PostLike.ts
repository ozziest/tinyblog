import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";

class PostLike extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get middlewares(): ModelMiddleware {
    return [
      LoginRequireMiddleware,
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.INSERT],
        // 500 likes per day
        middleware: SessionRateLimitter("PostLike", 500, 60 * 60 * 24),
      },
    ];
  }
}

export default PostLike;
