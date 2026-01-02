'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import usersData from '@/data/users.json';
import type { User, UserRole } from '@/types/user';

// Extended user type with password for demo auth
interface AuthUser extends User {
    password?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for saved session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('skillstream_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('skillstream_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = usersData.users as AuthUser[];
        const foundUser = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (foundUser) {
            // Remove password from user object before storing
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword as User);
            localStorage.setItem('skillstream_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('skillstream_user');
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        role: UserRole
    ): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = usersData.users as AuthUser[];
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            return { success: false, error: 'Email already exists' };
        }

        // In a real app, this would be a server request
        // For demo, we just create a user in memory
        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role,
            createdAt: new Date().toISOString().split('T')[0],
        };

        setUser(newUser);
        localStorage.setItem('skillstream_user', JSON.stringify(newUser));
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
