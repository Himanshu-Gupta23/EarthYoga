import React, { useState } from "react";
import api from "../../api"; // Ensure this points to your backend API setup
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });
  const [uploadedImage, setUploadedImage] = useState(null); // Store the uploaded image here

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "Please select an image.", type: "warning" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await api.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImage(response.data); // Save the uploaded image details
      setMessage({ text: "Image uploaded successfully!", type: "success" });
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage({ text: "Upload failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        textAlign: "center",
        background: "#ffffff",
        boxShadow: 3,
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Upload an Image
      </Typography>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Selected: {file.name}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        sx={{ marginTop: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        sx={{ marginTop: 2 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Upload"}
      </Button>

      <Snackbar
        open={!!message.text}
        autoHideDuration={4000}
        onClose={() => setMessage({ text: "", type: "info" })}
      >
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>

      {/* Display the uploaded image after success */}
      {uploadedImage && (
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Typography variant="h6">Uploaded Image</Typography>
          <img
            src={uploadedImage.url} // Use the URL returned by the backend
            alt={uploadedImage.title}
            style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {uploadedImage.title}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default UploadImage;
