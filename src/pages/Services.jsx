import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import api from "../api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from the backend
  useEffect(() => {
    api
      .get(`/services`)
      .then((response) => {
        const data = response.data; // The actual data from the response

        // Check if the response data is an array
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          console.error("Response data is not an array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
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
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (services.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">
          No services available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(to bottom, #f0f4f8, #d9e3f0)",
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 3,
                borderRadius: "15px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={
                  service.imageUrl ||
                  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGF0aCUyMHlvZ2F8ZW58MHx8MHx8fDA%3D"
                } // Fallback image
                alt={service.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "10px" }}
                >
                  {service.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ marginTop: "10px" }}
                >
                  Price: ${service.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ marginTop: "10px" }}
                >
                  Duration: {service.duration}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "10px" }}
                >
                  Created At: {new Date(service.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Services;
