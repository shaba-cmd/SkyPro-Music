export type AuthUserRequest = {
  email: string;
  password: string;
};

export type UserType = {
  _id: number;
  email: string;
  username: string;
};

export type SignUpResponse = {
  message: string;
  result: UserType;
  success: boolean;
};

export type TokensType = {
  access: string;
  refresh: string;
};

export type RefreshResponse = {
  access: string;
};
