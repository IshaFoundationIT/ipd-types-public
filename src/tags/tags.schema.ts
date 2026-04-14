import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  supportedLanguages: z.array(z.string()),
  programId: z.string(),
  batchId: z.string(),
  enabled: z.boolean(),
  offsetInHrs: z.number(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
  isNew: z.boolean().optional(),
});
export type Tag = z.infer<typeof TagSchema>;

// The POST /tags body: client sends a sub-id that the server prefixes with
// `${batchId}_`, so `id` here is the sub-id input (not the final Tag.id).
// `offsetInHrs` and timestamps are defaulted server-side on create.
export const CreateTagRequestSchema = z.object({
  id: z.string(),
  batchId: z.string(),
  programId: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  supportedLanguages: z.array(z.string()),
});
export type CreateTagRequest = z.infer<typeof CreateTagRequestSchema>;

// The PUT /tags body: id travels in the query string, so it is NOT part of
// the body. Every other Tag field is optional for partial updates.
export const UpdateTagRequestSchema = z.object({
  name: z.string().optional(),
  enabled: z.boolean().optional(),
  offsetInHrs: z.number().optional(),
  supportedLanguages: z.array(z.string()).optional(),
});
export type UpdateTagRequest = z.infer<typeof UpdateTagRequestSchema>;
