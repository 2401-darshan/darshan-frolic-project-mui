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

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                EmailAddress: data.EmailAddress.trim(),
                UserPassword: data.UserPassword
            };
            const response = await api.post('/auth/login', payload);
            localStorage.setItem("token", "true");
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
        } finally {
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
                bgcolor: '#eef2f6',
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
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                }}
            >
                <Box sx={{ mb: 5, textAlign: 'left' }}>
                    <Typography variant="h4" fontWeight={900} color="#111827" gutterBottom>
                        Hi, Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Login to access your Frolic 2026 Dashboard.
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="EmailAddress"
                        variant="outlined"
                        onChange={(e) => setData({ ...data, EmailAddress: e.target.value })}
                    />

                    <Box>
                        <TextField
                            fullWidth
                            required
                            label="UserPassword"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            onChange={(e) => setData({ ...data, UserPassword: e.target.value })}
                        />
                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Link href="#" variant="caption" color="primary" underline="hover" fontWeight={600}>
                                Forgot Password?
                            </Link>
                        </Box>
                    </Box>

                    <FormControlLabel
                        control={<Checkbox defaultChecked size="small" />}
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
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Button to="/signup" color="primary" sx={{ textTransform: 'none', fontWeight: 600 }} onClick={() => navigate('/signup')}>
                            Sign up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;