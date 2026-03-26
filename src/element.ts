import type { ITableEntry, TranslatableText } from "./common";
import type { ELEMENT_TYPE, VIDEO_SOURCE_TYPE } from "./constants";

export interface IVideoV2Source {
  lang: string;
  force: string;
  drmAccount?: string;
  encryptionType: string;
  videoId: string;
  youtubeUrl: string;
  chatSecret?: string;
  type?: string;
}

export interface IQAndAContent {
  minChars: number;
  maxChars: number;
  label: TranslatableText[];
  placeholderText: TranslatableText[];
  ctaText: TranslatableText[];
  segregateByStreamLanguage?: boolean;
}

export interface IFormContent {
  form: {
    elements: {
      type: string;
      identifier: string;
      label: TranslatableText[];
      required?: boolean;
      options?: { label: TranslatableText[]; value: string }[];
    }[];
  };
}

export interface ITableContent {
  tables: {
    numRows: number;
    numColumns: number;
    schema: ITableEntry[];
  }[];
}

export interface ILangSelectContent {
  label: TranslatableText[];
  title?: TranslatableText[];
  timings?: { lang: string; dateTime: string }[];
}

export interface IRichTextV3Content {
  text: TranslatableText[];
}

export interface IGroupChatV2Content {
  label: TranslatableText[];
  placeholder: TranslatableText[];
  segregateByStreamLanguage?: boolean;
}

export interface IZoomSessionContent {
  startTime: string;
  endTime: string;
  regCloseTime: string;
  timerStartTime: string;
  timerEndTime: string;
  doorOpenTime: string;
  doorCloseTime: string;
  zoomAccountId: string;
  zoomClientId: string;
  zoomClientSecret: string;
  zoomUserAccountEmails: string[];
  showForLanguages: string[];
  label: TranslatableText[];
  ctaText: TranslatableText[];
  meetingBuffers: { lang: string; value: number }[];
  isDelayed: boolean;
  backUpZoomElementId?: string;
}

export interface IConferencingContent {
  tagId?: string;
  startTime: string;
  endTime: string;
  timerStartTime: string;
  timerEndTime: string;
  doorOpenTime: string;
  doorCloseTime: string;
  label: TranslatableText[];
  ctaText: TranslatableText[];
  isDelayed?: boolean;
  isDropOutCutOffEnabled?: boolean;
  backupPlatforms?: { value: string }[];
  [key: string]: unknown;
}

export interface ITagSelectContent {
  label: TranslatableText[];
  ctaText: TranslatableText[];
}

export interface IVideoV2Content {
  sources: IVideoV2Source[];
  resumable: boolean;
  playerSkinId?: string;
  playbackType: string;
  autoplay?: boolean;
  enableWatermarking?: boolean;
  initialOfffset?: number;
}

export interface IPadletContent {
  padlet: {
    imageUpload: boolean;
    videoUpload: boolean;
    audioUpload: boolean;
    captureImage: boolean;
    captureVideo: boolean;
    captureAudio: boolean;
    autoApproval?: boolean;
    uniqueSharings?: boolean;
    minTitleChars?: number | null;
    maxTitleChars?: number | null;
    minMessageChars?: number | null;
    maxMessageChars?: number | null;
  };
}

export interface ElementContentMap {
  [ELEMENT_TYPE.Q_AND_A]: IQAndAContent;
  [ELEMENT_TYPE.FORM]: IFormContent;
  [ELEMENT_TYPE.TABLE]: ITableContent;
  [ELEMENT_TYPE.LANG_SELECT]: ILangSelectContent;
  [ELEMENT_TYPE.RICH_TEXT_V3]: IRichTextV3Content;
  [ELEMENT_TYPE.GROUP_CHAT_V2]: IGroupChatV2Content;
  [ELEMENT_TYPE.ZOOM_SESSION]: IZoomSessionContent;
  [ELEMENT_TYPE.CONFERENCING]: IConferencingContent;
  [ELEMENT_TYPE.TAG_SELECT]: ITagSelectContent;
  [ELEMENT_TYPE.VIDEO_V2]: IVideoV2Content;
  [ELEMENT_TYPE.PADLET]: IPadletContent;
}

export type ElementContent = ElementContentMap[keyof ElementContentMap];

export interface IVideoElementContent {
  sources?: {
    type: VIDEO_SOURCE_TYPE;
    url: string;
  }[];
  playbackType?: string;
  playerSkinId?: string;
}

export interface IElement<T = ELEMENT_TYPE> {
  id: string;
  name: string;
  type: T;
  content: ElementContent;
  batchId?: string;
  programId?: string;
  updatedAt?: string;
  createdAt?: string;
  appearTime?: string | null;
  disappearTime?: string | null;
  showForTags?: string[];
  trackable?: boolean;
  enabled?: boolean;
  meta?: Record<string, unknown>;
}
