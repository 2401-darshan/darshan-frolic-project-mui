import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Theme
import { getDesignTokens } from './theme/Theme';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import DepartmentPage from './pages/DepartmentPage';
import InstitutePage from './pages/InstitutePage';

function App() {
  // Dark / Light Mode
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) =>
      prevMode === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>

          {/* AUTH */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* MAIN */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="event" element={<EventPage />} />
            <Route path="department" element={<DepartmentPage />} />
            <Route path="institute" element={<InstitutePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/auth/login" replace />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;