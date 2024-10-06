import { HandlerTypes, Model, ModelMiddleware, rateLimit } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";
import { DATA_MANIPULATION_HANDLERS } from "../../consts";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";

class PostView extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get middlewares(): ModelMiddleware {
    return [
      SessionMiddleware,
      DefaultSessionRateLimitter,
      {
        handler: DATA_MANIPULATION_HANDLERS,
        middleware: SessionRateLimitter("PostView", 500),
      },
    ];
  }
}

export default PostView;
