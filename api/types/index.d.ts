export {};

import { IAuth, IPostContent } from "../app/interfaces";

declare module "http" {
  interface IncomingMessage {
    auth?: IAuth;
    post?: IPostContent;
    agentId: string;
  }
}
