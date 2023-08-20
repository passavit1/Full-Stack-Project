import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  Login,
  Register,
  Test,
  AdminPanel,
  UserPage,
  HomePage,
} from "./page/index";

function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link">
              Hotel Name
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Link
                to={isLoginPage ? "/login" : "/register"}
                className="nav-link"
                onClick={togglePage}
              >
                {isLoginPage ? "Login" : "Register"}
              </Link>
              <Link className="nav-link">Test</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
