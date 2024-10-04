import { HandlerTypes, Model } from "axe-api";

class UserFollower extends Model {
  get handlers() {
    return [HandlerTypes.INSERT];
  }

  get fillable() {
    return ["follower_id"];
  }

  get validations() {
    return {
      POST: {
        follower_id: "required|numeric",
      },
    };
  }
}

export default UserFollower;
