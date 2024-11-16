import { AxeRequest, AxeResponse } from "axe-api";
import os from "os";
import md5 from "md5";

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    if (!interfaces) {
      break;
    }

    for (const iface of interfaces) {
      // Check for IPv4 and exclude internal (loopback) addresses
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }

  return null;
}

const ip = getLocalIPAddress();

export default async (req: AxeRequest, res: AxeResponse) => {
  res.status(200).json({
    status: true,
    hostname: os.hostname(),
    hash: ip ? md5(ip) : null,
  });
};
