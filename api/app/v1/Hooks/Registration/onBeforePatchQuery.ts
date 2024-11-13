import { IBeforePatchQueryContext } from "axe-api";

export default async ({ query, req }: IBeforePatchQueryContext) => {
  query.where("agent_id", req.original.agentId);
};
