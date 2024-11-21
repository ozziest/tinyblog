import {
  allow,
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  ModelMiddleware,
  QueryFeature,
} from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";

class Hashtag extends Model {
  get handlers() {
    return [HandlerTypes.ALL, HandlerTypes.INSERT];
  }

  get fillable() {
    return ["hashtag"];
  }

  get validations() {
    return {
      hashtag: "required|max:34",
    };
  }

  get limits(): IQueryLimitConfig[][] {
    return [
      deny(QueryFeature.All),
      allow(QueryFeature.FieldsAll),
      allow(QueryFeature.WhereEqual, ["hashtag"]),
    ];
  }

  get middlewares(): ModelMiddleware {
    return [
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.INSERT],
        middleware: SessionRateLimitter("HashtagInsert", 15),
      },
      {
        handler: [HandlerTypes.INSERT],
        middleware: LoginRequireMiddleware,
      },
    ];
  }
}

export default Hashtag;
