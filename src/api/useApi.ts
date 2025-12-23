import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  LoginAndRegisterResponse,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "./types";
import { fetchProfile, loginRequest, registerRequest } from "./api";
import type { AxiosError } from "axios";

export function useLoginMutation() {
  return useMutation<LoginAndRegisterResponse, AxiosError, LoginPayload>({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
  });
}

export function useRegisterMutation() {
  return useMutation<LoginAndRegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => registerRequest(payload),
  });
}

export function useProfileQuery(token?: string | null) {
  return useQuery<UserProfile>({
    queryKey: ["profile", token],
    queryFn: () => fetchProfile(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
