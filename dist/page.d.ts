export interface IPage {
    id: string;
    name: string;
    isAvailable: boolean;
    slug: string;
    elements: string[];
    sessions: string[];
    config: {
        supportedLanguages?: string[];
        enableTracking?: boolean;
    };
    startTime: Date;
    endTime: Date;
    createdAt: string | Date;
    updatedAt: string | Date;
}
