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
      POST: ["parent_id", "content", "lexical"],
    };
  }

  get validations() {
    return {
      POST: {
        parent_id: "numeric",
        content: "required|min:1|max:240",
        lexical: "required|min:1|max:3000",
      },
    };
  }

  get middlewares(): ModelMiddleware {
    return [SessionMiddleware];
  }

  get handlers() {
    return [HandlerTypes.INSERT, HandlerTypes.ALL, HandlerTypes.SHOW];
  }

  get limits(): IQueryLimitConfig[][] {
    return [deny(QueryFeature.WithHasMany, ["views", "likes"])];
  }

  get hiddens() {
    return ["lexical"];
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

  hashtags() {
    return this.hasMany("PostHashtag", "id", "post_id");
  }

  mentions() {
    return this.hasMany("PostMention", "id", "post_id");
  }

  links() {
    return this.hasMany("PostLink", "id", "post_id");
  }
}

export default Post;
