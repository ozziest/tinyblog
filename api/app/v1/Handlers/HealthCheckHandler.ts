import { AxeRequest, AxeResponse } from "axe-api";
import os from "os";

export default async (req: AxeRequest, res: AxeResponse) => {
  const xForwardedFor = req.original.headers["x-forwarded-for"];
  const remoteAddress = req.original.socket.remoteAddress;

  res.status(200).json({
    status: true,
    hostname: os.hostname(),
    xForwardedFor,
    remoteAddress,
  });
};
