'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Badge
} from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    IconSearch,
    IconBell,
    IconBook,
    IconUser,
    IconSettings,
    IconLogout
} from '@tabler/icons-react';
import { useState } from "react";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (pathname.startsWith('/dashboard') || pathname.startsWith('/teacher')) {
        return null;
    }

    const navLinks = [
        { label: 'Browse', href: '/courses' },
        { label: 'My Learning', href: '/dashboard', requiresAuth: true },
        { label: 'Teach', href: '/teacher', requiresAuth: true, requiresTeacher: true },
    ].filter(link => {
        if (link.requiresAuth && !user) return false;
        if (link.requiresTeacher && user?.role !== 'teacher') return false;
        return true;
    });

    return (
        <Navbar
            isBordered
            maxWidth="xl"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-white/70 backdrop-blur-lg border-b border-default-200/50 sticky top-0 z-50 data-[menu-open=true]:bg-white"
            classNames={{
                wrapper: "px-6",
                item: "data-[active=true]:text-primary font-medium",
            }}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="cursor-pointer gap-2" onClick={() => router.push('/')}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <IconBook size={20} className="text-white" />
                    </div>
                    <p className="font-bold text-inherit text-xl tracking-tight">SkillStream</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navLinks.map((link) => (
                    <NavbarItem key={link.href} isActive={pathname === link.href}>
                        <Link
                            color={pathname === link.href ? "primary" : "foreground"}
                            href={link.href}
                            onPress={() => router.push(link.href)}
                        >
                            {link.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search courses..."
                        size="sm"
                        startContent={<IconSearch size={18} />}
                        type="search"
                    />
                </NavbarItem>

                {user ? (
                    <>
                        <NavbarItem>
                            <Badge content="" color="danger" shape="circle" size="sm">
                                <Button isIconOnly radius="full" variant="light">
                                    <IconBell size={20} />
                                </Button>
                            </Badge>
                        </NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name={user.name}
                                    size="sm"
                                    src={user.avatar}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{user.email}</p>
                                </DropdownItem>
                                <DropdownItem key="profile_link" startContent={<IconUser size={16} />} href="/profile">
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="learning" startContent={<IconBook size={16} />} href="/dashboard">
                                    My Learning
                                </DropdownItem>
                                <DropdownItem key="settings" startContent={<IconSettings size={16} />} href="/profile">
                                    Settings
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" startContent={<IconLogout size={16} />} onPress={logout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login" onPress={() => router.push('/login')}>Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat" onPress={() => router.push('/register')}>
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <NavbarMenu>
                {navLinks.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={pathname === item.href ? "primary" : "foreground"}
                            className="w-full"
                            href={item.href}
                            size="lg"
                            onPress={() => {
                                setIsMenuOpen(false);
                                router.push(item.href);
                            }}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {!user && (
                    <>
                        <NavbarMenuItem>
                            <Link className="w-full" href="/login" size="lg" onPress={() => setIsMenuOpen(false)}>Login</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link className="w-full" color="primary" href="/register" size="lg" onPress={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </NavbarMenuItem>
                    </>
                )}
            </NavbarMenu>
        </Navbar>
    );
}
