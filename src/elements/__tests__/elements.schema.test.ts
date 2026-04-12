import { describe, expect, test } from "bun:test";
import {
  ElementSchema,
  VideoV2ContentSchema,
  QAndAContentSchema,
  FormContentSchema,
  TableContentSchema,
  LangSelectContentSchema,
  RichTextV3ContentSchema,
  GroupChatV2ContentSchema,
  ZoomSessionContentSchema,
  ConferencingContentSchema,
  TagSelectContentSchema,
  PadletContentSchema,
  VideoV2SourceSchema,
  VideoElementContentSchema,
} from "../elements.schema";

const translatable = (text: string) => [{ lang: "en", text }];

const variantFixtures = {
  Q_AND_A: {
    minChars: 1,
    maxChars: 500,
    label: translatable("Q"),
    placeholderText: translatable("placeholder"),
    ctaText: translatable("Submit"),
  },
  FORM: {
    form: {
      elements: [
        {
          type: "text",
          identifier: "name",
          label: translatable("Name"),
          required: true,
        },
      ],
    },
  },
  TABLE: {
    tables: [
      {
        numRows: 2,
        numColumns: 2,
        schema: [
          {
            x: 0,
            y: 0,
            type: "text",
            value: "v",
            format: "plain",
            isPinned: false,
            className: "",
          },
        ],
      },
    ],
  },
  LANG_SELECT: {
    label: translatable("Pick a language"),
  },
  RICH_TEXT_V3: {
    text: translatable("Hello"),
  },
  GROUP_CHAT_V2: {
    label: translatable("Chat"),
    placeholder: translatable("Type..."),
  },
  ZOOM_SESSION: {
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-01T01:00:00.000Z",
    regCloseTime: "2026-01-01T00:00:00.000Z",
    timerStartTime: "2026-01-01T00:00:00.000Z",
    timerEndTime: "2026-01-01T01:00:00.000Z",
    doorOpenTime: "2026-01-01T00:00:00.000Z",
    doorCloseTime: "2026-01-01T00:30:00.000Z",
    zoomAccountId: "acct",
    zoomClientId: "cid",
    zoomClientSecret: "secret",
    zoomUserAccountEmails: ["a@b.com"],
    showForLanguages: ["en"],
    label: translatable("Zoom"),
    ctaText: translatable("Join"),
    meetingBuffers: [{ lang: "en", value: 5 }],
    isDelayed: false,
  },
  CONFERENCING: {
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-01T01:00:00.000Z",
    timerStartTime: "2026-01-01T00:00:00.000Z",
    timerEndTime: "2026-01-01T01:00:00.000Z",
    doorOpenTime: "2026-01-01T00:00:00.000Z",
    doorCloseTime: "2026-01-01T00:30:00.000Z",
    label: translatable("Conference"),
    ctaText: translatable("Join"),
  },
  TAG_SELECT: {
    label: translatable("Tag"),
    ctaText: translatable("Select"),
  },
  VIDEO_V2: {
    sources: [
      {
        lang: "en",
        force: "no",
        encryptionType: "none",
        videoId: "vid-1",
        youtubeUrl: "https://youtube.com/watch?v=x",
      },
    ],
    resumable: true,
    playbackType: "LIVE",
  },
  PADLET: {
    padlet: {
      imageUpload: true,
      videoUpload: false,
      audioUpload: false,
      captureImage: true,
      captureVideo: false,
      captureAudio: false,
    },
  },
};

describe("QAndAContentSchema", () => {
  test("parses valid q-and-a content", () => {
    const result = QAndAContentSchema.safeParse(variantFixtures.Q_AND_A);
    expect(result.success).toBe(true);
  });

  test("rejects missing minChars", () => {
    const { minChars: _m, ...rest } = variantFixtures.Q_AND_A;
    const result = QAndAContentSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("FormContentSchema", () => {
  test("parses valid form content", () => {
    const result = FormContentSchema.safeParse(variantFixtures.FORM);
    expect(result.success).toBe(true);
  });

  test("rejects missing form", () => {
    const result = FormContentSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects form.elements not an array", () => {
    const result = FormContentSchema.safeParse({ form: { elements: {} } });
    expect(result.success).toBe(false);
  });
});

describe("TableContentSchema", () => {
  test("parses valid table content", () => {
    const result = TableContentSchema.safeParse(variantFixtures.TABLE);
    expect(result.success).toBe(true);
  });

  test("rejects non-array tables", () => {
    const result = TableContentSchema.safeParse({ tables: {} });
    expect(result.success).toBe(false);
  });
});

describe("LangSelectContentSchema", () => {
  test("parses valid lang select content", () => {
    const result = LangSelectContentSchema.safeParse(variantFixtures.LANG_SELECT);
    expect(result.success).toBe(true);
  });

  test("accepts optional title and timings", () => {
    const result = LangSelectContentSchema.safeParse({
      label: translatable("Pick"),
      title: translatable("Title"),
      timings: [{ lang: "en", dateTime: "2026-01-01T00:00:00.000Z" }],
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing label", () => {
    const result = LangSelectContentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("RichTextV3ContentSchema", () => {
  test("parses valid rich text v3 content", () => {
    const result = RichTextV3ContentSchema.safeParse(variantFixtures.RICH_TEXT_V3);
    expect(result.success).toBe(true);
  });

  test("rejects missing text", () => {
    const result = RichTextV3ContentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("GroupChatV2ContentSchema", () => {
  test("parses valid group chat v2 content", () => {
    const result = GroupChatV2ContentSchema.safeParse(variantFixtures.GROUP_CHAT_V2);
    expect(result.success).toBe(true);
  });

  test("rejects missing placeholder", () => {
    const result = GroupChatV2ContentSchema.safeParse({ label: translatable("Chat") });
    expect(result.success).toBe(false);
  });
});

describe("ZoomSessionContentSchema", () => {
  test("parses valid zoom session content", () => {
    const result = ZoomSessionContentSchema.safeParse(variantFixtures.ZOOM_SESSION);
    expect(result.success).toBe(true);
  });

  test("rejects missing zoomAccountId", () => {
    const { zoomAccountId: _z, ...rest } = variantFixtures.ZOOM_SESSION;
    const result = ZoomSessionContentSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("ConferencingContentSchema", () => {
  test("parses valid conferencing content", () => {
    const result = ConferencingContentSchema.safeParse(variantFixtures.CONFERENCING);
    expect(result.success).toBe(true);
  });

  test("accepts extra arbitrary keys (permissive passthrough)", () => {
    const result = ConferencingContentSchema.safeParse({
      ...variantFixtures.CONFERENCING,
      arbitrary: "value",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing startTime", () => {
    const { startTime: _s, ...rest } = variantFixtures.CONFERENCING;
    const result = ConferencingContentSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("TagSelectContentSchema", () => {
  test("parses valid tag select content", () => {
    const result = TagSelectContentSchema.safeParse(variantFixtures.TAG_SELECT);
    expect(result.success).toBe(true);
  });

  test("rejects missing ctaText", () => {
    const result = TagSelectContentSchema.safeParse({ label: translatable("Tag") });
    expect(result.success).toBe(false);
  });
});

describe("VideoV2SourceSchema", () => {
  test("parses valid video v2 source", () => {
    const result = VideoV2SourceSchema.safeParse({
      lang: "en",
      force: "no",
      encryptionType: "none",
      videoId: "vid",
      youtubeUrl: "https://youtube.com/x",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing videoId", () => {
    const result = VideoV2SourceSchema.safeParse({
      lang: "en",
      force: "no",
      encryptionType: "none",
      youtubeUrl: "https://youtube.com/x",
    });
    expect(result.success).toBe(false);
  });
});

describe("VideoV2ContentSchema", () => {
  test("parses valid video v2 content", () => {
    const result = VideoV2ContentSchema.safeParse(variantFixtures.VIDEO_V2);
    expect(result.success).toBe(true);
  });

  test("rejects non-array sources", () => {
    const result = VideoV2ContentSchema.safeParse({
      ...variantFixtures.VIDEO_V2,
      sources: {},
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing playbackType", () => {
    const { playbackType: _p, ...rest } = variantFixtures.VIDEO_V2;
    const result = VideoV2ContentSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("VideoElementContentSchema", () => {
  test("parses valid video element content", () => {
    const result = VideoElementContentSchema.safeParse({
      sources: [{ type: "HLS", url: "https://example.com/a.m3u8" }],
      playbackType: "LIVE",
    });
    expect(result.success).toBe(true);
  });

  test("accepts empty object (all optional)", () => {
    const result = VideoElementContentSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("rejects invalid source type enum", () => {
    const result = VideoElementContentSchema.safeParse({
      sources: [{ type: "INVALID", url: "https://example.com/a.m3u8" }],
    });
    expect(result.success).toBe(false);
  });
});

describe("PadletContentSchema", () => {
  test("parses valid padlet content", () => {
    const result = PadletContentSchema.safeParse(variantFixtures.PADLET);
    expect(result.success).toBe(true);
  });

  test("accepts null character limits", () => {
    const result = PadletContentSchema.safeParse({
      padlet: {
        imageUpload: true,
        videoUpload: false,
        audioUpload: false,
        captureImage: true,
        captureVideo: false,
        captureAudio: false,
        minTitleChars: null,
        maxTitleChars: null,
        minMessageChars: null,
        maxMessageChars: null,
      },
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing padlet", () => {
    const result = PadletContentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("ElementSchema (discriminated union)", () => {
  const baseElement = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "El",
  };

  type VariantKey = keyof typeof variantFixtures;
  const entries = Object.entries(variantFixtures) as Array<[VariantKey, unknown]>;
  test.each(entries)(
    "parses a valid %s element and narrows by type",
    (type, content) => {
      const result = ElementSchema.safeParse({
        ...baseElement,
        type,
        content,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(type);
        if (result.data.type === "Q_AND_A") {
          expect(result.data.content.label[0]!.lang).toBe("en");
        }
        if (result.data.type === "RICH_TEXT_V3") {
          expect(result.data.content.text[0]!.lang).toBe("en");
        }
        if (result.data.type === "VIDEO_V2") {
          expect(result.data.content.resumable).toBe(true);
        }
      }
    },
  );

  test("rejects unknown type value", () => {
    const result = ElementSchema.safeParse({
      ...baseElement,
      type: "UNKNOWN_TYPE",
      content: {},
    });
    expect(result.success).toBe(false);
  });

  test("rejects mismatched content shape for the given type", () => {
    const result = ElementSchema.safeParse({
      ...baseElement,
      type: "Q_AND_A",
      content: { foo: "bar" },
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing id", () => {
    const result = ElementSchema.safeParse({
      name: "El",
      type: "Q_AND_A",
      content: variantFixtures.Q_AND_A,
    });
    expect(result.success).toBe(false);
  });

  test("accepts optional entity fields (programId, updatedAt, enabled)", () => {
    const result = ElementSchema.safeParse({
      ...baseElement,
      type: "RICH_TEXT_V3",
      content: variantFixtures.RICH_TEXT_V3,
      programId: "550e8400-e29b-41d4-a716-446655440001",
      updatedAt: "2026-01-01T00:00:00.000Z",
      enabled: true,
    });
    expect(result.success).toBe(true);
  });
});
