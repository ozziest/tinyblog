import { resource } from "axe-api-client";

const create = async (userId: number, location: string) => {
  return resource(`users/${userId}/locations`).post({ location });
};

const remove = async (userId: number, id: number) => {
  return resource(`users/${userId}/locations/${id}`).delete();
};

export default {
  create,
  remove,
};
