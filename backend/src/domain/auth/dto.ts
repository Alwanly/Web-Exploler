import { Static, t } from "elysia";
import { BaseResponse } from "@infrastructure/wrapper";

export const LoginUserRequestSchema = t.Object({
  username: t.String(),
  password: t.String(),
});
export const LoginUserResponseSchema = t.Object({
  token: t.Nullable(t.String()),
});

export type LoginRequest = Static<typeof LoginUserRequestSchema>;
export type LoginResponse = Static<typeof LoginUserResponseSchema>;
export type BaseLoginResponse = BaseResponse<LoginResponse | null>;

export const RegisterRequestSchema = t.Object({
  username: t.String(),
  password: t.String(),
});
export const RegisterResponseSchema = t.Object({
  token: t.Nullable(t.String()),
});
export type RegisterRequest = Static<typeof RegisterRequestSchema>;
export type RegisterResponse = Static<typeof RegisterResponseSchema>;
export type BaseRegisterResponse = BaseResponse<RegisterResponse | null>;
