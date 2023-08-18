// AdminPanel.js
import React, { useEffect, useState } from "react";
import UserList from "./userList";
import { CreateProduct, ProductList } from "../index";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product/list");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <CreateProduct fetchProducts={fetchProducts} />
          <ProductList
            fetchProducts={fetchProducts}
            products={products}
            setProducts={setProducts}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
