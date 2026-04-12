import { z } from "zod";

export const AttendanceSyncPayloadSchema = z.object({
  batch: z.string(),
  target: z.string(),
  programId: z.string(),
  eligibilityCriteria: z.record(z.string(), z.unknown()).nullable(),
});
export type AttendanceSyncPayload = z.infer<typeof AttendanceSyncPayloadSchema>;

export const IPRSAttendanceSyncPayloadSchema = AttendanceSyncPayloadSchema.extend({
  ipdStatus: z.string(),
  attType: z.string(),
});
export type IPRSAttendanceSyncPayload = z.infer<typeof IPRSAttendanceSyncPayloadSchema>;

export const IshangamAttendanceSyncPayloadSchema = AttendanceSyncPayloadSchema.extend({
  ishangamProgramType: z.string(),
  session: z.string(),
  programStartDate: z.string(),
});
export type IshangamAttendanceSyncPayload = z.infer<typeof IshangamAttendanceSyncPayloadSchema>;
