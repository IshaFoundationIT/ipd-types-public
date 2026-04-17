import { z } from "zod";
import {
  DateTimeOrDateSchema,
  OffsetLimitQuerySchema,
} from "../common/common.schema";
import {
  WorkspaceAccessTypeSchema,
  type WorkspaceAccessType,
} from "../constants/constants.schema";

export { WorkspaceAccessTypeSchema };
export type { WorkspaceAccessType };

export const WorkspaceAccessSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  type: WorkspaceAccessTypeSchema,
  name: z.string(),
  // TODO(contract-tighten): backend validator is still t.String(); switch to z.email() after it is tightened.
  email: z.string(),
  ssoId: z.string(),
  userId: z.string(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type WorkspaceAccess = z.infer<typeof WorkspaceAccessSchema>;

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
  workspaceAccesses: z.array(WorkspaceAccessSchema),
  // snake_case alias retained for legacy wire-format consumers (repository returns this shape).
  workspace_access: z.array(WorkspaceAccessSchema).optional(),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;

export const CreateWorkspaceAccessRequestSchema = z.object({
  // TODO(contract-tighten): backend validator is still t.String(); switch to z.email() after it is tightened.
  email: z.string(),
  name: z.string(),
  ssoId: z.string(),
  type: WorkspaceAccessTypeSchema,
});
export type CreateWorkspaceAccessRequest = z.infer<
  typeof CreateWorkspaceAccessRequestSchema
>;

export const UpdateWorkspaceAccessRequestSchema = z.object({
  id: z.string(),
  type: WorkspaceAccessTypeSchema,
});
export type UpdateWorkspaceAccessRequest = z.infer<
  typeof UpdateWorkspaceAccessRequestSchema
>;

export const DeleteWorkspaceAccessRequestSchema = z.object({
  id: z.string(),
});
export type DeleteWorkspaceAccessRequest = z.infer<
  typeof DeleteWorkspaceAccessRequestSchema
>;

export const ListWorkspaceAccessesQuerySchema = OffsetLimitQuerySchema;
export type ListWorkspaceAccessesQuery = z.infer<
  typeof ListWorkspaceAccessesQuerySchema
>;

export const ListWorkspacesQuerySchema = OffsetLimitQuerySchema;
export type ListWorkspacesQuery = z.infer<typeof ListWorkspacesQuerySchema>;
