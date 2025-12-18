import api from "./api";
import type { LoginResponse } from "../types/auth";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    loginId: email, // Email / Login ID field from your form
    password,
  });

  return res.data;
};
