import { IncomingMessage } from "http";

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const cookieHeader = req.headers.cookie; // Get the 'cookie' header from the request
  const cookies: Record<string, string> = {}; // Create an empty object to store cookies

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("="); // Split each cookie into name and value
      cookies[name.trim()] = decodeURIComponent(value?.trim()); // Store the cookie in the object
    });
  }

  return cookies;
}

export default {
  parseCookies,
};
