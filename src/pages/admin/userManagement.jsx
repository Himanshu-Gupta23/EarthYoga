import React, { useState, useEffect } from "react";
import api from "../../api";
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users excluding admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle role change for the selected user
  const handleRoleChange = async () => {
    try {
      if (!role) {
        setError("Please select a role");
        return;
      }

      const updatedUser = await api.put(`/users/${selectedUser._id}/role`, {
        role,
      });
      setUsers(
        users.map((user) =>
          user._id === updatedUser.data._id ? updatedUser.data : user
        )
      );
      setRole("");
      setSelectedUser(null);
    } catch (error) {
      setError("Failed to update role");
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6">Users List</Typography>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item key={user._id} xs={12} sm={6} md={4}>
                  <div
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="body1">{user.name}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setSelectedUser(user)}
                    >
                      Edit Role
                    </Button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {selectedUser && (
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                Edit Role for {selectedUser.name}
              </Typography>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>

              <Button
                variant="contained"
                color="primary"
                onClick={handleRoleChange}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Update Role
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default UserManagement;
