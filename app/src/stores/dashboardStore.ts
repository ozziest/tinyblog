import { StoreType } from "../enums";
import { createStore } from "./shared";

const useDashboardStore = createStore(StoreType.Dashboard);

export default useDashboardStore;
