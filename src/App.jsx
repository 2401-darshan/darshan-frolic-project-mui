import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

import EventPage from './pages/EventPage';
import DepartmentPage from './pages/DepartmentPage';
import InstitutePage from './pages/InstitutePage';

const Placeholder = ({ title }) => <div style={{ padding: 20 }}>{title} Page coming soon!</div>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/event" element={<EventPage />} />
                    <Route path="/department" element={<DepartmentPage />} />
                    <Route path="/institute" element={<InstitutePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;