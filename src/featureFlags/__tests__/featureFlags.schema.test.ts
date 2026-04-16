import { describe, expect, test } from "bun:test";
import {
  FeatureFlagKeyParamsSchema,
  FeatureFlagListSchema,
  FeatureFlagSchema,
} from "../featureFlags.schema";

describe("FeatureFlagSchema", () => {
  test("parses a valid flag", () => {
    const result = FeatureFlagSchema.safeParse({
      key: "csv-export",
      enabled: true,
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing enabled", () => {
    const result = FeatureFlagSchema.safeParse({ key: "csv-export" });
    expect(result.success).toBe(false);
  });

  test("rejects missing key", () => {
    const result = FeatureFlagSchema.safeParse({ enabled: true });
    expect(result.success).toBe(false);
  });

  test("rejects non-boolean enabled", () => {
    const result = FeatureFlagSchema.safeParse({
      key: "csv-export",
      enabled: "true",
    });
    expect(result.success).toBe(false);
  });

  test("rejects non-string key", () => {
    const result = FeatureFlagSchema.safeParse({ key: 1, enabled: true });
    expect(result.success).toBe(false);
  });
});

describe("FeatureFlagListSchema", () => {
  test("parses an empty list", () => {
    const result = FeatureFlagListSchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  test("parses a list of valid flags", () => {
    const result = FeatureFlagListSchema.safeParse([
      { key: "csv-export", enabled: true },
      { key: "new-ui", enabled: false },
    ]);
    expect(result.success).toBe(true);
  });

  test("rejects a list containing an invalid flag", () => {
    const result = FeatureFlagListSchema.safeParse([
      { key: "csv-export", enabled: true },
      { key: "new-ui" },
    ]);
    expect(result.success).toBe(false);
  });

  test("rejects a non-array input", () => {
    const result = FeatureFlagListSchema.safeParse({
      key: "csv-export",
      enabled: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("FeatureFlagKeyParamsSchema", () => {
  test("parses a valid params object", () => {
    const result = FeatureFlagKeyParamsSchema.safeParse({ key: "csv-export" });
    expect(result.success).toBe(true);
  });

  test("rejects an empty string key", () => {
    const result = FeatureFlagKeyParamsSchema.safeParse({ key: "" });
    expect(result.success).toBe(false);
  });

  test("rejects missing key", () => {
    const result = FeatureFlagKeyParamsSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects numeric key", () => {
    const result = FeatureFlagKeyParamsSchema.safeParse({ key: 42 });
    expect(result.success).toBe(false);
  });
});
