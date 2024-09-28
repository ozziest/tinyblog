import { HandlerTypes, Model, ModelMiddleware } from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";

class PostView extends Model {
  get fillable() {
    return {
      POST: ["post_id"],
    };
  }

  get validations() {
    return {
      POST: {
        post_id: "required|numeric",
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

export default PostView;
