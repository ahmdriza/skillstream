'use client';

import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm z-50">
            <Spinner size="lg" color="primary" />
            <p className="text-default-500 font-medium animate-pulse">Loading experience...</p>
        </div>
    );
}
