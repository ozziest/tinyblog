import { create } from "zustand";
import { ILoginResponse } from "../interfaces";

interface ExtendedState extends ILoginResponse {
  isLoggedIn: boolean;
}

interface AuthState {
  state: ExtendedState;
  set: (newState: ILoginResponse) => void;
  logout: () => void;
}

const DEFAULT_STATE: ExtendedState = {
  isLoggedIn: false,
  name: "",
  follower: 0,
  following: 0,
  post: 0,
  token: "",
  username: "",
};

const getDefaultStore = () => {
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
      ...newState,
      isLoggedIn: true,
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
