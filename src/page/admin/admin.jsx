// AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./userList";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (has a valid token)
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to the login page if not authenticated
      navigate("/");
    } else {
      const decodedToken = jwt_decode(token);

      // Check if the user's role is "admin"
      if (decodedToken.role === "admin") {
        fetchUsers();
      } else {
        // Redirect to a non-admin page
        navigate("/user");
      }
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/users"); // Use the correct URL
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <UserList users={users} fetchUsers={fetchUsers} />
    </div>
  );
};

export default AdminPanel;
