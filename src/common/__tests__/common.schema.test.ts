import { describe, expect, test } from "bun:test";
import { z } from "zod";
import {
  TranslatableTextSchema,
  NumberPerLangSchema,
  PaginationModelSchema,
  SortFieldSchema,
  SortOrderSchema,
  OffsetTimeSchema,
  RichTextV3Schema,
  TableEntrySchema,
  VideoOTPSchema,
  ShakaPlayerControlSchema,
  envelope,
  listEnvelope,
  createPayload,
  updatePayload,
  type TranslatableText,
} from "../common.schema";

describe("TranslatableTextSchema", () => {
  const valid = { lang: "en", text: "hello" };

  test("parses a valid translatable text", () => {
    const result = TranslatableTextSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      const t: TranslatableText = result.data;
      expect(t.lang).toBe("en");
      expect(t.text).toBe("hello");
    }
  });

  test("rejects missing lang", () => {
    const result = TranslatableTextSchema.safeParse({ text: "hello" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["lang"]);
    }
  });

  test("rejects non-string text", () => {
    const result = TranslatableTextSchema.safeParse({ lang: "en", text: 42 });
    expect(result.success).toBe(false);
  });
});

describe("NumberPerLangSchema", () => {
  test("parses valid number-per-lang", () => {
    const result = NumberPerLangSchema.safeParse({ lang: "en", value: 3 });
    expect(result.success).toBe(true);
  });

  test("rejects non-number value", () => {
    const result = NumberPerLangSchema.safeParse({ lang: "en", value: "3" });
    expect(result.success).toBe(false);
  });

  test("rejects missing value", () => {
    const result = NumberPerLangSchema.safeParse({ lang: "en" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["value"]);
    }
  });
});

describe("PaginationModelSchema", () => {
  test("parses valid pagination", () => {
    const result = PaginationModelSchema.safeParse({ page: 0, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  test("rejects missing pageSize", () => {
    const result = PaginationModelSchema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["pageSize"]);
    }
  });

  test("rejects string page", () => {
    const result = PaginationModelSchema.safeParse({ page: "0", pageSize: 10 });
    expect(result.success).toBe(false);
  });
});

describe("SortFieldSchema", () => {
  test.each(["name", "createdAt", "updatedAt"] as const)("accepts %s", (field) => {
    expect(SortFieldSchema.safeParse(field).success).toBe(true);
  });

  test("rejects unknown sort field", () => {
    expect(SortFieldSchema.safeParse("unknown").success).toBe(false);
  });
});

describe("SortOrderSchema", () => {
  test.each(["asc", "desc"] as const)("accepts %s", (order) => {
    expect(SortOrderSchema.safeParse(order).success).toBe(true);
  });

  test("rejects unknown sort order", () => {
    expect(SortOrderSchema.safeParse("ASC").success).toBe(false);
  });
});

describe("OffsetTimeSchema", () => {
  test("parses valid offset time", () => {
    const result = OffsetTimeSchema.safeParse({ days: 1, hours: 2, minutes: 3, seconds: 4 });
    expect(result.success).toBe(true);
  });

  test("rejects missing field", () => {
    const result = OffsetTimeSchema.safeParse({ days: 1, hours: 2, minutes: 3 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["seconds"]);
    }
  });

  test("rejects non-number days", () => {
    const result = OffsetTimeSchema.safeParse({ days: "1", hours: 2, minutes: 3, seconds: 4 });
    expect(result.success).toBe(false);
  });
});

describe("RichTextV3Schema", () => {
  test("parses valid rich text v3", () => {
    const result = RichTextV3Schema.safeParse({ lang: "en", text: "rich" });
    expect(result.success).toBe(true);
  });

  test("rejects missing lang", () => {
    const result = RichTextV3Schema.safeParse({ text: "rich" });
    expect(result.success).toBe(false);
  });
});

describe("TableEntrySchema", () => {
  const valid = {
    x: 0,
    y: 0,
    type: "text",
    value: "hello",
    format: "plain",
    isPinned: false,
    className: "cell",
  };

  test("parses a valid table entry", () => {
    const result = TableEntrySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing x", () => {
    const { x: _x, ...rest } = valid;
    const result = TableEntrySchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["x"]);
    }
  });

  test("rejects wrong type field", () => {
    const result = TableEntrySchema.safeParse({ ...valid, type: 42 });
    expect(result.success).toBe(false);
  });
});

describe("VideoOTPSchema", () => {
  test("parses valid video OTP", () => {
    const result = VideoOTPSchema.safeParse({ otp: "abc", playbackInfo: "info" });
    expect(result.success).toBe(true);
  });

  test("rejects missing playbackInfo", () => {
    const result = VideoOTPSchema.safeParse({ otp: "abc" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["playbackInfo"]);
    }
  });

  test("rejects non-string otp", () => {
    const result = VideoOTPSchema.safeParse({ otp: 42, playbackInfo: "info" });
    expect(result.success).toBe(false);
  });
});

describe("ShakaPlayerControlSchema", () => {
  test("parses valid shaka player control", () => {
    const result = ShakaPlayerControlSchema.safeParse({ enabled: true, name: "play" });
    expect(result.success).toBe(true);
  });

  test("rejects non-boolean enabled", () => {
    const result = ShakaPlayerControlSchema.safeParse({ enabled: "true", name: "play" });
    expect(result.success).toBe(false);
  });

  test("rejects missing name", () => {
    const result = ShakaPlayerControlSchema.safeParse({ enabled: true });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["name"]);
    }
  });
});

describe("envelope helper", () => {
  test("wraps a schema in { status, message, payload }", () => {
    const Envelope = envelope(TranslatableTextSchema);
    const result = Envelope.safeParse({
      status: "OK",
      message: "",
      payload: { lang: "en", text: "hi" },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.payload.lang).toBe("en");
      expect(result.data.payload.text).toBe("hi");
    }
  });

  test("rejects missing payload", () => {
    const Envelope = envelope(TranslatableTextSchema);
    const result = Envelope.safeParse({ status: "OK", message: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["payload"]);
    }
  });

  test("rejects invalid payload shape", () => {
    const Envelope = envelope(TranslatableTextSchema);
    const result = Envelope.safeParse({
      status: "OK",
      message: "",
      payload: { lang: 42, text: "hi" },
    });
    expect(result.success).toBe(false);
  });
});

describe("createPayload helper", () => {
  const EntitySchema = z.object({
    id: z.uuid(),
    name: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  });

  test("drops id, createdAt, updatedAt from the schema", () => {
    const Created = createPayload(EntitySchema);
    const result = Created.safeParse({ name: "x" });
    expect(result.success).toBe(true);
  });

  test("rejects unknown keys that the original required", () => {
    const Created = createPayload(EntitySchema);
    const result = Created.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("updatePayload helper", () => {
  const EntitySchema = z.object({
    id: z.uuid(),
    name: z.string(),
    createdAt: z.iso.datetime(),
  });

  test("requires id, allows any subset of other fields", () => {
    const Update = updatePayload(EntitySchema);
    expect(Update.safeParse({ id: "550e8400-e29b-41d4-a716-446655440000" }).success).toBe(true);
    expect(
      Update.safeParse({ id: "550e8400-e29b-41d4-a716-446655440000", name: "y" }).success,
    ).toBe(true);
  });

  test("rejects missing id", () => {
    const Update = updatePayload(EntitySchema);
    const result = Update.safeParse({ name: "y" });
    expect(result.success).toBe(false);
  });
});

describe("listEnvelope helper", () => {
  test("wraps a schema in { status, message, payload: { rows, count } }", () => {
    const ListEnvelope = listEnvelope(TranslatableTextSchema);
    const result = ListEnvelope.safeParse({
      status: "OK",
      message: "",
      payload: { rows: [{ lang: "en", text: "hi" }], count: 1 },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.payload.rows).toHaveLength(1);
      expect(result.data.payload.count).toBe(1);
    }
  });

  test("rejects negative count", () => {
    const ListEnvelope = listEnvelope(TranslatableTextSchema);
    const result = ListEnvelope.safeParse({
      status: "OK",
      message: "",
      payload: { rows: [{ lang: "en", text: "hi" }], count: -1 },
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid row shape", () => {
    const ListEnvelope = listEnvelope(TranslatableTextSchema);
    const result = ListEnvelope.safeParse({
      status: "OK",
      message: "",
      payload: { rows: [{ lang: 42, text: "hi" }], count: 1 },
    });
    expect(result.success).toBe(false);
  });
});
