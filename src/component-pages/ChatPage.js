import React, { useState } from "react";
import styled from "styled-components";
import Chat from "../components/Chat/Chat";
import ChatSidebar from "../components/Chat/ChatSidebar";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatContainer>
      <ChatSidebar isOpen={isOpen} toggle={toggle} />
      <Chat isOpen={isOpen} toggle={toggle} />
    </ChatContainer>
  );
};

export default ChatPage;

const ChatContainer = styled.div`
  display: flex;
`;
