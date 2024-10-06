import { IBeforeAllContext } from "axe-api";

export default async ({ query }: IBeforeAllContext) => {
  // Clients will need only one hashtag at a time. So we will not return
  // everything.
  query.limit(1);
};
