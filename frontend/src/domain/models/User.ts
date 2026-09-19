import { z } from "zod";

export const roleEnumSchema = z.enum(["ROLE_USER", "ROLE_ADMIN"]);
export type RoleEnum = z.infer<typeof roleEnumSchema>;

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  role: roleEnumSchema,
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  email: z.string(),
  role: roleEnumSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;