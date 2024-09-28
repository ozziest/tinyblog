import { ILoginPost, IUserPost } from "../interfaces";
import { resource } from "axe-api-client";

const createUser = async (data: IUserPost) => {
  return resource("users").post(data);
};

const login = async (data: ILoginPost) => {
  return resource("login").post(data);
};

export default {
  createUser,
  login,
};
