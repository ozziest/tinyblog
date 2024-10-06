import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import UserBasedRateLimitter from "../Middlewares/RateLimitters/UserBasedRateLimitter";
import {
  DATA_MANIPULATION_HANDLERS,
  DEFAULT_RATE_LIMITTER_WINDOW,
} from "../../consts";
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
        handler: DATA_MANIPULATION_HANDLERS,
        middleware: MaxRequestRateLimitter("PostLike", 200),
      },
    ];
  }
}

export default PostLike;
