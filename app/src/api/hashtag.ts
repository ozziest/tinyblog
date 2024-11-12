import { resource } from "axe-api-client";

const findByTag = async (tag: string) => {
  return resource("hashtags/all").where("hashtag", `#${tag}`).get();
};

const create = async (hashtag: string) => {
  return resource("hashtags").insert({ hashtag });
};

const report = async (locations: string[]) => {
  return resource("hashtags/report")
    .searchParams({ locations: locations.join(",") })
    .get();
};

export default {
  findByTag,
  create,
  report,
};
