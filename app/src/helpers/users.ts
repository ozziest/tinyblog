import { IResolvedList } from "@/interfaces";
import { IUserApi } from "@/types/ApiTypes";

export const getMaxId = (users: IUserApi[]): number => {
  return users.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

export const getMinId = (users: IUserApi[]): number => {
  return users.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

export const resolveUsers = (users: IUserApi[]): IResolvedList<IUserApi> => {
  let minId = 0;
  let maxId = 0;

  if (users.length > 0) {
    maxId = getMaxId(users);
    minId = getMinId(users);
  }

  return {
    items: users,
    minId,
    maxId,
  };
};
