import type { TranslatableText } from "./common";
import type { IEligibilityCriteria } from "./schemas";

export interface ISession {
  id: string;
  programId: string;
  batchId: string;
  elements: string[];
  name: string;
  label: TranslatableText[];
  ctaText: TranslatableText[];
  appearTime: Date | string | null;
  disappearTime: Date | string | null;
  startTime: Date;
  timerStartTime: Date;
  timerEndTime: Date;
  doorOpenTime: Date;
  doorCloseTime: Date;
  endTime: Date;
  eligibilityCriteria: IEligibilityCriteria | null;
  lapseCriteria: {
    fromIndex: number;
    toIndex: number;
    lapseTime: number;
    targetVideoElementId: string;
  } | null;
  meta: {
    showForLanguages: string[];
    delayedProps?: {
      targetVideoElementId: string;
      missingStartIndex: number;
      missingEndIndex: number;
      minMissingMinutes: number;
      maxMissingMinutes: number;
      videoOffset: number;
    };
  };
  showForTags: string[];
  meetingAllocationEnabled?: boolean;
  youtubeUrl?: string | null;
  meetingRooms?: Array<{
    id?: string;
    label: string | null;
    zoomUrl: string;
    capacity: number;
    priority: number;
    isActive: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
