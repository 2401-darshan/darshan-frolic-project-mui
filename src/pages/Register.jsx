import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/Axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const [data, setData] = useState({
    UserName: "",
    UserPassword: "",
    EmailAddress: "",
    PhoneNumber: "",
    isAdmin: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/auth/register", data);

      setSuccess("User created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.log(err.response?.data?.message)
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#1f2937",
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 6,
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          bgcolor: '#374151',
        }}
      >
        <Typography variant="h4" fontWeight={900} color="#fff" textAlign="center">
          Create Your Account
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Stack spacing={3} mt={3}>
          <TextField
            label="UserName"
            variant="standard"
            required
            fullWidth
            sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
            onChange={(e) => setData({ ...data, UserName: e.target.value })}
          />

          <TextField
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            required
            fullWidth
            sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
            onChange={(e) => setData({ ...data, UserPassword: e.target.value })}
          />

          <TextField
            label="Email address"
            variant="standard"
            required
            fullWidth
            sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
            onChange={(e) => setData({ ...data, EmailAddress: e.target.value })}
          />

          <TextField
            label="Phone Number"
            variant="standard"
            required
            fullWidth
            sx={{ input: { color: '#fff' }, label: { color: '#9ca3af' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
            onChange={(e) => setData({ ...data, PhoneNumber: e.target.value })}
          />

          <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: 'none', bgcolor: '#1890ff', '&:hover': { bgcolor: '#096dd9' } }}>
            Register
          </Button>

          <Typography textAlign="center" color="#9ca3af">
            Already have an account?
            <Button onClick={() => navigate("/login")} sx={{ fontWeight: 600, textTransform: 'none' }}>Login</Button>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;