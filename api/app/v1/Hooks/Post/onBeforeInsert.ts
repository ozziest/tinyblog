import { IBeforeInsertContext } from "axe-api";

export default async ({ req, formData }: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;
};
