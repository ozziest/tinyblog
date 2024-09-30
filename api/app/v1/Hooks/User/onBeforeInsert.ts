import { IBeforeInsertContext } from "axe-api";
import bcrypt from "bcrypt";
import UserService from "../../Services/UserService";

export default async ({ formData, database, res }: IBeforeInsertContext) => {
  formData.email = formData.email.trim().toLowerCase();
  formData.username = formData.username.trim().toLowerCase();

  const user = await UserService.getUserByEmailOrUsername(
    formData.email,
    formData.username
  );

  if (user) {
    return res.status(400).json({
      error: "E-mail or username is already used.",
    });
  }

  formData.password = bcrypt.hashSync(formData.password, 10);
};
