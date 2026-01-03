'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Menu, MenuItem, Avatar, Box, IconButton, ListItemIcon, ListItemText } from "@mui/material";
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

    const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <div className="flex gap-2 items-center">
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-1">
                {navItems.map((item) => (
                    <Button
                        key={item.href}
                        component={Link}
                        href={item.href}
                        variant={pathname === item.href ? 'soft' as any : 'text'} // MUI doesn't have soft, use text or contained with styles.
                        // Actually just use contained/text.
                        // I'll simulate soft style if active
                        sx={{
                            color: pathname === item.href ? 'primary.main' : 'text.secondary',
                            bgcolor: pathname === item.href ? 'primary.light' : 'transparent',
                            '&:hover': {
                                bgcolor: pathname === item.href ? 'primary.light' : 'action.hover',
                            },
                            textTransform: 'none',
                        }}
                        startIcon={<item.icon size={16} />}
                        onClick={() => router.push(item.href)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
                <Button
                    onClick={(e) => setMobileAnchorEl(e.currentTarget)}
                    endIcon={<IconChevronDown size={14} />}
                    color="inherit"
                >
                    Menu
                </Button>
                <Menu
                    anchorEl={mobileAnchorEl}
                    open={Boolean(mobileAnchorEl)}
                    onClose={() => setMobileAnchorEl(null)}
                >
                    {navItems.map((item) => (
                        <MenuItem
                            key={item.href}
                            onClick={() => { router.push(item.href); setMobileAnchorEl(null); }}
                        >
                            <ListItemIcon>
                                <item.icon size={16} />
                            </ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            {/* User Menu */}
            <Box ml={2}>
                <Box
                    onClick={(e) => setUserAnchorEl(e.currentTarget)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                >
                    <Avatar src={user?.avatar} sx={{ width: 32, height: 32, border: '2px solid', borderColor: 'primary.main' }} />
                    <IconChevronDown size={14} className="text-default-500" />
                </Box>

                <Menu
                    anchorEl={userAnchorEl}
                    open={Boolean(userAnchorEl)}
                    onClose={() => setUserAnchorEl(null)}
                >
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle2">Signed in as</Typography>
                        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={() => { router.push('/profile'); setUserAnchorEl(null); }}>
                        <ListItemIcon><IconUser size={16} /></ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => { router.push('/profile'); setUserAnchorEl(null); }}>
                        <ListItemIcon><IconSettings size={16} /></ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onClick={() => {
                            logout();
                            window.location.href = '/';
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <ListItemIcon sx={{ color: 'error.main' }}><IconLogout size={16} /></ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );
}

// Add imports ref
import { Divider, Typography } from "@mui/material";
