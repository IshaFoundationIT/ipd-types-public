import type { TranslatableText } from "./common";
import type { IStepMeta, IEligibilityCriteria } from "./schemas";
export interface IStep {
    id: string;
    name: string;
    programId: string;
    batchId: string;
    startTime: Date;
    endTime: Date;
    isFirst: boolean;
    nextStep: string | null;
    meta: IStepMeta | null;
    elements: string[];
    ctaText: TranslatableText[] | null;
    eligibilityCriteria: IEligibilityCriteria | null;
    icon: string;
    index: string;
    canRevisit: boolean;
    legendLabel: TranslatableText[];
    heading: TranslatableText[];
    createdAt: Date;
    updatedAt: Date;
}
