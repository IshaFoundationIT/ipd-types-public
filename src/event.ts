export interface IEvent {
  id: string;
  elementId: string;
  type: string;
  programId: string;
  batchId: string;
  registrationId: string;
  ssoId?: string | null;
  inTime?: Date | null;
  outTime?: Date | null;
  ecg?: string;
  streamLanguage?: string | null;
  createdAt: Date;
  updatedAt: Date;
  data?: Record<string, unknown> | null;
  tag?: string | null;
}

export interface INewEvent {
  csvFile: FileList | null;
  creationMode: string;
  writeMode: string;
  eventType: string;
  sessionId?: string;
  stepId?: string;
  elementId?: string;
  inTime?: Date;
  outTime?: Date;
  eventTrigger: string;
  ecg?: string;
  data?: Record<string, unknown>;
}
