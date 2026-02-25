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
    Alert, // Added for feedback
    CircularProgress // Added for loading state
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    // 1. Form and UI State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://resback.sampaarsh.cloud/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
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
                component="form" // Change to form for enter-key submission
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
                {/* Header */}
                <Box sx={{ mb: 5, textAlign: 'left' }}>
                    <Typography variant="h4" fontWeight={900} color="#111827" gutterBottom>
                        Hi, Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Login to access your Frolic 2026 Dashboard.
                    </Typography>
                </Box>

                {/* Error Alert */}
                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="Email Address"
                        variant="outlined"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Box>
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                        type="submit" // Triggers handleLogin
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
                        <Link href="/signup" color="primary" underline="hover" fontWeight={700}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;