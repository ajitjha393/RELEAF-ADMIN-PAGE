import React from "react";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatroomSidebar from "../components/Chatroom/ChatroomSiebar";
import Chatroom from "../components/Chatroom/Chatroom";

const ChatroomPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { id } = useParams();
  return (
    <ChatroomContainer>
      <ChatroomSidebar isOpen={isOpen} toggle={toggle} />
      {id ? (
        <>
          <Chatroom isOpen={isOpen} toggle={toggle} />
        </>
      ) : (
        <Welcome isOpen={isOpen} toggle={toggle} />
      )}
    </ChatroomContainer>
  );
};

export default ChatroomPage;

const ChatroomContainer = styled.div`
  display: flex;
`;
