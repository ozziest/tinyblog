import { IBeforeInsertContext } from "axe-api";

export default async ({ item, req }: IBeforeInsertContext) => {
  if (req.original.post?.hashtags) {
    item.hashtags = req.original.post.hashtags.map((i) => {
      return {
        id: 0,
        hashtag: i.original,
        post_id: item.id,
      };
    });
  }

  if (req.original.post?.mentions) {
    item.mentions = req.original.post.mentions.map((i) => {
      return {
        id: 0,
        username: i.username,
        post_id: item.id,
      };
    });
  }

  if (req.original.post?.links) {
    item.links = req.original.post.links.map((i) => {
      return {
        code: i.uniqueId,
        link: i.link,
      };
    });
  }
};
