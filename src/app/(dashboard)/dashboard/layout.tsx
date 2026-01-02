'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Badge,
} from '@heroui/react';
import {
    IconBook,
    IconBell,
    IconMenu2,
    IconChevronDown,
    IconSettings,
    IconLogout
} from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-black">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex h-full w-64 flex-col border-r border-default-200 bg-background z-20">
                <div className="h-16 flex items-center px-6 border-b border-default-200">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white">
                            <IconBook size={18} />
                        </div>
                        <span className="font-bold text-lg text-foreground">
                            SkillStream
                        </span>
                    </Link>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Sidebar />
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 w-64 bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col border-r border-default-200
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-16 flex items-center px-6 border-b border-default-200 justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white">
                            <IconBook size={18} />
                        </div>
                        <span className="font-bold text-lg text-foreground">
                            SkillStream
                        </span>
                    </Link>
                    <Button isIconOnly variant="light" size="sm" onPress={() => setIsSidebarOpen(false)}>
                        <IconMenu2 size={20} />
                    </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <Navbar
                    isBordered
                    maxWidth="full"
                    className="h-16 bg-background/70 backdrop-blur-md"
                    classNames={{
                        wrapper: "px-4 md:px-6"
                    }}
                >
                    <NavbarContent justify="start" className="md:hidden">
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={() => setIsSidebarOpen(true)}
                        >
                            <IconMenu2 size={24} />
                        </Button>
                    </NavbarContent>

                    <NavbarContent justify="end" className="gap-4">
                        <Badge content="" color="danger" shape="circle" size="sm">
                            <Button isIconOnly variant="light" radius="full">
                                <IconBell size={20} className="text-default-500" />
                            </Button>
                        </Badge>

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Avatar
                                        src={user?.avatar}
                                        name={user?.name}
                                        size="sm"
                                        isBordered
                                        color="primary"
                                    />
                                    <div className="hidden md:flex flex-col items-start">
                                        <span className="text-small font-medium">{user?.name}</span>
                                    </div>
                                    <IconChevronDown size={14} className="text-default-500" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                                <DropdownItem key="profile_header" className="h-14 gap-2" textValue="Signed in as">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{user?.email}</p>
                                </DropdownItem>
                                <DropdownItem
                                    key="settings"
                                    href="/profile"
                                    startContent={<IconSettings size={14} />}
                                >
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
                    </NavbarContent>
                </Navbar>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

