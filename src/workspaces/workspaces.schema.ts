import { z } from "zod";

export const WorkspaceAccessSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  type: z.string(),
  name: z.string(),
  email: z.email(),
  ssoId: z.string(),
  userId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type WorkspaceAccess = z.infer<typeof WorkspaceAccessSchema>;

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  workspaceAccesses: z.array(WorkspaceAccessSchema),
  workspace_access: z.array(WorkspaceAccessSchema).optional(),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;

export const CreateWorkspaceAccessSchema = z.object({
  email: z.email(),
  type: z.string(),
});
export type CreateWorkspaceAccess = z.infer<typeof CreateWorkspaceAccessSchema>;

export const UpdateWorkspaceAccessSchema = z.object({
  id: z.string(),
  type: z.string(),
});
export type UpdateWorkspaceAccess = z.infer<typeof UpdateWorkspaceAccessSchema>;
