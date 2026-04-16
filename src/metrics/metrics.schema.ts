import { z } from "zod";
import {
  MetricsIntervalSchema,
  type MetricsInterval,
} from "../constants/constants.schema";

export { MetricsIntervalSchema };
export type { MetricsInterval };

// Backend enforces an exact YYYY-MM-DD pattern; the regex stays in sync.
export const MetricsDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export type MetricsDate = z.infer<typeof MetricsDateSchema>;

export const MetricsDateRangeQuerySchema = z.object({
  startDate: MetricsDateSchema,
  endDate: MetricsDateSchema,
});
export type MetricsDateRangeQuery = z.infer<typeof MetricsDateRangeQuerySchema>;

export const MetricsDateRangeWithIntervalQuerySchema =
  MetricsDateRangeQuerySchema.extend({
    interval: MetricsIntervalSchema,
  });
export type MetricsDateRangeWithIntervalQuery = z.infer<
  typeof MetricsDateRangeWithIntervalQuerySchema
>;

// Backend aggregates into { interval, count } pairs (interval is a bucket label, not always a date).
export const MetricsIntervalCountSchema = z.object({
  interval: z.string(),
  count: z.number(),
});
export type MetricsIntervalCount = z.infer<typeof MetricsIntervalCountSchema>;

export const ActiveParticipantsResponseSchema = z.array(
  MetricsIntervalCountSchema,
);
export type ActiveParticipantsResponse = z.infer<
  typeof ActiveParticipantsResponseSchema
>;

export const ProgramCountResponseSchema = z.array(MetricsIntervalCountSchema);
export type ProgramCountResponse = z.infer<typeof ProgramCountResponseSchema>;

export const ProgramCompletionDropoutRowSchema = z
  .object({
    programId: z.string(),
    name: z.string().nullable(),
    completionCount: z.number().optional(),
    dropoutCount: z.number().optional(),
  })
  .passthrough();

export const ProgramOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProgramCompletionDropoutResponseSchema = z.object({
  completionDropoutData: z.array(ProgramCompletionDropoutRowSchema),
  programOptions: z.array(ProgramOptionSchema),
});
export type ProgramCompletionDropoutResponse = z.infer<
  typeof ProgramCompletionDropoutResponseSchema
>;

export const ActiveProgramSchema = z
  .object({
    programId: z.string(),
    name: z.string().nullable(),
    participants: z.number().optional(),
    completion: z.number().optional(),
    endTime: z.union([z.string(), z.date()]).optional(),
  })
  .passthrough();
export type ActiveProgram = z.infer<typeof ActiveProgramSchema>;

export const ActiveProgramsResponseSchema = z.array(ActiveProgramSchema);
export type ActiveProgramsResponse = z.infer<
  typeof ActiveProgramsResponseSchema
>;

// Stub endpoint: backend currently returns [].
export const PagesMetricResponseSchema = z.array(z.unknown());
export type PagesMetricResponse = z.infer<typeof PagesMetricResponseSchema>;

export const RecentProgramSchema = z
  .object({
    programId: z.string(),
    name: z.string().nullable(),
    startTime: z.union([z.string(), z.date()]).optional(),
    endTime: z.union([z.string(), z.date()]).optional(),
    legalEntity: z.string().nullable().optional(),
    participants: z.number().optional(),
    completion: z.number().optional(),
    status: z.string().optional(),
  })
  .passthrough();
export type RecentProgram = z.infer<typeof RecentProgramSchema>;

export const RecentProgramsResponseSchema = z.array(RecentProgramSchema);
export type RecentProgramsResponse = z.infer<
  typeof RecentProgramsResponseSchema
>;

// Rows are DB-driven JSON computed by calculateProgramEngagementScores.
export const ParticipantEngagementScoreRowSchema = z.record(
  z.string(),
  z.unknown(),
);
export const ParticipantEngagementScoreResponseSchema = z.array(
  ParticipantEngagementScoreRowSchema,
);
export type ParticipantEngagementScoreResponse = z.infer<
  typeof ParticipantEngagementScoreResponseSchema
>;
