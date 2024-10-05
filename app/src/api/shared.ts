import { resource } from "axe-api-client";

const csrf = async () => {
  return resource("csrf").get();
};

export default {
  csrf,
};
