import { z } from "zod";
import { DateTimeOrDateSchema } from "../common/common.schema";

export const GroupChatMessageSchema = z.object({
  id: z.string(),
  streamLanguage: z.string(),
  status: z.string(),
  role: z.string(),
  isPinned: z.boolean(),
  message: z.string(),
  attachment: z.string().nullable(),
  by: z.string(),
  userName: z.string(),
  chatId: z.string(),
  serial: z.number(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type GroupChatMessage = z.infer<typeof GroupChatMessageSchema>;

export const GroupChatSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  creatorId: z.string(),
  config: z.record(z.string(), z.unknown()).nullable(),
  createdAt: DateTimeOrDateSchema,
  updatedAt: DateTimeOrDateSchema,
});
export type GroupChat = z.infer<typeof GroupChatSchema>;
