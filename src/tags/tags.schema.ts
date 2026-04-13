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
