import { describe, expect, test } from "bun:test";
import { PageSchema } from "../pages.schema";

describe("PageSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Home",
    isAvailable: true,
    slug: "home",
    elements: [],
    sessions: [],
    config: {},
    startTime: "2026-01-01T00:00:00.000Z",
    endTime: "2026-01-02T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid page", () => {
    const result = PageSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.slug).toBe("home");
    }
  });

  test("accepts config with supportedLanguages and enableTracking", () => {
    const result = PageSchema.safeParse({
      ...valid,
      config: { supportedLanguages: ["en"], enableTracking: true },
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = PageSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing slug", () => {
    const { slug: _s, ...rest } = valid;
    const result = PageSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-boolean isAvailable", () => {
    const result = PageSchema.safeParse({ ...valid, isAvailable: "yes" });
    expect(result.success).toBe(false);
  });

  test("rejects non-array elements", () => {
    const result = PageSchema.safeParse({ ...valid, elements: "list" });
    expect(result.success).toBe(false);
  });

  test("rejects invalid startTime", () => {
    const result = PageSchema.safeParse({ ...valid, startTime: "bad-date" });
    expect(result.success).toBe(false);
  });
});
