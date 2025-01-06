// src/components/SessionCard.js
import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const SessionCard = ({
  session,
  onJoinSession,
  isEnrolled,
  onDeleteSession,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: 3,
        borderRadius: "12px", // Rounded corners for a soft feel
        padding: "20px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": { transform: "scale(1.05)", boxShadow: 8 }, // Subtle hover effect
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#2C3E50", // Darker text for readability
            marginBottom: "15px",
            fontSize: "1.5rem", // Slightly larger font for titles
            fontFamily: "'Segoe UI', sans-serif", // Clean and modern font
          }}
        >
          {session.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: "1.8",
            fontSize: "1.2rem",
            color: "#7F8C8D", // Soft grey for description
            marginBottom: "15px",
            fontFamily: "'Roboto', sans-serif", // Modern font for body text
          }}
        >
          {session.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "#34495E", // Slightly darker color for secondary text
            marginBottom: "8px",
            fontSize: "1rem", // Uniform size for secondary text
          }}
        >
          Date & Time: {new Date(session.dateTime).toLocaleString()}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "#34495E",
            fontSize: "1rem",
          }}
        >
          Instructor: {session.instructor.name}
        </Typography>
      </CardContent>

      {/* Join or Enrolled Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px 20px",
        }}
      >
        {isEnrolled ? (
          <>
            <Button
              disabled
              sx={{
                backgroundColor: "#16A085", // Calming green color for the enrolled state
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "50px", // Rounded button for a soft feel
                cursor: "not-allowed",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "none", // Keep text lowercase for a smoother look
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              }}
            >
              Enrolled
            </Button>
            <Button
              onClick={() => onDeleteSession(session._id)}
              sx={{
                backgroundColor: "#E74C3C", // Soft red for cancel action
                color: "#fff",
                marginLeft: "15px",
                padding: "8px 16px",
                borderRadius: "50px", // Consistent rounded buttons
                "&:hover": {
                  backgroundColor: "#C0392B", // Darker red on hover
                },
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
                textTransform: "none", // Text remains natural
              }}
            >
              Cancel Enrollment
            </Button>
          </>
        ) : (
          <Button
            onClick={() => onJoinSession(session._id)}
            sx={{
              backgroundColor: "#2980B9", // Soft blue for Join button
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "50px", // Round button for a soft effect
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#3498DB", // Lighter blue on hover
              },
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Join Session
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SessionCard;
