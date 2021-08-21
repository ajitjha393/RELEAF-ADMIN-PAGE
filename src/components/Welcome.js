import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";

const Welcome = ({ isOpen, toggle }) => {
  return (
    <WelcomeContainer isOpen={isOpen}>
      <WelcomeHeader>
        <ShowSidebarButton>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </ShowSidebarButton>
        <h4>Welcome To The Releaf Chat</h4>
      </WelcomeHeader>
    </WelcomeContainer>
  );
};

export default Welcome;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 90vh;
  background-color: #e3eff6;

  @media screen and (max-width: 768px) {
    flex: 1;
    height: 80vh;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  }
`;

const WelcomeHeader = styled.div`
  padding: 20px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
  height: 80px;
`;

const ShowSidebarButton = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
