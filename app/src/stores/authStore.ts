import { create } from "zustand";
import { ILoginResponse, IUser } from "../interfaces";

export interface ExtendedState {
  isLoggedIn: boolean;
  user: IUser;
  token: string;
  post: number;
  follower: number;
  following: number;
}

type IncreaseType = "post" | "following";

interface AuthState {
  state: ExtendedState;
  set: (newState: ILoginResponse) => void;
  logout: () => void;
  increase: (type: IncreaseType) => void;
}

const DEFAULT_STATE: ExtendedState = {
  isLoggedIn: false,
  user: {
    name: "",
    username: "",
    avatar: "",
  },
  token: "",
  post: 0,
  follower: 0,
  following: 0,
};

export const getDefaultStore = (): ExtendedState => {
  const content = sessionStorage.getItem("useAuthStore");
  if (content) {
    return JSON.parse(content) as ExtendedState;
  }

  return DEFAULT_STATE;
};

const useAuthStore = create<AuthState>()((set) => ({
  state: getDefaultStore(),

  set: (newState: ILoginResponse) => {
    const value: ExtendedState = {
      isLoggedIn: true,
      user: {
        name: newState.name,
        username: newState.username,
        avatar: newState.avatar,
      },
      token: newState.token,
      post: newState.post,
      follower: newState.follower,
      following: newState.following,
    };
    sessionStorage.setItem("useAuthStore", JSON.stringify(value));
    set(() => ({ state: value }));
  },

  increase(type: IncreaseType) {
    set(() => {
      return {
        state: {
          ...this.state,
          [type]: this.state[type] + 1,
        },
      };
    });
  },

  logout() {
    sessionStorage.removeItem("useAuthStore");
    set(() => ({ state: DEFAULT_STATE }));
  },
}));

export default useAuthStore;
