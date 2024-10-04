import { IStorePost } from "@/interfaces";
import { resource } from "axe-api-client";

const USER = "user{id,name,username,email}";
const HASHTAGS = "hashtags{hashtag}";
const MENTIONS = "mentions{username}";
const LINKS = "links{link{code,link}}";

const POST_DETAIL = `${HASHTAGS},${MENTIONS},${LINKS}`;

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

const paginate = async () => {
  return resource("posts")
    .with(
      `${USER},parent{${USER},${POST_DETAIL}},reshare{${USER}},${POST_DETAIL}`,
    )
    .sort("id", "DESC")
    .paginate({ perPage: 30, page: 1 });
};

const setViewed = async (postId: number) => {
  return resource(`posts/${postId}/views`).post();
};

const getPost = async (id: number) => {
  return resource(`posts/${id}`)
    .with(
      `${USER},parent{${POST_DETAIL},parent{id,${USER}},${USER}},${POST_DETAIL}`,
    )
    .get();
};

const getReplies = async (parentId: number) => {
  return resource("posts")
    .where("parent_id", parentId)
    .with(`${USER},${POST_DETAIL}`)
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
