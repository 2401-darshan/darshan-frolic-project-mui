import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, Stack, Box, InputBase, Paper,
    Avatar, Popover, Typography, Tabs, Tab, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, useTheme, Badge
} from '@mui/material';
import {
    MenuOpen, Menu, Search, Logout, Edit, Person, ReceiptLong,
    AccountBalanceWallet, HelpOutline, Settings, Lock, Comment, History,
    NotificationsNone
} from '@mui/icons-material';

const Navbar = ({ drawerWidth, open, handleDrawerToggle }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleOpenProfile = (event) => setAnchorEl(event.currentTarget);
    const handleCloseProfile = () => setAnchorEl(null);

    // Mini sidebar width (standard for Mantis/Material dashboards)
    const miniWidth = 70;

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                // --- SLIDABLE LOGIC START ---
                width: {
                    sm: `calc(100% - ${open ? drawerWidth : miniWidth}px)`
                },
                ml: {
                    sm: `${open ? drawerWidth : miniWidth}px`
                },
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                        ? theme.transitions.duration.enteringScreen
                        : theme.transitions.duration.leavingScreen,
                }),
                // --- SLIDABLE LOGIC END ---
                bgcolor: '#1f2937',
                color: '#fff',
                borderBottom: '1px solid',
                borderColor: 'rgba(255,255,255,0.05)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center" spacing={2}>

                    <IconButton
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.05)',
                            color: '#9ca3af',
                            borderRadius: '7px',
                            border: '1px solid',
                            borderColor: 'transparent',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)'
                            }
                        }}
                    >
                        {open ? <MenuOpen /> : <Menu />}
                    </IconButton>

                    <Paper
                        component="form"
                        sx={{
                            p: '2px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            width: { xs: 150, sm: 300 },
                            bgcolor: 'rgba(255,255,255,0.05)',
                            boxShadow: 'none',
                            borderRadius: '7px',
                            border: '1px solid',
                            borderColor: 'transparent',
                            '&:focus-within': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderColor: '#1890ff',
                                boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)'
                            }
                        }}
                    >
                        <Search sx={{ color: '#9ca3af', fontSize: '1.5rem', mr: 1 }} />
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: '1rem', color: '#fff' }}
                            placeholder="Search (Ctrl + K)"
                        />
                    </Paper>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px', p: 1, color: '#9ca3af', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                        <Badge badgeContent={4} color="primary">
                            <NotificationsNone />
                        </Badge>
                    </IconButton>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        onClick={handleOpenProfile}
                        sx={{ cursor: 'pointer', p: 0.5, borderRadius: '24px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                    >
                        <Avatar
                            alt="User"
                            src="./src/assets/avatar-1.jpeg"
                            sx={{ width: 34, height: 34 }}
                        />
                    </Stack>
                </Stack>

                {/* PROFILE POPOVER */}
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleCloseProfile}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: {
                            width: 320, mt: 1.5, borderRadius: 2,
                            bgcolor: '#1f2937', color: '#fff',
                            border: '1px solid', borderColor: 'rgba(255,255,255,0.1)',
                            boxShadow: '0px 8px 24px rgba(0,0,0,0.4)'
                        }
                    }}
                >
                    {/* Header */}
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar alt="User" src="./src/assets/avatar-1.jpeg" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600} color="#fff">Darshan Jakasaniya</Typography>
                                <Typography variant="body2" color="#9ca3af">Software developer</Typography>
                            </Box>
                        </Stack>
                        <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={handleLogout}><Logout fontSize="small" /></IconButton>
                    </Box>

                    {/* Tabs */}
                    <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} variant="fullWidth" sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Tab icon={<Person fontSize="small" />} iconPosition="start" label="Profile" sx={{ minHeight: 48, textTransform: 'none', color: '#9ca3af', '&.Mui-selected': { color: '#1890ff' } }} />
                        <Tab icon={<Settings fontSize="small" />} iconPosition="start" label="Setting" sx={{ minHeight: 48, textTransform: 'none', color: '#9ca3af', '&.Mui-selected': { color: '#1890ff' } }} />
                    </Tabs>

                    {/* List Content */}
                    <List sx={{ p: 1, '& .MuiListItemButton-root': { color: '#9ca3af', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }, '& .MuiListItemIcon-root': { color: '#9ca3af' } }}>
                        {tabValue === 0 ? (
                            <>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Edit fontSize="small" /></ListItemIcon><ListItemText primary="Edit Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Person fontSize="small" /></ListItemIcon><ListItemText primary="View Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon><ListItemText primary="Social Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><AccountBalanceWallet fontSize="small" /></ListItemIcon><ListItemText primary="Billing" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }} onClick={handleLogout}><ListItemIcon><Logout fontSize="small" /></ListItemIcon><ListItemText primary="Logout" /></ListItemButton>
                            </>
                        ) : (
                            <>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><HelpOutline fontSize="small" /></ListItemIcon><ListItemText primary="Support" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Person fontSize="small" /></ListItemIcon><ListItemText primary="Account Settings" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Lock fontSize="small" /></ListItemIcon><ListItemText primary="Privacy Center" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Comment fontSize="small" /></ListItemIcon><ListItemText primary="Feedback" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><History fontSize="small" /></ListItemIcon><ListItemText primary="History" /></ListItemButton>
                            </>
                        )}
                    </List>
                </Popover>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;