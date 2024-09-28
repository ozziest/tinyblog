import { HandlerTypes, IHandlerBasedTransactionConfig, Model } from "axe-api";

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
        username: "required|min:3|max:30",
        password: "required|min:8|max:50",
        name: "required|min:3|max:50",
      },
    };
  }

  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get hiddens() {
    return ["password"];
  }
}

export default User;
