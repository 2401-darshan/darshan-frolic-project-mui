import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; // Import your extra component

const drawerWidth = 260;

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      <Navbar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          width: `calc(100% - ${open ? drawerWidth : 70}px)`,
          pt: '60px'
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;