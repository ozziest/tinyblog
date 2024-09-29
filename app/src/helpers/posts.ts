import { IResolvedList } from "@/interfaces";
import { ExtendedPost } from "@/stores/shared";
import { IPostApi } from "@/types/ApiTypes";

export const extendPost = (post: IPostApi): ExtendedPost => {
  return {
    ...post,
    isViewed: false,
    parent: post.parent ? extendPost(post.parent) : undefined,
  };
};

export const toExtendedPost = (feeds: IPostApi[]): ExtendedPost[] => {
  return feeds.map(extendPost);
};

export const getMaxId = (feeds: IPostApi[]): number => {
  return feeds.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

export const getMinId = (feeds: IPostApi[]): number => {
  return feeds.reduce((min, obj) => {
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
