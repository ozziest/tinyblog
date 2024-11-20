import {
  allow,
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  QueryFeature,
} from "axe-api";
import LoginRequireMiddleware from "../Middlewares/LoginRequireMiddleware";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class User extends Model {
  get fillable() {
    return {
      PATCH: [
        "bio",
        "location",
        "name",
        "push_notification_endpoint",
        "push_notification_p256dh",
        "push_notification_auth",
        "account_visibility",
      ],
    };
  }

  get validations() {
    return {
      PUT: {
        bio: "max:240",
        location: "required|min:2|max:2",
        name: "required|min:3|max:50",
        push_notification_endpoint: "max:500",
        push_notification_p256dh: "max:100",
        push_notification_auth: "max:300",
      },
    };
  }

  get handlers() {
    return [HandlerTypes.PAGINATE, HandlerTypes.ALL, HandlerTypes.PATCH];
  }

  get middlewares() {
    return [
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.PAGINATE],
        middleware: SessionRateLimitter("UserPaginate", 200),
      },
      {
        handler: [HandlerTypes.PATCH],
        middleware: SessionRateLimitter("UserPatch", 100),
      },
      {
        handler: [HandlerTypes.PAGINATE, HandlerTypes.PATCH, HandlerTypes.ALL],
        middleware: LoginRequireMiddleware,
      },
    ];
  }

  get limits(): IQueryLimitConfig[][] {
    return [
      deny(QueryFeature.All),
      deny(QueryFeature.FieldsAll),
      allow(QueryFeature.WhereLike, ["username"]),
      allow(QueryFeature.WhereEqual, ["username"]),
      allow(QueryFeature.Sorting, ["id"]),
      allow(QueryFeature.WhereLt, ["id"]),
      allow(QueryFeature.Limits),
    ];
  }

  get hiddens() {
    return [
      "password",
      "deleted_at",
      "is_email_confirmed",
      "push_notification_endpoint",
      "push_notification_p256dh",
      "push_notification_auth",
    ];
  }

  followers() {
    return this.hasMany("UserFollower", "id", "user_id");
  }

  following() {
    return this.hasMany("UserFollower", "id", "follower_id", {
      autoRouting: false,
    });
  }

  locations() {
    return this.hasMany("UserFeedLocation", "id", "user_id");
  }
}

export default User;
