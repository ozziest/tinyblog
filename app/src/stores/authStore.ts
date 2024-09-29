import { create } from "zustand";
import { ILoginResponseApi, IUserApi } from "@/types/ApiTypes";

export interface AuthStoreState {
  isLoggedIn: boolean;
  token: string;
  user: IUserApi;
}

type IncreaseType = "post" | "following";

interface AuthState {
  state: AuthStoreState;
  init: (response: ILoginResponseApi) => void;
  update: (user: IUserApi) => void;
  logout: () => void;
  increase: (type: IncreaseType) => void;
}

const DEFAULT_STATE: AuthStoreState = {
  isLoggedIn: false,
  user: {
    name: "",
    username: "",
    avatar: "",
    post: 0,
    follower: 0,
    following: 0,
  },
  token: "",
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

  init: (response: ILoginResponseApi) => {
    const value: AuthStoreState = {
      isLoggedIn: true,
      token: response.token,
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

  update(user: IUserApi) {
    const newState = { ...this.state, user };
    set(() => ({ state: newState }));
  },

  logout() {
    sessionStorage.removeItem("useAuthStore");
    set(() => ({ state: DEFAULT_STATE }));
  },
}));

export default useAuthStore;
