import { create } from "zustand";
import { StoreType } from "@/enums";
import { IPostApi } from "@/types/ApiTypes";
import { extendPost, getMaxId, getMinId, resolvePosts } from "@/helpers/posts";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  isRootPost: boolean;
  parent?: ExtendedPost;
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
        state: { ...current.state, posts: posts, minId, maxId },
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
      const posts = [...this.state.posts].map((post) => {
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
      });

      set((current) => ({
        state: { ...current.state, posts },
      }));
    },

    like(id: number) {
      const posts = [...this.state.posts].map((post) => {
        if (post.id === id) {
          post.is_liked_by_you = true;
          post.stats_likes++;
        }

        if (post.parent?.id === id) {
          post.parent.is_liked_by_you = true;
          post.parent.stats_likes++;
        }

        return post;
      });

      set((current) => ({
        state: { ...current.state, posts },
      }));
    },

    unlike(id: number) {
      const posts = [...this.state.posts].map((post) => {
        if (post.id === id) {
          post.is_liked_by_you = false;
          post.stats_likes--;
        }

        if (post.parent?.id === id) {
          post.parent.is_liked_by_you = false;
          post.parent.stats_likes--;
        }

        return post;
      });

      set((current) => ({
        state: { ...current.state, posts },
      }));
    },
  }));

export const useDashboardStore = createStore(StoreType.Dashboard);
export const usePostDetailStore = createStore(StoreType.PostDetail);
export const useProfilePostsStore = createStore(StoreType.UserProfile);
