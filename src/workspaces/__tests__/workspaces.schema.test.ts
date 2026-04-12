import { describe, expect, test } from "bun:test";
import {
  WorkspaceSchema,
  WorkspaceAccessSchema,
  CreateWorkspaceAccessSchema,
  UpdateWorkspaceAccessSchema,
} from "../workspaces.schema";

describe("WorkspaceSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "My Workspace",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    workspaceAccesses: [],
  };

  test("parses a valid workspace", () => {
    const result = WorkspaceSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("My Workspace");
    }
  });

  test("accepts optional description and imageUrl", () => {
    const result = WorkspaceSchema.safeParse({
      ...valid,
      description: "A description",
      imageUrl: "https://example.com/img.png",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = WorkspaceSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing name", () => {
    const { name: _n, ...rest } = valid;
    const result = WorkspaceSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-array workspaceAccesses", () => {
    const result = WorkspaceSchema.safeParse({
      ...valid,
      workspaceAccesses: {},
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt string", () => {
    const result = WorkspaceSchema.safeParse({ ...valid, createdAt: "bad-date" });
    expect(result.success).toBe(false);
  });
});

describe("WorkspaceAccessSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    workspaceId: "550e8400-e29b-41d4-a716-446655440001",
    type: "ADMIN",
    name: "Access Name",
    email: "a@b.com",
    ssoId: "sso-123",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid workspace access", () => {
    const result = WorkspaceAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing workspaceId", () => {
    const { workspaceId: _w, ...rest } = valid;
    const result = WorkspaceAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid email", () => {
    const result = WorkspaceAccessSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });
});

describe("CreateWorkspaceAccessSchema", () => {
  const valid = { email: "a@b.com", type: "ADMIN" };

  test("parses a valid create payload", () => {
    const result = CreateWorkspaceAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing type", () => {
    const { type: _t, ...rest } = valid;
    const result = CreateWorkspaceAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["type"]);
    }
  });

  test("rejects invalid email", () => {
    const result = CreateWorkspaceAccessSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });
});

describe("UpdateWorkspaceAccessSchema", () => {
  const valid = { id: "550e8400-e29b-41d4-a716-446655440000", type: "MEMBER" };

  test("parses a valid update payload", () => {
    const result = UpdateWorkspaceAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = UpdateWorkspaceAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects numeric id", () => {
    const result = UpdateWorkspaceAccessSchema.safeParse({ ...valid, id: 42 });
    expect(result.success).toBe(false);
  });
});
