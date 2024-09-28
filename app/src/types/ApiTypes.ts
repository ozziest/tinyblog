export interface IPostApi {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: IUserApi;
}

export interface IUserApi {
  name: string;
  username: string;
  avatar: string;
}
