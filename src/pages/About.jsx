import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faHandsHelping,
  faCogs,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/about`)
      .then((response) => {
        setAboutData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching About Us data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #e0f7fa, #81d4fa)",
        }}
      >
        <CircularProgress size={80} thickness={5} color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(to bottom, #f1f8e9, #e8f5e9)",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#2e7d32",
          marginBottom: "40px",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        About Us
      </Typography>

      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginBottom: "20px", color: "#1b5e20" }}
        >
          Our Vision
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: "1.8", fontSize: "1.2rem", color: "#4caf50" }}
        >
          {aboutData.vision}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginBottom: "20px", color: "#1b5e20" }}
        >
          Core Values
        </Typography>
        <Grid container spacing={4}>
          {aboutData.coreValues.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  textAlign: "center",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: 4,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <FontAwesomeIcon
                  icon={
                    index === 0
                      ? faLightbulb
                      : index === 1
                      ? faHandsHelping
                      : index === 2
                      ? faCogs
                      : faHeartbeat
                  }
                  size="3x"
                  color="#43a047"
                  style={{ marginBottom: "15px" }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#2e7d32" }}
                >
                  {value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginBottom: "20px", color: "#1b5e20" }}
        >
          Our Story
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: "1.8", fontSize: "1.2rem", color: "#4caf50" }}
        >
          {aboutData.storyAndBackground}
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginBottom: "20px", color: "#1b5e20" }}
        >
          Meet Our Founders
        </Typography>
        <Grid container spacing={4}>
          {aboutData.foundersAndTeam.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: 4,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <CardMedia
                  component="img"
                  alt={member.name}
                  height="200"
                  image={`/images/${member.name
                    .replace(/\s+/g, "")
                    .toLowerCase()}.jpg`}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#2e7d32" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ marginBottom: "10px" }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: "1.5", color: "#4caf50" }}
                  >
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AboutUs;
