export interface ITranslatableString {
    lang: string;
    value: string;
}
export type TranslatableText = {
    lang: string;
    text: string;
};
export type NumberPerLang = {
    lang: string;
    value: number;
};
export type CreatePayload<T extends {
    id: unknown;
    createdAt: unknown;
    updatedAt: unknown;
}> = Omit<T, "id" | "createdAt" | "updatedAt">;
export type UpdatePayload<T extends {
    id: unknown;
}> = Pick<T, "id"> & Partial<Omit<T, "id">>;
export interface IAPIResponse<ResponseData = unknown> {
    status: string;
    payload: ResponseData;
    message: string;
}
export interface ListAPIResponse<T = unknown> extends IAPIResponse<{
    rows: T[];
    count: number;
}> {
}
export interface PaginationModel {
    page: number;
    pageSize: number;
}
export interface RowsState extends PaginationModel {
    loading?: boolean;
}
export type IPaginationModel = PaginationModel;
export interface SortOptions {
    sortBy?: SortField;
    sortOrder?: SortOrder;
}
export type SortField = "name" | "createdAt" | "updatedAt";
export type SortOrder = "asc" | "desc";
export interface StepSortOptions {
    elementsSortBy: SortField;
    elementsSortOrder: SortOrder;
    sessionsSortBy: SortField;
    sessionsSortOrder: SortOrder;
}
export interface ITableEntry {
    x: number;
    y: number;
    type: string;
    value: string | Date;
    format: string;
    isPinned: boolean;
    className: string;
}
export interface IRichTextV3 {
    lang: string;
    text: string;
}
export interface IOffsetTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export interface IVideoOTP {
    otp: string;
    playbackInfo: string;
}
export interface IShakaPlayerControl {
    enabled: boolean;
    name: string;
}
