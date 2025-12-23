import api from "./instance";
import type {
  LoginAndRegisterResponse,
  LoginPayload,
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
  payload: FormData
): Promise<LoginAndRegisterResponse> => {
  const { data } = await api.post("/api/staff/register/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchProfile = async (token: string | null) => {
  const { data } = await api.get<UserProfile>("/api/staff/current_user/", {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
};
