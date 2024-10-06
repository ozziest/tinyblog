import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import UserBasedRateLimitter from "../Middlewares/RateLimitters/UserBasedRateLimitter";
import { DATA_MANIPULATION_HANDLERS } from "../../consts";
import MaxRequestRateLimitter from "../Middlewares/RateLimitters/MaxRequestRateLimitter";

class PostView extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get middlewares(): ModelMiddleware {
    return [
      SessionMiddleware,
      UserBasedRateLimitter,
      {
        handler: DATA_MANIPULATION_HANDLERS,
        middleware: MaxRequestRateLimitter("PostView", 500),
      },
    ];
  }
}

export default PostView;
