import {
  IChangePasswordPost,
  IConfirmationPost,
  IConfirmationResetPost,
  ILoginPost,
  IPasswordResetPost,
  IProfilCheckPost,
  IProfilCheckResponse,
  IUserPost,
} from "@/interfaces";
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

const confirmation = async (data: IConfirmationPost) => {
  return resource("confirm").post(data);
};

const confirmationReset = async (data: IConfirmationResetPost) => {
  return resource("confirmReset").post(data);
};

const passwordReset = async (data: IPasswordResetPost) => {
  return resource("passwordReset").post(data);
};

const changePassword = async (data: IChangePasswordPost) => {
  return resource("changePassword").post(data);
};

const getMyself = async () => {
  return resource("me").get();
};

const searchByUsername = async (search: string) => {
  return resource("users")
    .fields("username")
    .whereLike("username", `${search}*`)
    .paginate();
};

const findByUsername = async (username: string) => {
  return resource("users")
    .fields("id", "name", "email", "bio", "stats_follower", "stats_following")
    .where("username", username)
    .get();
};

const follow = async (userId: number) => {
  return await resource(`users/${userId}/followers`).post();
};

const unfollow = async (userId: number, id: number) => {
  return resource(`users/${userId}/followers/${id}`).delete();
};

export default {
  createUser,
  login,
  profileCheck,
  confirmation,
  confirmationReset,
  passwordReset,
  changePassword,
  getMyself,
  searchByUsername,
  findByUsername,
  follow,
  unfollow,
};
