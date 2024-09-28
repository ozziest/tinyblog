import { IStorePost } from "../interfaces";
import { resource } from "axe-api-client";

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

export default {
  store,
};
