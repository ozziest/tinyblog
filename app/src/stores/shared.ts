import { create } from "zustand";
import { IPostApi } from "../types/ApiTypes";
import { extendPost, resolvePosts } from "../helpers/posts";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  parent?: ExtendedPost;
}

export interface IState {
  rootFeed?: ExtendedPost;
  feeds: ExtendedPost[];
  minId: number;
  maxId: number;
}

export interface IPostStore {
  state: IState;
  setRootFeed: (feed: IPostApi) => void;
  setFeeds: (feeds: IPostApi[]) => void;
  pushFeed: (feed: IPostApi) => void;
  setViewed: (id: number, isAlreadyViewed: boolean) => void;
  like: (id: number) => void;
  unlike: (id: number) => void;
}

export const createStore = () =>
  create<IPostStore>()((set) => ({
    state: {
      feed: undefined,
      feeds: [],
      minId: 0,
      maxId: 0,
    },

    setRootFeed(feed: IPostApi) {
      set((current) => ({
        state: { ...current.state, rootFeed: extendPost(feed) },
      }));
    },

    setFeeds(feeds: IPostApi[]) {
      const { items, minId, maxId } = resolvePosts(feeds);

      set((current) => ({
        state: { ...current.state, feeds: items, minId, maxId },
      }));
    },

    pushFeed(feed: IPostApi) {
      const post = extendPost(feed);

      set((current) => ({
        state: { ...current.state, feeds: [post, ...current.state.feeds] },
      }));
    },

    setViewed(id: number, isAlreadyViewed: boolean) {
      const feeds = [...this.state.feeds];
      const found = feeds.find((item) => item.id === id);
      if (found) {
        found.isViewed = true;

        if (isAlreadyViewed !== true) {
          found.stats_views++;
        }
      }

      set((current) => ({
        state: { ...current.state, feeds },
      }));
    },

    like(id: number) {
      const feeds = [...this.state.feeds];
      const found = feeds.find((item) => item.id === id);
      if (found) {
        found.is_liked_by_you = true;
        found.stats_likes++;
      }

      set((current) => ({
        state: { ...current.state, feeds },
      }));
    },

    unlike(id: number) {
      const feeds = [...this.state.feeds];
      const found = feeds.find((item) => item.id === id);
      if (found) {
        found.is_liked_by_you = false;
        found.stats_likes--;
      }

      set((current) => ({
        state: { ...current.state, feeds },
      }));
    },
  }));
