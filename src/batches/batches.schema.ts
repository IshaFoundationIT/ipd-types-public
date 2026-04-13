import { z } from "zod";
import { DateTimeOrDateSchema, TranslatableTextSchema } from "../common/common.schema";

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
