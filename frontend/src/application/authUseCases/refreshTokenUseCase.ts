import type { RefreshTokenResponse } from "../../domain/models/User";
import type { UserAuthRepository, RefreshTokenInput } from "../../domain/repositories/UserRepository";

export const makeRefreshTokenUseCase = (repository: UserAuthRepository) => (input: RefreshTokenInput): Promise<RefreshTokenResponse> => {
  return repository.refreshToken(input);
};
