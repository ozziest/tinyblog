import { IBeforePatchContext } from "axe-api";

export default async ({
  query,
  req,
  res,
  item,
  formData,
}: IBeforePatchContext) => {
  query.where("agent_id", req.original.agentId);

  console.log("onbEforePatch", item);
  const username = (item.username || formData.username).toLowerCase();

  if (username.toLowerCase().includes("tinyblog")) {
    return res.status(400).json({
      error: "You can not use 'tinyblog' in your username!",
    });
  }
};
