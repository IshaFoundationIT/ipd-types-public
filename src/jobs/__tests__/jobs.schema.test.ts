import { describe, expect, test } from "bun:test";
import { JobSchema, JobInDataSchema, JobOutDataSchema } from "../jobs.schema";

describe("JobInDataSchema", () => {
  test("accepts empty object", () => {
    const result = JobInDataSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts arbitrary keys", () => {
    const result = JobInDataSchema.safeParse({
      programName: "p",
      batchName: "b",
      arbitrary: "v",
      data: [1, 2, 3],
    });
    expect(result.success).toBe(true);
  });

  test("rejects null", () => {
    const result = JobInDataSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  test("rejects non-object", () => {
    const result = JobInDataSchema.safeParse("oops");
    expect(result.success).toBe(false);
  });
});

describe("JobOutDataSchema", () => {
  test("accepts empty object", () => {
    const result = JobOutDataSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts arbitrary keys", () => {
    const result = JobOutDataSchema.safeParse({
      name: "out",
      processedECGReport: [{ key: "value" }],
      arbitrary: "v",
    });
    expect(result.success).toBe(true);
  });

  test("rejects null", () => {
    const result = JobOutDataSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  test("rejects a number", () => {
    const result = JobOutDataSchema.safeParse(42);
    expect(result.success).toBe(false);
  });
});

describe("JobSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    inData: { programName: "p" },
    outData: null,
    by: null,
    status: "PENDING",
    type: "SYNC",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid job", () => {
    const result = JobSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("PENDING");
    }
  });

  test("accepts outData object and by string", () => {
    const result = JobSchema.safeParse({
      ...valid,
      outData: { name: "out" },
      by: "user-1",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = JobSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing inData", () => {
    const { inData: _in, ...rest } = valid;
    const result = JobSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-string status", () => {
    const result = JobSchema.safeParse({ ...valid, status: 42 });
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt", () => {
    const result = JobSchema.safeParse({ ...valid, createdAt: "nope" });
    expect(result.success).toBe(false);
  });
});
