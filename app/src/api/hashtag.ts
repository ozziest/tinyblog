import { resource } from "axe-api-client";

const findByTag = async (tag: string) => {
  return resource("hashtags/all").where("hashtag", `#${tag}`).get();
};

export default {
  findByTag,
};
