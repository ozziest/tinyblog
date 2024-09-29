import { IPostApi } from "../types/ApiTypes";

export interface ExtendedPost extends IPostApi {
  isViewed: boolean;
  parent?: ExtendedPost;
}

export interface IState {
  feeds: ExtendedPost[];
  minId: number;
  maxId: number;
}

export interface IPostStore {
  state: IState;
  setFeeds: (feeds: IPostApi[]) => void;
  pushFeed: (feed: IPostApi) => void;
  setViewed: (id: number, isAlreadyViewed: boolean) => void;
  like: (id: number) => void;
  unlike: (id: number) => void;
}
