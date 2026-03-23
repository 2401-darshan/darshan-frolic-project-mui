import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    Stack,
    IconButton,
    InputAdornment,
    Alert,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../Api/Axios';



const Login = () => {
    const [data, setData] = useState({
        EmailAddress: "",
        UserPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = {
                EmailAddress: data.EmailAddress.trim(),
                UserPassword: data.UserPassword
            };
            const response = await api.post('/auth/login', payload);
            localStorage.setItem("token", response.data.token);
            setSuccess("User logged in successfully! Redirecting...");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#1f2937',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                component="form"
                onSubmit={handleLogin}
                sx={{
                    p: { xs: 4, md: 6 },
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 4,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.1)',
                    bgcolor: '#374151',
                }}
            >
                <Box sx={{ mb: 5, textAlign: 'left' }}>
                    <Typography variant="h4" fontWeight={900} color="#fff" gutterBottom>
                        Hi, Welcome Back
                    </Typography>
                    <Typography variant="body1" color="#d1d5db">
                        Login to access your Frolic 2026 Dashboard.
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{success}</Alert>}

                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="Email Address"
                        variant="standard"
                        sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
                        onChange={(e) => setData({ ...data, EmailAddress: e.target.value })}
                    />

                    <Box>
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            variant="standard"
                            sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
                            onChange={(e) => setData({ ...data, UserPassword: e.target.value })}
                        />
                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Link href="#" variant="caption" color="primary" underline="hover" fontWeight={600}>
                                Forgot Password?
                            </Link>
                        </Box>
                    </Box>

                    <FormControlLabel
                        sx={{ color: '#fff' }}
                        control={<Checkbox defaultChecked size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&.Mui-checked': { color: '#1890ff' } }} />}
                        label={<Typography variant="body2">Keep me logged in</Typography>}
                    />

                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            bgcolor: '#1890ff',
                            boxShadow: '0 8px 16px rgba(24, 144, 255, 0.24)',
                            '&:hover': { bgcolor: '#096dd9' },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </Stack>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="#9ca3af">
                        Don't have an account?{' '}
                        <Button to="/register" color="primary" sx={{ textTransform: 'none', fontWeight: 600 }} onClick={() => navigate('/register')}>
                            Sign up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;