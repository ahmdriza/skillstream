'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider, Listbox, ListboxItem } from '@heroui/react';
import {
    IconLayoutDashboard,
    IconBook,
    IconVideo,
    IconChartBar,
    IconCertificate,
    IconMessage,
    IconSettings,
} from '@tabler/icons-react';

interface SidebarProps {
    onNavigate?: () => void;
}

const navItems = [
    { icon: IconLayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: IconBook, label: 'My Courses', href: '/dashboard/courses' },
    { icon: IconVideo, label: 'Live Sessions', href: '/dashboard/sessions' },
    { icon: IconChartBar, label: 'Progress', href: '/dashboard/progress' },
    { icon: IconCertificate, label: 'Certificates', href: '/dashboard/certificates' },
];

const secondaryItems = [
    { icon: IconMessage, label: 'Messages', href: '/dashboard/messages' },
    { icon: IconSettings, label: 'Settings', href: '/profile' },
];

export function Sidebar({ onNavigate }: SidebarProps) {
    const pathname = usePathname();

    const IconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
        <div className={`flex items-center rounded-small justify-center w-7 h-7 ${className || ""}`}>
            {children}
        </div>
    );

    return (
        <div className="h-full p-4 overflow-y-auto">
            <Listbox
                aria-label="Dashboard Navigation"
                variant="flat"
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
                itemClasses={{
                    base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
            >
                {navItems.map((item) => (
                    <ListboxItem
                        key={item.href}
                        href={item.href}
                        onPress={onNavigate}
                        startContent={
                            <IconWrapper className="bg-primary/10 text-primary">
                                <item.icon size={20} />
                            </IconWrapper>
                        }
                        className={pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-default-500"}
                    >
                        <Link href={item.href} className="w-full h-full flex items-center">
                            {item.label}
                        </Link>
                    </ListboxItem>
                ))}
            </Listbox>

            <Divider className="my-4" />

            <div className="px-2 mb-2 text-xs font-semibold text-default-400 uppercase">
                Account
            </div>

            <Listbox
                aria-label="Account Settings"
                variant="flat"
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
            >
                {secondaryItems.map((item) => (
                    <ListboxItem
                        key={item.href}
                        href={item.href}
                        onPress={onNavigate}
                        startContent={
                            <IconWrapper className="bg-warning/10 text-warning">
                                <item.icon size={20} />
                            </IconWrapper>
                        }
                        className={pathname === item.href ? "bg-primary/20 text-primary font-medium" : "text-default-500"}
                    >
                        <Link href={item.href} className="w-full h-full flex items-center">
                            {item.label}
                        </Link>
                    </ListboxItem>
                ))}
            </Listbox>
        </div>
    );
}
