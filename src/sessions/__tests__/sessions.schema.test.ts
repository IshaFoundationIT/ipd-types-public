import { describe, expect, test } from "bun:test";
import { SessionSchema } from "../sessions.schema";

describe("SessionSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    programId: "550e8400-e29b-41d4-a716-446655440001",
    batchId: "550e8400-e29b-41d4-a716-446655440002",
    elements: ["550e8400-e29b-41d4-a716-446655440003"],
    name: "Session 1",
    label: [{ lang: "en", text: "Session" }],
    ctaText: [{ lang: "en", text: "Join" }],
    appearTime: null,
    disappearTime: null,
    startTime: "2026-01-01T00:00:00.000Z",
    timerStartTime: "2026-01-01T00:00:00.000Z",
    timerEndTime: "2026-01-01T01:00:00.000Z",
    doorOpenTime: "2026-01-01T00:00:00.000Z",
    doorCloseTime: "2026-01-01T00:30:00.000Z",
    endTime: "2026-01-01T01:00:00.000Z",
    eligibilityCriteria: null,
    lapseCriteria: null,
    meta: { showForLanguages: ["en"] },
    showForTags: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid session", () => {
    const result = SessionSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Session 1");
    }
  });

  test("accepts appearTime and disappearTime as ISO strings", () => {
    const result = SessionSchema.safeParse({
      ...valid,
      appearTime: "2026-01-01T00:00:00.000Z",
      disappearTime: "2026-01-02T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  test("accepts lapseCriteria shape", () => {
    const result = SessionSchema.safeParse({
      ...valid,
      lapseCriteria: {
        fromIndex: 0,
        toIndex: 10,
        lapseTime: 60,
        targetVideoElementId: "abc",
      },
    });
    expect(result.success).toBe(true);
  });

  test("accepts eligibilityCriteria object", () => {
    const result = SessionSchema.safeParse({
      ...valid,
      eligibilityCriteria: { rules: { all: true } },
    });
    expect(result.success).toBe(true);
  });

  test("accepts optional youtubeUrl and meetingRooms", () => {
    const result = SessionSchema.safeParse({
      ...valid,
      youtubeUrl: "https://youtube.com/watch?v=x",
      meetingAllocationEnabled: true,
      meetingRooms: [
        {
          label: "Room 1",
          zoomUrl: "https://zoom.us/abc",
          capacity: 100,
          priority: 1,
          isActive: true,
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = SessionSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects non-array elements", () => {
    const result = SessionSchema.safeParse({ ...valid, elements: "abc" });
    expect(result.success).toBe(false);
  });

  test("rejects invalid startTime string", () => {
    const result = SessionSchema.safeParse({ ...valid, startTime: "not-a-date" });
    expect(result.success).toBe(false);
  });

  test("rejects non-object meta", () => {
    const result = SessionSchema.safeParse({ ...valid, meta: "meta" });
    expect(result.success).toBe(false);
  });

  test("parses a valid session with alternateYoutubeEnabled=true", () => {
    const result = SessionSchema.safeParse({ ...valid, alternateYoutubeEnabled: true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.alternateYoutubeEnabled).toBe(true);
    }
  });

  test("parses a valid session without alternateYoutubeEnabled", () => {
    const result = SessionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects non-boolean alternateYoutubeEnabled", () => {
    const result = SessionSchema.safeParse({ ...valid, alternateYoutubeEnabled: "true" });
    expect(result.success).toBe(false);
  });
});
