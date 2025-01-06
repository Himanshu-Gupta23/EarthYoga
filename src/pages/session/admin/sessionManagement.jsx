import React, { useState, useEffect } from "react";
import api from "../../../api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({
    name: "",
    description: "",
    instructor: "",
    dateTime: "",
    id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is mobile

  useEffect(() => {
    fetchSessions();
    fetchInstructors();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("/sessions");
      setSessions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await api.get("/user/instructor");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleAddSession = async () => {
    try {
      const response = await api.post("/sessions", {
        name: sessionDetails.name,
        description: sessionDetails.description,
        instructor: sessionDetails.instructor,
        dateTime: sessionDetails.dateTime,
      });
      setSessions([...sessions, response.data]);
      setShowModal(false);
      resetSessionDetails();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const handleUpdateSession = async () => {
    try {
      const response = await api.put(`/sessions/${sessionDetails.id}`, {
        name: sessionDetails.name,
        description: sessionDetails.description,
        instructor: sessionDetails.instructor,
        dateTime: sessionDetails.dateTime,
      });
      const updatedSessions = sessions.map((session) =>
        session._id === sessionDetails.id ? response.data : session
      );
      setSessions(updatedSessions);
      setShowModal(false);
      resetSessionDetails();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await api.delete(`/sessions/${sessionId}`);
      setSessions(sessions.filter((session) => session._id !== sessionId));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleEditSession = (session) => {
    setSessionDetails({
      name: session.name,
      description: session.description,
      instructor: session.instructor._id,
      dateTime: formatDateToIST(session.dateTime), // Adjust for IST
      id: session._id,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetSessionDetails();
    setIsEditing(false);
  };

  const resetSessionDetails = () => {
    setSessionDetails({
      name: "",
      description: "",
      instructor: "",
      dateTime: "",
      id: "",
    });
  };

  // Convert a UTC date to IST (UTC + 5:30)
  const convertToIST = (dateTime) => {
    const date = new Date(dateTime);
    const IST_OFFSET = 5.5 * 60; // IST is UTC + 5:30
    const ISTDate = new Date(date.getTime() + IST_OFFSET * 60 * 1000);
    return ISTDate;
  };

  // Format the date to show in the modal (adjust to IST)
  const formatDateToIST = (dateTime) => {
    const date = convertToIST(dateTime);
    return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
  };

  // Format the date to store in UTC (when adding/updating)
  const formatDateForAPI = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString(); // Store in UTC
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f4f9f4",
        padding: "2rem",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"} // Use smaller typography for mobile
        style={{ marginBottom: "1rem", color: "#5e8b7e" }}
      >
        Session Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#7db9b7",
          borderRadius: "30px",
          padding: "10px 30px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        Add New Session
      </Button>

      {loading ? (
        <CircularProgress style={{ marginTop: "20px" }} />
      ) : (
        <Table
          aria-label="session management"
          sx={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: isMobile ? "100%" : "auto", // Full width for mobile
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#4b8c6b" }}>
                Title
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4b8c6b" }}>
                Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4b8c6b" }}>
                Description
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4b8c6b" }}>
                Instructor
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4b8c6b" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow
                key={session._id}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#e7f0e7" } }}
              >
                <TableCell>{session.name}</TableCell>
                <TableCell>
                  {convertToIST(session.dateTime).toLocaleString()}
                </TableCell>
                <TableCell>{session.description}</TableCell>
                <TableCell>{session.instructor.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditSession(session)}
                    sx={{
                      marginRight: 1,
                      borderRadius: "25px",
                      color: "#7db9b7",
                      borderColor: "#7db9b7",
                      "&:hover": { backgroundColor: "#7db9b7", color: "#fff" },
                    }}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteSession(session._id)}
                    sx={{
                      borderRadius: "25px",
                      color: "#b74646",
                      borderColor: "#b74646",
                      "&:hover": { backgroundColor: "#b74646", color: "#fff" },
                    }}
                    startIcon={<DeleteOutline />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="session-modal-title"
        aria-describedby="session-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            boxShadow: 24,
            p: 4,
            width: isMobile ? "90%" : "400px", // Full width for mobile
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="h6"
            id="session-modal-title"
            style={{ color: "#7db9b7", fontWeight: "500" }}
          >
            {isEditing ? "Edit Session" : "Add Session"}
          </Typography>
          <form>
            <TextField
              label="Session Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={sessionDetails.name}
              onChange={(e) =>
                setSessionDetails({ ...sessionDetails, name: e.target.value })
              }
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Session Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={sessionDetails.description}
              onChange={(e) =>
                setSessionDetails({
                  ...sessionDetails,
                  description: e.target.value,
                })
              }
              style={{ marginBottom: "1rem" }}
            />
            <FormControl
              fullWidth
              margin="normal"
              style={{ marginBottom: "1rem" }}
            >
              <InputLabel>Instructor</InputLabel>
              <Select
                value={sessionDetails.instructor}
                onChange={(e) =>
                  setSessionDetails({
                    ...sessionDetails,
                    instructor: e.target.value,
                  })
                }
                label="Instructor"
                sx={{
                  borderRadius: "25px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                  },
                }}
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Session Date"
              variant="outlined"
              fullWidth
              margin="normal"
              type="datetime-local"
              value={sessionDetails.dateTime ? formatDateToIST(sessionDetails.dateTime) : ""}
              onChange={(e) =>
                setSessionDetails({
                  ...sessionDetails,
                  dateTime: e.target.value,
                })
              }
              style={{ marginBottom: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={isEditing ? handleUpdateSession : handleAddSession}
              sx={{
                marginTop: 2,
                borderRadius: "30px",
                backgroundColor: "#7db9b7",
                padding: "10px 30px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              {isEditing ? "Update Session" : "Add Session"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SessionManagement;
