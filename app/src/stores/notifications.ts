import { create } from "zustand";
import { INotificationApi } from "@/types/ApiTypes";
import { PER_PAGE } from "@/consts";
import { resolveItems } from "@/helpers/notifications";

export interface IState {
  isLoading: boolean;
  hasMore: boolean;
  items: INotificationApi[];
  minId: number;
  maxId: number;
}

export interface INotificationStore {
  state: IState;
  setLoading: (loading: boolean) => void;
  setItems: (items: INotificationApi[]) => void;
  addMoreItems: (items: INotificationApi[]) => void;
}

export const createStore = () =>
  create<INotificationStore>()((set) => ({
    state: {
      isLoading: false,
      hasMore: true,
      items: [],
      minId: 0,
      maxId: 0,
    },

    setLoading(isLoading: boolean) {
      set((current) => ({
        state: { ...current.state, isLoading },
      }));
    },

    setItems(notifications: INotificationApi[]) {
      const { items, minId, maxId } = resolveItems(notifications);

      const hasMore = items.length >= PER_PAGE;

      set((current) => ({
        state: { ...current.state, items: items, minId, maxId, hasMore },
      }));
    },

    addMoreItems(notifications: INotificationApi[]) {
      const hasMore = notifications.length >= PER_PAGE;
      const newItems = [...this.state.items, ...notifications];
      const { items, minId, maxId } = resolveItems(newItems);

      set((current) => ({
        state: { ...current.state, items: items, minId, maxId, hasMore },
      }));
    },
  }));

export const useNotificationsStore = createStore();
