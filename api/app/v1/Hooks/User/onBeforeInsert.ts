import { IBeforeInsertContext } from "axe-api";
import bcrypt from "bcrypt";

export default async ({ formData, database, res }: IBeforeInsertContext) => {
  formData.email = formData.email.trim().toLowerCase();
  formData.username = formData.username.trim().toLowerCase();

  const user = await database
    .table("users")
    .where("email", formData.email)
    .orWhere("username", formData.username)
    .first();

  if (user) {
    return res.status(400).json({
      error: "E-mail or username is already used.",
    });
  }

  formData.password = bcrypt.hashSync(formData.password, 10);
};
