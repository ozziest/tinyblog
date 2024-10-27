import md5 from "md5";
import { IoCService } from "axe-api";
import { Knex } from "knex";
import { nanoid } from "nanoid";

export const getUserAvatar = (email: string) => {
  if (!email) {
    return "/empty-user.svg";
  }

  const hash = md5(email);
  return `https://gravatar.com/avatar/${hash}?s=240`;
};

const getUserByEmailOrUsername = async (email: string, username: string) => {
  const db = await IoCService.use<Knex>("Database");
  return db
    .table("users")
    .where("email", email)
    .orWhere("username", username)
    .first();
};

const incrementUserPostCount = async (userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("users").where("id", userId).increment({ stats_post: 1 });
};

const incrementFollowerCount = async (userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("users").where("id", userId).increment({ stats_follower: 1 });
};

const incrementFollowingCount = async (userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("users").where("id", userId).increment({ stats_following: 1 });
};

const decrementFollowerCount = async (userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("users").where("id", userId).decrement({ stats_follower: 1 });
};

const decrementFollowingCount = async (userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("users").where("id", userId).decrement({ stats_following: 1 });
};

const getCookieDomain = () => {
  if (process.env.NODE_ENV === "production") {
    return "Domain=.tinyblog.space;";
  }

  return "Domain=localhost;";
};

const getCookieContent = (token: string) => {
  // 1 week long
  return `token=${token}; ${getCookieDomain()} SameSite=Strict; Max-Age=604800; Path=/; Secure; HttpOnly`;
};

const getNewAgentId = () => {
  const agentId = nanoid(40);
  return `agentId=${agentId}; ${getCookieDomain()} SameSite=Strict; Path=/; Secure; HttpOnly`;
};

const getDeleteCookieContent = () => {
  // 1 week long
  return `token=; ${getCookieDomain()} SameSite=Strict; Max-Age=0; Path=/; Secure; HttpOnly`;
};

export default {
  getUserByEmailOrUsername,
  incrementUserPostCount,
  incrementFollowerCount,
  incrementFollowingCount,
  decrementFollowerCount,
  decrementFollowingCount,
  getCookieContent,
  getNewAgentId,
  getDeleteCookieContent,
};
