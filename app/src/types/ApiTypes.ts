export interface IPostApi {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  stats_likes: number;
  stats_shares: number;
  stats_views: number;
  stats_replies: number;
  user: IUserApi;
  is_liked_by_you: boolean;
  parent?: IPostApi;
  reshare?: IPostApi;
  hashtags?: IPostHashtagApi[];
  mentions?: IPostMentionApi[];
  links?: IPostLinkApi[];
}

export interface IUserApi {
  name: string;
  username: string;
  avatar: string;
  post: number;
  follower: number;
  following: number;
}

export interface IPostHashtagApi {
  id: number;
  hashtag: string;
}

export interface IPostMentionApi {
  id: number;
  username: string;
}

export interface IPostLinkApi {
  code: string;
  link: string;
}

export interface ILoginResponseApi {
  user: IUserApi;
}
