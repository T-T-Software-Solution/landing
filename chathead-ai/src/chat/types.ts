import type { Conversation } from "@ant-design/x/es/conversations/interface";

export type AgentUserMessage = {
    conversationKey: Conversation['key'];
    type: 'local';
    content: string;
    createdAt?: Date | null;
};

export type AgentAIMessage = {
    conversationKey: Conversation['key'];
    type: 'ai';
    content?: string;
    createdAt?: Date | null;
    list?: (
        | {
            conversationKey: Conversation['key'];
            type: 'text';
            content: string;
            createdAt?: Date | null;
        }
        | {
            conversationKey: Conversation['key'];
            type: 'suggestion';
            content: string[];
            createdAt?: Date | null;
        }
    )[];
};

export type AgentMessage = AgentUserMessage | AgentAIMessage;

export type BubbleMessage = {
    conkey: Conversation['key'];
    role: string;
    created?: Date | null;
};

export interface AgentConfiguration {
    agentAvatarImageSrc?: string;
    agentName?: string;
    userAvatarImageSrc?: string;
    userName?: string;
    onFetchAnswer: (question: string) => Promise<{ answer: string, error?: Error }>;
    language: string;
}