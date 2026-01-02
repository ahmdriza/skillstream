'use client';

import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </HeroUIProvider>
    );
}
