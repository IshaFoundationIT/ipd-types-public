import { z } from "zod";

export const TranslatableTextSchema = z.object({
  lang: z.string(),
  text: z.string(),
});
export type TranslatableText = z.infer<typeof TranslatableTextSchema>;

export const TranslatableStringSchema = z.object({
  lang: z.string(),
  value: z.string(),
});
export type TranslatableString = z.infer<typeof TranslatableStringSchema>;

export const NumberPerLangSchema = z.object({
  lang: z.string(),
  value: z.number(),
});
export type NumberPerLang = z.infer<typeof NumberPerLangSchema>;

export const DateTimeOrDateSchema = z.union([z.iso.datetime(), z.date()]);
export type DateTimeOrDate = z.infer<typeof DateTimeOrDateSchema>;

export const PaginationModelSchema = z.object({
  page: z.number(),
  pageSize: z.number().int(),
});
export type PaginationModel = z.infer<typeof PaginationModelSchema>;

export const SortFieldSchema = z.enum(["name", "createdAt", "updatedAt"]);
export type SortField = z.infer<typeof SortFieldSchema>;

export const SortOrderSchema = z.enum(["asc", "desc"]);
export type SortOrder = z.infer<typeof SortOrderSchema>;

export const OffsetTimeSchema = z.object({
  days: z.number(),
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
});
export type OffsetTime = z.infer<typeof OffsetTimeSchema>;

export const RichTextV3Schema = z.object({
  lang: z.string(),
  text: z.string(),
});
export type RichTextV3 = z.infer<typeof RichTextV3Schema>;

export const TableEntrySchema = z.object({
  x: z.number(),
  y: z.number(),
  type: z.string(),
  value: z.union([z.string(), z.date()]),
  format: z.string(),
  isPinned: z.boolean(),
  className: z.string(),
});
export type TableEntry = z.infer<typeof TableEntrySchema>;

export const VideoOTPSchema = z.object({
  otp: z.string(),
  playbackInfo: z.string(),
});
export type VideoOTP = z.infer<typeof VideoOTPSchema>;

export const ShakaPlayerControlSchema = z.object({
  enabled: z.boolean(),
  name: z.string(),
});
export type ShakaPlayerControl = z.infer<typeof ShakaPlayerControlSchema>;

export const envelope = <T extends z.ZodTypeAny>(payload: T) =>
  z.object({
    status: z.string(),
    message: z.string(),
    payload,
  });

export const listEnvelope = <T extends z.ZodTypeAny>(row: T) =>
  z.object({
    status: z.string(),
    message: z.string(),
    payload: z.object({
      rows: z.array(row),
      count: z.number().int().nonnegative(),
    }),
  });

export const createPayload = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.omit({ id: true, createdAt: true, updatedAt: true });

export const updatePayload = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().required({ id: true });
