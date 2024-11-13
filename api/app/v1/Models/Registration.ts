import { HandlerTypes, Model } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";
import SessionRateLimitter from "../Middlewares/RateLimitters/SessionRateLimitter";
import DefaultSessionRateLimitter from "../Middlewares/RateLimitters/DefaultSessionRateLimitter";

class Registration extends Model {
  get fillable() {
    return {
      POST: ["email"],
      PATCH: ["bio", "location", "username", "password", "name"],
    };
  }

  get validations() {
    return {
      POST: {
        email: "required|email|max:320",
      },
      PATCH: {
        username: "alpha_dash|min:3|max:30",
        password: "min:8|max:50",
        name: "min:3|max:50",
        bio: "max:240",
        location: "in:WW,TR",
      },
    };
  }

  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.PATCH];
  }

  get middlewares() {
    return [
      DefaultSessionRateLimitter,
      {
        handler: [HandlerTypes.INSERT],
        middleware: SessionRateLimitter("RegistrationInsert", 25),
      },
      {
        handler: [HandlerTypes.PATCH],
        middleware: SessionRateLimitter("RegistrationPatch", 30),
      },
    ];
  }

  get hiddens() {
    return [
      "confirmation_code",
      "password",
      "agent_id",
      "email",
      "location",
      "name",
      "bio",
      "username",
      "updated_at",
    ];
  }
}

export default Registration;
