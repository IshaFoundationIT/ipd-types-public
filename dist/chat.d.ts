export interface IGroupChatMessage {
    id: string;
    streamLanguage: string;
    status: string;
    role: string;
    isPinned: boolean;
    message: string;
    attachment: string | null;
    by: string;
    userName: string;
    chatId: string;
    serial: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IGroupChat {
    id: string;
    name: string;
    enabled: boolean;
    creatorId: string;
    config: Record<string, unknown> | null;
    createdAt: Date;
    updatedAt: Date;
}
