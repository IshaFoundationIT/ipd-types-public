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

export const MetricsTimeSeriesPointSchema = z.object({
  date: MetricsDateSchema,
  value: z.number(),
});
export type MetricsTimeSeriesPoint = z.infer<
  typeof MetricsTimeSeriesPointSchema
>;

export const MetricsTimeSeriesResponseSchema = z.array(
  MetricsTimeSeriesPointSchema,
);
export type MetricsTimeSeriesResponse = z.infer<
  typeof MetricsTimeSeriesResponseSchema
>;

export const ActiveParticipantsResponseSchema = MetricsTimeSeriesResponseSchema;
export type ActiveParticipantsResponse = MetricsTimeSeriesResponse;

export const ProgramCountResponseSchema = MetricsTimeSeriesResponseSchema;
export type ProgramCountResponse = MetricsTimeSeriesResponse;

// metricsRepository rows carry extra columns beyond { id, name }; allow passthrough for forwards-compat.
export const ProgramSummarySchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .passthrough();
export type ProgramSummary = z.infer<typeof ProgramSummarySchema>;

export const ProgramCompletionDropoutRowSchema = z
  .object({
    programId: z.string(),
    name: z.string(),
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

export const ActiveProgramsResponseSchema = z.array(ProgramSummarySchema);
export type ActiveProgramsResponse = z.infer<
  typeof ActiveProgramsResponseSchema
>;

// Stub endpoint: backend currently returns [].
export const PagesMetricResponseSchema = z.array(z.unknown());
export type PagesMetricResponse = z.infer<typeof PagesMetricResponseSchema>;

export const RecentProgramsResponseSchema = z.array(ProgramSummarySchema);
export type RecentProgramsResponse = z.infer<
  typeof RecentProgramsResponseSchema
>;

// Rows are DB-driven JSON; shape tightens in a later wave.
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
