import { IncomingMessage } from "http";

const parseCookies = (req: IncomingMessage): Record<string, string> => {
  const cookieHeader = req.headers.cookie; // Get the 'cookie' header from the request
  const cookies: Record<string, string> = {}; // Create an empty object to store cookies

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("="); // Split each cookie into name and value
      cookies[name.trim()] = decodeURIComponent(value?.trim()); // Store the cookie in the object
    });
  }

  return cookies;
};

const verifyCFToken = async (token: string, ip: string) => {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SITEKEY || "",
      response: token,
      remoteip: ip,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const outcome = await result.json();
  if (outcome.success) {
    return true;
  }

  return false;
};

const getIpAddress = (req: IncomingMessage): string => {
  return (
    (req.headers["x-forwarded-for"] as string) ||
    (req.socket.remoteAddress as string)
  );
};

export default {
  parseCookies,
  verifyCFToken,
  getIpAddress,
};
