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
    return [HandlerTypes.ALL];
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
