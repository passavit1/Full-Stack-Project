import React, { useState } from "react";
import { Form, Button, Modal, InputGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #ffffff;
  max-width: unset !important;

  #submitButton {
    width: 30%;
  }
`;

const Register = () => {
  // collect value from register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // value for check function
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Function to reset all form fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setLastName("");
    setPhone("");
  };

  // function check and send to backend
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
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
      email: email,
      firstName: name,
      lastName: lastName,
      password: password,
      phone: phone,
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
  const handleEmailCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/check-username?email=${email}`
      );

      if (response.data.exists) {
        setIsUsernameTaken(true);
        setUsernameAvailabilityMessage("Email is already taken");
      } else {
        setIsUsernameTaken(false);
        setUsernameAvailabilityMessage("Email is available");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const validateEmailFormat = (email) => {
    // Regular expression for basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <StyledContainer className="container p-3">
      <h5 className="d-flex justify-content-center mb-3">
        SIGN UP INFORMATION
      </h5>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3 ">
          <InputGroup>
            <Form.Floating>
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setUsernameAvailabilityMessage("");
                  setIsEmailValid(validateEmailFormat(e.target.value));
                }}
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleEmailCheck}
              disabled={!isEmailValid}
            >
              Check Email
            </Button>
          </InputGroup>
          <p style={{ color: isUsernameTaken ? "red" : "green" }}>
            {usernameAvailabilityMessage}
          </p>
          {!isUsernameTaken && email && !validateEmailFormat(email) && (
            <p style={{ color: "red" }}>Please enter a valid email address</p>
          )}
        </Form.Group>

        <Row className="mb-3">
          <Col md={6} className="mb-2 mb-md-auto">
            <Form.Group controlId="RegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordMatch(e.target.value === password);
                }}
                style={{ borderColor: passwordMatch ? "" : "red" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="mb-2 mb-md-auto">
            <Form.Group controlId="RegisterFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="RegisterLastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="Phone">
          <Form.Label>Phone *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-3"
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-center">
          <Button
            variant="secondary "
            type="submit"
            disabled={!isEmailValid}
            id="submitButton"
          >
            Register
          </Button>
        </Form.Group>
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
    </StyledContainer>
  );
};

export default Register;
