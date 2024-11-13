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

  // Let's hash the password. We shouldn't use formData. We only hash it
  // when a new password has been set
  if (req.body.password) {
    formData.password = bcrypt.hashSync(req.body.password, 10);
  }
};
