import { z } from "zod";
import { DateTimeOrDateSchema, TranslatableTextSchema } from "../common/common.schema";

// TODO(contract-tighten): legacy IStepMeta is an open index signature; tighten once the producer contract stabilises.
export const StepMetaSchema = z.record(z.string(), z.unknown());
export type StepMeta = z.infer<typeof StepMetaSchema>;

// TODO(contract-tighten): legacy IEligibilityCriteria is an open index signature; tighten once rules schema is agreed.
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
