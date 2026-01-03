'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Typography,
    Divider,
    ListItemIcon,
    Drawer
} from '@mui/material';
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
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-black overflow-hidden">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex h-full w-64 flex-col border-r border-gray-200 bg-white z-20">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white">
                            <IconBook size={18} />
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                            SkillStream
                        </span>
                    </Link>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Sidebar />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 256 },
                }}
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white">
                            <IconBook size={18} />
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                            SkillStream
                        </span>
                    </Link>
                    <IconButton size="small" onClick={() => setIsSidebarOpen(false)}>
                        <IconMenu2 size={20} />
                    </IconButton>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
                </div>
            </Drawer>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
                        {/* Mobile Menu Toggle */}
                        <Box sx={{ display: { md: 'none' } }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <IconMenu2 size={24} />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton size="large" color="inherit">
                                <Badge color="error" variant="dot">
                                    <IconBell size={20} />
                                </Badge>
                            </IconButton>

                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleOpenUserMenu}>
                                <Avatar
                                    src={user?.avatar}
                                    alt={user?.name}
                                    sx={{ width: 32, height: 32, border: '2px solid', borderColor: 'primary.main' }}
                                />
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', ml: 1, alignItems: 'flex-start' }}>
                                    <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>{user?.name}</Typography>
                                </Box>
                                <IconChevronDown size={14} style={{ marginLeft: 4, opacity: 0.5 }} />
                            </Box>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem disabled>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="caption" color="text.secondary">Signed in as</Typography>
                                        <Typography variant="subtitle2">{user?.email}</Typography>
                                    </Box>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <ListItemIcon><IconSettings size={18} /></ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }} sx={{ color: 'error.main' }}>
                                    <ListItemIcon sx={{ color: 'error.main' }}><IconLogout size={18} /></ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
