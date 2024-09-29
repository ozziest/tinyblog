import { create } from "zustand";
import { StoreType } from "@/enums";
import { IPostApi } from "@/types/ApiTypes";
import { extendPost, resolvePosts } from "@/helpers/posts";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  parent?: ExtendedPost;
}

export interface IState {
  type: StoreType;
  rootPost?: ExtendedPost;
  posts: ExtendedPost[];
  minId: number;
  maxId: number;
}

export interface IPostStore {
  state: IState;
  setRootPost: (post: IPostApi) => void;
  setPosts: (posts: IPostApi[]) => void;
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

    setRootPost(post: IPostApi) {
      set((current) => ({
        state: { ...current.state, rootPost: extendPost(post) },
      }));
    },

    setPosts(posts: IPostApi[]) {
      const { items, minId, maxId } = resolvePosts(posts);

      set((current) => ({
        state: { ...current.state, posts: items, minId, maxId },
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
      const posts = [...this.state.posts];
      const found = posts.find((item) => item.id === id);
      if (found) {
        found.isViewed = true;

        if (isAlreadyViewed !== true) {
          found.stats_views++;
        }
      }

      set((current) => ({
        state: { ...current.state, posts },
      }));
    },

    like(id: number) {
      set((current) => ({
        state: {
          ...current.state,
          posts: this.state.posts.map((post) => {
            if (post.id === id) {
              post.is_liked_by_you = true;
              post.stats_likes++;
            }
            return post;
          }),
        },
      }));
    },

    unlike(id: number) {
      const posts = [...this.state.posts];
      const found = posts.find((item) => item.id === id);
      if (found) {
        found.is_liked_by_you = false;
        found.stats_likes--;
      }

      set((current) => ({
        state: { ...current.state, posts },
      }));
    },
  }));

export const useDashboardStore = createStore(StoreType.Dashboard);
export const useFeedDetailStore = createStore(StoreType.PostDetail);
export const useUserFeedStore = createStore(StoreType.UserProfile);
