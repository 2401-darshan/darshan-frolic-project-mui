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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      const response = await api.post("/auth/register", data);

      alert("User Registered Successfully!");

      navigate("/login");

    } catch (err) {
      console.log(err.response?.data?.message)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#eef2f6",
        p: 2,
      }}
    >
      <Paper


        sx={{
          p: 6,
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight={900}>
          Create Your Account
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Stack spacing={3} mt={3}>
          <TextField
            label="User Name"
            required
            fullWidth
            onChange={(e) => setData({ ...data, UserName: e.target.value })}
          />

          <TextField
            label="UserPassword"
            type={showPassword ? "text" : "password"}
            required
            fullWidth
            onChange={(e) => setData({ ...data, UserPassword: e.target.value })}
          />

          <TextField
            label="Email"
            required
            fullWidth
            onChange={(e) => setData({ ...data, EmailAddress: e.target.value })}
          />

          <TextField
            label="Phone Number"
            required
            fullWidth
            onChange={(e) => setData({ ...data, PhoneNumber: e.target.value })}
          />

          <Button type="submit" variant="contained" size="large" >
            Register
          </Button>

          <Typography textAlign="center">
            Already have an account?
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;