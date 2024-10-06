import { IoCService } from "axe-api";
import sanitizeHtml from "sanitize-html";
import { Knex } from "knex";
import {
  IHashtagMap,
  IPostContent,
  IShortLinkMap,
  IMentionMap,
} from "../../interfaces";
import { nanoid } from "nanoid";

const getMyLikedPostIds = async (userId: number, postIds: number[]) => {
  const db = await IoCService.use<Knex>("Database");

  // Fetch my related likes
  const myLikes = await db
    .table("post_likes")
    .select("post_id")
    .whereIn("post_id", postIds)
    .where("user_id", userId);

  // The posts that I liked
  const result = myLikes.map((item) => item.post_id).flat();

  return result;
};

const getMySharedPostIds = async (userId: number, postIds: number[]) => {
  const db = await IoCService.use<Knex>("Database");

  // Fetch my related likes
  const myShares = await db
    .table("posts")
    .select("reshare_id")
    .where("user_id", userId)
    .whereIn("reshare_id", postIds);

  // The posts that I liked
  const result = myShares.map((item) => item.reshare_id).flat();

  return result;
};

const getPostLike = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  const result = await db
    .table("post_likes")
    .where("user_id", userId)
    .where("post_id", postId)
    .first();

  return result;
};

const deletePostLike = async (postLikeId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("post_likes").where("id", postLikeId).delete();
};

const getPost = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  return await db.table("posts").where("id", postId).first();
};

const decrementPostLike = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).decrement({ stats_likes: 1 });
};

const getPostView = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  const result = await db
    .table("post_views")
    .where("user_id", userId)
    .where("post_id", postId)
    .first();

  return result;
};

const incrementPostReplies = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_replies: 1 });
};

const addPostView = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("post_views").insert({
    user_id: userId,
    post_id: postId,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const incrementPostView = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_views: 1 });
};

const incrementPostLike = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_likes: 1 });
};

const incrementPostShare = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_shares: 1 });
};

const decrementPostShare = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).decrement({ stats_shares: 1 });
};

const share = async (postId: number, userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").insert({
    reshare_id: postId,
    parent_id: null,
    user_id: userId,
    content: "",
    lexical: "",
    stats_views: 0,
    stats_replies: 0,
    stats_likes: 0,
    stats_shares: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const isAlreadySharedByUser = async (
  postId: number,
  userId: number
): Promise<boolean> => {
  const db = await IoCService.use<Knex>("Database");
  const item = await db
    .table("posts")
    .where("reshare_id", postId)
    .where("user_id", userId)
    .first();
  return !!item;
};

const unshare = async (postId: number, userId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db
    .table("posts")
    .where("reshare_id", postId)
    .where("user_id", userId)
    .delete();
};

const getMentions = async (content: string): Promise<IMentionMap[]> => {
  // Regular expression to match words starting with '@', containing alphanumeric characters and underscores
  // Username can only contain [a-zA-Z0-9_] but can be followed by punctuation like !,.,:; etc.
  const regex = /(?:^|\s)@([a-zA-Z0-9_]+)(?=\s|[!?.,:;\-]|$)/g;

  // Create a Set to store unique usernames
  let usernames = new Set<string>();

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the username (without the @) to the Set
    usernames.add(match[1]);
  }

  // Convert the Set to an array and return
  const db = await IoCService.use<Knex>("Database");

  const users = await db
    .table("users")
    .select("id", "username")
    .whereIn("username", Array.from(usernames));

  return users.map((item) => {
    return {
      id: item.id,
      username: `@${item.username}`,
    } as IMentionMap;
  });
};

const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const getHashtags = async (content: string): Promise<IHashtagMap[]> => {
  // Regular expression to find words starting with '#' and stop at the first non-alphanumeric character
  const regex = /(?:^|\s)#([\p{L}\p{N}_]+)(?=\s|$)/gu;

  // Create a Set to store unique hashtags
  const hashtags = new Set();

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the hashtag (without the #) to the Set
    hashtags.add(match[1]);
  }

  // Convert the Set to an array and return
  const map = Array.from(hashtags)
    .map((hashtag) => `#${hashtag}`)
    .map((original) => {
      return {
        original,
        cleaned: original.trim().toLowerCase(),
      } as IHashtagMap;
    });

  // We don't need to query tags ids if we have empty query
  if (map.length === 0) {
    return map;
  }

  const db = await IoCService.use<Knex>("Database");

  const createdItems = await db.table("hashtags").whereIn(
    "hashtag",
    map.map((item) => item.cleaned)
  );

  for (const item of map) {
    const found = createdItems.find(
      (record) =>
        normalizeString(record.hashtag) === normalizeString(item.cleaned)
    );

    if (found) {
      item.id = found.id;
    } else {
      const [id] = await db.table("hashtags").insert({
        hashtag: item.cleaned,
        created_at: new Date(),
        updated_at: new Date(),
      });

      item.id = id;
    }
  }

  return map;
};

const getLinks = async (content: string): Promise<IShortLinkMap[]> => {
  // Regular expression to match common URL patterns
  const regex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  // Create an array to store found links
  const links = [];

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the full match to the links array
    links.push(match[0]);
  }

  const map: IShortLinkMap[] = links.map((link) => {
    return {
      link,
      uniqueId: nanoid(30),
    };
  });

  const db = await IoCService.use<Knex>("Database");
  for (const item of map) {
    const [id] = await db.table("links").insert({
      code: item.uniqueId,
      link: item.link,
      created_at: new Date(),
      updated_at: new Date(),
    });
    item.linkId = id;
  }

  return map;
};

const toPostContent = async (content: string): Promise<IPostContent> => {
  content = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/(\r\n|\r|\n){2,}/g, "$1\n")
    .trim();

  return {
    content,
    mentions: await getMentions(content),
    hashtags: await getHashtags(content),
    links: await getLinks(content),
  };
};

const addHashtags = async (postId: number, hashtags: IHashtagMap[]) => {
  // We don't need to add anything if there is not any tag
  if (hashtags.length === 0) {
    return;
  }

  const db = await IoCService.use<Knex>("Database");
  const items = hashtags.map((hashtag) => {
    return {
      post_id: postId,
      hashtag_id: hashtag.id,
      hashtag: hashtag.original,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await db.table("post_hashtags").insert(items);
};

const addMentions = async (postId: number, mentions: IMentionMap[]) => {
  // We don't need to add anything if there is not any tag
  if (mentions.length === 0) {
    return;
  }

  const db = await IoCService.use<Knex>("Database");
  const items = mentions.map((mentions) => {
    return {
      post_id: postId,
      username: mentions.username,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await db.table("post_mentions").insert(items);
};

const addLinks = async (postId: number, links: IShortLinkMap[]) => {
  // We don't need to add anything if there is not any tag
  if (links.length === 0) {
    return;
  }

  const db = await IoCService.use<Knex>("Database");
  const items = links.map((link) => {
    return {
      post_id: postId,
      link_id: link.linkId,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await db.table("post_links").insert(items);
};

export default {
  getMyLikedPostIds,
  getMySharedPostIds,
  getPostLike,
  getPostView,
  getPost,
  isAlreadySharedByUser,
  deletePostLike,
  toPostContent,
  incrementPostReplies,
  incrementPostView,
  incrementPostLike,
  incrementPostShare,
  decrementPostLike,
  decrementPostShare,
  addPostView,
  addHashtags,
  addMentions,
  addLinks,
  share,
  unshare,
};
