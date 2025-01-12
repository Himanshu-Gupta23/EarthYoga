import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import api from "../api";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Optional loading state

  useEffect(() => {
    api
      .get(`/contact`)
      .then((response) => {
        setContactInfo(response.data); // Corrected: setContactInfo instead of setAboutData
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Message from ${name} sent!`);
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Contact Us</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: "20px", marginTop: "20px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" type="submit">
          Send Message
        </Button>
      </form>

      {loading ? (
        <Typography variant="body1" sx={{ marginTop: "20px" }}>
          Loading contact information...
        </Typography>
      ) : (
        contactInfo && (
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h6">Contact Information</Typography>
            <Typography variant="body1">
              Address: {contactInfo.address}
            </Typography>
            <Typography variant="body1">Phone: {contactInfo.phone}</Typography>
            <Typography variant="body1">Email: {contactInfo.email}</Typography>

            <Typography variant="body1" sx={{ marginTop: "20px" }}>
              Follow us:
              <Box sx={{ display: "inline", marginLeft: "10px" }}>
                <Link
                  href={contactInfo.socialMediaLinks.facebook}
                  target="_blank"
                >
                  Facebook
                </Link>
              </Box>
              <Box sx={{ display: "inline", marginLeft: "10px" }}>
                <Link
                  href={contactInfo.socialMediaLinks.instagram}
                  target="_blank"
                >
                  Instagram
                </Link>
              </Box>
              <Box sx={{ display: "inline", marginLeft: "10px" }}>
                <Link
                  href={contactInfo.socialMediaLinks.twitter}
                  target="_blank"
                >
                  Twitter
                </Link>
              </Box>
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
}

export default Contact;
