import { describe, expect, test } from "bun:test";
import {
  AttendanceSyncPayloadSchema,
  IPRSAttendanceSyncPayloadSchema,
  IshangamAttendanceSyncPayloadSchema,
} from "../attendance.schema";

describe("AttendanceSyncPayloadSchema", () => {
  const valid = {
    batch: "batch-1",
    target: "IPRS",
    programId: "550e8400-e29b-41d4-a716-446655440000",
    eligibilityCriteria: null,
  };

  test("parses a valid attendance sync payload", () => {
    const result = AttendanceSyncPayloadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("accepts eligibilityCriteria object", () => {
    const result = AttendanceSyncPayloadSchema.safeParse({
      ...valid,
      eligibilityCriteria: { rule: true },
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing batch", () => {
    const { batch: _b, ...rest } = valid;
    const result = AttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["batch"]);
    }
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = AttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-string target", () => {
    const result = AttendanceSyncPayloadSchema.safeParse({ ...valid, target: 42 });
    expect(result.success).toBe(false);
  });
});

describe("IPRSAttendanceSyncPayloadSchema", () => {
  const valid = {
    batch: "batch-1",
    target: "IPRS",
    programId: "550e8400-e29b-41d4-a716-446655440000",
    eligibilityCriteria: null,
    ipdStatus: "COMPLETED",
    attType: "ATTENDED",
  };

  test("parses a valid IPRS attendance sync payload", () => {
    const result = IPRSAttendanceSyncPayloadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing ipdStatus", () => {
    const { ipdStatus: _i, ...rest } = valid;
    const result = IPRSAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["ipdStatus"]);
    }
  });

  test("rejects missing attType", () => {
    const { attType: _a, ...rest } = valid;
    const result = IPRSAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-string ipdStatus", () => {
    const result = IPRSAttendanceSyncPayloadSchema.safeParse({ ...valid, ipdStatus: 1 });
    expect(result.success).toBe(false);
  });

  test("still requires base fields like batch", () => {
    const { batch: _b, ...rest } = valid;
    const result = IPRSAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("IshangamAttendanceSyncPayloadSchema", () => {
  const valid = {
    batch: "batch-1",
    target: "ISHANGAM",
    programId: "550e8400-e29b-41d4-a716-446655440000",
    eligibilityCriteria: null,
    ishangamProgramType: "IE",
    session: "session-1",
    programStartDate: "2026-01-01",
  };

  test("parses a valid Ishangam attendance sync payload", () => {
    const result = IshangamAttendanceSyncPayloadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing ishangamProgramType", () => {
    const { ishangamProgramType: _i, ...rest } = valid;
    const result = IshangamAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["ishangamProgramType"]);
    }
  });

  test("rejects missing session", () => {
    const { session: _s, ...rest } = valid;
    const result = IshangamAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects missing programStartDate", () => {
    const { programStartDate: _p, ...rest } = valid;
    const result = IshangamAttendanceSyncPayloadSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-string session", () => {
    const result = IshangamAttendanceSyncPayloadSchema.safeParse({ ...valid, session: 1 });
    expect(result.success).toBe(false);
  });
});
