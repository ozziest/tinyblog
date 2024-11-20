import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";
import { DATA_MANIPULATION_HANDLERS } from "../../consts";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";

class PostView extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get middlewares(): ModelMiddleware {
    return [
      LoginRequireMiddleware,
      DefaultSessionRateLimitter,
      {
        handler: DATA_MANIPULATION_HANDLERS,
        middleware: SessionRateLimitter("PostView", 500),
      },
    ];
  }
}

export default PostView;
