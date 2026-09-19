import type { AuthResponse } from "../../domain/models/User";
import type { UserAuthRepository, RegisterInput } from "../../domain/repositories/UserRepository";

export const makeRegisterUseCase = (repository: UserAuthRepository) => (input: RegisterInput): Promise<AuthResponse> => {
  return repository.register(input);
};
