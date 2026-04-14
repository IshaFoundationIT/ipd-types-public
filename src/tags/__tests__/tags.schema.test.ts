import { describe, expect, test } from "bun:test";
import {
  CreateTagRequestSchema,
  TagSchema,
  UpdateTagRequestSchema,
  type CreateTagRequest,
  type UpdateTagRequest,
} from "../tags.schema";

describe("TagSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Tag 1",
    supportedLanguages: ["en"],
    programId: "550e8400-e29b-41d4-a716-446655440001",
    batchId: "550e8400-e29b-41d4-a716-446655440002",
    enabled: true,
    offsetInHrs: 2,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid tag", () => {
    const result = TagSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Tag 1");
    }
  });

  test("accepts optional isNew", () => {
    const result = TagSchema.safeParse({ ...valid, isNew: true });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = TagSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = TagSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-boolean enabled", () => {
    const result = TagSchema.safeParse({ ...valid, enabled: "true" });
    expect(result.success).toBe(false);
  });

  test("rejects non-number offsetInHrs", () => {
    const result = TagSchema.safeParse({ ...valid, offsetInHrs: "2" });
    expect(result.success).toBe(false);
  });

  test("rejects non-array supportedLanguages", () => {
    const result = TagSchema.safeParse({ ...valid, supportedLanguages: "en" });
    expect(result.success).toBe(false);
  });
});

describe("CreateTagRequestSchema", () => {
  const valid: CreateTagRequest = {
    id: "morning",
    batchId: "btc_1",
    programId: "pgm_1",
    name: "Morning Tag",
    enabled: true,
    supportedLanguages: ["en"],
  };

  test("parses a valid create payload with the historical client fields", () => {
    const result = CreateTagRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe("morning");
    }
  });

  test("does not include offsetInHrs, createdAt, updatedAt, or isNew", () => {
    expect("offsetInHrs" in CreateTagRequestSchema.shape).toBe(false);
    expect("createdAt" in CreateTagRequestSchema.shape).toBe(false);
    expect("updatedAt" in CreateTagRequestSchema.shape).toBe(false);
    expect("isNew" in CreateTagRequestSchema.shape).toBe(false);
  });

  test("rejects missing name", () => {
    const { name: _name, ...rest } = valid;
    const result = CreateTagRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.includes("name")),
      ).toBe(true);
    }
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = CreateTagRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("UpdateTagRequestSchema", () => {
  test("accepts an empty body (every field is optional)", () => {
    const result = UpdateTagRequestSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("does not include id (id travels in the query string)", () => {
    expect("id" in UpdateTagRequestSchema.shape).toBe(false);
  });

  test("accepts a partial update with name only", () => {
    const input: UpdateTagRequest = { name: "new name" };
    const result = UpdateTagRequestSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("new name");
    }
  });

  test("accepts updates to offsetInHrs and supportedLanguages", () => {
    const input: UpdateTagRequest = {
      offsetInHrs: 5,
      supportedLanguages: ["en", "hi"],
    };
    const result = UpdateTagRequestSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects non-number offsetInHrs", () => {
    const result = UpdateTagRequestSchema.safeParse({ offsetInHrs: "5" });
    expect(result.success).toBe(false);
  });
});
