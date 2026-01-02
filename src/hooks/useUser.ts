'use client';

import { useAuth } from './useAuth';

export function useUser() {
    const { user, isLoading } = useAuth();

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isTeacher: user?.role === 'teacher',
        isAdmin: user?.role === 'admin',
    };
}
