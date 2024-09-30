import { IResolvedList } from "@/interfaces";
import { ExtendedPost } from "@/stores/postStore";
import { IPostApi } from "@/types/ApiTypes";

export const extendPost = (post: IPostApi): ExtendedPost => {
  return {
    ...post,
    isViewed: false,
    isRootPost: false,
    parent: post.parent ? extendPost(post.parent) : undefined,
    reshare: post.reshare ? extendPost(post.reshare) : undefined,
  };
};

export const toExtendedPost = (posts: IPostApi[]): ExtendedPost[] => {
  return posts.map(extendPost);
};

export const getMaxId = (posts: IPostApi[]): number => {
  return posts.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

export const getMinId = (posts: IPostApi[]): number => {
  return posts.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

export const resolvePosts = (
  posts: IPostApi[],
): IResolvedList<ExtendedPost> => {
  let minId = 0;
  let maxId = 0;

  if (posts.length > 0) {
    maxId = getMaxId(posts);
    minId = getMinId(posts);
  }

  return {
    items: toExtendedPost(posts),
    minId,
    maxId,
  };
};

export const setViewedMap = (
  post: ExtendedPost,
  id: number,
  isAlreadyViewed: boolean,
) => {
  if (post.id === id) {
    post.isViewed = true;

    if (isAlreadyViewed !== true) {
      post.stats_views++;
    }
  }

  if (post.parent?.id === id) {
    post.parent.isViewed = true;

    if (isAlreadyViewed !== true) {
      post.parent.stats_views++;
    }
  }

  return post;
};

export const likeMap = (post: ExtendedPost, id: number) => {
  if (post.id === id) {
    post.is_liked_by_you = true;
    post.stats_likes++;
  }

  if (post.parent?.id === id) {
    post.parent.is_liked_by_you = true;
    post.parent.stats_likes++;
  }

  if (post.reshare?.id === id) {
    post.reshare.is_liked_by_you = true;
    post.reshare.stats_likes++;
  }

  return post;
};

export const unlikeMap = (post: ExtendedPost, id: number) => {
  if (post.id === id) {
    post.is_liked_by_you = false;
    post.stats_likes--;
  }

  if (post.parent?.id === id) {
    post.parent.is_liked_by_you = false;
    post.parent.stats_likes--;
  }

  if (post.reshare?.id === id) {
    post.reshare.is_liked_by_you = false;
    post.reshare.stats_likes--;
  }

  return post;
};
