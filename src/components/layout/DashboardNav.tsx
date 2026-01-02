'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import {
    IconLayoutDashboard,
    IconBook,
    IconVideo,
    IconChartBar,
    IconCertificate,
    IconChevronDown,
    IconLogout,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
    { icon: IconLayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: IconBook, label: 'Courses', href: '/dashboard/courses' },
    { icon: IconVideo, label: 'Sessions', href: '/dashboard/sessions' },
    { icon: IconChartBar, label: 'Progress', href: '/dashboard/progress' },
    { icon: IconCertificate, label: 'Certificates', href: '/dashboard/certificates' },
];

export function DashboardNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <div className="flex gap-2 items-center">
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-1">
                {navItems.map((item) => (
                    <Button
                        key={item.href}
                        as={Link}
                        href={item.href}
                        variant={pathname === item.href ? 'flat' : 'light'}
                        color={pathname === item.href ? 'primary' : 'default'}
                        size="sm"
                        startContent={<item.icon size={16} />}
                        onPress={() => router.push(item.href)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light" endContent={<IconChevronDown size={14} />}>
                            Menu
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dashboard Menu">
                        {navItems.map((item) => (
                            <DropdownItem
                                key={item.href}
                                href={item.href}
                                startContent={<item.icon size={16} />}
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

            {/* User Menu */}
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer ml-2">
                        <Avatar src={user?.avatar} size="sm" isBordered color="primary" />
                        <IconChevronDown size={14} className="text-default-500" />
                    </div>
                </DropdownTrigger>

                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile_header" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{user?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="profile" startContent={<IconUser size={14} />} href="/profile">
                        Profile
                    </DropdownItem>
                    <DropdownItem key="settings" startContent={<IconSettings size={14} />} href="/profile">
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        startContent={<IconLogout size={14} />}
                        onPress={() => {
                            logout();
                            window.location.href = '/';
                        }}
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
