import { describe, expect, test } from "bun:test";
import { TagSchema } from "../tags.schema";

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
