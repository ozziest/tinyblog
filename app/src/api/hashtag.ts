import { resource } from "axe-api-client";

const findByTag = async (tag: string) => {
  return resource("hashtags/all").where("hashtag", `#${tag}`).get();
};

const create = async (hashtag: string) => {
  return resource("hashtags").insert({ hashtag });
};

export default {
  findByTag,
  create,
};
