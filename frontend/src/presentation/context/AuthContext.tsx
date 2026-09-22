/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { UserAuthApiRepository } from '../../infrastructure/repositories';
import { makeLoginUseCase, makeRegisterUseCase, makeRefreshTokenUseCase } from '../../application/authUseCases';
import type { LoginInput, RegisterInput } from '../../domain/repositories/UserRepository';

export interface AuthState {
  userEmail: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  refreshToken?: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
  loginUseCase?: ReturnType<typeof makeLoginUseCase>;
  registerUseCase?: ReturnType<typeof makeRegisterUseCase>;
  refreshTokenUseCase?: ReturnType<typeof makeRefreshTokenUseCase>;
}

const defaultAuthRepo = new UserAuthApiRepository();
const defaultLoginUseCase = makeLoginUseCase(defaultAuthRepo);
const defaultRegisterUseCase = makeRegisterUseCase(defaultAuthRepo);
const defaultRefreshTokenUseCase = makeRefreshTokenUseCase(defaultAuthRepo);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  loginUseCase = defaultLoginUseCase,
  registerUseCase = defaultRegisterUseCase,
  refreshTokenUseCase = defaultRefreshTokenUseCase,
}: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('userEmail'));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem('userRole'));

  const login = async (input: LoginInput) => {
    const response = await loginUseCase(input);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userRole', response.role);
    setUserEmail(response.email);
    setRole(response.role);
  };

  const register = async (input: RegisterInput) => {
    const response = await registerUseCase(input);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userRole', response.role);
    setUserEmail(response.email);
    setRole(response.role);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUserEmail(null);
    setRole(null);
  };

  const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) return;
    const response = await refreshTokenUseCase({ refreshToken: token });
    localStorage.setItem('accessToken', response.accessToken);
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        role,
        isAuthenticated: !!userEmail && !!localStorage.getItem('accessToken'),
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
