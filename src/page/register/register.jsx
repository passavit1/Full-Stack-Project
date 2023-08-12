import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  // collect value from register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // value for check function
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");

  // Function to reset all form fields
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setEmail("");
  };

  // function check and send to backend
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !name || !email || !password || !confirmPassword) {
      setModalMessage("Please fill in all fields");
      setShowModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setModalMessage("Password and Confirm Password do not match");
      setShowModal(true);
      return;
    }

    setPasswordMatch(true);

    const userData = {
      username: username,
      name: name,
      password: password,
      email: email,
    };

    // send data to backend
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        userData
      );

      if (response.status === 201) {
        console.log("User registered successfully");
        setShowSuccessModal(true);
        resetForm();
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setShowModal(false);
  };

  // Check user name is registered
  const handleUsernameCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/check-username?username=${username}`
      );

      if (response.data.exists) {
        setIsUsernameTaken(true);
        setUsernameAvailabilityMessage("Username is already taken");
      } else {
        setIsUsernameTaken(false);
        setUsernameAvailabilityMessage("Username is available");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameAvailabilityMessage("");
            }}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUsernameCheck}>
          Check Username Availability
        </Button>
        <p style={{ color: isUsernameTaken ? "red" : "green" }}>
          {usernameAvailabilityMessage}
        </p>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatch(e.target.value === password);
            }}
            style={{ borderColor: passwordMatch ? "" : "red" }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>User registered successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
