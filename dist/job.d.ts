import type { IJobInData, IJobOutData } from "./schemas";
export interface IJob {
    id: string;
    inData: IJobInData;
    outData: IJobOutData | null;
    by: string | null;
    status: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}
