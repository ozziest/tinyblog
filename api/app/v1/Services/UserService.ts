import md5 from "md5";
import { IoCService } from "axe-api";
import { Knex } from "knex";

export const getUserAvatar = (email: string) => {
  const hash = md5(email);
  return `https://gravatar.com/avatar/${hash}`;
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

export default {
  getUserByEmailOrUsername,
  incrementUserPostCount,
};
