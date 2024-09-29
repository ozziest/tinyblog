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

export interface IConfirmationPost {
  secret: string;
  code: string;
}

export interface IConfirmationResetPost {
  email: string;
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

export interface IPasswordResetPost {
  email: string;
}

export interface IChangePasswordPost {
  secret: string;
  code: string;
  password: string;
  password_confirmed: string;
}

export interface IStorePost {
  content: string;
  parent_id?: number;
}

export interface IResolvedList<T> {
  minId: number;
  maxId: number;
  items: T[];
}
