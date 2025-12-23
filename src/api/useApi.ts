import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  LoginAndRegisterResponse,
  LoginPayload,
  UserProfile,
} from "./types";
import { fetchProfile, loginRequest, registerRequest } from "./api";
import type { AxiosError } from "axios";
import { useAuthStore } from "../store/auth";

export function useLoginMutation() {
  return useMutation<LoginAndRegisterResponse, AxiosError, LoginPayload>({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
  });
}

export function useRegisterMutation() {
  return useMutation<LoginAndRegisterResponse, AxiosError, FormData>({
    mutationFn: (payload: FormData) => registerRequest(payload),
  });
}

export function useProfileQuery() {
  const token = useAuthStore((state) => state.token);
  return useQuery<UserProfile>({
    queryKey: ["profile", token],
    queryFn: () => fetchProfile(token),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
