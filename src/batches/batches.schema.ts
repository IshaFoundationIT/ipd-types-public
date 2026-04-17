import { z } from "zod";
import {
  DateTimeOrDateSchema,
  IdParamSchema,
  OffsetLimitQuerySchema,
  TranslatableTextSchema,
} from "../common/common.schema";

export const BatchSchema = z.object({
  id: z.string(),
  name: z.string(),
  programId: z.string(),
  description: z.string(),
  supportedLanguages: z.array(z.string()),
  startTime: DateTimeOrDateSchema,
  endTime: DateTimeOrDateSchema,
  learningCenter: z.string().nullable(),
  lcEligibility: z.record(z.string(), z.unknown()).nullable(),
  tagQuestion: z.array(TranslatableTextSchema).nullable(),
  areTagsSwitchable: z.boolean(),
  attendanceEligibility: z.record(z.string(), z.unknown()).nullable(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type Batch = z.infer<typeof BatchSchema>;

// programId is NOT in body: the server adds it from URL scope.
export const CreateBatchRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  startTime: DateTimeOrDateSchema,
  endTime: DateTimeOrDateSchema,
  supportedLanguages: z.array(z.string()).optional(),
  learningCenter: z.string().optional(),
  lcEligibility: z.record(z.string(), z.unknown()).optional(),
  tagQuestion: z.array(TranslatableTextSchema).optional(),
  attendanceEligibility: z.record(z.string(), z.unknown()).optional(),
  areTagsSwitchable: z.boolean().default(false),
});
export type CreateBatchRequest = z.infer<typeof CreateBatchRequestSchema>;

// id lives in URL params; every field optional for partial updates.
export const UpdateBatchRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  startTime: DateTimeOrDateSchema.optional(),
  endTime: DateTimeOrDateSchema.optional(),
  supportedLanguages: z.array(z.string()).optional(),
  learningCenter: z.string().optional(),
  lcEligibility: z.record(z.string(), z.unknown()).optional(),
  tagQuestion: z.array(TranslatableTextSchema).optional(),
  attendanceEligibility: z.record(z.string(), z.unknown()).optional(),
  areTagsSwitchable: z.boolean().optional(),
});
export type UpdateBatchRequest = z.infer<typeof UpdateBatchRequestSchema>;

export const DuplicateBatchRequestSchema = IdParamSchema;
export type DuplicateBatchRequest = z.infer<typeof DuplicateBatchRequestSchema>;

export const DeleteBatchRequestSchema = IdParamSchema;
export type DeleteBatchRequest = z.infer<typeof DeleteBatchRequestSchema>;

export const ListBatchesQuerySchema = OffsetLimitQuerySchema;
export type ListBatchesQuery = z.infer<typeof ListBatchesQuerySchema>;
