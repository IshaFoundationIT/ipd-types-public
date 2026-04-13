import { describe, expect, test } from "bun:test";
import {
  RegistrationSchema,
  EnrollmentTypeSchema,
} from "../registrations.schema";

describe("EnrollmentTypeSchema", () => {
  test.each(["PARTICIPANT", "VOLUNTEER"] as const)("accepts %s", (value) => {
    expect(EnrollmentTypeSchema.safeParse(value).success).toBe(true);
  });

  test("rejects unknown enrollment type", () => {
    expect(EnrollmentTypeSchema.safeParse("ATTENDEE").success).toBe(false);
  });

  test("rejects lowercase", () => {
    expect(EnrollmentTypeSchema.safeParse("participant").success).toBe(false);
  });
});

describe("RegistrationSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    ssoId: "sso-123",
    streamLanguage: null,
    isCompleted: null,
    programId: "550e8400-e29b-41d4-a716-446655440001",
    batchId: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    currentStep: null,
    email: null,
    accessToken: null,
    channel: null,
    source: null,
    canAccessLC: null,
    isLearningCenter: null,
    tag: "default",
    enrollmentType: "PARTICIPANT",
  };

  test("parses a valid registration", () => {
    const result = RegistrationSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.enrollmentType).toBe("PARTICIPANT");
    }
  });

  test("accepts string email and other nullable fields", () => {
    const result = RegistrationSchema.safeParse({
      ...valid,
      email: "a@b.com",
      streamLanguage: "en",
      currentStep: "step-1",
      isCompleted: true,
      canAccessLC: true,
      isLearningCenter: false,
      channel: "web",
      source: "organic",
      accessToken: "tok",
      meta: { referral: "abc" },
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = RegistrationSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects invalid enrollmentType", () => {
    const result = RegistrationSchema.safeParse({
      ...valid,
      enrollmentType: "INVALID",
    });
    expect(result.success).toBe(false);
  });

  test("rejects non-string tag", () => {
    const result = RegistrationSchema.safeParse({ ...valid, tag: 42 });
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt", () => {
    const result = RegistrationSchema.safeParse({ ...valid, createdAt: "bad" });
    expect(result.success).toBe(false);
  });

  test("iterates legal enrollmentType values", () => {
    for (const type of ["PARTICIPANT", "VOLUNTEER"] as const) {
      const result = RegistrationSchema.safeParse({ ...valid, enrollmentType: type });
      expect(result.success).toBe(true);
    }
  });
});
