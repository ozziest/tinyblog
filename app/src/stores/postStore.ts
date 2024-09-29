import { create } from "zustand";
import { IPostApi } from "../types/ApiTypes";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
}

interface IState {
  feeds: ExtendedPost[];
  minId: number;
  maxId: number;
}

interface IPostStore {
  state: IState;
  init: (feeds: IPostApi[]) => void;
  push: (feed: IPostApi) => void;
  setViewed: (id: number, isAlreadyViewed: boolean) => void;
}

const getMaxId = (feeds: IPostApi[]): number => {
  return feeds.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

const getMinId = (feeds: IPostApi[]): number => {
  return feeds.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

export const extendPost = (post: IPostApi): ExtendedPost => {
  return {
    ...post,
    isViewed: false,
  };
};

export const toExtendedPost = (feeds: IPostApi[]): ExtendedPost[] => {
  return feeds.map(extendPost);
};

const usePostStore = create<IPostStore>()((set) => ({
  state: {
    feeds: [],
    minId: 0,
    maxId: 0,
  },

  init: (feeds: IPostApi[]) => {
    let minId = 0;
    let maxId = 0;

    if (feeds.length > 0) {
      maxId = getMaxId(feeds);
      minId = getMinId(feeds);
    }

    set(() => ({
      state: {
        feeds: toExtendedPost(feeds),
        minId,
        maxId,
      },
    }));
  },

  push(feed: IPostApi) {
    const feeds = [...toExtendedPost([feed]), ...this.state.feeds];
    const maxId = getMaxId(feeds);
    const minId = getMinId(feeds);

    set(() => ({
      state: {
        feeds,
        minId,
        maxId,
      },
    }));
  },

  setViewed(id: number, isAlreadyViewed: boolean) {
    const newState = { ...this.state };
    const found = newState.feeds.find((item) => item.id === id);
    if (found) {
      found.isViewed = true;

      if (isAlreadyViewed !== true) {
        found.stats_views++;
      }
    }

    set(() => ({ state: newState }));
  },
}));

export default usePostStore;
