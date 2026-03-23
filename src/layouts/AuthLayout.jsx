import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

const AuthLayout = () => {
    return (
        <>
            <CssBaseline />
            <Outlet />
        </>
    )
};

export default AuthLayout;