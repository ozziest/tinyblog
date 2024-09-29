import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";

class PostLike extends Model {
  get middlewares(): ModelMiddleware {
    return [SessionMiddleware];
  }

  get handlers() {
    return [HandlerTypes.INSERT];
  }
}

export default PostLike;
