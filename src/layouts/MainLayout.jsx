import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const drawerWidth = 260;
  const miniWidth = 70;

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar open={open} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} drawerWidth={drawerWidth} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          // Automatically inherits #0B203F from theme background.default
          backgroundColor: 'background.default',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0, 
          width: { sm: `calc(100% - ${open ? drawerWidth : miniWidth}px)` },
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;