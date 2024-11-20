import {
  IChangePasswordPost,
  IConfirmationPost,
  IConfirmationResetPost,
  IEmailCheckPost,
  ILoginPost,
  IPasswordResetPost,
  IProfilCheckPost,
  IProfilCheckResponse,
  IUsernameCheckPost,
  IUserPost,
} from "@/interfaces";
import { resource } from "axe-api-client";
import feedLocation from "./userFeedLocation";

interface PaginateProps {
  minId?: number;
}

const paginate = async ({ minId }: PaginateProps) => {
  const query = resource("users/all")
    .fields(
      "id",
      "name",
      "email",
      "username",
      "bio",
      "stats_follower",
      "stats_following",
    )
    .sort("id", "DESC");

  if (minId) {
    query.where("id", "<", minId);
  }

  return query.get();
};

const createUser = async (data: IUserPost) => {
  return resource("users").post(data);
};

const login = async (data: ILoginPost) => {
  return resource("login").post(data);
};

const logout = async () => {
  return resource("logout").get();
};

const profileCheck = async (
  data: IProfilCheckPost,
): Promise<IProfilCheckResponse> => {
  const response = await resource("profileCheck").post(data);
  return await response.json();
};

const emailCheck = async (
  data: IEmailCheckPost,
): Promise<IProfilCheckResponse> => {
  const response = await resource("profileCheck").post(data);
  return await response.json();
};

const usernameCheck = async (
  data: IUsernameCheckPost,
): Promise<IProfilCheckResponse> => {
  const response = await resource("profileCheck").post(data);
  return await response.json();
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
  return resource(`users/${username}`).get();
};

const follow = async (userId: number) => {
  return await resource(`users/${userId}/followers`).post();
};

const unfollow = async (userId: number, id: number) => {
  return resource(`users/${userId}/followers/${id}`).delete();
};

const patch = async (
  userId: number,
  name: string,
  location: string,
  bio?: string,
) => {
  return resource(`users/${userId}`).patch({
    location,
    bio,
    name,
  });
};

const setPushNotifications = async (
  userId: number,
  endpoint: string | null,
  p256dh: string | null,
  auth: string | null,
) => {
  return resource(`users/${userId}`).patch({
    push_notification_endpoint: endpoint,
    push_notification_p256dh: p256dh,
    push_notification_auth: auth,
  });
};

export default {
  paginate,
  createUser,
  login,
  logout,
  profileCheck,
  emailCheck,
  usernameCheck,
  confirmation,
  confirmationReset,
  passwordReset,
  changePassword,
  getMyself,
  searchByUsername,
  findByUsername,
  follow,
  unfollow,
  patch,
  setPushNotifications,
  feedLocation,
};
