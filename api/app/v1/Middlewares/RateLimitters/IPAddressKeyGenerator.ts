import { IncomingMessage } from "http";
import HTTPService from "../../Services/HTTPService";

export default (req: IncomingMessage): string => {
  return HTTPService.getIpAddress(req);
};
