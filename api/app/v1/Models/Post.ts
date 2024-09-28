import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";

class Post extends Model {
  get fillable() {
    return {
      POST: ["content"],
    };
  }

  get validations() {
    return {
      POST: {
        content: "required|min:1|max:240",
      },
    };
  }

  get middlewares(): ModelMiddleware {
    return [SessionMiddleware];
  }

  get handlers() {
    return [HandlerTypes.INSERT];
  }
}

export default Post;
