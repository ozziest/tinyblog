import {
  ILoginPost,
  IProfilCheckPost,
  IProfilCheckResponse,
  IUserPost,
} from "../interfaces";
import { resource } from "axe-api-client";

const createUser = async (data: IUserPost) => {
  return resource("users").post(data);
};

const login = async (data: ILoginPost) => {
  return resource("login").post(data);
};

const profileCheck = async (
  data: IProfilCheckPost,
): Promise<IProfilCheckResponse> => {
  return resource("profileCheck").post(data);
};

export default {
  createUser,
  login,
  profileCheck,
};
