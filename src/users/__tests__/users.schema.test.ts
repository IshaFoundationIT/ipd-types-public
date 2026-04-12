import { describe, expect, test } from "bun:test";
import {
  UserSchema,
  UserSummarySchema,
  UserRoleSchema,
  CreateUserRequestSchema,
  ListUsersQuerySchema,
  UserIdParamsSchema,
  type User,
} from "../users.schema";

describe("UserSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "a@b.com",
    name: "Test",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid user", () => {
    const result = UserSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      const u: User = result.data;
      expect(u.id).toBe(valid.id);
      expect(u.email).toBe(valid.email);
      expect(u.role).toBe("admin");
    }
  });

  test("rejects invalid email", () => {
    const result = UserSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["email"]);
    }
  });

  test("rejects invalid role", () => {
    const result = UserSchema.safeParse({ ...valid, role: "ROOT" });
    expect(result.success).toBe(false);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = UserSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing name", () => {
    const { name: _n, ...rest } = valid;
    const result = UserSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt", () => {
    const result = UserSchema.safeParse({ ...valid, createdAt: "not-a-date" });
    expect(result.success).toBe(false);
  });

  test("rejects numeric id", () => {
    const result = UserSchema.safeParse({ ...valid, id: 42 });
    expect(result.success).toBe(false);
  });
});

describe("UserSummarySchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "a@b.com",
    name: "Test",
  };

  test("parses a valid user summary", () => {
    const result = UserSummarySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = UserSummarySchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = UserSummarySchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe("UserRoleSchema", () => {
  test.each(["admin", "member", "viewer"] as const)("accepts %s", (role) => {
    expect(UserRoleSchema.safeParse(role).success).toBe(true);
  });

  test("rejects unknown role", () => {
    expect(UserRoleSchema.safeParse("root").success).toBe(false);
  });

  test("rejects non-string role", () => {
    expect(UserRoleSchema.safeParse(42).success).toBe(false);
  });
});

describe("CreateUserRequestSchema", () => {
  const valid = {
    email: "a@b.com",
    name: "Test",
    role: "member",
  };

  test("parses a valid create request", () => {
    const result = CreateUserRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = CreateUserRequestSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });

  test("rejects missing name", () => {
    const { name: _n, ...rest } = valid;
    const result = CreateUserRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid role", () => {
    const result = CreateUserRequestSchema.safeParse({ ...valid, role: "ROOT" });
    expect(result.success).toBe(false);
  });
});

describe("ListUsersQuerySchema", () => {
  test("parses a valid list users query with all fields", () => {
    const result = ListUsersQuerySchema.safeParse({ page: 0, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  test("parses an empty query (all optional)", () => {
    const result = ListUsersQuerySchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("rejects string page", () => {
    const result = ListUsersQuerySchema.safeParse({ page: "0", pageSize: 10 });
    expect(result.success).toBe(false);
  });
});

describe("UserIdParamsSchema", () => {
  test("parses a valid params object", () => {
    const result = UserIdParamsSchema.safeParse({
      id: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const result = UserIdParamsSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects numeric id", () => {
    const result = UserIdParamsSchema.safeParse({ id: 42 });
    expect(result.success).toBe(false);
  });
});
