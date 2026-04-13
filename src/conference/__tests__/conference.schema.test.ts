import { describe, expect, test } from "bun:test";
import {
  ConfSessionEligibleHostOptionSchema,
  ConfSessionCoHostOptionSchema,
} from "../conference.schema";

describe("ConfSessionEligibleHostOptionSchema", () => {
  const valid = { ssoId: "sso-1", email: "a@b.com" };

  test("parses a valid eligible host option", () => {
    const result = ConfSessionEligibleHostOptionSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("a@b.com");
    }
  });

  test("rejects missing ssoId", () => {
    const { ssoId: _s, ...rest } = valid;
    const result = ConfSessionEligibleHostOptionSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["ssoId"]);
    }
  });

  test("accepts plain-string email (legacy contract)", () => {
    const result = ConfSessionEligibleHostOptionSchema.safeParse({
      ...valid,
      email: "not-an-rfc-email",
    });
    expect(result.success).toBe(true);
  });

  test("rejects numeric ssoId", () => {
    const result = ConfSessionEligibleHostOptionSchema.safeParse({
      ...valid,
      ssoId: 42,
    });
    expect(result.success).toBe(false);
  });
});

describe("ConfSessionCoHostOptionSchema", () => {
  const valid = { ssoId: "sso-2", email: "b@c.com" };

  test("parses a valid co-host option", () => {
    const result = ConfSessionCoHostOptionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing email", () => {
    const { email: _e, ...rest } = valid;
    const result = ConfSessionCoHostOptionSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["email"]);
    }
  });

  test("accepts plain-string email (legacy contract)", () => {
    const result = ConfSessionCoHostOptionSchema.safeParse({
      ...valid,
      email: "not-an-rfc-email",
    });
    expect(result.success).toBe(true);
  });
});
