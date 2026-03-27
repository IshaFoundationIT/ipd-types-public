import type { IEligibilityCriteria } from "./schemas";
export interface IAttendanceSyncPayload {
    batch: string;
    target: string;
    programId: string;
    eligibilityCriteria: IEligibilityCriteria | null;
}
export interface IIPRSAttendanceSyncPayload extends IAttendanceSyncPayload {
    ipdStatus: string;
    attType: string;
}
export interface IIshangamAttendanceSyncPayload extends IAttendanceSyncPayload {
    ishangamProgramType: string;
    session: string;
    programStartDate: string;
}
export type IAttendanceSyncPayloadCheck<THISType, THATType, Target> = Target extends "ISHANGAM" ? THISType : THATType;
