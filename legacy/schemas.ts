export interface IStepMeta {
  showStepProgressBar?: boolean;
  showProgressBar?: boolean;
  [key: string]: unknown;
}

export interface IEligibilityCriteria {
  rules?: unknown;
  [key: string]: unknown;
}

export interface IJobInData {
  programName?: string;
  batchName?: string;
  elementName?: string;
  reports?: unknown[];
  data?: unknown[];
  enrollmentType?: string;
  programId?: string;
  batchId?: string;
  [key: string]: unknown;
}

export interface IJobOutData {
  processedECGReport?: Record<string, unknown>[];
  name?: string;
  [key: string]: unknown;
}
