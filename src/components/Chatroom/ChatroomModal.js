import React from "react";
import styled from "styled-components";
const ChatroomModal = ({ modalToggle, modalOpen, chatName, description }) => {
  return (
    <ChatModalContainer isOpen={modalOpen}>
      <ChatModalContent>
        <ChatModalButton onClick={modalToggle}>&times;</ChatModalButton>
        <h2>Welcome to Releaf Chat Room</h2>
        <br />
        Chat Room Name: <strong>{chatName}</strong>
        <br />
        <br />
        <p>{description}</p>
        <br />
        <strong>Rules and Regulations:</strong>
        <p>1. No spamming</p>
        <p>2. No personal attacks or harrasment</p>
        <p>3. No solicitation</p>
      </ChatModalContent>
    </ChatModalContainer>
  );
};

export default ChatroomModal;

const ChatModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: scroll; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ChatModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
`;

const ChatModalButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  :hover,
  :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
