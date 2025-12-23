export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export type LoginAndRegisterResponse = {
  token: string;
};

export type AuthResponse = {
  token: string;
  user?: UserProfile;
};

export type UserProfile = {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
};
