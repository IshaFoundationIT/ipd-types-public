import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "member", "viewer"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1).max(100),
  role: UserRoleSchema,
  createdAt: z.iso.datetime(),
});
export type User = z.infer<typeof UserSchema>;

export const UserSummarySchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1).max(100),
});
export type UserSummary = z.infer<typeof UserSummarySchema>;

export const CreateUserRequestSchema = z.object({
  email: z.email(),
  name: z.string().min(1).max(100),
  role: UserRoleSchema,
});
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const ListUsersQuerySchema = z.object({
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
});
export type ListUsersQuery = z.infer<typeof ListUsersQuerySchema>;

export const UserIdParamsSchema = z.object({
  id: z.uuid(),
});
export type UserIdParams = z.infer<typeof UserIdParamsSchema>;
