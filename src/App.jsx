import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import EventPage from './pages/EventPage';
import DepartmentPage from './pages/DepartmentPage';
import InstitutePage from './pages/InstitutePage';

const Placeholder = ({ title }) => <div style={{ padding: 20 }}>{title} Page coming soon!</div>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/event" element={<EventPage />} />
                        <Route path='/event/:id' element={<EventPage />} />
                        <Route path="/department" element={<DepartmentPage />} />
                        <Route path="/department/:id" element={<DepartmentPage />} />
                        <Route path="/institute" element={<InstitutePage />} />
                        <Route path='/institute/:id' element={<InstitutePage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;