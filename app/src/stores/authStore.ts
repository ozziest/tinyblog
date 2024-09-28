import { create } from "zustand";
import { ILoginResponse, IUser } from "../interfaces";

export interface ExtendedState {
  isLoggedIn: boolean;
  user: IUser;
  token: string;
}

interface AuthState {
  state: ExtendedState;
  set: (newState: ILoginResponse) => void;
  logout: () => void;
}

const DEFAULT_STATE: ExtendedState = {
  isLoggedIn: false,
  user: {
    name: "",
    username: "",
    avatar: "",
  },
  token: "",
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
    };
    sessionStorage.setItem("useAuthStore", JSON.stringify(value));
    set(() => ({ state: value }));
  },

  logout() {
    sessionStorage.removeItem("useAuthStore");
    set(() => ({ state: DEFAULT_STATE }));
  },
}));

export default useAuthStore;
