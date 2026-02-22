import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Toolbar, Typography, Box, Divider, Tooltip
} from '@mui/material';
import {
    Dashboard, People, BarChart, Settings, Logout,
    Login, PersonAdd, Event, Business, AccountBalance
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

const menuGroups = [
    {
        subheader: 'NAVIGATION',
        items: [{ text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' }]
    },
    {
        subheader: 'AUTHENTICATION',
        items: [
            { text: 'Login', icon: <Login />, path: '/login' },
            { text: 'Signup', icon: <PersonAdd />, path: '/signup' },
        ]
    },
    {
        subheader: 'PAGES',
        items: [
            { text: 'Event', icon: <Event />, path: '/event' },
            { text: 'Department', icon: <Business />, path: '/department' },
            { text: 'Institute', icon: <AccountBalance />, path: '/institute' },
        ]
    }
];

const Sidebar = ({ drawerWidth, open }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const miniWidth = 70;

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? drawerWidth : miniWidth,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : miniWidth,
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                    transition: (theme) => theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    bgcolor: '#111827',
                    color: '#9ca3af',
                    borderRight: 'none',
                },
            }}
        >
            <Toolbar sx={{ px: open ? 3 : 2, justifyContent: open ? 'flex-start' : 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', display: open ? 'block' : 'none' }}>
                    FROLIC
                </Typography>
                {!open && <Typography variant="h4" sx={{ fontWeight: 800, color: '#1890ff' }}>F</Typography>}
            </Toolbar>

            <Box sx={{ flexGrow: 1, mt: 2 }}>
                {menuGroups.map((group) => (
                    <Box key={group.subheader} sx={{ mb: 2 }}>
                        {open && (
                            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 700, pl: 3, mb: 1, display: 'block' }}>
                                {group.subheader}
                            </Typography>
                        )}
                        <List sx={{ px: 1.5 }}>
                            {group.items.map((item) => {
                                const active = location.pathname === item.path;
                                return (
                                    <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                        <Tooltip title={!open ? item.text : ""} placement="right">
                                            <ListItemButton
                                                onClick={() => navigate(item.path)}
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
                                                    borderRadius: '8px',
                                                    bgcolor: active ? 'rgba(24, 144, 255, 0.12)' : 'transparent',
                                                    color: active ? '#1890ff' : 'inherit',
                                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                                                }}
                                            >
                                                <ListItemIcon sx={{
                                                    minWidth: 0,
                                                    mr: open ? 2 : 'auto',
                                                    justifyContent: 'center',
                                                    color: active ? '#1890ff' : '#9ca3af'
                                                }}>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{ opacity: open ? 1 : 0, '& .MuiTypography-root': { fontWeight: active ? 600 : 400, fontSize: '0.875rem' } }}
                                                />
                                            </ListItemButton>
                                        </Tooltip>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            <Box sx={{ p: 1.5, pb: 2 }}>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 1 }} />
                <ListItemButton onClick={() => navigate('/')} sx={{ borderRadius: '8px', justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: '#9ca3af' }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;