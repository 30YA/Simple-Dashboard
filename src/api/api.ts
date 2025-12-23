import api from "./instance";
import type {
  LoginAndRegisterResponse,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "./types";

export const loginRequest = async (
  payload: LoginPayload
): Promise<LoginAndRegisterResponse> => {
  const { data } = await api.post("/api/staff/auth", payload, {
    headers: { origin: "https://mock.arianalabs.io" },
  });
  return data;
};

export const registerRequest = async (
  payload: RegisterPayload
): Promise<LoginAndRegisterResponse> => {
  const { data } = await api.post("/api/staff/register/", payload);
  return data;
};

export const fetchProfile = async (token: string) => {
  const { data } = await api.get<UserProfile>("/api/staff/current_user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
