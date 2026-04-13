import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const PageSchema = z.object({
  id: z.string(),
  name: z.string(),
  isAvailable: z.boolean(),
  slug: z.string(),
  elements: z.array(z.string()),
  sessions: z.array(z.string()),
  config: z.looseObject({
    supportedLanguages: z.array(z.string()).optional(),
    enableTracking: z.boolean().optional(),
  }),
  startTime: DateTimeOrDateSchema,
  endTime: DateTimeOrDateSchema,
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type Page = z.infer<typeof PageSchema>;
