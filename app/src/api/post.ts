import { IStorePost } from "@/interfaces";
import { resource } from "axe-api-client";

const USER_RELATION = "user{id,name,username,email}";

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

const paginate = async () => {
  return resource("posts")
    .with(`${USER_RELATION},parent{${USER_RELATION}},reshare{${USER_RELATION}}`)
    .sort("id", "DESC")
    .paginate({ perPage: 30, page: 1 });
};

const setViewed = async (postId: number) => {
  return resource(`posts/${postId}/views`).post();
};

const getPost = async (id: number) => {
  return resource(`posts/${id}`)
    .with(
      `${USER_RELATION},parent{parent{id,${USER_RELATION}},${USER_RELATION}}`,
    )
    .get();
};

const getReplies = async (parentId: number) => {
  return resource("posts")
    .where("parent_id", parentId)
    .with(`${USER_RELATION}`)
    .sort("id", "DESC")
    .paginate({ perPage: 50, page: 1 });
};

const like = async (postId: number) => {
  return resource(`posts/${postId}/likes`).post();
};

const share = async (postId: number) => {
  return resource(`posts/${postId}/shares`).post();
};

export default {
  store,
  paginate,
  setViewed,
  getPost,
  getReplies,
  like,
  share,
};
