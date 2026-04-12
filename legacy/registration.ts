export interface IRegistration {
  id: string;
  ssoId: string;
  streamLanguage: string | null;
  isCompleted: boolean | null;
  programId: string;
  batchId: string;
  createdAt: Date;
  updatedAt: Date;
  currentStep: string | null;
  email: string | null;
  accessToken: string | null;
  channel: string | null;
  source: string | null;
  canAccessLC: boolean | null;
  isLearningCenter: boolean | null;
  tag: string;
  meta?: Record<string, unknown>;
  enrollmentType: "PARTICIPANT" | "VOLUNTEER";
}
