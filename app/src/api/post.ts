import { IStorePost } from "../interfaces";
import { resource } from "axe-api-client";

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

const paginate = async () => {
  return resource("posts")
    .with("user{id,name,username,email}")
    .sort("id", "DESC")
    .paginate({ perPage: 30, page: 1 });
};

export default {
  store,
  paginate,
};
