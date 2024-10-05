import {
  allow,
  deny,
  HandlerTypes,
  IHandlerBasedTransactionConfig,
  IQueryLimitConfig,
  Model,
  QueryFeature,
} from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import AgentMiddleware from "../Middlewares/AgentMiddleware";

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
      AgentMiddleware,
      {
        handler: [HandlerTypes.PAGINATE],
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
