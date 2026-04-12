import { describe, expect, test } from "bun:test";
import { EventSchema, NewEventSchema } from "../events.schema";

describe("EventSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    elementId: "550e8400-e29b-41d4-a716-446655440001",
    type: "VIEW",
    programId: "550e8400-e29b-41d4-a716-446655440002",
    batchId: "550e8400-e29b-41d4-a716-446655440003",
    registrationId: "550e8400-e29b-41d4-a716-446655440004",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid event", () => {
    const result = EventSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.type).toBe("VIEW");
    }
  });

  test("accepts optional ssoId, inTime, outTime, ecg, streamLanguage, data, tag", () => {
    const result = EventSchema.safeParse({
      ...valid,
      ssoId: "sso-1",
      inTime: "2026-01-01T00:00:00.000Z",
      outTime: "2026-01-01T01:00:00.000Z",
      ecg: "ecg-1",
      streamLanguage: "en",
      data: { foo: "bar" },
      tag: "tag-1",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = EventSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects missing programId", () => {
    const { programId: _p, ...rest } = valid;
    const result = EventSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt string", () => {
    const result = EventSchema.safeParse({ ...valid, createdAt: "bad-date" });
    expect(result.success).toBe(false);
  });

  test("rejects non-string type", () => {
    const result = EventSchema.safeParse({ ...valid, type: 42 });
    expect(result.success).toBe(false);
  });
});

describe("NewEventSchema", () => {
  const valid = {
    csvFile: null,
    creationMode: "single",
    writeMode: "overwrite",
    eventType: "VIEW",
    eventTrigger: "manual",
  };

  test("parses a valid new event", () => {
    const result = NewEventSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("accepts optional session/step/element ids, inTime, outTime, ecg, data", () => {
    const result = NewEventSchema.safeParse({
      ...valid,
      sessionId: "session-1",
      stepId: "step-1",
      elementId: "element-1",
      inTime: "2026-01-01T00:00:00.000Z",
      outTime: "2026-01-01T01:00:00.000Z",
      ecg: "ecg-1",
      data: { foo: "bar" },
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing eventType", () => {
    const { eventType: _e, ...rest } = valid;
    const result = NewEventSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["eventType"]);
    }
  });

  test("rejects missing eventTrigger", () => {
    const { eventTrigger: _t, ...rest } = valid;
    const result = NewEventSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-string creationMode", () => {
    const result = NewEventSchema.safeParse({ ...valid, creationMode: 1 });
    expect(result.success).toBe(false);
  });
});
