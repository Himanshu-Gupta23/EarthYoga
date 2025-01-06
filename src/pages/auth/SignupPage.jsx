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
// import axios from "axios"; // To make API requests
import api from "../../api";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name field for signup
  const [error, setError] = useState(""); // For handling errors
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    setError(""); // Reset error message

    try {
      // Send the signup request to the backend
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Assuming the response contains the token
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage

      // After successful signup, navigate to the home page
      navigate("/home");
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
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
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
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
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            href="/login"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            Log In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignupPage;
