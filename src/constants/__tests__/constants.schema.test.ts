import { describe, expect, test } from "bun:test";
import {
  ElementTypeSchema,
  VideoSourceTypeSchema,
  VideoPlayTypeSchema,
  ProgramAccessModulesSchema,
  ELEMENT_TYPE,
  VIDEO_SOURCE_TYPE,
  VIDEO_PLAY_TYPE,
  PROGRAM_ACCESS_MODULES,
} from "../constants.schema";

describe("ELEMENT_TYPE as const object", () => {
  test("has the expected keys", () => {
    expect(Object.keys(ELEMENT_TYPE).sort()).toEqual(
      [
        "Q_AND_A",
        "FORM",
        "TABLE",
        "LANG_SELECT",
        "RICH_TEXT_V3",
        "GROUP_CHAT_V2",
        "PAGE_CHAT",
        "ZOOM_SESSION",
        "CONFERENCING",
        "TAG_SELECT",
        "VIDEO_V2",
        "PADLET",
      ].sort(),
    );
  });
});

describe("ElementTypeSchema", () => {
  test.each(Object.values(ELEMENT_TYPE))("accepts %s", (value) => {
    expect(ElementTypeSchema.safeParse(value).success).toBe(true);
  });

  test("rejects unknown value", () => {
    expect(ElementTypeSchema.safeParse("INVALID").success).toBe(false);
  });

  test("rejects non-string", () => {
    expect(ElementTypeSchema.safeParse(42).success).toBe(false);
  });
});

describe("VIDEO_SOURCE_TYPE as const object", () => {
  test("has the expected keys", () => {
    expect(Object.keys(VIDEO_SOURCE_TYPE).sort()).toEqual(
      ["HLS", "DASH", "YOUTUBE", "VDO_CIPHER", "NONE"].sort(),
    );
  });
});

describe("VideoSourceTypeSchema", () => {
  test.each(Object.values(VIDEO_SOURCE_TYPE))("accepts %s", (value) => {
    expect(VideoSourceTypeSchema.safeParse(value).success).toBe(true);
  });

  test("rejects unknown value", () => {
    expect(VideoSourceTypeSchema.safeParse("MP4").success).toBe(false);
  });
});

describe("VIDEO_PLAY_TYPE as const object", () => {
  test("has the expected keys", () => {
    expect(Object.keys(VIDEO_PLAY_TYPE).sort()).toEqual(["LIVE", "VOD", "LIVE_VOD"].sort());
  });
});

describe("VideoPlayTypeSchema", () => {
  test.each(Object.values(VIDEO_PLAY_TYPE))("accepts %s", (value) => {
    expect(VideoPlayTypeSchema.safeParse(value).success).toBe(true);
  });

  test("rejects unknown value", () => {
    expect(VideoPlayTypeSchema.safeParse("STREAM").success).toBe(false);
  });
});

describe("PROGRAM_ACCESS_MODULES as const object", () => {
  test("has the expected keys", () => {
    expect(Object.keys(PROGRAM_ACCESS_MODULES).sort()).toEqual(
      [
        "PROGRAM_CONFIG",
        "CHAT_VIEWER",
        "REGISTRATIONS",
        "ATTENDANCE_SYNC",
        "ATTENDANCE_REPORTS",
        "Q_AND_A",
        "S3_MANAGER",
        "CONF_HOST",
        "PAGES",
        "COMMUNICATIONS",
        "STREAM_VIEWER",
        "JOBS",
        "CONFERENCING",
        "ECG_REPORTS",
        "FORM_RESPONSES",
        "HOME",
        "MANAGE",
        "PADLET_VIEWER",
        "SUPPORT_TOOLS",
      ].sort(),
    );
  });
});

describe("ProgramAccessModulesSchema", () => {
  test.each(Object.values(PROGRAM_ACCESS_MODULES))("accepts %s", (value) => {
    expect(ProgramAccessModulesSchema.safeParse(value).success).toBe(true);
  });

  test("rejects unknown value", () => {
    expect(ProgramAccessModulesSchema.safeParse("ROOT").success).toBe(false);
  });

  test("rejects non-string", () => {
    expect(ProgramAccessModulesSchema.safeParse(42).success).toBe(false);
  });
});
