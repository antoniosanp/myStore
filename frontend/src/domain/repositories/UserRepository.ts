import type { AuthResponse, RefreshTokenResponse } from "../models/User";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface UserAuthRepository {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<AuthResponse>;
  refreshToken(input: RefreshTokenInput): Promise<RefreshTokenResponse>;
}
