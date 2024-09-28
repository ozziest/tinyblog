export interface IFeed {
  id: number;
  avatar: string;
  content: string;
}

export interface IUserPost {
  email: string;
  password: string;
  password_confirmed: string;
  username: string;
  name: string;
}

export interface ILoginPost {
  email: string;
  password: string;
}

export interface IProfilCheckPost {
  email: string;
  username: string;
}

export interface IProfilCheckResponse {
  error?: string;
  email: boolean;
  username: boolean;
}

export interface ILoginResponse {
  name: string;
  follower: number;
  following: number;
  post: number;
  token: string;
  username: string;
}
