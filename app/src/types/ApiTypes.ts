export interface IPostApi {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  stats_likes: number;
  stats_shares: number;
  stats_views: number;
  user: IUserApi;
  is_liked_by_you: boolean;
  parent?: IPostApi;
}

export interface IUserApi {
  name: string;
  username: string;
  avatar: string;
  post: number;
  follower: number;
  following: number;
}

export interface ILoginResponseApi {
  user: IUserApi;
  token: string;
}
