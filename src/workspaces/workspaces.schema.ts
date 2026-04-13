import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const WorkspaceAccessSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  type: z.string(),
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
  workspace_access: z.array(WorkspaceAccessSchema).optional(),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;

export const CreateWorkspaceAccessSchema = z.object({
  // TODO(contract-tighten): backend validator is still t.String(); switch to z.email() after it is tightened.
  email: z.string(),
  type: z.string(),
});
export type CreateWorkspaceAccess = z.infer<typeof CreateWorkspaceAccessSchema>;

export const UpdateWorkspaceAccessSchema = z.object({
  id: z.string(),
  type: z.string(),
});
export type UpdateWorkspaceAccess = z.infer<typeof UpdateWorkspaceAccessSchema>;
