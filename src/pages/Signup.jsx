import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        sx={{
          p: { xs: 4, md: 6 },
          width: '100%',
          maxWidth: 550, // Slightly wider to accommodate Grid fields
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Button 
            startIcon={<ArrowBack />} 
            sx={{ mb: 2, p: 0, textTransform: 'none', color: 'text.secondary' }}
          >
            Back to Login
          </Button>
          <Typography variant="h4" fontWeight={900} color="#111827" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Frolic 2026 and showcase your skills.
          </Typography>
        </Box>

        {/* Form Fields */}
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                placeholder="John Doe"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="College ID"
                variant="outlined"
                placeholder="REG12345"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            placeholder="name@college.edu"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            placeholder="Create a strong password"
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

          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
            By clicking "Sign Up", you agree to our <b>Terms & Conditions</b> and <b>Privacy Policy</b>.
          </Typography>

          {/* PRIMARY SIGN UP BUTTON */}
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
            Sign Up
          </Button>

          {/* SECONDARY LOGIN BUTTON (If they already have an account) */}
          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1890ff',
              borderColor: '#1890ff',
              '&:hover': { 
                borderColor: '#096dd9',
                bgcolor: 'rgba(24, 144, 255, 0.04)' 
              },
            }}
          >
            Already have an account? Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;