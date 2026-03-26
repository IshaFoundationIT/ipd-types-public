export interface IWorkspace {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  workspaceAccesses: IWorkspaceAccess[];
  /** @deprecated Legacy snake_case alias returned by some API endpoints */
  workspace_access?: IWorkspaceAccess[];
}

export interface IWorkspaceAccess {
  id: string;
  workspaceId: string;
  type: string;
  name: string;
  email: string;
  ssoId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateWorkspaceAccess {
  email: string;
  type: string;
}

export interface IUpdateWorkspaceAccess {
  id: string;
  type: string;
}
