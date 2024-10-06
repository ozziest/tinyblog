import crypto from "crypto";

const toKeys = (parentName: string, params: object) => {
  const key = crypto
    .createHash("sha256")
    .update(JSON.stringify(params))
    .digest("hex");
  return `${parentName}:${key}`;
};

export default {
  toKeys,
};
