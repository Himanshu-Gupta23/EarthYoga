// src/api.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://yoga-zgab.onrender.com/api",
  // // Replace with your API base URL
  // baseURL: "http://localhost:5000/api",
});

// Add request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage
    const token = localStorage.getItem("authToken");

    // Only add token if not on the login or signup route
    if (
      token &&
      !config.url.includes("/login") &&
      !config.url.includes("/signup")
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
