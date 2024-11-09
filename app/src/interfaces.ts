export interface IUserPost {
  cfToken: string | null;
  csrf: string;
  email: string;
  password: string;
  password_confirmed: string;
  username: string;
  name: string;
}

export interface IRegistrationState {
  cfToken: string | null;
  csrf: string;
  id: string;
}

export interface ILoginPost {
  cfToken: string | null;
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

export interface IEmailCheckPost {
  email: string;
}

export interface IUsernameCheckPost {
  username: string;
}

export interface IProfilCheckResponse {
  error?: string;
  email: boolean;
  username: boolean;
}

export interface IPasswordResetPost {
  cfToken: string | null;
  email: string;
}

export interface IChangePasswordPost {
  secret: string;
  code: string;
  password: string;
  password_confirmed: string;
}

export interface IStorePost {
  location: string;
  content: string;
  lexical: string;
  parent_id?: number;
}

export interface IResolvedList<T> {
  minId: number;
  maxId: number;
  items: T[];
}

export interface IOption {
  label: string;
  value: string;
}

export interface IRegisterStep {
  state: IRegistrationState;
  setState: (patch: Partial<IRegistrationState>) => void;
  next: () => void;
}

export interface IRegistrationRequest {
  bio?: string;
  location?: string;
  username?: string;
  password?: string;
  name?: string;
}
