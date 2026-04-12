import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const EventSchema = z.object({
  id: z.string(),
  elementId: z.string(),
  type: z.string(),
  programId: z.string(),
  batchId: z.string(),
  registrationId: z.string(),
  ssoId: z.string().nullable().optional(),
  inTime: DateTimeOrDateSchema.nullable().optional(),
  outTime: DateTimeOrDateSchema.nullable().optional(),
  ecg: z.string().optional(),
  streamLanguage: z.string().nullable().optional(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
  data: z.record(z.string(), z.unknown()).nullable().optional(),
  tag: z.string().nullable().optional(),
});
export type Event = z.infer<typeof EventSchema>;

export const NewEventSchema = z.object({
  csvFile: z.any().nullable(),
  creationMode: z.string(),
  writeMode: z.string(),
  eventType: z.string(),
  sessionId: z.string().optional(),
  stepId: z.string().optional(),
  elementId: z.string().optional(),
  inTime: DateTimeOrDateSchema.optional(),
  outTime: DateTimeOrDateSchema.optional(),
  eventTrigger: z.string(),
  ecg: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});
export type NewEvent = z.infer<typeof NewEventSchema>;
