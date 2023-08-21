import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #ffffff;
  max-width: unset !important;

  #loginUsername,
  #loginPassword,
  #loginButton {
    width: 60%;
    margin: 0 auto;

    @media (max-width: 991px) {
      width: 100%;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        setLoginMessage("Login successful");
        setLoginStatus(true);
        localStorage.setItem("token", response.data.token);

        const decodedToken = jwt_decode(response.data.token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        const tokenExpirationTime = decodedToken.exp;

        // Calculate the time difference in seconds
        const timeDifference = tokenExpirationTime - currentTime;

        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }

        // Set a timer to remove the token after it expires
        setTimeout(() => {
          localStorage.removeItem("token");
          setLoginMessage("Token has expired");
          setLoginStatus(false);
        }, timeDifference * 1000); // Convert to milliseconds
      }
    } catch (error) {
      console.error("An error occurred during login in front end :", error);
      setLoginMessage("Username or password incorrect");
      setLoginStatus(false);
    }
  };

  const handleInputChange = (e) => {
    setLoginMessage("");
    setLoginStatus(false);

    if (e.target.id === "loginUsername") {
      setUsername(e.target.value);
    } else if (e.target.id === "loginPassword") {
      setPassword(e.target.value);
    }
  };

  return (
    <StyledContainer className="container pt-3 ">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="loginUsername" className="mb-3">
          <Form.Label className="d-flex justify-content-center mb-2">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="loginPassword" className="mb-4">
          <Form.Label className="d-flex justify-content-center mb-2">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="d-flex flex-column justify-content-center">
          <Button
            variant="primary"
            type="submit"
            id="loginButton"
            className="mb-4"
          >
            Login
          </Button>
        </Form.Group>

        {loginStatus !== undefined && (
          <p style={{ color: loginStatus ? "green" : "red" }}>{loginMessage}</p>
        )}
      </Form>
    </StyledContainer>
  );
};

export default Login;
