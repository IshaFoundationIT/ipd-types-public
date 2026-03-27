import type { ITranslatableString } from "./common";
import type { PROGRAM_ACCESS_MODULES } from "./constants";

export interface IProgram {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isAvailable: boolean;
  startTime?: Date;
  endTime?: Date;
  createdAt: string;
  updatedAt: string;
  supportedLanguages: string[];
  label: ITranslatableString[];
  legalEntity?: string;
  registrationMode?: string;
  registrationLink?: string;
  termsAndConditions: ITranslatableString[];
  ssoMandates: string[];
  prsId?: string;
  ipWhiteList: string[];
  registrationPageRichText: ITranslatableString[];
  requiredEntitlements?: string;
  authMode?: string;
  meta?: Record<string, unknown>;
  type?: string;
  workspaceId: string;
  program_revision_state?: string | null;
  program_access: IProgramAccess[];
}

export interface IProgramAccess {
  id: string;
  programId: string;
  ssoId: string;
  workspaceId: string;
  workspaceAccessId: string;
  accessibleModules: PROGRAM_ACCESS_MODULES[];
  permissions: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProgramAccess {
  programIds: string[];
  accessibleModules: PROGRAM_ACCESS_MODULES[];
}

export interface IEditProgramAccess {
  id: string;
  accessibleModules: PROGRAM_ACCESS_MODULES[];
}
