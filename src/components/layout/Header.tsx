'use client';

import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Button,
    Container,
    Menu,
    MenuItem,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Badge,
    InputBase
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    IconSearch,
    IconBell,
    IconBook,
    IconUser,
    IconSettings,
    IconLogout,
    IconMenu2
} from '@tabler/icons-react';
import Link from 'next/link';

// Styled Search Component
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                    <IconBook size={20} />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    SkillStream
                </Typography>
            </Box>
            <List>
                {navLinks.map((item) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(item.href)}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {!user && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push('/login')}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push('/register')}>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Mobile Menu Icon */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <IconMenu2 />
                        </IconButton>

                        {/* Logo - Desktop */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', mr: 2, cursor: 'pointer' }} onClick={() => router.push('/')}>
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mr-2">
                                <IconBook size={20} className="text-white" />
                            </div>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '-0.025em',
                                    color: 'text.primary',
                                }}
                            >
                                SkillStream
                            </Typography>
                        </Box>

                        {/* Logo - Mobile */}
                        <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexGrow: 1, alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/')}>
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mr-2">
                                <IconBook size={18} className="text-white" />
                            </div>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    color: 'text.primary',
                                }}
                            >
                                SkillStream
                            </Typography>
                        </Box>

                        {/* Desktop Nav Links */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', gap: 2 }}>
                            {navLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    onClick={() => router.push(link.href)}
                                    sx={{
                                        my: 2,
                                        color: pathname === link.href ? 'primary.main' : 'text.primary',
                                        display: 'block',
                                        fontWeight: pathname === link.href ? 600 : 400,
                                        textTransform: 'none',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Right Actions */}
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <IconSearch size={18} />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search courses..."
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Box>

                            {user ? (
                                <>
                                    <IconButton size="large" aria-label="show 4 new notifications" color="inherit">
                                        <Badge badgeContent={4} color="error">
                                            <IconBell size={20} />
                                        </Badge>
                                    </IconButton>
                                    <Box sx={{ ml: 1 }}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user.name} src={user.avatar} sx={{ width: 32, height: 32 }} />
                                        </IconButton>
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
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={handleCloseUserMenu} disableRipple>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle2">Signed in as</Typography>
                                                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                                </Box>
                                            </MenuItem>
                                            <MenuItem onClick={() => { router.push('/profile'); handleCloseUserMenu(); }}>
                                                <IconUser size={16} style={{ marginRight: 8 }} /> Profile
                                            </MenuItem>
                                            <MenuItem onClick={() => { router.push('/dashboard'); handleCloseUserMenu(); }}>
                                                <IconBook size={16} style={{ marginRight: 8 }} /> My Learning
                                            </MenuItem>
                                            <MenuItem onClick={() => { router.push('/profile'); handleCloseUserMenu(); }}>
                                                <IconSettings size={16} style={{ marginRight: 8 }} /> Settings
                                            </MenuItem>
                                            <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }} sx={{ color: 'error.main' }}>
                                                <IconLogout size={16} style={{ marginRight: 8 }} /> Log Out
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button color="inherit" onClick={() => router.push('/login')} sx={{ display: { xs: 'none', lg: 'block' } }}>
                                        Login
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => router.push('/register')} disableElevation sx={{ borderRadius: 2 }}>
                                        Sign Up
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}
