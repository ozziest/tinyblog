import { IBeforePatchContext } from "axe-api";
import bcrypt from "bcryptjs";

export default async ({
  query,
  req,
  res,
  item,
  formData,
}: IBeforePatchContext) => {
  query.where("agent_id", req.original.agentId);

  const username = (item.username || formData.username).toLowerCase();

  if (username.toLowerCase().includes("tinyblog")) {
    return res.status(400).json({
      error: "You can not use 'tinyblog' in your username!",
    });
  }

  // Let's hash the password
  if (formData.password) {
    formData.password = bcrypt.hashSync(formData.password, 10);
  }
};
