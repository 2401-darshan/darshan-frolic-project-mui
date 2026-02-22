import { useState } from 'react';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const handleOpenProfile = (event) => setAnchorEl(event.currentTarget);
    const handleCloseProfile = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                width: { sm: `calc(100% - ${open ? drawerWidth : 70}px)` },
                ml: { sm: `${open ? drawerWidth : 70}px` },
                bgcolor: 'background.paper', // Pure White
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center" spacing={2}>

                    {/* 1. SLIDE / MENU TOGGLE BUTTON */}
                    <IconButton
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            bgcolor: 'grey.100', // Requested Change
                            color: 'text.secondary',
                            borderRadius: '7px',
                            border: '1px solid',
                            borderColor: 'transparent',
                            '&:hover': {
                                bgcolor: 'grey.200'
                            }
                        }}
                    >
                        {open ? <MenuOpen /> : <Menu />}
                    </IconButton>

                    {/* 2. SEARCH BAR */}
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            width: { xs: 150, sm: 300 },
                            bgcolor: 'grey.100', // Requested Change
                            boxShadow: 'none',
                            borderRadius: '7px',
                            border: '1px solid',
                            borderColor: 'transparent',
                            '&:focus-within': {
                                bgcolor: 'background.paper',
                                borderColor: 'primary.main',
                                boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)'
                            }
                        }}
                    >
                        <Search sx={{ color: 'text.secondary', fontSize: '1.5rem', mr: 1 }} />
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: '1rem', color: 'text.primary' }}
                            placeholder="Search (Ctrl + K)"
                        />
                    </Paper>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton sx={{ bgcolor: 'grey.100', borderRadius: '8px', p: 1, color: 'text.secondary', '&:hover': { bgcolor: 'grey.200' } }}>
                        <Badge badgeContent={4} color="primary">
                            <NotificationsNone />
                        </Badge>
                    </IconButton>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        onClick={handleOpenProfile}
                        sx={{ cursor: 'pointer', p: 0.5, borderRadius: '24px', '&:hover': { bgcolor: 'grey.100' } }}
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
                            bgcolor: 'background.paper',
                            border: '1px solid', borderColor: 'divider',
                            boxShadow: '0px 8px 24px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    {/* Header */}
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar alt="User" src="./src/assets/avatar-1.jpeg" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600} color="text.primary">Darshan Jakasaniya</Typography>
                                <Typography variant="body2" color="text.secondary">Software developer</Typography>
                            </Box>
                        </Stack>
                        <IconButton size="small" sx={{ color: 'text.secondary' }}><Logout fontSize="small" /></IconButton>
                    </Box>

                    {/* Tabs */}
                    <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} variant="fullWidth" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tab icon={<Person fontSize="small" />} iconPosition="start" label="Profile" sx={{ minHeight: 48, textTransform: 'none' }} />
                        <Tab icon={<Settings fontSize="small" />} iconPosition="start" label="Setting" sx={{ minHeight: 48, textTransform: 'none' }} />
                    </Tabs>

                    {/* List Content */}
                    <List sx={{ p: 1 }}>
                        {tabValue === 0 ? (
                            <>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Edit fontSize="small" /></ListItemIcon><ListItemText primary="Edit Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Person fontSize="small" /></ListItemIcon><ListItemText primary="View Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon><ListItemText primary="Social Profile" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><AccountBalanceWallet fontSize="small" /></ListItemIcon><ListItemText primary="Billing" /></ListItemButton>
                                <ListItemButton sx={{ borderRadius: 1 }}><ListItemIcon><Logout fontSize="small" /></ListItemIcon><ListItemText primary="Logout" /></ListItemButton>
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