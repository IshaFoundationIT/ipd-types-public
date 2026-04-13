import { describe, expect, test } from "bun:test";
import {
  ProgramSchema,
  ProgramAccessSchema,
  CreateProgramAccessSchema,
  EditProgramAccessSchema,
} from "../programs.schema";

describe("ProgramSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Inner Engineering",
    isAvailable: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    supportedLanguages: ["en", "hi"],
    label: [{ lang: "en", value: "Inner Engineering" }],
    termsAndConditions: [{ lang: "en", value: "T&C" }],
    ssoMandates: [],
    ipWhiteList: [],
    registrationPageRichText: [],
    workspaceId: "550e8400-e29b-41d4-a716-446655440001",
    program_access: [],
  };

  test("parses a valid program", () => {
    const result = ProgramSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe(valid.id);
    }
  });

  test("accepts optional description / image / startTime / endTime", () => {
    const result = ProgramSchema.safeParse({
      ...valid,
      description: "An inward journey",
      image: "https://example.com/img.png",
      startTime: "2026-01-01T00:00:00.000Z",
      endTime: "2026-01-02T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = ProgramSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects non-boolean isAvailable", () => {
    const result = ProgramSchema.safeParse({ ...valid, isAvailable: "true" });
    expect(result.success).toBe(false);
  });

  test("rejects missing workspaceId", () => {
    const { workspaceId: _w, ...rest } = valid;
    const result = ProgramSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-array supportedLanguages", () => {
    const result = ProgramSchema.safeParse({ ...valid, supportedLanguages: "en" });
    expect(result.success).toBe(false);
  });
});

describe("ProgramAccessSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    programId: "550e8400-e29b-41d4-a716-446655440001",
    ssoId: "sso-123",
    workspaceId: "550e8400-e29b-41d4-a716-446655440002",
    workspaceAccessId: "550e8400-e29b-41d4-a716-446655440003",
    accessibleModules: ["PROGRAM_CONFIG", "REGISTRATIONS"],
    permissions: {},
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid program access", () => {
    const result = ProgramAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = ProgramAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid module in accessibleModules", () => {
    const result = ProgramAccessSchema.safeParse({
      ...valid,
      accessibleModules: ["INVALID_MODULE"],
    });
    expect(result.success).toBe(false);
  });

  test("rejects non-object permissions", () => {
    const result = ProgramAccessSchema.safeParse({ ...valid, permissions: "allow" });
    expect(result.success).toBe(false);
  });
});

describe("CreateProgramAccessSchema", () => {
  const valid = {
    programIds: ["550e8400-e29b-41d4-a716-446655440000"],
    accessibleModules: ["PROGRAM_CONFIG"],
  };

  test("parses a valid create payload", () => {
    const result = CreateProgramAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing programIds", () => {
    const { programIds: _p, ...rest } = valid;
    const result = CreateProgramAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid module", () => {
    const result = CreateProgramAccessSchema.safeParse({
      ...valid,
      accessibleModules: ["ROOT"],
    });
    expect(result.success).toBe(false);
  });

  test("rejects non-array programIds", () => {
    const result = CreateProgramAccessSchema.safeParse({
      ...valid,
      programIds: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(false);
  });
});

describe("EditProgramAccessSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    accessibleModules: ["PROGRAM_CONFIG"],
  };

  test("parses a valid edit payload", () => {
    const result = EditProgramAccessSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = EditProgramAccessSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects invalid module", () => {
    const result = EditProgramAccessSchema.safeParse({
      ...valid,
      accessibleModules: ["INVALID"],
    });
    expect(result.success).toBe(false);
  });
});
