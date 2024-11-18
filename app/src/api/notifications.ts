import { resource } from "axe-api-client";

interface PaginateProps {
  feed?: boolean;
  minId?: number;
  userId?: number;
  tagId?: number;
}

const HASHTAGS = "hashtags{hashtag}";
const MENTIONS = "mentions{username}";
const LINKS = "links{link{code,link}}";

const POST_DETAIL = `post{${HASHTAGS},${MENTIONS},${LINKS}}`;
const REPLY_DETAIL = `reply{${HASHTAGS},${MENTIONS},${LINKS}}`;

const paginate = async ({ minId }: PaginateProps = {}) => {
  const query = resource("notifications/all")
    .with(`${POST_DETAIL},${REPLY_DETAIL}`)
    .sort("updated_at", "DESC");

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
