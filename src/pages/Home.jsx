import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

// Gradient Animation for Hero Section
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundImage: "url('/images/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  position: "relative",
  padding: "0 20px",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(-45deg, #FFB6C1, #FFD700, #FF69B4, #FF7F50)",
    backgroundSize: "400% 400%",
    animation: `${gradientAnimation} 8s ease infinite`,
    zIndex: -1,
    opacity: 0.85,
  },
}));

// Styled Service Cards
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "15px",
  overflow: "hidden",
  background:
    "linear-gradient(to top left, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2))",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
  },
}));

// Button with Glow Effect
const GlowingButton = styled(Button)(({ theme }) => ({
  padding: "12px 40px",
  fontSize: "18px",
  borderRadius: "50px",
  backgroundColor: "#FF4081",
  color: "#fff",
  boxShadow: "0 4px 15px rgba(255, 64, 129, 0.4)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: "#E91E63",
    boxShadow: "0 6px 20px rgba(233, 30, 99, 0.5)",
  },
}));

// Styled Testimonial Carousel
const TestimonialCard = styled(Box)(({ theme }) => ({
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "20px",
            textShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
            fontSize: {
              xs: "2.5rem", // Mobile
              sm: "3rem", // Tablet
              md: "4rem", // Desktop
            },
          }}
        >
          Discover the Power of Yoga
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: "30px",
            maxWidth: "600px",
            lineHeight: 1.8,
            letterSpacing: "0.8px",
            fontSize: {
              xs: "1rem", // Mobile
              sm: "1.2rem", // Tablet
              md: "1.5rem", // Desktop
            },
          }}
        >
          Achieve balance, strength, and serenity with our personalized yoga
          classes.
        </Typography>
        <GlowingButton component={Link} to="/services">
          Explore Our Classes
        </GlowingButton>
      </HeroSection>

      {/* Services Section */}
      <Container sx={{ padding: { xs: "30px 20px", sm: "50px 20px" } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: {
              xs: "1.8rem", // Mobile
              sm: "2.2rem", // Tablet
              md: "3rem", // Desktop
            },
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Hatha Yoga",
              description: "Traditional poses for balance and flexibility.",
              image:
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60",
            },
            {
              title: "Vinyasa Yoga",
              description: "Flowing sequences for a dynamic workout.",
              image:
                "https://plus.unsplash.com/premium_photo-1674421795172-cabfd455860b?w=500&auto=format&fit=crop&q=60",
            },
            {
              title: "Yoga Therapy",
              description: "Healing practices tailored to individual needs.",
              image:
                "https://images.unsplash.com/photo-1529693662653-9d480530a697?w=500&auto=format&fit=crop&q=60",
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  alt={service.title}
                  height="200"
                  image={service.image}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Inspiration Section */}
      <Container sx={{ padding: { xs: "30px 20px", sm: "50px 20px" } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: {
              xs: "1.8rem", // Mobile
              sm: "2.2rem", // Tablet
              md: "3rem", // Desktop
            },
          }}
        >
          Our Inspiration
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-sunset-sunset-character-silhouette-chaka-salt-lake-natural-landscape-photography-picture-image_790707.jpg"
            alt="Yoga Inspiration"
            style={{
              maxWidth: "100%",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              marginTop: "20px",
              color: "#555",
              fontStyle: "italic",
            }}
          >
            "Find your inner peace and connect with nature through yoga."
          </Typography>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          padding: "80px 20px",
          textAlign: "center",
          backgroundColor: "#f7f7f7",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#333",
            fontSize: "2rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          What Our Clients Say
        </Typography>
        <Carousel
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 }, // 2 items for large screens
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 }, // 2 items for tablet-sized screens
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }, // 1 item for small screens
          }}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={5000}
          swipeable={true}
          draggable={true}
          transitionTime={600}
        >
          {[
            "Yoga has changed my life! - Jane",
            "Amazing classes with fantastic instructors. - Mark",
            "I found peace and balance here. - Sarah",
            "The best way to start my day! - Emily",
            "A truly transformative experience. - John",
            "Every class leaves me feeling refreshed and energized. - Alex",
            "Yoga has helped me become stronger both mentally and physically. - Mia",
            "A wonderful community and supportive environment. - David",
            "I never thought yoga could make such a difference. - Lisa",
            "I’ve never felt more in tune with my body and mind. - Rachel",
          ].map((testimonial, index) => (
            <TestimonialCard
              key={index}
              sx={{
                padding: "30px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent background
                borderRadius: "10px",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)", // Optional: adds a slight blur effect to background behind the card
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 18px 36px rgba(0, 0, 0, 0.15)",
                },
                margin: "0 10px", // Adds horizontal spacing between the cards
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  color: "#555",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  fontFamily: "'Lora', serif",
                  paddingBottom: "20px",
                }}
              >
                {testimonial}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#777",
                  fontSize: "1rem",
                  fontFamily: "'Roboto', sans-serif",
                }}
              ></Typography>
            </TestimonialCard>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}

export default Home;
