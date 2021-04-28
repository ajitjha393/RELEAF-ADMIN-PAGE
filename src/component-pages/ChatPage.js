import React, { useContext, useState } from "react";
import styled from "styled-components";
import Chat from "../components/Chat/Chat";
import ChatSidebar from "../components/Chat/ChatSidebar";
import Welcome from "../components/Chat/Welcome";
import ChatContext from "../context/ChatContext";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { chatId } = useContext(ChatContext);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatContainer>
      <ChatSidebar isOpen={isOpen} toggle={toggle} />
      {chatId ? (
        <Chat isOpen={isOpen} toggle={toggle} />
      ) : (
        <Welcome isOpen={isOpen} toggle={toggle} />
      )}
    </ChatContainer>
  );
};

export default ChatPage;

const ChatContainer = styled.div`
  display: flex;
`;
