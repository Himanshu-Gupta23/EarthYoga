import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

// Styled Navbar component
const Navbar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(12px)",
  boxShadow: "none",
  zIndex: 1000,
  padding: "10px 20px",
}));

const ResponsiveNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For user menu
  const [userName, setUserName] = useState(null); // Initially null to handle if the user is logged in or not
  const [role, setRole] = useState(null); // Store user role
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For programmatic navigation

  // Check localStorage for userName and role when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Retrieve user object from localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse the stored JSON object
      setUserName(parsedUser.name); // Set userName if found in parsed object
      console.log("User", parsedUser);
      setRole(parsedUser.role); // Set role if found in parsed object
    }
    setLoading(false); // Set loading to false after checking the user
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Drawer toggle handler
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout handler
  const handleLogout = () => {
    setUserName(null); // Clear user state
    localStorage.removeItem("authToken"); // Clear auth token or session
    localStorage.removeItem("user"); // Clear the userName and role from localStorage
    setAnchorEl(null); // Close the menu
    navigate("/login"); // Redirect to login
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while the user data is being fetched
  }

  return (
    <>
      <Navbar>
        <Toolbar>
          {/* Hamburger Menu for Small Screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>

          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <img
              src="./logo.svg"
              alt="logo"
              style={{
                height: "auto",
                maxHeight: "5vh",
                objectFit: "contain",
                marginRight: "10px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              }}
            >
              Earth Yoga
            </Typography>
          </Box>

          {/* Buttons for Larger Screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center", // Center links for large screens
              flexGrow: 1,
            }}
          >
            <Button color="inherit" component={Link} to="/services">
              Explore Services
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
            <Button color="inherit" component={Link} to="/sessions">
              Classes
            </Button>
            <Button color="inherit" component={Link} to="/gallery">
              Gallery
            </Button>
            {/* Admin Links visible only if the user is an admin */}
            {role === "admin" && (
              <>
                <Button color="inherit" component={Link} to="/admin">
                  Admin Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/user-management">
                  User Management
                </Button>
                <Button color="inherit" component={Link} to="/uploadImage">
                  Upload images
                </Button>
              </>
            )}
          </Box>

          {/* User Authentication */}
          {userName ? (
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {userName}
              </Typography>
              <Avatar
                onClick={handleMenuClick}
                sx={{ cursor: "pointer", backgroundColor: "#f50057" }}
              >
                {userName[0]}
              </Avatar>
              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MuiMenu>
            </Box>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </Navbar>

      {/* Drawer for Small Screens */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* User Info for Small Screens */}
          {userName ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Avatar sx={{ backgroundColor: "#f50057", marginRight: "8px" }}>
                {userName[0]}
              </Avatar>
              <Typography variant="body1">{userName}</Typography>
            </Box>
          ) : (
            <Box sx={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ marginRight: "8px" }}
              >
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Box>
          )}

          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/services"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Explore Services" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/about"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/contact"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/sessions"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Classes" />
              </ListItemButton>
            </ListItem>
            {/* Admin Links visible only if the user is an admin */}
            {role === "admin" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/admin"
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Admin Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/user-management"
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="User Management" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>

          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveNavbar;
