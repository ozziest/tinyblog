import { IResolvedList } from "@/interfaces";
import { INotificationApi } from "@/types/ApiTypes";

export const getMaxId = (items: INotificationApi[]): number => {
  return items.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

export const getMinId = (items: INotificationApi[]): number => {
  return items.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

export const resolveItems = (
  items: INotificationApi[],
): IResolvedList<INotificationApi> => {
  let minId = 0;
  let maxId = 0;

  if (items.length > 0) {
    maxId = getMaxId(items);
    minId = getMinId(items);
  }

  return {
    items,
    minId,
    maxId,
  };
};
