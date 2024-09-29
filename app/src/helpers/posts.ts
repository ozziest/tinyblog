import { IResolvedList } from "@/interfaces";
import { ExtendedPost } from "@/stores/postStore";
import { IPostApi } from "@/types/ApiTypes";

export const extendPost = (post: IPostApi): ExtendedPost => {
  return {
    ...post,
    isViewed: false,
    isRootPost: false,
    parent: post.parent ? extendPost(post.parent) : undefined,
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
