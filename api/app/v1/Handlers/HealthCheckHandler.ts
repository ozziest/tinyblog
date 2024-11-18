import { AxeRequest, AxeResponse } from "axe-api";
import os from "os";

function getLocalNetworkIP() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName] || []) {
      // Check if it's an IPv4 address and not internal (not a loopback)
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }

  return "Unable to determine local network IP";
}

export default async (req: AxeRequest, res: AxeResponse) => {
  const localIP = getLocalNetworkIP();

  res.status(200).json({
    status: true,
    hostname: os.hostname(),
    localIP,
  });
};
