import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const HeroSection = styled.div`
  background-image: url("hero-image.jpg");
  background-size: cover;
  text-align: center;
  padding: 100px 0;
  color: #fff;
`;

const CtaButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 5px;
`;

const Footer = styled.footer`
  margin-top: 5rem;
  padding: 3rem 0;
  text-align: center;
`;

function HomePage() {
  return (
    <div className="container">
      <HeroSection className="hero">
        <Container>
          <h1>Welcome to Our Luxurious Hotels</h1>
          <p>Experience elegance and comfort in the heart of the city.</p>
          <CtaButton variant="warning">Book Now</CtaButton>
        </Container>
      </HeroSection>

      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Discover Our Rooms</h2>
            {/* Room listings go here */}
          </Col>
        </Row>
        {/* Other sections */}
      </Container>

      <Footer className="mt-5 py-3">
        <p>
          &copy; {new Date().getFullYear()} Your Hotel. All rights reserved.
        </p>
      </Footer>
    </div>
  );
}

export default HomePage;
