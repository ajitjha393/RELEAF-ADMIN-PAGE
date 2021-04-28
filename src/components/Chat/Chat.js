import React from "react";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import FlipMove from "react-flip-move";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

const Chat = ({ toggle, isOpen }) => {
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [user] = useAuthState(auth);
  const [recipient, setRecepient] = useState();

  const scrollToBottom = () => [
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    }),
  ];
  return (
    <ChatContainer isOpen={isOpen}>
      <ChatHeader>
        <ShowSidebarButton>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </ShowSidebarButton>
        <ContentWrapper>
          <h4>
            To: <span>{recipient}</span>
          </h4>
          {/* <ChatDetails onClick={modalToggle} >Details</ChatDetails> */}
        </ContentWrapper>
      </ChatHeader>
      <h1>CHAT</h1>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;
  background-color: white;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  }
`;

const ChatHeader = styled.div`
  padding: 20px;
  align-items: center;
  display: flex;
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

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  > h4 {
    font-weight: 500;
    color: gray;
  }
`;
