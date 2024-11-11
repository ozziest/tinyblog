import { HandlerTypes, Model } from "axe-api";

class UserFeedLocation extends Model {
  get handlers() {
    return [HandlerTypes.ALL, HandlerTypes.INSERT, HandlerTypes.DELETE];
  }
}

export default UserFeedLocation;
