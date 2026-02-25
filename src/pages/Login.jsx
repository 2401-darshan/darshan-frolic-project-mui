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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#eef2f6', // Your dashboard background color
                p: 2,
            }}
        >
            <Paper
                elevation={0}
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

                {/* Form Fields */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        placeholder="name@example.com"
                        InputLabelProps={{ shrink: true }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Box>
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="Enter password"
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
                        variant="contained"
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
                        Login
                    </Button>
                </Stack>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Link href="#" color="primary" underline="hover" fontWeight={700}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;