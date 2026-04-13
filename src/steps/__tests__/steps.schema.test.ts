import { describe, expect, test } from "bun:test";
import {
  StepSchema,
  StepMetaSchema,
  EligibilityCriteriaSchema,
} from "../steps.schema";

describe("StepMetaSchema", () => {
  test("accepts empty object", () => {
    const result = StepMetaSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts arbitrary keys", () => {
    const result = StepMetaSchema.safeParse({ arbitrary: "value", showStepProgressBar: true });
    expect(result.success).toBe(true);
  });

  test("rejects null", () => {
    const result = StepMetaSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  test("rejects a number", () => {
    const result = StepMetaSchema.safeParse(42);
    expect(result.success).toBe(false);
  });

  test("rejects a string", () => {
    const result = StepMetaSchema.safeParse("meta");
    expect(result.success).toBe(false);
  });
});

describe("EligibilityCriteriaSchema", () => {
  test("accepts empty object", () => {
    const result = EligibilityCriteriaSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts arbitrary keys", () => {
    const result = EligibilityCriteriaSchema.safeParse({ rules: { all: true }, other: "v" });
    expect(result.success).toBe(true);
  });

  test("rejects null", () => {
    const result = EligibilityCriteriaSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  test("rejects a string", () => {
    const result = EligibilityCriteriaSchema.safeParse("criteria");
    expect(result.success).toBe(false);
  });
});

describe("StepSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Step 1",
    programId: "550e8400-e29b-41d4-a716-446655440001",
    batchId: "550e8400-e29b-41d4-a716-446655440002",
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-02T00:00:00.000Z",
    isFirst: true,
    nextStep: null,
    meta: null,
    elements: [],
    ctaText: null,
    eligibilityCriteria: null,
    icon: "icon.svg",
    index: "1",
    canRevisit: false,
    legendLabel: [{ lang: "en", text: "Step" }],
    heading: [{ lang: "en", text: "Heading" }],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid step", () => {
    const result = StepSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Step 1");
    }
  });

  test("accepts meta object and eligibilityCriteria object", () => {
    const result = StepSchema.safeParse({
      ...valid,
      meta: { showStepProgressBar: true },
      eligibilityCriteria: { rules: { any: true } },
    });
    expect(result.success).toBe(true);
  });

  test("accepts nextStep string", () => {
    const result = StepSchema.safeParse({ ...valid, nextStep: "step-2" });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = StepSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects non-boolean isFirst", () => {
    const result = StepSchema.safeParse({ ...valid, isFirst: "true" });
    expect(result.success).toBe(false);
  });

  test("rejects invalid startTime", () => {
    const result = StepSchema.safeParse({ ...valid, startTime: "bad-date" });
    expect(result.success).toBe(false);
  });

  test("rejects non-array elements", () => {
    const result = StepSchema.safeParse({ ...valid, elements: "abc" });
    expect(result.success).toBe(false);
  });
});
