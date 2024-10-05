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
  shareMap,
  toExtendedPost,
  unlikeMap,
  unshareMap,
} from "@/helpers/posts";
import { PER_PAGE } from "@/consts";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  isRootPost: boolean;
  parent?: ExtendedPost;
  reshare?: ExtendedPost;
}

export interface IState {
  type: StoreType;
  isLoading: boolean;
  hasMore: boolean;
  posts: ExtendedPost[];
  minId: number;
  maxId: number;
}

export interface IPostStore {
  state: IState;
  setLoading: (loading: boolean) => void;
  setPosts: (posts: IPostApi[]) => void;
  addMorePosts: (posts: IPostApi[]) => void;
  setExtendedPosts: (posts: ExtendedPost[]) => void;
  addMoreExtendedPosts: (posts: ExtendedPost[]) => void;
  pushPost: (post: IPostApi) => void;
  setViewed: (id: number, isAlreadyViewed: boolean) => void;
  like: (id: number) => void;
  unlike: (id: number) => void;
  share: (id: number) => void;
  unshare: (id: number) => void;
}

export const createStore = (type: StoreType) =>
  create<IPostStore>()((set) => ({
    state: {
      type,
      isLoading: false,
      hasMore: true,
      post: undefined,
      posts: [],
      minId: 0,
      maxId: 0,
    },

    setLoading(isLoading: boolean) {
      set((current) => ({
        state: { ...current.state, isLoading },
      }));
    },

    setPosts(posts: IPostApi[]) {
      const { items, minId, maxId } = resolvePosts(posts);

      const hasMore = posts.length >= PER_PAGE;

      set((current) => ({
        state: { ...current.state, posts: items, minId, maxId, hasMore },
      }));
    },

    addMorePosts(posts: IPostApi[]) {
      const hasMore = posts.length >= PER_PAGE;
      const newPosts = [...this.state.posts, ...toExtendedPost(posts)];
      const { items, minId, maxId } = resolvePosts(newPosts);

      set((current) => ({
        state: { ...current.state, posts: items, minId, maxId, hasMore },
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

    addMoreExtendedPosts(posts: ExtendedPost[]) {
      const hasMore = posts.length >= PER_PAGE;
      const newPosts: ExtendedPost[] = [...this.state.posts, ...posts];
      const replies = posts.filter((item) => item.isRootPost === false);
      const minId = getMinId(replies);
      const maxId = getMaxId(replies);

      set((current) => ({
        state: { ...current.state, posts: newPosts, minId, maxId, hasMore },
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

    share(id: number) {
      const mapper = (post: ExtendedPost) => shareMap(post, id);

      set((current) => ({
        state: { ...current.state, posts: current.state.posts.map(mapper) },
      }));
    },

    unshare(id: number) {
      const mapper = (post: ExtendedPost) => unshareMap(post, id);

      set((current) => ({
        state: { ...current.state, posts: current.state.posts.map(mapper) },
      }));
    },
  }));

export const useDashboardStore = createStore(StoreType.Dashboard);
export const usePostDetailStore = createStore(StoreType.PostDetail);
export const useProfilePostsStore = createStore(StoreType.UserProfile);
