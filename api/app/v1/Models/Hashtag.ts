import {
  allow,
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  ModelMiddleware,
  QueryFeature,
} from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

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
    return [SessionMiddleware, DefaultSessionRateLimitter];
  }
}

export default Hashtag;
