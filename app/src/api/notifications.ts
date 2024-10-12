import { resource } from "axe-api-client";

interface PaginateProps {
  feed?: boolean;
  minId?: number;
  userId?: number;
  tagId?: number;
}

const paginate = async ({ minId }: PaginateProps = {}) => {
  const query = resource("notifications/all")
    .with("post{user,parent{user},reshare{user}}")
    .sort("id", "DESC");

  if (minId) {
    query.where("id", "<", minId);
  }

  return query.get();
};

export default {
  paginate,
};
