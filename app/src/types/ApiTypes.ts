import { NotificationTypes } from "@/enums";

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
  is_shared_by_you: boolean;
  parent?: IPostApi;
  reshare?: IPostApi;
  hashtags?: IPostHashtagApi[];
  mentions?: IPostMentionApi[];
  links?: IPostLinkApi[];
}

export interface IUserApi {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio?: string;
  stats_post: number;
  stats_follower: number;
  stats_following: number;
  following_id?: number;
}

export interface IHashtagApi {
  id: number;
  hashtag: string;
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

export interface INotificationApi {
  id: number;
  type: NotificationTypes;
  user_id: number;
  post_id?: number;
  count: number;
  is_read: number;
  created_at: string;
  updated_at: string;
  post?: IPostApi;
  reply?: IPostApi;
  triggers: INotificationTriggerApi[];
}

export interface INotificationTriggerApi {
  id: number;
  notification_id: number;
  trigger_user_id: number;
  created_at: string;
  updated_at: string;
  user: IUserApi;
}
