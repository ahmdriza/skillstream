// User Types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    headline?: string;
    bio?: string;
    createdAt: string;
}
