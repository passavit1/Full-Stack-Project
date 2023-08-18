// AdminPanel.js
import React, { useEffect } from "react";
import UserList from "./userList";
import { CreateProduct } from "../index";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import jwt_decode from "jwt-decode";

const AdminPanel = () => {
  const navigate = useNavigate();

  // Set token to local storage
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
        navigate("/admin");
      } else {
        // Redirect to a non-admin page
        navigate("/user");
      }
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey="users">
        <Tab eventKey="users" title="User List">
          <UserList />
        </Tab>
        <Tab eventKey="products" title="Product Page">
          <CreateProduct />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
