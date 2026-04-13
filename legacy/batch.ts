import type { TranslatableText } from "./common";

export interface IBatch {
  id: string;
  name: string;
  programId: string;
  description: string;
  supportedLanguages: string[];
  startTime: Date;
  endTime: Date;
  learningCenter: string | null;
  lcEligibility: Record<string, unknown> | null;
  tagQuestion: TranslatableText[] | null;
  areTagsSwitchable: boolean;
  attendanceEligibility: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag {
  id: string;
  name: string;
  supportedLanguages: string[];
  programId: string;
  batchId: string;
  enabled: boolean;
  offsetInHrs: number;
  createdAt: Date;
  updatedAt: Date;
  isNew?: boolean;
}
