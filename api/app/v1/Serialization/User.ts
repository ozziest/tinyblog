import { getUserAvatar } from "../Services/UserService";

export default (item: any) => {
  const avatar = getUserAvatar(item.email);
  delete item.email;
  return {
    ...item,
    avatar,
  };
};
