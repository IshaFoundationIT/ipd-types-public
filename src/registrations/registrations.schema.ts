import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const EnrollmentTypeSchema = z.enum(["PARTICIPANT", "VOLUNTEER"]);
export type EnrollmentType = z.infer<typeof EnrollmentTypeSchema>;

export const RegistrationSchema = z.object({
  id: z.string(),
  ssoId: z.string(),
  streamLanguage: z.string().nullable(),
  isCompleted: z.boolean().nullable(),
  programId: z.string(),
  batchId: z.string(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
  currentStep: z.string().nullable(),
  email: z.string().nullable(),
  accessToken: z.string().nullable(),
  channel: z.string().nullable(),
  source: z.string().nullable(),
  canAccessLC: z.boolean().nullable(),
  isLearningCenter: z.boolean().nullable(),
  tag: z.string(),
  meta: z.record(z.string(), z.unknown()).optional(),
  enrollmentType: EnrollmentTypeSchema,
});
export type Registration = z.infer<typeof RegistrationSchema>;
