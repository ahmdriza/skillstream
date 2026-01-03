'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconHome, IconSearch } from '@tabler/icons-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="text-center px-4">
                <h1 className="text-[120px] font-black text-primary/20 leading-none">
                    404
                </h1>
                <h2 className="text-4xl font-bold mb-4">
                    Page Not Found
                </h2>
                <p className="text-default-500 mb-8 max-w-md mx-auto">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex justify-center gap-4">
                    <Button
                        as={Link}
                        href="/"
                        startContent={<IconHome size={18} />}
                        size="lg"
                        color="primary"
                    >
                        Go Home
                    </Button>
                    <Button
                        as={Link}
                        href="/courses"
                        variant="flat"
                        startContent={<IconSearch size={18} />}
                        size="lg"
                        color="primary"
                    >
                        Browse Courses
                    </Button>
                </div>
            </div>
        </div>
    );
}
