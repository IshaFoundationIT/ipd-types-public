import { describe, expect, test } from "bun:test";
import type { z } from "zod";
import {
  BatchSchema,
  CreateBatchRequestSchema,
  DeleteBatchRequestSchema,
  DuplicateBatchRequestSchema,
  ListBatchesQuerySchema,
  UpdateBatchRequestSchema,
  type UpdateBatchRequest,
} from "../batches.schema";

// Use z.input so optional/default fields can be omitted in test fixtures.
type CreateBatchRequestInput = z.input<typeof CreateBatchRequestSchema>;

describe("BatchSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Batch 1",
    programId: "550e8400-e29b-41d4-a716-446655440001",
    description: "A batch",
    supportedLanguages: ["en"],
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-02T00:00:00.000Z",
    learningCenter: null,
    lcEligibility: null,
    tagQuestion: null,
    areTagsSwitchable: false,
    attendanceEligibility: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid batch", () => {
    const result = BatchSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Batch 1");
    }
  });

  test("accepts learningCenter string", () => {
    const result = BatchSchema.safeParse({ ...valid, learningCenter: "LC-1" });
    expect(result.success).toBe(true);
  });

  test("accepts lcEligibility object", () => {
    const result = BatchSchema.safeParse({
      ...valid,
      lcEligibility: { rule: "all" },
    });
    expect(result.success).toBe(true);
  });

  test("accepts tagQuestion with TranslatableText entries", () => {
    const result = BatchSchema.safeParse({
      ...valid,
      tagQuestion: [{ lang: "en", text: "Which tag?" }],
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = BatchSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = BatchSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-boolean areTagsSwitchable", () => {
    const result = BatchSchema.safeParse({ ...valid, areTagsSwitchable: "false" });
    expect(result.success).toBe(false);
  });

  test("rejects invalid startTime", () => {
    const result = BatchSchema.safeParse({ ...valid, startTime: "not-a-date" });
    expect(result.success).toBe(false);
  });

  test("rejects non-array supportedLanguages", () => {
    const result = BatchSchema.safeParse({ ...valid, supportedLanguages: "en" });
    expect(result.success).toBe(false);
  });
});

describe("CreateBatchRequestSchema", () => {
  const valid: CreateBatchRequestInput = {
    name: "Batch 1",
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-02T00:00:00.000Z",
  };

  test("parses a valid create payload", () => {
    const result = CreateBatchRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Batch 1");
    }
  });

  test("parses a full create payload with all optional fields", () => {
    const result = CreateBatchRequestSchema.safeParse({
      ...valid,
      description: "A batch description",
      supportedLanguages: ["en", "hi"],
      learningCenter: "LC-1",
      lcEligibility: { rule: "all" },
      tagQuestion: [{ lang: "en", text: "Which tag?" }],
      attendanceEligibility: { rule: "strict" },
      areTagsSwitchable: true,
    });
    expect(result.success).toBe(true);
  });

  test("rejects tagQuestion with null entries (matches BatchSchema response contract)", () => {
    const result = CreateBatchRequestSchema.safeParse({
      ...valid,
      tagQuestion: [
        { lang: "en", text: "hi" },
        null,
        { lang: "hi", text: "ha" },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("create tagQuestion shape matches BatchSchema response (request/response parity)", () => {
    const input = {
      ...valid,
      tagQuestion: [{ lang: "en", text: "Which tag?" }],
    };
    expect(CreateBatchRequestSchema.safeParse(input).success).toBe(true);
    expect(
      BatchSchema.safeParse({
        id: "btc_1",
        programId: "pgm_1",
        description: "",
        supportedLanguages: [],
        learningCenter: null,
        lcEligibility: null,
        attendanceEligibility: null,
        areTagsSwitchable: false,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        ...input,
      }).success,
    ).toBe(true);
  });

  test("rejects missing name", () => {
    const { name: _name, ...rest } = valid;
    const result = CreateBatchRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects empty name", () => {
    const result = CreateBatchRequestSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
  });

  test("rejects missing startTime", () => {
    const { startTime: _s, ...rest } = valid;
    const result = CreateBatchRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects missing endTime", () => {
    const { endTime: _e, ...rest } = valid;
    const result = CreateBatchRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects wrong type for areTagsSwitchable", () => {
    const result = CreateBatchRequestSchema.safeParse({
      ...valid,
      areTagsSwitchable: "false",
    });
    expect(result.success).toBe(false);
  });

  test("does not include programId (server adds from URL scope)", () => {
    expect("programId" in CreateBatchRequestSchema.shape).toBe(false);
  });
});

describe("UpdateBatchRequestSchema", () => {
  test("accepts empty object (all optional)", () => {
    const result = UpdateBatchRequestSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts partial update with just name", () => {
    const input: UpdateBatchRequest = { name: "new name" };
    const result = UpdateBatchRequestSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("new name");
    }
  });

  test("accepts full update body", () => {
    const result = UpdateBatchRequestSchema.safeParse({
      name: "Batch Updated",
      description: "updated",
      startTime: "2026-01-01T00:00:00.000Z",
      endTime: "2026-01-02T00:00:00.000Z",
      supportedLanguages: ["en"],
      learningCenter: "LC-2",
      lcEligibility: { rule: "any" },
      tagQuestion: [{ lang: "en", text: "Which?" }],
      attendanceEligibility: { rule: "strict" },
      areTagsSwitchable: true,
    });
    expect(result.success).toBe(true);
  });

  test("does not include id (id travels in URL params)", () => {
    expect("id" in UpdateBatchRequestSchema.shape).toBe(false);
  });

  test("rejects wrong type for areTagsSwitchable", () => {
    const result = UpdateBatchRequestSchema.safeParse({ areTagsSwitchable: "true" });
    expect(result.success).toBe(false);
  });
});

describe("DuplicateBatchRequestSchema", () => {
  test("parses a valid duplicate payload", () => {
    const result = DuplicateBatchRequestSchema.safeParse({ id: "btc_1" });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const result = DuplicateBatchRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects empty id", () => {
    const result = DuplicateBatchRequestSchema.safeParse({ id: "" });
    expect(result.success).toBe(false);
  });

  test("rejects numeric id", () => {
    const result = DuplicateBatchRequestSchema.safeParse({ id: 42 });
    expect(result.success).toBe(false);
  });
});

describe("DeleteBatchRequestSchema", () => {
  test("parses a valid delete payload", () => {
    const result = DeleteBatchRequestSchema.safeParse({ id: "btc_1" });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const result = DeleteBatchRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects empty id", () => {
    const result = DeleteBatchRequestSchema.safeParse({ id: "" });
    expect(result.success).toBe(false);
  });

  test("rejects numeric id", () => {
    const result = DeleteBatchRequestSchema.safeParse({ id: 42 });
    expect(result.success).toBe(false);
  });
});

describe("ListBatchesQuerySchema", () => {
  test("parses a valid query", () => {
    const result = ListBatchesQuerySchema.safeParse({ offset: 0, limit: 10 });
    expect(result.success).toBe(true);
  });

  test("coerces string '10' to number 10", () => {
    const result = ListBatchesQuerySchema.safeParse({ offset: "0", limit: "10" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.limit).toBe(10);
      expect(result.data.offset).toBe(0);
    }
  });

  test("rejects missing offset", () => {
    const result = ListBatchesQuerySchema.safeParse({ limit: 10 });
    expect(result.success).toBe(false);
  });

  test("rejects missing limit", () => {
    const result = ListBatchesQuerySchema.safeParse({ offset: 0 });
    expect(result.success).toBe(false);
  });

  test("rejects non-numeric string", () => {
    const result = ListBatchesQuerySchema.safeParse({ offset: "abc", limit: "10" });
    expect(result.success).toBe(false);
  });
});
