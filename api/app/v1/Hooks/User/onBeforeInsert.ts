import { IBeforeInsertContext } from "axe-api";
import bcrypt from "bcrypt";

export default async ({ formData }: IBeforeInsertContext) => {
  formData.password = bcrypt.hashSync(formData.password, 10);
};
