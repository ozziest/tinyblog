import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import UserService from "../Services/UserService";

export default async (req: AxeRequest, res: AxeResponse) => {
  res.header("Set-Cookie", UserService.getDeleteCookieContent());
  return res.json({});
};
