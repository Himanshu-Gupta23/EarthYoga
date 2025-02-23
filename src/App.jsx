import React from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Container, Box } from "@mui/material";

// Import your pages here
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Sessions from "./pages/session/Sessions";
import LoginPage from "./pages/auth/LoginPage"; // Import the LoginPage
import SignupPage from "./pages/auth/SignupPage"; // Import the SignupPage
import ProfilePage from "./pages/profile/ProfilePage";
import AdminSessionManagement from "./pages/session/admin/sessionManagement";
import UserManagement from "./pages/admin/userManagement";
import Gallery from "./pages/Portfolio";
import UploadImage from "./pages/session/UploadImage";

function App() {
  // Check if the user is logged in (e.g., token exists in localStorage)
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <div
      style={{
        backgroundImage: 'url("/images/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent dark overlay
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensures the full viewport height
        }}
      >
        <Navbar />
        <Container sx={{ marginTop: "20px" }}>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Unprotected Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/UploadImage" element={<UploadImage />} />

            {/* Protected Routes - Only accessible if logged in */}
            <Route
              path="/sessions"
              element={isLoggedIn ? <Sessions /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                isLoggedIn ? (
                  <AdminSessionManagement />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/user-management"
              element={
                isLoggedIn ? <UserManagement /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
