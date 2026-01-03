'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
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

    return (
        <Box sx={{ height: '100%', p: 2, overflowY: 'auto' }}>
            <Box sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                overflow: 'hidden'
            }}>
                <List component="nav" sx={{ p: 0 }}>
                    {navItems.map((item) => (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton
                                selected={pathname === item.href}
                                onClick={onNavigate}
                                component={Link}
                                href={item.href}
                                sx={{
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.light',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        }
                                    },
                                    py: 1.5
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: pathname === item.href ? 'primary.main' : 'text.secondary' }}>
                                    <item.icon size={20} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: pathname === item.href ? 600 : 400,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline" sx={{ px: 2, mb: 1, display: 'block', color: 'text.secondary', fontWeight: 600 }}>
                Account
            </Typography>

            <Box sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                overflow: 'hidden'
            }}>
                <List component="nav" sx={{ p: 0 }}>
                    {secondaryItems.map((item) => (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton
                                selected={pathname === item.href}
                                onClick={onNavigate}
                                component={Link}
                                href={item.href}
                                sx={{
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        }
                                    },
                                    py: 1.5
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                    <item.icon size={20} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: pathname === item.href ? 600 : 400,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
