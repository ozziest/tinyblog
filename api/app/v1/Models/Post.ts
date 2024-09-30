import {
  deny,
  HandlerTypes,
  IQueryLimitConfig,
  Model,
  ModelMiddleware,
  QueryFeature,
} from "axe-api";
import SessionMiddleware from "../Middlewares/SessionMiddleware";

class Post extends Model {
  get fillable() {
    return {
      POST: ["parent_id", "content"],
    };
  }

  get validations() {
    return {
      POST: {
        parent_id: "numeric",
        content: "required|min:1|max:240",
      },
    };
  }

  get middlewares(): ModelMiddleware {
    return [SessionMiddleware];
  }

  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.PAGINATE, HandlerTypes.SHOW];
  }

  get limits(): IQueryLimitConfig[][] {
    return [deny(QueryFeature.WithHasMany, ["views", "likes"])];
  }

  user() {
    return this.hasOne("User", "id", "user_id");
  }

  parent() {
    return this.hasOne("Post", "id", "parent_id");
  }

  reshare() {
    return this.hasOne("Post", "id", "reshare_id");
  }

  views() {
    return this.hasMany("PostView", "id", "post_id");
  }

  likes() {
    return this.hasMany("PostLike", "id", "post_id");
  }
}

export default Post;
