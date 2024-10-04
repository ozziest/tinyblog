export interface IAuth {
  userId: number;
}

export interface IShortLinkMap {
  link: string;
  uniqueId: string;
  linkId?: number;
}

export interface IHashtagMap {
  original: string;
  cleaned: string;
  id?: number;
}

export interface IMentionMap {
  username: string;
  id?: number;
}

export interface IPostContent {
  content: string;
  mentions: IMentionMap[];
  hashtags: IHashtagMap[];
  links: IShortLinkMap[];
}
