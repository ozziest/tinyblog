import { IStorePost } from "../interfaces";
import { resource } from "axe-api-client";

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

const paginate = async () => {
  return resource("posts")
    .with("user{id,name,username,email},parent{user{id,name,username,email}}")
    .sort("id", "DESC")
    .paginate({ perPage: 30, page: 1 });
};

const setViewed = async (postId: number) => {
  return resource(`posts/${postId}/views`).post();
};

const getPost = async (id: number) => {
  return resource(`posts/${id}`)
    .with("user{id,name,username,email},parent{user{id,name,username,email}}")
    .get();
};

const getReplies = async (parentId: number) => {
  return resource("posts")
    .where("parent_id", parentId)
    .with("user{id,name,username,email}")
    .sort("id", "DESC")
    .paginate({ perPage: 30, page: 1 });
};

export default {
  store,
  paginate,
  setViewed,
  getPost,
  getReplies,
};
