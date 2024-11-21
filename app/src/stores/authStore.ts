import { create } from "zustand";
import {
  ILoginResponseApi,
  IUserApi,
  IUserFeedLocationApi,
} from "@/types/ApiTypes";
import api from "@/api";

export interface AuthStoreState {
  isLoggedIn: boolean;
  user: IUserApi;
}

type IncreaseType = "stats_post" | "stats_follower" | "stats_following";

interface AuthState {
  state: AuthStoreState;
  check: () => Promise<void>;
  init: (response: ILoginResponseApi) => void;
  update: (user: IUserApi) => void;
  patch: (user: Partial<IUserApi>) => void;
  logout: () => void;
  increase: (type: IncreaseType) => void;
  decrease: (type: IncreaseType) => void;
  setFeedLocations: (locations: IUserFeedLocationApi[]) => void;
  getFeedLocations: () => string[];
}

const DEFAULT_STATE: AuthStoreState = {
  isLoggedIn: false,
  user: {
    name: "",
    username: "",
    avatar: "",
    email: "",
    location: "WW",
    stats_post: 0,
    stats_follower: 0,
    stats_following: 0,
    id: 0,
    is_push_notification_on: false,
    account_visibility: "public",
    locations: [],
  },
};

export const getDefaultStore = (): AuthStoreState => {
  const content = sessionStorage.getItem("useAuthStore");
  if (content) {
    return JSON.parse(content) as AuthStoreState;
  }

  return DEFAULT_STATE;
};

const useAuthStore = create<AuthState>()((set) => ({
  state: getDefaultStore(),

  async check() {
    const response = await api.user.getMyself();

    if (response.status === 200) {
      const user = await response.json();
      this.init({ user });
    }
  },

  init: (response: ILoginResponseApi) => {
    const value: AuthStoreState = {
      isLoggedIn: true,
      user: response.user,
    };
    sessionStorage.setItem("useAuthStore", JSON.stringify(value));
    set(() => ({ state: value }));
  },

  increase(type: IncreaseType) {
    const newState = { ...this.state };
    newState.user[type] = newState.user[type] + 1;
    set(() => ({ state: newState }));
  },

  decrease(type: IncreaseType) {
    const newState = { ...this.state };
    newState.user[type] = newState.user[type] - 1;
    set(() => ({ state: newState }));
  },

  update(user: IUserApi) {
    const newState = { ...this.state, user };
    set(() => ({ state: newState }));
  },

  patch(partial: Partial<IUserApi>) {
    const newState: AuthStoreState = {
      ...this.state,
      user: { ...this.state.user, ...partial },
    };
    set(() => ({ state: newState }));
  },

  setFeedLocations(locations: IUserFeedLocationApi[]) {
    const newState = { ...this.state, user: { ...this.state.user, locations } };
    set(() => ({ state: newState }));
  },

  getFeedLocations() {
    return this.state.user.locations.map((item) => item.location);
  },

  logout() {
    sessionStorage.removeItem("useAuthStore");
    set(() => ({ state: DEFAULT_STATE }));
  },
}));

export default useAuthStore;
