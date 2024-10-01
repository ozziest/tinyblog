import { Model } from "axe-api";

class PostLink extends Model {
  get handlers() {
    return [];
  }

  link() {
    return this.hasOne("Link", "id", "link_id");
  }
}

export default PostLink;
