import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

// TODO(contract-tighten): legacy IJobInData is an open index signature; tighten per-job-type once the catalogue is stable.
export const JobInDataSchema = z.record(z.string(), z.unknown());
export type JobInData = z.infer<typeof JobInDataSchema>;

// TODO(contract-tighten): legacy IJobOutData is an open index signature; tighten per-job-type once the catalogue is stable.
export const JobOutDataSchema = z.record(z.string(), z.unknown());
export type JobOutData = z.infer<typeof JobOutDataSchema>;

export const JobSchema = z.object({
  id: z.string(),
  inData: JobInDataSchema,
  outData: JobOutDataSchema.nullable(),
  by: z.string().nullable(),
  status: z.string(),
  type: z.string(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type Job = z.infer<typeof JobSchema>;
