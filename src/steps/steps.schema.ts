import { z } from "zod";
import { DateTimeOrDateSchema, TranslatableTextSchema } from "../common/common.schema";

export const StepMetaSchema = z.record(z.string(), z.unknown());
export type StepMeta = z.infer<typeof StepMetaSchema>;

export const EligibilityCriteriaSchema = z.record(z.string(), z.unknown());
export type EligibilityCriteria = z.infer<typeof EligibilityCriteriaSchema>;

export const StepSchema = z.object({
  id: z.string(),
  name: z.string(),
  programId: z.string(),
  batchId: z.string(),
  startTime: DateTimeOrDateSchema,
  endTime: DateTimeOrDateSchema,
  isFirst: z.boolean(),
  nextStep: z.string().nullable(),
  meta: StepMetaSchema.nullable(),
  elements: z.array(z.string()),
  ctaText: z.array(TranslatableTextSchema).nullable(),
  eligibilityCriteria: EligibilityCriteriaSchema.nullable(),
  icon: z.string(),
  index: z.string(),
  canRevisit: z.boolean(),
  legendLabel: z.array(TranslatableTextSchema),
  heading: z.array(TranslatableTextSchema),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type Step = z.infer<typeof StepSchema>;
