import { create } from "zustand";
import { IPost } from "../interfaces";

interface IState {
  feeds: IPost[];
  firstId: number;
  lastId: number;
}

interface IFeedsStore {
  state: IState;
  init: (feeds: IPost[]) => void;
}

const useFeedsStore = create<IFeedsStore>()((set) => ({
  state: {
    feeds: [],
    firstId: 0,
    lastId: 0,
  },

  init: (feeds: IPost[]) => {
    let firstId = 0;
    let lastId = 0;

    if (feeds.length > 0) {
      lastId = feeds[0].id;
      firstId = feeds[feeds.length - 1].id;
    }

    set(() => ({
      state: {
        feeds,
        firstId,
        lastId,
      },
    }));
  },
}));

export default useFeedsStore;
