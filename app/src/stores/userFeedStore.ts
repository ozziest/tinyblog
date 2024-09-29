import { StoreType } from "../enums";
import { createStore } from "./shared";

const useUserFeedStore = createStore(StoreType.UserProfile);

export default useUserFeedStore;
