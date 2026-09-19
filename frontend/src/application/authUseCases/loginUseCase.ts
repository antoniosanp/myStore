import type { AuthResponse } from "../../domain/models/User";
import type { UserAuthRepository, LoginInput } from "../../domain/repositories/UserRepository";

export const makeLoginUseCase = (repository: UserAuthRepository) => (input: LoginInput): Promise<AuthResponse> => {
  return repository.login(input);
};
