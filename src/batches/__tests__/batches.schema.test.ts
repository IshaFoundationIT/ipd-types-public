import { describe, expect, test } from "bun:test";
import { BatchSchema } from "../batches.schema";

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
