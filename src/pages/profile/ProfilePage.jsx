import React, { useState, useEffect } from "react";
import api from "../../api"; // Assuming 'api' is your Axios instance
import { CircularProgress } from "@mui/material"; // For loading spinner
import "./ProfilePage.css"; // Custom styles for the page

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/user/profile")
      .then((response) => {
        setUserData(response.data); // Set the user data received from the API
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={50} />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {userData ? (
        <div className="profile-info">
          <h2 className="profile-header">User Profile</h2>
          <div className="info-item">
            <strong>Name:</strong>
            <span>{userData.name}</span>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <span>{userData.email}</span>
          </div>
          <div className="info-item">
            <strong>Role:</strong>
            <span>{userData.role}</span>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
