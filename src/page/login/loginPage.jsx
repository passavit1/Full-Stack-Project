import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Login from "./login"; // Import your Login component
import Register from "./register"; // Import your Register component
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: unset !important;
  .nav-tabs li {
    width: 50%;
  }

  .nav-tabs .nav-link {
    background-color: #d6d6d6;
    color: #58598f;
    font-weight: 600;
    overflow: hidden;
  }

  #auth-tabs-tab-register {
    height: 100%;
  }

  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    color: #ffffff;
    background-color: #58595b;
  }
`;

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledContainer
      className="container   col-lg-8 m-lg-auto m-0 mt-4 mt-lg-4"
      id="container"
    >
      <Tabs
        id="auth-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className=" "
        fill
      >
        <Tab eventKey="login" title="LOG IN TO MEMBER DASHBOARD">
          <Login />
        </Tab>
        <Tab eventKey="register" title="SIGN UP">
          <Register />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};

export default LoginPage;
