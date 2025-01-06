import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../../api";
import SessionCard from "./SessionCard";
import TabsSection from "./TabsSection";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [enrolledSessions, setEnrolledSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0); // Tab value
  const [sessionsFetched, setSessionsFetched] = useState(false);
  const [enrolledSessionsFetched, setEnrolledSessionsFetched] = useState(false);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Confirmation dialog states
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState(null);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Fetch all sessions
  const fetchSessions = () => {
    setLoading(true);
    api
      .get("/sessions")
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error))
      .finally(() => setLoading(false));
  };

  // Fetch enrolled sessions
  const fetchEnrolledSessions = () => {
    setLoading(true);
    api
      .get("/bookings/user")
      .then((response) => {
        setEnrolledSessions(response.data);
        setEnrolledSessionsFetched(true);
      })
      .catch((error) =>
        console.error("Error fetching enrolled sessions:", error)
      )
      .finally(() => setLoading(false));
  };

  // Fetch sessions based on tab selection
  useEffect(() => {
    if (value === 0 && !sessionsFetched) {
      fetchSessions();
      setSessionsFetched(true);
    } else if (value === 1 && !enrolledSessionsFetched) {
      fetchEnrolledSessions();
    }
  }, [value, sessionsFetched, enrolledSessionsFetched]);

  const handleTabChange = (event, newValue) => setValue(newValue);

  const handleJoinSession = (sessionId) => {
    const bookingDate = new Date().toISOString();
    enrollSession(sessionId, bookingDate);
  };

  // Enroll the user to a session
  const enrollSession = (sessionId, bookingDate) => {
    setLoading(true);
    api
      .post("/bookings", { sessionId, bookingDate })
      .then((response) => {
        showSnackbar("Successfully enrolled in the session!", "success");
        setValue(1); // Navigate to the "Enrolled" tab after enrolling
        fetchEnrolledSessions();
      })
      .catch((error) => {
        console.error("Error enrolling in session:", error);
        showSnackbar("Failed to enroll in the session.", "error");
      })
      .finally(() => setLoading(false));
  };

  // Open confirmation dialog before canceling enrollment
  const confirmDeleteSession = (sessionId) => {
    setSessionToCancel(sessionId);
    setConfirmDialogOpen(true);
  };

  // Handle deletion after confirmation
  const handleDeleteSession = () => {
    setLoading(true);
    setConfirmDialogOpen(false);

    const sessionId = sessionToCancel;

    // Find the corresponding bookingId based on sessionId
    const booking = enrolledSessions.find(
      (enrolled) => enrolled.session._id === sessionId
    );

    if (!booking) {
      showSnackbar("No booking found for this session!", "error");
      setLoading(false);
      return;
    }

    const bookingId = booking._id; // Get the bookingId

    api
      .delete(`/bookings/${bookingId}`) // Use the bookingId in the API call
      .then(() => {
        setEnrolledSessions(
          (prevEnrolled) =>
            prevEnrolled.filter(
              (enrolled) => enrolled.session._id !== sessionId
            ) // Update the UI based on sessionId
        );
        showSnackbar("Enrollment canceled successfully!", "success");
        fetchEnrolledSessions(); // Re-fetch sessions to update the list
      })
      .catch((error) => {
        console.error(
          "Error canceling enrollment:",
          error.response ? error.response.data : error.message
        );
        showSnackbar("Failed to cancel enrollment.", "error");
      })
      .finally(() => setLoading(false));
  };

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
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(to bottom, #e0f7fa, #80deea)",
        borderRadius: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          marginBottom: "40px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Yoga Sessions
      </Typography>

      {/* Tab Navigation */}
      <TabsSection value={value} handleTabChange={handleTabChange} />

      {/* Render sessions based on selected tab */}
      <Grid container spacing={4}>
        {value === 0 && sessions.length === 0 ? (
          <Typography variant="h6" sx={{ width: "100%", color: "#777" }}>
            No sessions available.
          </Typography>
        ) : (
          value === 0 &&
          sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session._id}>
              <SessionCard
                session={session}
                onJoinSession={handleJoinSession}
              />
            </Grid>
          ))
        )}

        {value === 1 && enrolledSessions.length === 0 ? (
          <Typography variant="h6" sx={{ color: "#777", width: "100%" }}>
            You are not enrolled in any sessions yet.
          </Typography>
        ) : (
          value === 1 &&
          enrolledSessions.map((enrolled) => (
            <Grid item xs={12} sm={6} md={4} key={enrolled.session._id}>
              <SessionCard
                session={enrolled.session}
                isEnrolled
                onDeleteSession={() =>
                  confirmDeleteSession(enrolled.session._id)
                }
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">
          Cancel Enrollment Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to cancel your enrollment for this session?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteSession} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Sessions;
