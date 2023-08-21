import React from "react";
import { Container, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: unset;
  background-size: cover;
  background-image: url("https://a.cdn-hotels.com/gdcs/production104/d1292/5914682d-6db0-4c8c-8b0e-fb5c19d0f8df.jpg");
  height: 90vh;
`;

const HeroSection = styled.div`
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
    <StyledContainer className="container">
      <HeroSection className="hero">
        <Container>
          <h1>Welcome to Our Luxurious Hotels</h1>
          <p>Experience elegance and comfort in the heart of the city.</p>
          <CtaButton variant="warning">Book Now</CtaButton>
        </Container>
      </HeroSection>

      <Footer className="fixed-bottom py-3 bg-dark text-light ">
        <div>
          &copy; {new Date().getFullYear()} Your Hotel. All rights reserved.
        </div>
      </Footer>
    </StyledContainer>
  );
}

export default HomePage;
