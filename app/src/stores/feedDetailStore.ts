import { StoreType } from "../enums";
import { createStore } from "./shared";

const useFeedDetailStore = createStore(StoreType.PostDetail);

export default useFeedDetailStore;
