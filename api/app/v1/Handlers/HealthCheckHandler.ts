import { AxeRequest, AxeResponse } from "axe-api";

export default async (req: AxeRequest, res: AxeResponse) => {
  res.status(200).json({ status: true });
};
