import { create } from "zustand";
import { IUserApi } from "@/types/ApiTypes";
import { PER_PAGE } from "@/consts";
import { resolveUsers } from "@/helpers/users";

export interface IState {
  isLoading: boolean;
  hasMore: boolean;
  users: IUserApi[];
  minId: number;
  maxId: number;
}

export interface IUserStore {
  state: IState;
  setLoading: (loading: boolean) => void;
  setUsers: (users: IUserApi[]) => void;
  addMoreUsers: (users: IUserApi[]) => void;
}

export const createStore = () =>
  create<IUserStore>()((set) => ({
    state: {
      isLoading: false,
      hasMore: true,
      users: [],
      minId: 0,
      maxId: 0,
    },

    setLoading(isLoading: boolean) {
      set((current) => ({
        state: { ...current.state, isLoading },
      }));
    },

    setUsers(users: IUserApi[]) {
      const { items, minId, maxId } = resolveUsers(users);

      const hasMore = users.length >= PER_PAGE;

      set((current) => ({
        state: { ...current.state, users: items, minId, maxId, hasMore },
      }));
    },

    addMoreUsers(users: IUserApi[]) {
      const hasMore = users.length >= PER_PAGE;
      const newUsers = [...this.state.users, ...users];
      const { items, minId, maxId } = resolveUsers(newUsers);

      set((current) => ({
        state: { ...current.state, users: items, minId, maxId, hasMore },
      }));
    },
  }));

export const useNewbiesStore = createStore();
