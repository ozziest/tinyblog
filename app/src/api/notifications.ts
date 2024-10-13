import { resource } from "axe-api-client";

interface PaginateProps {
  feed?: boolean;
  minId?: number;
  userId?: number;
  tagId?: number;
}

const USER = "user{id,name,username,email}";
const HASHTAGS = "hashtags{hashtag}";
const MENTIONS = "mentions{username}";
const LINKS = "links{link{code,link}}";

const POST_DETAIL = `post{${USER},${HASHTAGS},${MENTIONS},${LINKS}}`;

const paginate = async ({ minId }: PaginateProps = {}) => {
  const query = resource("notifications/all")
    .with(`${POST_DETAIL}`)
    .sort("id", "DESC");

  if (minId) {
    query.where("id", "<", minId);
  }

  return query.get();
};

const setAsRead = async (id: number) => {
  return await resource(`notifications/${id}`).patch({
    is_read: 1,
  });
};

export default {
  paginate,
  setAsRead,
};
