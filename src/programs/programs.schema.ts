import { z } from "zod";
import {
  DateTimeOrDateSchema,
  TranslatableStringSchema,
} from "../common/common.schema";
import { ProgramAccessModulesSchema } from "../constants/constants.schema";

export const ProgramAccessSchema = z.object({
  id: z.string(),
  programId: z.string(),
  ssoId: z.string(),
  workspaceId: z.string(),
  workspaceAccessId: z.string(),
  accessibleModules: z.array(ProgramAccessModulesSchema),
  permissions: z.record(z.string(), z.unknown()),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type ProgramAccess = z.infer<typeof ProgramAccessSchema>;

export const ProgramSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  isAvailable: z.boolean(),
  startTime: DateTimeOrDateSchema.optional(),
  endTime: DateTimeOrDateSchema.optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  supportedLanguages: z.array(z.string()),
  label: z.array(TranslatableStringSchema),
  legalEntity: z.string().optional(),
  registrationMode: z.string().optional(),
  registrationLink: z.string().optional(),
  termsAndConditions: z.array(TranslatableStringSchema),
  ssoMandates: z.array(z.string()),
  prsId: z.string().optional(),
  ipWhiteList: z.array(z.string()),
  registrationPageRichText: z.array(TranslatableStringSchema),
  requiredEntitlements: z.string().optional(),
  authMode: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  type: z.string().optional(),
  workspaceId: z.string(),
  program_revision_state: z.string().nullable().optional(),
  program_access: z.array(ProgramAccessSchema),
});
export type Program = z.infer<typeof ProgramSchema>;

export const CreateProgramAccessSchema = z.object({
  programIds: z.array(z.string()),
  accessibleModules: z.array(ProgramAccessModulesSchema),
});
export type CreateProgramAccess = z.infer<typeof CreateProgramAccessSchema>;

export const EditProgramAccessSchema = z.object({
  id: z.string(),
  accessibleModules: z.array(ProgramAccessModulesSchema),
});
export type EditProgramAccess = z.infer<typeof EditProgramAccessSchema>;
