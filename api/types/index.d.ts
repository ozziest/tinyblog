export {};

import { IAuth } from "../app/interfaces";

declare module "http" {
  interface IncomingMessage {
    auth?: IAuth;
  }
}
