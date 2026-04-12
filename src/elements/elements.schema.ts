import { z } from "zod";
import {
  TranslatableTextSchema,
  NumberPerLangSchema,
  TableEntrySchema,
} from "../common/common.schema";
import { VideoSourceTypeSchema } from "../constants/constants.schema";

export const VideoV2SourceSchema = z.object({
  lang: z.string(),
  force: z.string(),
  drmAccount: z.string().optional(),
  encryptionType: z.string(),
  videoId: z.string(),
  youtubeUrl: z.string(),
  chatSecret: z.string().optional(),
  type: z.string().optional(),
});
export type VideoV2Source = z.infer<typeof VideoV2SourceSchema>;

export const QAndAContentSchema = z.object({
  minChars: z.number(),
  maxChars: z.number(),
  label: z.array(TranslatableTextSchema),
  placeholderText: z.array(TranslatableTextSchema),
  ctaText: z.array(TranslatableTextSchema),
  segregateByStreamLanguage: z.boolean().optional(),
});
export type QAndAContent = z.infer<typeof QAndAContentSchema>;

export const FormContentSchema = z.object({
  form: z.object({
    elements: z.array(
      z.object({
        type: z.string(),
        identifier: z.string(),
        label: z.array(TranslatableTextSchema),
        required: z.boolean().optional(),
        options: z
          .array(
            z.object({
              label: z.array(TranslatableTextSchema),
              value: z.string(),
            }),
          )
          .optional(),
      }),
    ),
  }),
});
export type FormContent = z.infer<typeof FormContentSchema>;

export const TableContentSchema = z.object({
  tables: z.array(
    z.object({
      numRows: z.number(),
      numColumns: z.number(),
      schema: z.array(TableEntrySchema),
    }),
  ),
});
export type TableContent = z.infer<typeof TableContentSchema>;

export const LangSelectContentSchema = z.object({
  label: z.array(TranslatableTextSchema),
  title: z.array(TranslatableTextSchema).optional(),
  timings: z
    .array(
      z.object({
        lang: z.string(),
        dateTime: z.string(),
      }),
    )
    .optional(),
});
export type LangSelectContent = z.infer<typeof LangSelectContentSchema>;

export const RichTextV3ContentSchema = z.object({
  text: z.array(TranslatableTextSchema),
});
export type RichTextV3Content = z.infer<typeof RichTextV3ContentSchema>;

export const GroupChatV2ContentSchema = z.object({
  label: z.array(TranslatableTextSchema),
  placeholder: z.array(TranslatableTextSchema),
  segregateByStreamLanguage: z.boolean().optional(),
});
export type GroupChatV2Content = z.infer<typeof GroupChatV2ContentSchema>;

export const ZoomSessionContentSchema = z.object({
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  regCloseTime: z.iso.datetime(),
  timerStartTime: z.iso.datetime(),
  timerEndTime: z.iso.datetime(),
  doorOpenTime: z.iso.datetime(),
  doorCloseTime: z.iso.datetime(),
  zoomAccountId: z.string(),
  zoomClientId: z.string(),
  zoomClientSecret: z.string(),
  zoomUserAccountEmails: z.array(z.string()),
  showForLanguages: z.array(z.string()),
  label: z.array(TranslatableTextSchema),
  ctaText: z.array(TranslatableTextSchema),
  meetingBuffers: z.array(NumberPerLangSchema),
  isDelayed: z.boolean(),
  backUpZoomElementId: z.string().optional(),
});
export type ZoomSessionContent = z.infer<typeof ZoomSessionContentSchema>;

export const ConferencingContentSchema = z.looseObject({
  tagId: z.string().optional(),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  timerStartTime: z.iso.datetime(),
  timerEndTime: z.iso.datetime(),
  doorOpenTime: z.iso.datetime(),
  doorCloseTime: z.iso.datetime(),
  label: z.array(TranslatableTextSchema),
  ctaText: z.array(TranslatableTextSchema),
  isDelayed: z.boolean().optional(),
  isDropOutCutOffEnabled: z.boolean().optional(),
  backupPlatforms: z.array(z.object({ value: z.string() })).optional(),
});
export type ConferencingContent = z.infer<typeof ConferencingContentSchema>;

export const TagSelectContentSchema = z.object({
  label: z.array(TranslatableTextSchema),
  ctaText: z.array(TranslatableTextSchema),
});
export type TagSelectContent = z.infer<typeof TagSelectContentSchema>;

export const VideoV2ContentSchema = z.object({
  sources: z.array(VideoV2SourceSchema),
  resumable: z.boolean(),
  playerSkinId: z.string().optional(),
  playbackType: z.string(),
  autoplay: z.boolean().optional(),
  enableWatermarking: z.boolean().optional(),
  initialOfffset: z.number().optional(),
});
export type VideoV2Content = z.infer<typeof VideoV2ContentSchema>;

export const PadletContentSchema = z.object({
  padlet: z.object({
    imageUpload: z.boolean(),
    videoUpload: z.boolean(),
    audioUpload: z.boolean(),
    captureImage: z.boolean(),
    captureVideo: z.boolean(),
    captureAudio: z.boolean(),
    autoApproval: z.boolean().optional(),
    uniqueSharings: z.boolean().optional(),
    minTitleChars: z.number().nullable().optional(),
    maxTitleChars: z.number().nullable().optional(),
    minMessageChars: z.number().nullable().optional(),
    maxMessageChars: z.number().nullable().optional(),
  }),
});
export type PadletContent = z.infer<typeof PadletContentSchema>;

export const VideoElementContentSchema = z.object({
  sources: z
    .array(
      z.object({
        type: VideoSourceTypeSchema,
        url: z.string(),
      }),
    )
    .optional(),
  playbackType: z.string().optional(),
  playerSkinId: z.string().optional(),
});
export type VideoElementContent = z.infer<typeof VideoElementContentSchema>;

const baseElementFields = {
  id: z.string(),
  name: z.string(),
  batchId: z.string().optional(),
  programId: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  appearTime: z.string().nullable().optional(),
  disappearTime: z.string().nullable().optional(),
  showForTags: z.array(z.string()).optional(),
  trackable: z.boolean().optional(),
  enabled: z.boolean().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
};

export const ElementSchema = z.discriminatedUnion("type", [
  z.object({
    ...baseElementFields,
    type: z.literal("Q_AND_A"),
    content: QAndAContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("FORM"),
    content: FormContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("TABLE"),
    content: TableContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("LANG_SELECT"),
    content: LangSelectContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("RICH_TEXT_V3"),
    content: RichTextV3ContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("GROUP_CHAT_V2"),
    content: GroupChatV2ContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("ZOOM_SESSION"),
    content: ZoomSessionContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("CONFERENCING"),
    content: ConferencingContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("TAG_SELECT"),
    content: TagSelectContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("VIDEO_V2"),
    content: VideoV2ContentSchema,
  }),
  z.object({
    ...baseElementFields,
    type: z.literal("PADLET"),
    content: PadletContentSchema,
  }),
]);
export type Element = z.infer<typeof ElementSchema>;
