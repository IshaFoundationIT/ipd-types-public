import { z } from "zod";

export const ELEMENT_TYPE = {
  Q_AND_A: "Q_AND_A",
  FORM: "FORM",
  TABLE: "TABLE",
  LANG_SELECT: "LANG_SELECT",
  RICH_TEXT_V3: "RICH_TEXT_V3",
  GROUP_CHAT_V2: "GROUP_CHAT_V2",
  PAGE_CHAT: "PAGE_CHAT",
  ZOOM_SESSION: "ZOOM_SESSION",
  CONFERENCING: "CONFERENCING",
  TAG_SELECT: "TAG_SELECT",
  VIDEO_V2: "VIDEO_V2",
  PADLET: "PADLET",
} as const;
export type ElementType = (typeof ELEMENT_TYPE)[keyof typeof ELEMENT_TYPE];
export const ElementTypeSchema = z.enum(ELEMENT_TYPE);

export const VIDEO_SOURCE_TYPE = {
  HLS: "HLS",
  DASH: "DASH",
  YOUTUBE: "YOUTUBE",
  VDO_CIPHER: "VDO_CIPHER",
  NONE: "NONE",
} as const;
export type VideoSourceType = (typeof VIDEO_SOURCE_TYPE)[keyof typeof VIDEO_SOURCE_TYPE];
export const VideoSourceTypeSchema = z.enum(VIDEO_SOURCE_TYPE);

// LIVEY_VOD value preserved from legacy constants (producer typo, not corrected to avoid wire drift)
export const VIDEO_PLAY_TYPE = {
  LIVE: "LIVE",
  VOD: "VOD",
  LIVE_VOD: "LIVEY_VOD",
} as const;
export type VideoPlayType = (typeof VIDEO_PLAY_TYPE)[keyof typeof VIDEO_PLAY_TYPE];
export const VideoPlayTypeSchema = z.enum(VIDEO_PLAY_TYPE);

export const WORKSPACE_ACCESS_TYPES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
  S3_MANAGER: "S3_MANAGER",
} as const;
export type WorkspaceAccessType =
  (typeof WORKSPACE_ACCESS_TYPES)[keyof typeof WORKSPACE_ACCESS_TYPES];
export const WorkspaceAccessTypeSchema = z.enum(WORKSPACE_ACCESS_TYPES);

export const METRICS_INTERVAL = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
} as const;
export type MetricsInterval =
  (typeof METRICS_INTERVAL)[keyof typeof METRICS_INTERVAL];
export const MetricsIntervalSchema = z.enum(METRICS_INTERVAL);

export const PROGRAM_ACCESS_MODULES = {
  PROGRAM_CONFIG: "PROGRAM_CONFIG",
  CHAT_VIEWER: "CHAT_VIEWER",
  REGISTRATIONS: "REGISTRATIONS",
  ATTENDANCE_SYNC: "ATTENDANCE_SYNC",
  ATTENDANCE_REPORTS: "ATTENDANCE_REPORTS",
  Q_AND_A: "Q_AND_A",
  S3_MANAGER: "S3_MANAGER",
  CONF_HOST: "CONF_HOST",
  PAGES: "PAGES",
  COMMUNICATIONS: "COMMUNICATIONS",
  STREAM_VIEWER: "STREAM_VIEWER",
  JOBS: "JOBS",
  CONFERENCING: "CONFERENCING",
  ECG_REPORTS: "ECG_REPORTS",
  FORM_RESPONSES: "FORM_RESPONSES",
  HOME: "HOME",
  MANAGE: "MANAGE",
  PADLET_VIEWER: "PADLET_VIEWER",
  SUPPORT_TOOLS: "SUPPORT_TOOLS",
} as const;
export type ProgramAccessModules =
  (typeof PROGRAM_ACCESS_MODULES)[keyof typeof PROGRAM_ACCESS_MODULES];
export const ProgramAccessModulesSchema = z.enum(PROGRAM_ACCESS_MODULES);
