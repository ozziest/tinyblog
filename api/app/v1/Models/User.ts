import {
  allow,
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  QueryFeature,
} from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import MaxRequestRateLimitter from "../Middlewares/RateLimitters/MaxRequestRateLimitter";

class User extends Model {
  get fillable() {
    return {
      POST: ["email", "username", "password", "name"],
    };
  }

  get validations() {
    return {
      POST: {
        email: "required|email|max:320",
        username: "required|alpha_dash|min:3|max:30",
        password: "required|min:8|max:50",
        name: "required|min:3|max:50",
      },
    };
  }

  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.PAGINATE];
  }

  get middlewares() {
    return [
      SessionMiddleware,
      {
        handler: [HandlerTypes.PAGINATE],
        middleware: MaxRequestRateLimitter("UserPaginate", 200),
      },
      {
        handler: [HandlerTypes.INSERT],
        middleware: MaxRequestRateLimitter("UserInsert", 50),
      },
    ];
  }

  get limits(): IQueryLimitConfig[][] {
    return [
      deny(QueryFeature.All),
      deny(QueryFeature.FieldsAll),
      allow(QueryFeature.WhereLike, ["username"]),
      allow(QueryFeature.WhereEqual, ["username"]),
    ];
  }

  get hiddens() {
    return ["password"];
  }

  followers() {
    return this.hasMany("UserFollower", "id", "user_id");
  }

  following() {
    return this.hasMany("UserFollower", "id", "follower_id", {
      autoRouting: false,
    });
  }
}

export default User;
