// Message Types
export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    subject: string;
    content: string;
    createdAt: string;
    isRead: boolean;
}
