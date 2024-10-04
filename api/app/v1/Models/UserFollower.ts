import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";

class UserFollower extends Model {
  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.DELETE];
  }

  get middlewares(): ModelMiddleware {
    return [SessionMiddleware];
  }
}

export default UserFollower;
