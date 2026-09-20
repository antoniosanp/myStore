import apiClient from '../http/apiClient';
import type { UserAuthRepository, LoginInput, RegisterInput, RefreshTokenInput } from '../../domain/repositories/UserRepository';
import type { AuthResponse, RefreshTokenResponse } from '../../domain/models/User';

export class UserAuthApiRepository implements UserAuthRepository {
  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', input);
    return response.data;
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', input);
    return response.data;
  }

  async refreshToken(input: RefreshTokenInput): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', input);
    return response.data;
  }
}
