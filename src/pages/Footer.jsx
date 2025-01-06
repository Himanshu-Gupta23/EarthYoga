import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 0", // Adjust padding for desired height
        width: "100%",
        zIndex: 1000,
        marginTop: "auto", // Push the footer to the bottom
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ marginBottom: "5px" }}>
            Earth Yoga
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            &copy; {new Date().getFullYear()} Earth Yoga. All rights reserved.
          </Typography>
        </Box>

        {/* Social Media Links */}
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Link
            href="https://facebook.com/yogainstitute"
            target="_blank"
            sx={{ color: "#fff", fontSize: "20px" }}
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://instagram.com/yogainstitute"
            target="_blank"
            sx={{ color: "#fff", fontSize: "20px" }}
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://twitter.com/yogainstitute"
            target="_blank"
            sx={{ color: "#fff", fontSize: "20px" }}
          >
            <FaTwitter />
          </Link>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            <Link
              href="mailto:contact@yogainstitute.com"
              sx={{ color: "#fff" }}
            >
              contact@yogainstitute.com
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
