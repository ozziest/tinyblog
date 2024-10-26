import {
  allow,
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  QueryFeature,
} from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class User extends Model {
  get fillable() {
    return {
      POST: ["email", "username", "password", "name"],
      PATCH: ["bio"],
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
      PATCH: {
        bio: "max:240",
      },
    };
  }

  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.PAGINATE, HandlerTypes.PATCH];
  }

  get middlewares() {
    return [
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.PAGINATE],
        middleware: SessionRateLimitter("UserPaginate", 200),
      },
      {
        handler: [HandlerTypes.INSERT],
        middleware: SessionRateLimitter("UserInsert", 50),
      },
      {
        handler: [HandlerTypes.PATCH],
        middleware: SessionRateLimitter("UserPatch", 100),
      },
      {
        handler: [HandlerTypes.PAGINATE, HandlerTypes.PATCH],
        middleware: SessionMiddleware,
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
    return ["password", "deleted_at"];
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
