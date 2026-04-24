import { z } from "zod";
import { DateTimeOrDateSchema, TranslatableTextSchema } from "../common/common.schema";

const LapseCriteriaSchema = z.object({
  fromIndex: z.number(),
  toIndex: z.number(),
  lapseTime: z.number(),
  targetVideoElementId: z.string(),
});

const SessionMetaSchema = z.looseObject({
  showForLanguages: z.array(z.string()),
  delayedProps: z
    .object({
      targetVideoElementId: z.string(),
      missingStartIndex: z.number(),
      missingEndIndex: z.number(),
      minMissingMinutes: z.number(),
      maxMissingMinutes: z.number(),
      videoOffset: z.number(),
    })
    .optional(),
});

const MeetingRoomSchema = z.object({
  id: z.string().optional(),
  label: z.string().nullable(),
  zoomUrl: z.string(),
  capacity: z.number(),
  priority: z.number(),
  isActive: z.boolean(),
});

export const SessionSchema = z.object({
  id: z.string(),
  programId: z.string(),
  batchId: z.string(),
  elements: z.array(z.string()),
  name: z.string(),
  label: z.array(TranslatableTextSchema),
  ctaText: z.array(TranslatableTextSchema),
  appearTime: DateTimeOrDateSchema.nullable(),
  disappearTime: DateTimeOrDateSchema.nullable(),
  startTime: DateTimeOrDateSchema,
  timerStartTime: DateTimeOrDateSchema,
  timerEndTime: DateTimeOrDateSchema,
  doorOpenTime: DateTimeOrDateSchema,
  doorCloseTime: DateTimeOrDateSchema,
  endTime: DateTimeOrDateSchema,
  eligibilityCriteria: z.record(z.string(), z.unknown()).nullable(),
  lapseCriteria: LapseCriteriaSchema.nullable(),
  meta: SessionMetaSchema,
  showForTags: z.array(z.string()),
  meetingAllocationEnabled: z.boolean().optional(),
  youtubeUrl: z.string().nullable().optional(),
  alternateYoutubeEnabled: z.boolean().optional(),
  meetingRooms: z.array(MeetingRoomSchema).optional(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type Session = z.infer<typeof SessionSchema>;
