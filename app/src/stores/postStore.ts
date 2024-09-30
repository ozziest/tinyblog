import { create } from "zustand";
import { StoreType } from "@/enums";
import { IPostApi } from "@/types/ApiTypes";
import {
  extendPost,
  getMaxId,
  getMinId,
  likeMap,
  resolvePosts,
  setViewedMap,
  unlikeMap,
} from "@/helpers/posts";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  isRootPost: boolean;
  parent?: ExtendedPost;
  reshare?: ExtendedPost;
}

export interface IState {
  type: StoreType;
  posts: ExtendedPost[];
  minId: number;
  maxId: number;
}

export interface IPostStore {
  state: IState;
  setPosts: (posts: IPostApi[]) => void;
  setExtendedPosts: (posts: ExtendedPost[]) => void;
  pushPost: (post: IPostApi) => void;
  setViewed: (id: number, isAlreadyViewed: boolean) => void;
  like: (id: number) => void;
  unlike: (id: number) => void;
}

export const createStore = (type: StoreType) =>
  create<IPostStore>()((set) => ({
    state: {
      type,
      post: undefined,
      posts: [],
      minId: 0,
      maxId: 0,
    },

    setPosts(posts: IPostApi[]) {
      const { items, minId, maxId } = resolvePosts(posts);

      set((current) => ({
        state: { ...current.state, posts: items, minId, maxId },
      }));
    },

    setExtendedPosts(posts: ExtendedPost[]) {
      const replies = posts.filter((item) => item.isRootPost === false);
      const minId = getMinId(replies);
      const maxId = getMaxId(replies);

      set((current) => ({
        state: { ...current.state, posts, minId, maxId },
      }));
    },

    pushPost(post: IPostApi) {
      const extendedPost = extendPost(post);

      set((current) => ({
        state: {
          ...current.state,
          posts: [extendedPost, ...current.state.posts],
        },
      }));
    },

    setViewed(id: number, isAlreadyViewed: boolean) {
      const mapper = (post: ExtendedPost) =>
        setViewedMap(post, id, isAlreadyViewed);

      set((current) => ({
        state: {
          ...current.state,
          posts: current.state.posts.map(mapper),
        },
      }));
    },

    like(id: number) {
      const mapper = (post: ExtendedPost) => likeMap(post, id);

      set((current) => ({
        state: { ...current.state, posts: current.state.posts.map(mapper) },
      }));
    },

    unlike(id: number) {
      const mapper = (post: ExtendedPost) => unlikeMap(post, id);

      set((current) => ({
        state: { ...current.state, posts: current.state.posts.map(mapper) },
      }));
    },
  }));

export const useDashboardStore = createStore(StoreType.Dashboard);
export const usePostDetailStore = createStore(StoreType.PostDetail);
export const useProfilePostsStore = createStore(StoreType.UserProfile);
