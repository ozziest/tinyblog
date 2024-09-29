import { create } from "zustand";
import { IPostApi } from "../types/ApiTypes";
import { extendPost, resolvePosts } from "../helpers/posts";
import { StoreType } from "../enums";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  parent?: ExtendedPost;
}

export interface IState {
  type: StoreType;
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

export const createStore = (type: StoreType) =>
  create<IPostStore>()((set) => ({
    state: {
      type,
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
      set((current) => ({
        state: {
          ...current.state,
          feeds: this.state.feeds.map((feed) => {
            if (feed.id === id) {
              feed.is_liked_by_you = true;
              feed.stats_likes++;
            }
            return feed;
          }),
        },
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
