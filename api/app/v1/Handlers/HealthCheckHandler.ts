import { AxeRequest, AxeResponse } from "axe-api";
import os from "os";

export default async (req: AxeRequest, res: AxeResponse) => {
  res.status(200).json({
    status: true,
    hostname: os.hostname(),
  });
};
