import { IBeforeInsertContext } from "axe-api";

export default async ({ formData, req }: IBeforeInsertContext) => {
  formData.follower_id = req.original.auth?.userId;
};
