import { resource } from "axe-api-client";

const findByTag = async (tag: string) => {
  return resource("hashtags/all").where("hashtag", `#${tag}`).get();
};

const create = async (hashtag: string) => {
  return resource("hashtags").insert({ hashtag });
};

const report = async () => {
  return resource("hashtags/report").get();
};

export default {
  findByTag,
  create,
  report,
};
