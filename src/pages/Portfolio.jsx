import React, { useEffect, useState } from "react";
import api from "../api"; // Ensure this points to your backend API setup
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/images`) // Ensure your backend API fetches images from Cloudinary
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
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
        variant="h2"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#2e7d32",
          marginBottom: "40px",
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: "1px",
          backgroundColor: "transparent",
        }}
      >
        Gallery
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                width: "100%", // Ensure the card takes full width of its container
                maxWidth: 500, // Set a maximum width for the card
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: 8,
                "&:hover": {
                  transform: "translateY(-12px)",
                  boxShadow: 12,
                  transition: "all 0.3s ease-in-out",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CardMedia
                component="img"
                alt={image.title}
                height="250"
                image={image.imageUrl}
                sx={{
                  objectFit: "contain", // Ensures the entire image is visible
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  padding: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Roboto', sans-serif",
                    marginBottom: "8px",
                  }}
                >
                  {image.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: "1.5",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  {image.description}
                </Typography>
                {/* Add the image date below the description */}
                {image.uploadedAt && (
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "8px",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "14px",
                      color: "#bdbdbd",
                    }}
                  >
                    {new Date(image.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long", // This will display the full month name
                      day: "numeric",
                    })}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Gallery;
