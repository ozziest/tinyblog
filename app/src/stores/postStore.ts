import { create } from "zustand";
import { IPost } from "../interfaces";

interface IState {
  feeds: IPost[];
  minId: number;
  maxId: number;
}

interface IPostStore {
  state: IState;
  init: (feeds: IPost[]) => void;
  push: (feed: IPost) => void;
}

const getMaxId = (feeds: IPost[]): number => {
  return feeds.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

const getMinId = (feeds: IPost[]): number => {
  return feeds.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

const usePostStore = create<IPostStore>()((set) => ({
  state: {
    feeds: [],
    minId: 0,
    maxId: 0,
  },

  init: (feeds: IPost[]) => {
    let minId = 0;
    let maxId = 0;

    if (feeds.length > 0) {
      maxId = getMaxId(feeds);
      minId = getMinId(feeds);
    }

    set(() => ({
      state: {
        feeds,
        minId,
        maxId,
      },
    }));
  },

  push(feed: IPost) {
    const feeds = [feed, ...this.state.feeds];
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
}));

export default usePostStore;
