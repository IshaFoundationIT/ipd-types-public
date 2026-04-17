import { describe, expect, test } from "bun:test";
import {
  ActiveParticipantsResponseSchema,
  ActiveProgramSchema,
  ActiveProgramsResponseSchema,
  MetricsDateRangeQuerySchema,
  MetricsDateRangeWithIntervalQuerySchema,
  MetricsDateSchema,
  MetricsIntervalCountSchema,
  MetricsIntervalSchema,
  PagesMetricResponseSchema,
  ParticipantEngagementScoreResponseSchema,
  ParticipantEngagementScoreRowSchema,
  ProgramCompletionDropoutResponseSchema,
  ProgramCompletionDropoutRowSchema,
  ProgramCountResponseSchema,
  ProgramOptionSchema,
  RecentProgramSchema,
  RecentProgramsResponseSchema,
} from "../metrics.schema";

describe("MetricsDateSchema", () => {
  test("accepts a zero-padded date", () => {
    expect(MetricsDateSchema.safeParse("2026-04-01").success).toBe(true);
  });

  test("rejects a date that is not zero-padded", () => {
    expect(MetricsDateSchema.safeParse("2026-4-1").success).toBe(false);
  });

  test("rejects a completely wrong format", () => {
    expect(MetricsDateSchema.safeParse("April 1st, 2026").success).toBe(false);
  });

  test("rejects numeric input", () => {
    expect(MetricsDateSchema.safeParse(20260401).success).toBe(false);
  });
});

describe("MetricsIntervalSchema", () => {
  test("accepts 'daily'", () => {
    expect(MetricsIntervalSchema.safeParse("daily").success).toBe(true);
  });

  test("accepts 'weekly'", () => {
    expect(MetricsIntervalSchema.safeParse("weekly").success).toBe(true);
  });

  test("accepts 'monthly'", () => {
    expect(MetricsIntervalSchema.safeParse("monthly").success).toBe(true);
  });

  test("accepts 'yearly'", () => {
    expect(MetricsIntervalSchema.safeParse("yearly").success).toBe(true);
  });

  test("rejects 'hourly'", () => {
    expect(MetricsIntervalSchema.safeParse("hourly").success).toBe(false);
  });
});

describe("MetricsDateRangeQuerySchema", () => {
  test("parses a valid range", () => {
    const result = MetricsDateRangeQuerySchema.safeParse({
      startDate: "2026-04-01",
      endDate: "2026-04-30",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing endDate", () => {
    const result = MetricsDateRangeQuerySchema.safeParse({
      startDate: "2026-04-01",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid date format", () => {
    const result = MetricsDateRangeQuerySchema.safeParse({
      startDate: "2026-4-1",
      endDate: "2026-04-30",
    });
    expect(result.success).toBe(false);
  });
});

describe("MetricsDateRangeWithIntervalQuerySchema", () => {
  test("parses a valid query", () => {
    const result = MetricsDateRangeWithIntervalQuerySchema.safeParse({
      startDate: "2026-04-01",
      endDate: "2026-04-30",
      interval: "daily",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing interval", () => {
    const result = MetricsDateRangeWithIntervalQuerySchema.safeParse({
      startDate: "2026-04-01",
      endDate: "2026-04-30",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid interval", () => {
    const result = MetricsDateRangeWithIntervalQuerySchema.safeParse({
      startDate: "2026-04-01",
      endDate: "2026-04-30",
      interval: "hourly",
    });
    expect(result.success).toBe(false);
  });
});

describe("MetricsIntervalCountSchema", () => {
  test("parses a valid { interval, count } pair", () => {
    const result = MetricsIntervalCountSchema.safeParse({
      interval: "2026-04-01",
      count: 42,
    });
    expect(result.success).toBe(true);
  });

  test("accepts non-date interval labels (week/month/year buckets)", () => {
    expect(
      MetricsIntervalCountSchema.safeParse({ interval: "2026-W14", count: 3 })
        .success,
    ).toBe(true);
  });

  test("rejects non-number count", () => {
    const result = MetricsIntervalCountSchema.safeParse({
      interval: "2026-04-01",
      count: "42",
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing interval", () => {
    const result = MetricsIntervalCountSchema.safeParse({ count: 42 });
    expect(result.success).toBe(false);
  });
});

describe("ActiveParticipantsResponseSchema", () => {
  test("parses an empty array", () => {
    expect(ActiveParticipantsResponseSchema.safeParse([]).success).toBe(true);
  });

  test("parses an array of interval/count pairs", () => {
    const result = ActiveParticipantsResponseSchema.safeParse([
      { interval: "2026-04-01", count: 10 },
      { interval: "2026-04-02", count: 15 },
    ]);
    expect(result.success).toBe(true);
  });

  test("rejects a non-array", () => {
    expect(
      ActiveParticipantsResponseSchema.safeParse({
        interval: "2026-04-01",
        count: 10,
      }).success,
    ).toBe(false);
  });
});

describe("ProgramCountResponseSchema", () => {
  test("parses an empty array", () => {
    expect(ProgramCountResponseSchema.safeParse([]).success).toBe(true);
  });

  test("parses an array of interval/count pairs", () => {
    const result = ProgramCountResponseSchema.safeParse([
      { interval: "2026-04-01", count: 2 },
    ]);
    expect(result.success).toBe(true);
  });

  test("rejects entries missing count", () => {
    const result = ProgramCountResponseSchema.safeParse([
      { interval: "2026-04-01" },
    ]);
    expect(result.success).toBe(false);
  });
});

describe("ProgramCompletionDropoutRowSchema", () => {
  test("parses a minimal row", () => {
    const result = ProgramCompletionDropoutRowSchema.safeParse({
      programId: "pgm_1",
      name: "Program 1",
    });
    expect(result.success).toBe(true);
  });

  test("parses a row with null name", () => {
    const result = ProgramCompletionDropoutRowSchema.safeParse({
      programId: "pgm_1",
      name: null,
    });
    expect(result.success).toBe(true);
  });

  test("passes through extra fields", () => {
    const result = ProgramCompletionDropoutRowSchema.safeParse({
      programId: "pgm_1",
      name: "Program 1",
      completionCount: 12,
      dropoutCount: 3,
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing programId", () => {
    const result = ProgramCompletionDropoutRowSchema.safeParse({
      name: "Program 1",
    });
    expect(result.success).toBe(false);
  });
});

describe("ProgramOptionSchema", () => {
  test("parses a valid option", () => {
    const result = ProgramOptionSchema.safeParse({
      label: "Program 1",
      value: "pgm_1",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing value", () => {
    const result = ProgramOptionSchema.safeParse({ label: "Program 1" });
    expect(result.success).toBe(false);
  });
});

describe("ProgramCompletionDropoutResponseSchema", () => {
  test("parses a full response", () => {
    const result = ProgramCompletionDropoutResponseSchema.safeParse({
      completionDropoutData: [
        {
          programId: "pgm_1",
          name: "Program 1",
          completionCount: 5,
          dropoutCount: 1,
        },
      ],
      programOptions: [{ label: "Program 1", value: "pgm_1" }],
    });
    expect(result.success).toBe(true);
  });

  test("parses empty arrays", () => {
    const result = ProgramCompletionDropoutResponseSchema.safeParse({
      completionDropoutData: [],
      programOptions: [],
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing programOptions", () => {
    const result = ProgramCompletionDropoutResponseSchema.safeParse({
      completionDropoutData: [],
    });
    expect(result.success).toBe(false);
  });
});

describe("ActiveProgramSchema", () => {
  test("parses a minimal program", () => {
    const result = ActiveProgramSchema.safeParse({
      programId: "pgm_1",
      name: "P1",
    });
    expect(result.success).toBe(true);
  });

  test("accepts null name", () => {
    const result = ActiveProgramSchema.safeParse({
      programId: "pgm_1",
      name: null,
    });
    expect(result.success).toBe(true);
  });

  test("accepts optional participants/completion/endTime", () => {
    const result = ActiveProgramSchema.safeParse({
      programId: "pgm_1",
      name: "P1",
      participants: 100,
      completion: 42,
      endTime: "2026-12-31T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing programId", () => {
    const result = ActiveProgramSchema.safeParse({ name: "P1" });
    expect(result.success).toBe(false);
  });
});

describe("ActiveProgramsResponseSchema", () => {
  test("parses an empty list", () => {
    expect(ActiveProgramsResponseSchema.safeParse([]).success).toBe(true);
  });

  test("parses a list of programs", () => {
    const result = ActiveProgramsResponseSchema.safeParse([
      { programId: "pgm_1", name: "P1" },
    ]);
    expect(result.success).toBe(true);
  });

  test("rejects a non-array input", () => {
    expect(
      ActiveProgramsResponseSchema.safeParse({
        programId: "pgm_1",
        name: "P1",
      }).success,
    ).toBe(false);
  });
});

describe("PagesMetricResponseSchema", () => {
  test("parses an empty array (current stub shape)", () => {
    expect(PagesMetricResponseSchema.safeParse([]).success).toBe(true);
  });

  test("parses an array of arbitrary items", () => {
    expect(PagesMetricResponseSchema.safeParse([1, "a", null]).success).toBe(
      true,
    );
  });

  test("rejects a non-array input", () => {
    expect(PagesMetricResponseSchema.safeParse({}).success).toBe(false);
  });
});

describe("RecentProgramSchema", () => {
  test("parses a minimal program", () => {
    const result = RecentProgramSchema.safeParse({
      programId: "pgm_1",
      name: "P1",
    });
    expect(result.success).toBe(true);
  });

  test("accepts optional timing fields", () => {
    const result = RecentProgramSchema.safeParse({
      programId: "pgm_1",
      name: "P1",
      startTime: "2026-04-01T00:00:00.000Z",
      endTime: "2026-04-30T00:00:00.000Z",
      legalEntity: "IBPL",
      participants: 100,
      completion: 50,
      status: "Active",
    });
    expect(result.success).toBe(true);
  });
});

describe("RecentProgramsResponseSchema", () => {
  test("parses an empty list", () => {
    expect(RecentProgramsResponseSchema.safeParse([]).success).toBe(true);
  });

  test("parses a list of programs", () => {
    const result = RecentProgramsResponseSchema.safeParse([
      { programId: "pgm_1", name: "P1" },
    ]);
    expect(result.success).toBe(true);
  });
});

describe("ParticipantEngagementScoreRowSchema", () => {
  test("parses an empty row", () => {
    expect(ParticipantEngagementScoreRowSchema.safeParse({}).success).toBe(
      true,
    );
  });

  test("passes through any fields", () => {
    const result = ParticipantEngagementScoreRowSchema.safeParse({
      userId: "u1",
      score: 0.8,
    });
    expect(result.success).toBe(true);
  });

  test("rejects non-object input", () => {
    expect(ParticipantEngagementScoreRowSchema.safeParse(42).success).toBe(
      false,
    );
  });
});

describe("ParticipantEngagementScoreResponseSchema", () => {
  test("parses an empty list", () => {
    expect(
      ParticipantEngagementScoreResponseSchema.safeParse([]).success,
    ).toBe(true);
  });

  test("parses a list of rows", () => {
    const result = ParticipantEngagementScoreResponseSchema.safeParse([
      { userId: "u1", score: 0.8 },
    ]);
    expect(result.success).toBe(true);
  });

  test("rejects a non-array input", () => {
    expect(
      ParticipantEngagementScoreResponseSchema.safeParse({ userId: "u1" })
        .success,
    ).toBe(false);
  });
});
