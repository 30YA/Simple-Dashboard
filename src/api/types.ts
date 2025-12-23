export type LoginPayload = {
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
  username: string;
  avatar: string;
  first_name: string;
  last_name: string;
};
