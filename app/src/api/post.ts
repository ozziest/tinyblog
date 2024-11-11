import { IStorePost } from "@/interfaces";
import { resource } from "axe-api-client";

const USER = "user{id,name,username,email}";
const HASHTAGS = "hashtags{hashtag}";
const MENTIONS = "mentions{username}";
const LINKS = "links{link{code,link}}";

const POST_DETAIL = `${USER},${HASHTAGS},${MENTIONS},${LINKS}`;

const POST_ROW = `${POST_DETAIL},reshare{${POST_DETAIL},parent{${POST_DETAIL}}}`;

const FULL_POST = `${POST_ROW},parent{${POST_ROW}}`;

interface PaginateProps {
  feed?: boolean;
  locations?: string[];
  minId?: number;
  userId?: number;
  tagId?: number;
}

const store = async (data: IStorePost) => {
  return resource("posts").post(data);
};

const paginate = async ({
  feed,
  locations,
  userId,
  minId,
  tagId,
}: PaginateProps = {}) => {
  const query = resource("posts/all").with(FULL_POST).sort("id", "DESC");

  if (feed) {
    query.searchParams({ feed: "true" });
  }

  if (tagId) {
    query.searchParams({ tagId: tagId.toString() });
  }

  if (userId) {
    query.where("user_id", userId);
  }

  if (minId) {
    query.where("id", "<", minId);
  }

  if (locations && locations.length > 0) {
    query.whereIn("location", locations);
  }

  return query.get();
};

const setViewed = async (postId: number) => {
  return resource(`posts/${postId}/views`).post();
};

const getPost = async (id: number) => {
  return resource(`posts/${id}`).with(FULL_POST).get();
};

const getReplies = async (parentId: number, minId?: number) => {
  const query = resource("posts/all")
    .where("parent_id", parentId)
    .with(`${USER},${POST_DETAIL}`)
    .sort("id", "DESC");

  if (minId) {
    query.where("id", "<", minId);
  }

  return query.get();
};

const like = async (postId: number) => {
  return resource(`posts/${postId}/likes`).post();
};

const share = async (postId: number) => {
  return resource(`posts/${postId}/shares`).post();
};

const unshare = async (postId: number) => {
  return resource(`posts/${postId}/unshares`).post();
};

export default {
  store,
  paginate,
  setViewed,
  getPost,
  getReplies,
  like,
  share,
  unshare,
};
