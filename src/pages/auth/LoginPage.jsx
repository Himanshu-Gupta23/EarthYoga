import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Box,
  Link,
} from "@mui/material";
import api from "../../api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    setError(""); // Reset error message

    try { 
      // Send the login request to the backend
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Store token and user details in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details

        // Navigate to the home page after successful login
        navigate("/home");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Log any error for debugging purposes
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600 }}
      >
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Disable button while loading
          sx={{ mt: 2 }}
        >
          {loading ? "Logging In..." : "Login"}
        </Button>
      </form>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link
            href="/signup"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;
